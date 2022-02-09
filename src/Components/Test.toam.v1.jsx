// import React, {  useState } from "react";
// // import produce from "immer";
// import Draggable from "react-draggable";
// import toPX from "to-px";
// import "./GameBoardTest.css";

// const vmin = toPX("vmin");

// const TestToam = ({ blocks }) => {
//   const [currentBlocks, setCurrentBlocks] = useState([1, 2]);
//   const [blockBeingDragged, setBlockBeingDragged] = useState(null);
//   const [blockBeingReplaced, setBlockBeingReplaced] = useState(null);

//   const isMatch = () => {
//     return true;
//   };
//   const isValidMove = () => {
//     return true;
//   };

//   const replaceBlocks = (draggedCorrdiante, replacedCorrdiante) => {
//     const newBlocks = [...currentBlocks];
//     const { D_X, D_Y } = draggedCorrdiante;
//     const { R_X, R_Y } = replacedCorrdiante;
//     const tempItemToReplace = newBlocks[R_X][R_Y];

//     newBlocks[R_X][R_Y] = newBlocks[D_X][D_Y];
//     newBlocks[D_X][D_Y] = tempItemToReplace;
//   };

//   const getIndexsByCorrdiantes = () => {};

//   const onDragStop = (e, data) => {
//     if (!isValidMove()) return alert("isn't valid move");
//     if (!isMatch()) return alert("isn't match");
//     const { x, y } = data;
//     const indexs = getIndexsByCorrdiantes({ x, y }, { x: 1, y: 2 });
//     replaceBlocks(indexs);
//   };

//   const renderBlock = (blockType, index) => {
//     return (
//       <Draggable
//         onMouseDown={(e) => console.log(e)}
//         onStop={onDragStop}
//         key={index}
//         grid={[(90 * vmin) / 8, (90 * vmin) / 8]}
//       >
//         <div
//           className="gameBlock"
//           style={{ backgroundColor: blocks[blockType].color }}
//           data-id={index}
//         >
//           <span className="emoji" data-id={index}>
//             {blocks[blockType].emoji}
//           </span>
//           {blocks[blockType].title}
//         </div>
//       </Draggable>
//     );
//   };

//   return <div className="board">{currentBlocks.map(renderBlock)}</div>;
// };

// export default TestToam;
