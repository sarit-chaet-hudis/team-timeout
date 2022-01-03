import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import GameBoard from "../Components/GameBoard";
import Timer from "../Components/Timer";
import Score from "../Components/Score";

function PlayGame({ blocks }) {
  const [currScore, setCurrScore] = useState(0); // eslint-disable-line
  const [matchStreak, setMatchStreak] = useState(0); // eslint-disable-line
  const [teamSettings, setTeamSettings] = useState({}); // eslint-disable-line
  const [finishedLoading, setFinishedLoading] = useState(false);
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
    // TODO if match was user generated, initialize streak count
    switch (matchLength) {
      case 3:
        setCurrScore((currScore) => currScore + 10);
        break;
      case 4:
        setCurrScore((currScore) => currScore + 40);
        break;
      case 5:
        setCurrScore((currScore) => currScore + 100);
        break;
      default:
        break;
    }
  };

  const saveScore = (scoreOnGameStop) => {
    console.log(`you got ${scoreOnGameStop} points.`);
  };

  const stopGame = () => {
    console.log("GAME WAS STOPPED");
  };

  return (
    <div className="GamePage">
      {finishedLoading ? (
        <GameBoard blocks={teamSettings.blocks} gotMatch={gotMatch} />
      ) : (
        <div>Loading...</div>
      )}

      <Score saveScore={saveScore} currScore={currScore} />
      <Timer stopGame={stopGame} />
      <button>New Game</button>
      <Link to="/create">temp!!! to create</Link>
      {/* TODO remove link after finish develop */}
    </div>
  );
}

export default PlayGame;
