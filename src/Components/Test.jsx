import { useState } from "react";
import produce from "immer";
import Draggable from "react-draggable";
import toPX from "to-px";
import "./GameBoardTest.css";

const vmin = toPX("vmin");

function Test({ blocks }) {
  const [currentBlocks, setCurrentBlocks] = useState([1, 2]);
  const [blockBeingDragged, setBlockBeingDragged] = useState(null);
  const [blockBeingReplaced, setBlockBeingReplaced] = useState(null);

  //   useEffect(() => {
  //     const timer = setInterval(() => {
  //       console.log(currentBlocks);
  //     }, 100);
  //     return () => clearInterval(timer);
  //   }, [currentBlocks, blockBeingDragged, blockBeingReplaced]); // eslint-disable-line

  const onDragStart = (e) => {
    setBlockBeingDragged(e.target);
    console.log("in onDragStart");
  };

  const onDragEnd = (e, data) => {
    setBlockBeingReplaced(data);
    console.log(data);

    if (blockBeingReplaced) {
      console.log("inside if (blockBeingReplaced) ");
      const blockBeingDraggedId = +blockBeingDragged.getAttribute("data-id");
      const blockBeingReplacedId = +blockBeingReplaced.getAttribute("data-id");
      console.log("~ blockBeingDraggedId", blockBeingDraggedId);
      console.log("~ blockBeingReplacedId", blockBeingReplacedId);

      const temp = currentBlocks[blockBeingReplacedId];
      const newCurrentBlocks = produce(currentBlocks, (draft) => {
        draft[blockBeingReplacedId] = draft[blockBeingDraggedId];
        draft[blockBeingDraggedId] = temp;
      });

      setCurrentBlocks(newCurrentBlocks);
    }
  };

  const renderBlock = (blockType, index) => {
    return (
      <Draggable
        key={index}
        onStart={onDragStart}
        onStop={onDragEnd}
        grid={[(90 * vmin) / 8, (90 * vmin) / 8]}
      >
        <div
          className="gameBlock"
          style={{ backgroundColor: blocks[blockType].color }}
          data-id={index}
        >
          <span className="emoji" data-id={index}>
            {blocks[blockType].emoji}
          </span>
          {blocks[blockType].title}
        </div>
      </Draggable>
    );
  };

  return <div className="board">{currentBlocks.map(renderBlock)}</div>;
}

export default Test;
