import { useEffect, useState } from "react";
import "./GameBoard.css";

const width = 8;

function GameBoard({ gotMatch, blocks }) {
  const [currentBlocks, setCurrentBlocks] = useState([]);
  const [blockBeingDragged, setBlockBeingDragged] = useState(null);
  const [blockBeingReplaced, setBlockBeingReplaced] = useState(null);

  const generateRandomBoard = () => {
    const randomBoard = [];
    for (let i = 0; i < width * width; i++) {
      const randomBlock = getRandomBlockType();
      randomBoard.push(randomBlock);
    }
    setCurrentBlocks(randomBoard);
  };

  const getRandomBlockType = () => {
    return Math.floor(Math.random() * 6);
  };

  useEffect(() => {
    generateRandomBoard();
  }, []); // eslint-disable-line

  const chechRowMatch = (matchLength) => {
    const invalid = [
      6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
    ];
    for (let i = 0; i < width * width; i++) {
      // if (i === width * (i + 1) - matchLength + 1) {
      //   // we dont need to check since we are "too close" to the end of line
      //   // to find a row of length
      //   i = width * (i + 1);
      // } // TODO rewrite to not be hard coded!!!
      if (invalid.includes(i)) continue;
      const row = [];
      for (let j = 0; j < matchLength; j++) {
        // create the column we are checking, in selected length
        row.push(i + j);
      }

      const selectedColor = currentBlocks[i];
      if (row.every((block) => currentBlocks[block] === selectedColor)) {
        row.forEach((block) => (currentBlocks[block] = 6));
        // gotMatch(matchLength);
        return true;
      }
    }
  };

  const checkColMatch = (matchLength) => {
    const max = width * (width - matchLength + 1);
    // we don't need to check after max since its too "low" on the board
    // to find a column of length
    for (let i = 0; i <= max; i++) {
      const column = [];
      for (let j = 0; j < matchLength; j++) {
        // create the column we are checking, in selected length
        column.push(i + width * j);
      }
      const selectedColor = currentBlocks[i];
      if (column.every((block) => currentBlocks[block] === selectedColor)) {
        column.forEach((block) => (currentBlocks[block] = 6));
        gotMatch(matchLength);
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    const firstRow = Array.from(Array(width).keys());

    for (let i = 0; i < width * (width - 1); i++) {
      // check each row but not last one

      if (firstRow.includes(i) && currentBlocks[i] === 6) {
        // generate random block to fill empty block in top row
        currentBlocks[i] = getRandomBlockType();
      }

      if (currentBlocks[i + width] === 6) {
        // below is empty, "move" down the
        currentBlocks[i + width] = currentBlocks[i];
        currentBlocks[i] = 6;
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      checkColMatch(5);
      checkColMatch(4);
      checkColMatch(3);
      chechRowMatch(5);
      chechRowMatch(4);
      chechRowMatch(3);
      moveIntoSquareBelow();
      setCurrentBlocks([...currentBlocks]);
    }, 100);
    return () => clearInterval(timer);
  }, [currentBlocks, blockBeingDragged, blockBeingReplaced]); // eslint-disable-line

  const onDragStart = (e) => {
    setBlockBeingDragged(e.target);
  };
  const onDrop = (e) => {
    setBlockBeingReplaced(e.target);
  };

  const onDragEnd = () => {
    // check if drag is valid, if so- replace blocks

    const blockBeingDraggedId = +blockBeingDragged.getAttribute("data-id");
    const blockBeingReplacedId = +blockBeingReplaced.getAttribute("data-id");

    // first: replace blocks
    const temp = currentBlocks[blockBeingReplacedId];
    currentBlocks[blockBeingReplacedId] = currentBlocks[blockBeingDraggedId];

    currentBlocks[blockBeingDraggedId] = temp;

    const validMoves = [
      blockBeingDraggedId + 1,
      blockBeingDraggedId - 1,
      blockBeingDraggedId + width,
      blockBeingDraggedId - width,
      // TODO this does not test borders!!!
    ];

    // then check if valid move
    const isValidMove = validMoves.includes(blockBeingReplacedId);

    if (blockBeingReplacedId && isValidMove) {
      // then check if the move ended with a match

      const row5 = chechRowMatch(5);
      const row4 = chechRowMatch(4);
      const row3 = chechRowMatch(3);
      const col5 = checkColMatch(5);
      const col4 = checkColMatch(4);
      const col3 = checkColMatch(3);

      if (row3 || row4 || row5 || col3 || col4 || col5) {
        // Move was valid and ended with a match. Leave blocks and reset drag
        setBlockBeingDragged(null);
        setBlockBeingReplaced(null);
      }
    } else {
      // Return blocks to their original position
      const temp = currentBlocks[blockBeingReplacedId];
      currentBlocks[blockBeingReplacedId] = currentBlocks[blockBeingDraggedId];

      currentBlocks[blockBeingDraggedId] = temp;
      setCurrentBlocks([...currentBlocks]);
    }
  };

  const renderBlock = (blockType, index) => {
    //blockType is integer between 0 -> 6
    if (blockType === 6)
      return <div className="gameBlock empty" key={index}></div>;
    else {
      return (
        <div
          className="gameBlock"
          key={index}
          style={{ backgroundColor: blocks[blockType].color }}
          data-id={index}
          draggable
          onDragStart={onDragStart}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={onDrop}
          onDragEnd={onDragEnd}
        >
          <span className="emoji" data-id={index}>
            {blocks[blockType].emoji}
          </span>
          {blocks[blockType].title}
        </div>
      );
    }
  };

  return (
    <div className="board">
      {currentBlocks.map((blockType, index) => renderBlock(blockType, index))}
    </div>
  );
}

export default GameBoard;
