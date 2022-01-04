import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import GameBoard from "../Components/GameBoard";
import Timer from "../Components/Timer";
import Score from "../Components/Score";

function PlayGame() {
  const [currScore, setCurrScore] = useState(0); // eslint-disable-line
  const [matchStreak, setMatchStreak] = useState(0); // eslint-disable-line
  const [teamSettings, setTeamSettings] = useState({}); // eslint-disable-line
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [gameStopped, setGameStopped] = useState(false);
  const { teamUid } = useParams();

  // useEffect(() => {
  //   if (matchStreak > 3) {
  //     if (matchStreak > 8) {
  //       console.log("YOU ARE ON A ROLL!!!");
  //     } else {
  //       console.log("Sweet!");
  //     }
  //   }
  // }, [matchStreak]);

  useEffect(() => {
    getTeamSettings();
  }, []); // eslint-disable-line

  const getTeamSettings = async () => {
    // Check for team settings on local storage, if not- get them from API
    // TODO show loader

    const data = localStorage.getItem(teamUid);
    if (data) {
      parseFromLocalStorageToState(data, teamUid);
    } else {
      try {
        console.log("trying to get from api with Uid ", teamUid);
        const teamData = await axios.get(
          "https://61d2d7dcb4c10c001712b604.mockapi.io/teams/teams/",
          {
            params: {
              teamUid: teamUid,
            },
          }
        );

        // save to local storage team settings @ teamUid
        // setTeamSettings(teamData) from local storage
        console.log(teamData.data[0]);

        const teamSettingsFromApi = {
          teamName: teamData.data[0].teamName,
          blocks: teamData.data[0].blocks,
          highscores: teamData.data[0].highscores,
        };

        localStorage.setItem(teamUid, JSON.stringify(teamSettingsFromApi));
        setTeamSettings(teamSettingsFromApi);
      } catch (err) {
        console.log(`sorry, can't get team data. ${err}`);
      }
    }
    if (teamSettings !== {}) {
      setFinishedLoading(true);
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

  const gotMatch = (matchLength) => {
    setMatchStreak((prevStreak) => prevStreak + 1);
    //console.log(matchStreak);
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

  const saveScore = (scoreOnGameStop) => {
    console.log(`you got ${scoreOnGameStop} points.`);
  };

  const stopGame = () => {
    console.log("game stopped");
    setGameStopped(true);
    console.log(gameStopped);
  };

  const newGame = () => {
    setGameStopped(false);
    setCurrScore(0);
  };

  const renderShowScore = () => {
    console.log("in renderShowScore");
    return (
      <ShowScore>
        <h1>Game Over</h1>
        You got {currScore} points!
        <Link to="/HighScores">See High Scores</Link>
      </ShowScore>
    );
  };

  return (
    <Wrapper>
      {finishedLoading ? (
        <GameBoard blocks={teamSettings.blocks} gotMatch={gotMatch} />
      ) : (
        <div>Loading...</div>
      )}
      {gameStopped ? renderShowScore() : null}
      <Controls>
        <Score saveScore={saveScore} currScore={currScore} />
        <Timer stopGame={stopGame} />
        <button onClick={() => newGame()}>New Game</button>
      </Controls>
    </Wrapper>
  );
}

export default PlayGame;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Controls = styled.div`
  height: 50vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  justify-content: space-around;
`;

const ShowScore = styled.div`
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

  a,
  a:visited {
    color: white;
  }
`;
