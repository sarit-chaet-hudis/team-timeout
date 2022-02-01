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
        <Route path="/create" element={<CreateGame />} />
        <Route path="/highscores" element={<HighScores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
