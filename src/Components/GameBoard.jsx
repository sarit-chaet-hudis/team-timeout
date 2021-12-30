import { useEffect, useState } from "react";
import "./GameBoard.css";

const width = 8;
const blocks = [
  "#FF1780",
  "#5C9AFF",
  "#FFC922",
  "#71C757",
  "#9757EF",
  "#FC7536",
];

function GameBoard(props) {
  const [currentBlocks, setCurrentBlocks] = useState([]);

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
      //console.log(row);
      const selectedColor = currentBlocks[i];
      if (row.every((block) => currentBlocks[block] === selectedColor)) {
        row.forEach((block) => (currentBlocks[block] = "black"));
      }
    }
  };

  const checkColMatch = (matchLength) => {
    const max = width * (width - matchLength + 1);
    // we don't need to check after max since its too "low" on the board
    // to find a column of length
    for (let i = 0; i < max; i++) {
      const column = [];
      for (let j = 0; j < matchLength; j++) {
        // create the column we are checking, in selected length
        column.push(i + width * j);
      }
      const selectedColor = currentBlocks[i];
      if (column.every((block) => currentBlocks[block] === selectedColor)) {
        column.forEach((block) => (currentBlocks[block] = "black"));
      }
    }
  };

  const generateRandomBoard = () => {
    const randomBoard = [];
    for (let i = 0; i < width * width; i++) {
      const randomBlock = blocks[Math.floor(Math.random() * blocks.length)];
      randomBoard.push(randomBlock);
    }
    setCurrentBlocks(randomBoard);
  };

  useEffect(() => {
    generateRandomBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkColMatch(3);
      checkColMatch(4);
      checkColMatch(5);
      chechRowMatch(3);
      chechRowMatch(4);
      chechRowMatch(5);
      setCurrentBlocks([...currentBlocks]);
    }, 500);
    return () => clearInterval(timer);
  }, [currentBlocks]);

  return (
    <div className="board">
      {currentBlocks.map((color, index) => (
        <div key={index} style={{ backgroundColor: color }}></div>
      ))}
    </div>
  );
}

export default GameBoard;
