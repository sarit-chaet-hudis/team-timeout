import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateGame from "./Pages/CreateGame";
import PlayGame from "./Pages/PlayGame";
import "./App.css";

function App() {
  const [blocks, setBlocks] = useState([
    { index: 0, title: "", emoji: "☕" },
    { index: 1, title: "", emoji: "☕" },
    { index: 2, title: "", emoji: "☕" },
    { index: 3, title: "", emoji: "☕" },
    { index: 4, title: "", emoji: "☕" },
    { index: 5, title: "", emoji: "☕" },
  ]);

  const updateBlocks = (newBlocks) => {
    setBlocks(newBlocks);
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
