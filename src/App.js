import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateGame from "./Pages/CreateGame";
import PlayGame from "./Pages/PlayGame";
import "./App.css";

function App() {
  const [blocks, setBlocks] = useState([
    { index: 0, color: "#FF1780", title: "meeting", emoji: "💬" },
    { index: 1, color: "#5C8AFF", title: "work", emoji: "🖥️" },
    { index: 2, color: "#FFC922", title: "break", emoji: "☕" },
    { index: 3, color: "#71C757", title: "inspection", emoji: "😱" },
    { index: 4, color: "#A757EF", title: "1 on 1", emoji: "👥" },
    { index: 5, color: "#FC7536", title: "lunch", emoji: "🍕" },
  ]);

  const updateBlocks = (newBlocksArray) => {
    setBlocks(newBlocksArray);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/play/:teamUid" element={<PlayGame />} />
        <Route
          path="/create"
          element={<CreateGame blocks={blocks} updateBlocks={updateBlocks} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
