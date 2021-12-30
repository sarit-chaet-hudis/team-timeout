import { useEffect, useState } from "react";
import "./GameBoard.css";

const width = 9;
const blocks = ["pink", "blue", "yellow", "green", "purple", "orange"];

function GameBoard(props) {
  const [currentBlocks, setCurrentBlocks] = useState([]);

  const generateRandomBoard = () => {
    const randomBoard = [];
    for (let i = 0; i < width * width; i++) {
      const randomBlock = blocks[Math.floor(Math.random() * blocks.length)];
      randomBoard.push(randomBlock);
    }
    setCurrentBlocks(randomBoard);
    console.log(randomBoard);
  };

  useEffect(() => {
    generateRandomBoard();
  }, []);

  return (
    <div className="board">
      {currentBlocks.map((color, index) => (
        <div key={index} style={{ backgroundColor: color }}></div>
      ))}
    </div>
  );
}

export default GameBoard;
