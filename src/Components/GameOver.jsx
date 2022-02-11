import styled from "styled-components";
import { useState } from "react";

const GameOver = ({ currScore, saveToHighScores, newGame, goToHighScores }) => {
  const [playerName, setPlayerName] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const onNameSave = async () => {
    setUserMessage("Saving..");
    await saveToHighScores(playerName);
    goToHighScores();
  };

  return (
    <Wrapper>
      <h1>Game Over</h1>
      You got {currScore.toLocaleString()} points!
      <div>Type your name to get into the highscores list:</div>
      <input
        type="text"
        placeholder="Your name here"
        onChange={(e) => setPlayerName(e.target.value)}
        value={playerName}
        maxLength="20"
      ></input>
      <button className="shiny" onClick={() => onNameSave(playerName)}>
        Save Name
      </button>
      <p>{userMessage}</p>
      <button onClick={() => goToHighScores()}>See High Scores</button>
      <button onClick={() => newGame()}>New Game</button>
    </Wrapper>
  );
};

export default GameOver;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  line-height: 2;

  a,
  a:visited {
    color: white;
  }
`;
