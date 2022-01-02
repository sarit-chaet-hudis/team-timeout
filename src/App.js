import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateGame from "./Pages/CreateGame";
import PlayGame from "./Pages/PlayGame";
import "./App.css";

function App() {
  const [blocks, setBlocks] = useState([
    { index: 0, color: "#FF1780", title: "", emoji: "☕" },
    { index: 1, color: "#5C8AFF", title: "", emoji: "☕" },
    { index: 2, color: "#FFC922", title: "", emoji: "☕" },
    { index: 3, color: "#71C757", title: "", emoji: "☕" },
    { index: 4, color: "#A757EF", title: "", emoji: "☕" },
    { index: 5, color: "#FC7536", title: "", emoji: "☕" },
  ]);

  const updateBlocks = (newBlocksArray) => {
    setBlocks(newBlocksArray);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayGame blocks={blocks} />} />
        <Route
          path="/create"
          element={<CreateGame blocks={blocks} updateBlocks={updateBlocks} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
