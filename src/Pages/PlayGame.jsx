import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import GameBoard from "../Components/GameBoard";
import Counter from "../Components/Counter";
import GameOver from "../Components/GameOver";
import back1 from "../Assets/images/WallpaperDog-16992541.jpg";

const gameDuration = 10;

function PlayGame() {
  const [currScore, setCurrScore] = useState(0);
  // const [matchStreak, setMatchStreak] = useState(0);
  const [teamSettings, setTeamSettings] = useState({});
  const [time, setTime] = useState(gameDuration);
  const [finishedLoading, setFinishedLoading] = useState(false);

  const { teamUid } = useParams();

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
        "https://61d2d7dcb4c10c001712b604.mockapi.io/teams/teams/",
        {
          params: {
            teamUid: teamUid,
          },
        }
      );
      console.log("highscores after getfromAPI", teamData.highscores);

      // save to local storage team settings @ teamUid
      // setTeamSettings(teamData) from local storage

      const teamSettingsFromApi = {
        teamName: teamData.data[0].teamName,
        blocks: teamData.data[0].blocks,
        highscores: teamData.data[0].highscores,
        ApiId: teamData.data[0].id,
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
    await getTeamSettingsFromApi();

    // TODO keep only one highscore per playerName

    const newHighscoreList = teamSettings.highscores.slice();

    newHighscoreList.push({ playerName: playerName, score: currScore });
    newHighscoreList.sort((a, b) => b.score - a.score);

    const newTeamSettings = Object.assign({}, teamSettings);
    newTeamSettings.highscores = newHighscoreList;

    setTeamSettings(newTeamSettings);
    try {
      await axios.put(
        `https://61d2d7dcb4c10c001712b604.mockapi.io/teams/teams/${teamSettings.ApiId}`,
        newTeamSettings
      );
    } catch (err) {
      console.log("sorry, failed to save highscore data.", err);
    }
  };

  const renderShowScore = () => {
    return (
      <GameOver
        currScore={currScore}
        teamSettings={teamSettings}
        saveToHighScores={saveToHighScores}
        newGame={newGame}
        teamUid={teamUid}
      ></GameOver>
    );
  };

  return (
    <Wrapper>
      {finishedLoading ? (
        <GameBoard blocks={teamSettings.blocks} gotMatch={gotMatch} />
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
