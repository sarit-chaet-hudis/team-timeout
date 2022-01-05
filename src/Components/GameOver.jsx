import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const GameOver = ({ currScore, teamSettings, saveToHighScores, newGame }) => {
  const [playerName, setPlayerName] = useState("");
  return (
    <Wrapper>
      <h1>Game Over</h1>
      You got {currScore} points!
      {/* {teamSettings.highscores.length > 0 ? (
          <div>more than 10 high scores</div>
        ) : ( */}
      <>
        <div>
          You are in the top 10, type your name to get into the highscores list:
        </div>
        <input
          type="text"
          placeholder="Your name here"
          onChange={(e) => setPlayerName(e.target.value)}
          value={playerName}
        ></input>
        <button onClick={() => saveToHighScores(playerName)}>Save Name</button>
      </>
      {/* } */}
      <Link to="/highscores" state={{ teamSettings: teamSettings }}>
        See High Scores
      </Link>
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
