// import { useEffect, useState } from "react";
// import produce from "immer";
// import Draggable from "react-draggable";
// import toPX from "to-px";
// import "./GameBoardTest.css";

// const width = 8;

// const vmin = toPX("vmin");

// function GameBoard({ gotMatch, blocks }) {
//   const [currentBlocks, setCurrentBlocks] = useState([]);
//   const [blockBeingDragged, setBlockBeingDragged] = useState(null);
//   const [blockBeingReplaced, setBlockBeingReplaced] = useState(null);

//   const generateRandomBoard = () => {
//     const randomBoard = [];
//     for (let i = 0; i < width * width; i++) {
//       const randomBlock = getRandomBlockType();
//       randomBoard.push(randomBlock);
//     }
//     setCurrentBlocks(randomBoard);
//   };

//   const getRandomBlockType = () => {
//     return Math.floor(Math.random() * 6);
//   };

//   useEffect(() => {
//     generateRandomBoard();
//   }, []); // eslint-disable-line

//   const chechRowMatch = (matchLength) => {
//     const invalid = [
//       6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
//     ];
//     for (let i = 0; i < width * width; i++) {
//       // if (i === width * (i + 1) - matchLength + 1) {
//       //   // we dont need to check since we are "too close" to the end of line
//       //   // to find a row of length
//       //   i = width * (i + 1);
//       // } // TODO rewrite to not be hard coded!!!
//       if (invalid.includes(i)) continue;
//       const row = [];
//       for (let j = 0; j < matchLength; j++) {
//         // create the column we are checking, in selected length
//         row.push(i + j);
//       }

//       const selectedColor = currentBlocks[i];
//       if (row.every((block) => currentBlocks[block] === selectedColor)) {
//         // we got a match
//         const newCurrentBlocks = produce(currentBlocks, (draft) => {
//           row.forEach((block) => {
//             // row is index of blocks that match
//             console.log("~ block", block);

//             draft[block] = 6;
//             console.log("~ draft[block]", draft[block]);
//           });
//           return draft;
//         });

//         console.log("~ CurrentBlocks", currentBlocks);

//         setCurrentBlocks(newCurrentBlocks);
//         gotMatch(matchLength);
//         return true;
//       }
//     }
//   };

//   const checkColMatch = (matchLength) => {
//     const max = width * (width - matchLength + 1);
//     // we don't need to check after max since its too "low" on the board to find a column of length
//     for (let i = 0; i <= max; i++) {
//       const column = [];
//       for (let j = 0; j < matchLength; j++) {
//         // create the column we are checking, in selected length
//         column.push(i + width * j);
//       }
//       const selectedColor = currentBlocks[i];
//       if (column.every((block) => currentBlocks[block] === selectedColor)) {
//         const newCurrentBlocks = produce(currentBlocks, (draft) => {
//           column.forEach((block) => (draft[block] = 6));
//           console.log("~ draft", draft);
//         });
//         setCurrentBlocks(newCurrentBlocks);
//         column.forEach((cell) => {
//           console.log("inside match column");
//           console.log(currentBlocks[cell]);
//         });
//         gotMatch(matchLength);
//         return true;
//       }
//     }
//   };

//   const moveIntoSquareBelow = () => {
//     console.log("inside move into square below");
//     const firstRow = Array.from(Array(width).keys());

//     let newCurrentBlocks;

//     for (let i = 0; i < width * (width - 1); i++) {
//       // check each row but not last one

//       newCurrentBlocks = produce(currentBlocks, (draft) => {
//         if (firstRow.includes(i) && draft[i] === 6) {
//           // generate random block to fill empty block in top row
//           draft[i] = getRandomBlockType();
//         }

//         if (draft[i + width] === 6) {
//           // place below current block is empty, "move" down
//           console.log(`found 6 below ${i}`);
//           draft[i + width] = draft[i];
//           draft[i] = 6;
//         }
//       });
//     }
//     setCurrentBlocks(newCurrentBlocks);
//     console.log(currentBlocks);
//   };

