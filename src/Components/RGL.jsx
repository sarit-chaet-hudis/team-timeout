import "../../node_modules/react-grid-layout/css/styles.css";

import GridLayout from "react-grid-layout";

import "./RGL.css";
import toPX from "to-px";
import { useState } from "react";

const vmin = toPX("vmin");

const RGL = () => {
  //const [blockBeingDragged, setBlockBeingDragged] = useState(null);
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
    return res;
  };

  const [layout, setLayout] = useState([]);

  const fixLayout = (currentLayout) => {
    const maxY = 7;
    const maxRowXs = currentLayout
      .map((item) => (item.y === maxY ? item.x : null))
      .filter((value) => value !== null);
    const xs = [0, 1, 2, 3, 4, 5, 6, 7];
    const missingX = xs.find((value) =>
      maxRowXs.every((maxRowX) => maxRowX !== value)
    );
    const fixedLayout = currentLayout.map((item) => {
      if (item.y > maxY) {
        return {
          ...item,
          y: maxY,
          x: missingX,
        };
      }
      return item;
    });
    console.log("fixed layout", fixedLayout);
    setLayout(fixedLayout);
  };

  const dragStart = (e, element) => {
    //console.log("start drag", element);
    //setBlockBeingDragged(e.target);
    //console.log(blockBeingDragged);
  };

  const dragStop = (layout, oldItem, newItem, placeholder, e, element) => {
    if (newItem.x > 4) {
      console.log("newItem.x > 4");
    }
  };

  return (
    <div style={{ width: "90vmin" }}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={8}
        rowHeight={(90 * vmin) / 8}
        width={90 * vmin}
        onLayoutChange={fixLayout}
        isBounded={true}
        onDragStart={dragStart}
        onDragStop={dragStop}
        compactType="vertical"
        maxRows={8}
      >
        {arrayGridDivs().map((div) => div)}
      </GridLayout>
    </div>
  );
};

export default RGL;
