import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {} from "react-router-dom";
import axios from "axios";
import produce from "immer";
import styled from "styled-components";
import GameBoardTest2 from "../Components/GameBoardTest2";
import Counter from "../Components/Counter";
import GameOver from "../Components/GameOver";
import back1 from "../Assets/images/WallpaperDog-16992541.jpg";

const gameDuration = 30;

function PlayGame() {
  const [currScore, setCurrScore] = useState(0);
  // const [matchStreak, setMatchStreak] = useState(0);
  const [teamSettings, setTeamSettings] = useState({});
  const [time, setTime] = useState(gameDuration);
  const [finishedLoading, setFinishedLoading] = useState(false);

  const { teamUid } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    getTeamSettings();
  }, []); // eslint-disable-line

  const getTeamSettings = async () => {
    const data = localStorage.getItem(teamUid);
    if (data) {
      parseFromLocalStorageToState(data, teamUid);
    } else {
      await getTeamSettingsFromApi();
    }
    if (teamSettings !== {}) {
      setFinishedLoading(true);
    }
  };

  const getTeamSettingsFromApi = async () => {
    try {
      const teamData = await axios.get(
        `https://team-timeout-server.herokuapp.com/api/get/${teamUid}`
      );

      const teamSettingsFromApi = {
        teamName: teamData.data.teamName,
        blocks: teamData.data.blocks,
        highscores: teamData.data.highscores,
      };

      localStorage.setItem(teamUid, JSON.stringify(teamSettingsFromApi));
      setTeamSettings(teamSettingsFromApi);
    } catch (err) {
      console.log(`sorry, can't get team data. ${err}`);
    }
  };

  const parseFromLocalStorageToState = (data, teamUid) => {
    try {
      const parsedData = JSON.parse(data);
      setTeamSettings(parsedData);
    } catch (err) {
      console.log(err);
      console.log("Invalid Data: " + data);
      localStorage.removeItem(teamUid);
    }
  };

  // Timer functionality
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
        if (time === 1) {
          clearInterval(timerInterval);
        }
      }
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  });

  const gotMatch = (matchLength) => {
    // setMatchStreak((prevStreak) => prevStreak + 1);

    switch (matchLength) {
      case 3:
        setCurrScore((currScore) => currScore + 10);
        break;
      case 4:
        setCurrScore((currScore) => currScore + 40);
        break;
      case 5:
        setCurrScore((currScore) => currScore + 200);

        break;
      default:
        break;
    }
  };

  const newGame = () => {
    setTime(gameDuration);
    setCurrScore(0);
    // TODO shuffle blocks in GameBoard
  };

  const saveToHighScores = async (playerName) => {
    const newScore = { playerName: playerName, score: currScore };

    try {
      const updatedHighscores = await axios.put(
        `https://team-timeout-server.herokuapp.com/api/update/${teamUid}`,
        newScore
      );
      console.log("~ updatedHighscores", updatedHighscores.data);
      const newTeamSettings = produce(teamSettings, (draft) => {
        draft.highscores = updatedHighscores.data;
      });
      setTeamSettings(newTeamSettings);
    } catch (err) {
      console.log(`sorry, failed to save highscore data. ${err}`);
    }
  };

  const goToHighScores = () => {
    navigate(`../highscores/${teamUid}`, {
      replace: true,
    });
  };

  const renderShowScore = () => {
    return (
      <GameOver
        currScore={currScore}
        teamSettings={teamSettings}
        saveToHighScores={saveToHighScores}
        goToHighScores={goToHighScores}
        newGame={newGame}
        teamUid={teamUid}
      ></GameOver>
    );
  };

  return (
    <Wrapper>
      {finishedLoading ? (
        <GameBoardTest2 blocks={teamSettings.blocks} gotMatch={gotMatch} />
      ) : (
        <div>Loading...</div>
      )}
      {time === 0 ? renderShowScore() : null}
      <Controls>
        <h1>{teamSettings.teamName}</h1>
        <Counter currCount={currScore} counterName="Score:" />
        <Counter currCount={time} counterName="Time:" />

        <button onClick={() => newGame()}>New Game</button>
      </Controls>
    </Wrapper>
  );
}

export default PlayGame;

const Wrapper = styled.div`
  background: url(${back1}) no-repeat;
  background-size: cover;
  background-attachment: fixed;
  padding: 0 30px;
  display: flex;
  align-items: center;
  height: 100vh;
  & h1 {
    color: white;
    text-shadow: 2px 2px 5px #333;
  }
`;

const Controls = styled.div`
  height: 50vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  justify-content: space-around;
  text-align: center;
`;
