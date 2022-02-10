import "../../node_modules/react-grid-layout/css/styles.css";

import GridLayout from "react-grid-layout";

import "./RGL.css";
import toPX from "to-px";
import { useState } from "react";

const vmin = toPX("vmin");

const RGL = () => {
  const [blockBeingDragged, setBlockBeingDragged] = useState(null);
  //const [blockBeingReplaced, setBlockBeingReplaced] = useState(null);

  const arrayGridDivs = () => {
    const res = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        res.push(
          <div
            key={`${i}${j}`}
            data-grid={{
              x: i,
              y: j,
              w: 1,
              h: 1,
              isResizable: false,
            }}
          >
            {`${i}${j}`}
          </div>
        );
      }
    }
    console.log("~ res", res);

    return res;
  };

  const [layout, setLayout] = useState([]);

  const saveLayout = (currentLayout) => {
    setLayout(currentLayout);
  };

  const dragStart = (e, element) => {
    console.log("start drag", element);
    setBlockBeingDragged(e.target);
    console.log(blockBeingDragged);
  };

  const dragStop = (layout, oldItem, newItem, placeholder, e, element) => {
    console.log("stop drag");
    console.log("~ oldItem", oldItem);
    console.log("~ newItem", newItem);
    console.log("~ e", e);
    console.log("~ element", element);
  };

  return (
    <div style={{ width: "90vmin" }}>
      <GridLayout
        className="layout"
        // layout=
        cols={8}
        rowHeight={(90 * vmin) / 8}
        width={90 * vmin}
        onLayoutChange={saveLayout}
        onDragStart={dragStart}
        onDragStop={dragStop}
      >
        {arrayGridDivs().map((div) => div)}
      </GridLayout>
    </div>
  );
};

export default RGL;