//   useEffect(() => {
//     const timer = setInterval(() => {
//       checkColMatch(5);
//       checkColMatch(4);
//       checkColMatch(3);
//       chechRowMatch(5);
//       chechRowMatch(4);
//       chechRowMatch(3);
//       moveIntoSquareBelow();
//       setCurrentBlocks([...currentBlocks]);
//     }, 100);
//     return () => clearInterval(timer);
//   }, [currentBlocks, blockBeingDragged, blockBeingReplaced]); // eslint-disable-line

//   const onDragStart = (e) => {
//     setBlockBeingDragged(e.target);
//   };
//   // const onDrop = (e) => {
//   // };

//   const onDragEnd = (e) => {
//     // check if drag is valid, if so- replace blocks
//     setBlockBeingReplaced(e.target);
//     console.log("~ e.target", e.target);
//     console.log("is this the block were trying to replace?");

//     if (blockBeingReplaced) {
//       const blockBeingDraggedId = +blockBeingDragged.getAttribute("data-id");
//       const blockBeingReplacedId = +blockBeingReplaced.getAttribute("data-id");

//       // first: replace blocks
//       const temp = currentBlocks[blockBeingReplacedId];
//       const newCurrentBlocks = produce(currentBlocks, (draft) => {
//         draft[blockBeingReplacedId] = draft[blockBeingDraggedId];
//         draft[blockBeingDraggedId] = temp;
//       });

//       setCurrentBlocks(newCurrentBlocks);

//       const validMoves = [
//         blockBeingDraggedId + 1,
//         blockBeingDraggedId - 1,
//         blockBeingDraggedId + width,
//         blockBeingDraggedId - width,
//         // TODO this does not account for borders!!!
//       ];

//       // then check if valid move
//       const isValidMove = validMoves.includes(blockBeingReplacedId);

//       if (blockBeingReplacedId && isValidMove) {
//         // then check if the move ended with a match
//         const row5 = chechRowMatch(5);
//         const row4 = chechRowMatch(4);
//         const row3 = chechRowMatch(3);
//         const col5 = checkColMatch(5);
//         const col4 = checkColMatch(4);
//         const col3 = checkColMatch(3);

//         if (row3 || row4 || row5 || col3 || col4 || col5) {
//           // Move was valid and ended with a match. Leave blocks and reset drag
//           setBlockBeingDragged(null);
//           setBlockBeingReplaced(null);
//         }
//       } else {
//         // Return blocks to their original position
//         const temp = currentBlocks[blockBeingReplacedId];
//         const newCurrentBlocks = produce(currentBlocks, (draft) => {
//           draft[blockBeingReplacedId] = draft[blockBeingDraggedId];
//           draft[blockBeingDraggedId] = temp;
//         });

//         setCurrentBlocks(newCurrentBlocks);
//         console.log(currentBlocks);
//       }
//     }
//   };

//   const renderBlock = (blockType, index) => {
//     //blockType is integer between 0 -> 6
//     if (blockType === 6)
//       return (
//         <Draggable key={index}>
//           <div className="gameBlock empty"></div>
//         </Draggable>
//       );
//     else {
//       return (
//         <Draggable
//           key={index}
//           grid={[(90 * vmin) / 8, (90 * vmin) / 8]}
//           onStart={onDragStart}
//           onStop={onDragEnd}
//         >
//           <div
//             className="gameBlock"
//             style={{ backgroundColor: blocks[blockType].color }}
//             data-id={index}
//           >
//             <span className="emoji" data-id={index}>
//               {blocks[blockType].emoji}
//             </span>
//             {blocks[blockType].title}
//           </div>
//         </Draggable>
//       );
//     }
//   };

//   return (
//     <div className="board">
//       {currentBlocks.map((blockType, index) => renderBlock(blockType, index))}
//     </div>
//   );
// }

// export default GameBoard;
