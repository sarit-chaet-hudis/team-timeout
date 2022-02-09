import "../../node_modules/react-grid-layout/css/styles.css";

import GridLayout from "react-grid-layout";

import "./RGL.css";
import toPX from "to-px";
import { useState } from "react";

const vmin = toPX("vmin");

const RGL = () => {
  const [blockBeingDragged, setBlockBeingDragged] = useState(null);
  //const [blockBeingReplaced, setBlockBeingReplaced] = useState(null);

  const initLayout = [
    { i: "a", x: 0, y: 0, w: 1, h: 1, isResizable: false },
    { i: "b", x: 1, y: 0, w: 1, h: 1, isResizable: false },
    { i: "c", x: 2, y: 0, w: 1, h: 1, isResizable: false },
  ];
  const [layout, setLayout] = useState(initLayout);

  const saveLayout = (currentLayout) => {
    setLayout(currentLayout);
  };

  const dragStart = (e, element) => {
    console.log("start drag", element);
    setBlockBeingDragged(e.target);
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
        layout={layout}
        cols={8}
        rowHeight={(90 * vmin) / 8}
        width={90 * vmin}
        onLayoutChange={saveLayout}
        onDragStart={dragStart}
        onDragStop={dragStop}
      >
        <div key="a">a</div>
        <div key="b">b</div>
        <div key="c">c</div>
      </GridLayout>
    </div>
  );
};

export default RGL;
