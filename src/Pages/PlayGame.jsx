import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GameBoard from "../Components/GameBoard";
import Counter from "../Components/Counter";
import GameOver from "../Components/GameOver";
import { Wrapper, Controls } from "../Styles/PlayGameStyled.style";

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
    if (data.length > 0) {
      parseFromLocalStorageToState(data, teamUid);
    } else {
      await getTeamSettingsFromApi();
    }
    if (teamSettings !== {}) {
      setFinishedLoading(true);
    }
  };

  const getTeamSettingsFromApi = async () => {
    console.log("in get from api");
    console.log("~ teamUid", teamUid);

    // get team from api, set to local storage and setTeamSettings(teamData) from local storage
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
    //  { playerName: playerName, score: currScore }
    // setTeamSettings(newTeamSettings);
    // try {
    //   await axios.put(
    //     `https://61d2d7dcb4c10c001712b604.mockapi.io/teams/teams/${teamSettings.ApiId}`,
    //     newTeamSettings
    //   );
    // } catch (err) {
    //   console.log("sorry, failed to save highscore data.", err);
    // }
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
