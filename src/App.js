import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateGame from "./Pages/CreateGame";
import PlayGame from "./Pages/PlayGame";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayGame />} />
        <Route path="/create" element={<CreateGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
