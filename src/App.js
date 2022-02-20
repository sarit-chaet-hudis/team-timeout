import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateGame from "./Pages/CreateGame";
import PlayGame from "./Pages/PlayGame";
import HighScores from "./Pages/HighScores";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/play/:teamUid" element={<PlayGame />} />
        <Route path="/highscores/:teamUid" element={<HighScores />} />
        <Route path="/" element={<CreateGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
