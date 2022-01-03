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
  const [loading, setLoading] = useState(false);
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
    console.log(teamUid);
    getTeamSettings();
  }, []); // eslint-disable-line

  const getTeamSettings = async () => {
    // Check for team settings on local storage, if not- get them from API
    // TODO show loader
    setLoading(true);

    const data = localStorage.getItem(teamUid);
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        // setBlocks..
        //this.setState({ cards: parsedData });
      } catch (err) {
        console.log(err);
        console.log("Invalid Data: " + data);
        localStorage.removeItem(teamUid);
      }
    } else {
      try {
        console.log("trying to get from api with Uid ", teamUid);
        const teamData = await axios.get(
          "https://61d2d7dcb4c10c001712b604.mockapi.io/teams/",
          {
            params: {
              teamUid: teamUid,
            },
          }
        );
        // save to local storage team settings @ teamUid
        // setTeamSettings(teamData) from local storage
        console.log(teamData);
      } catch (err) {
        console.log(`sorry, can't get team data. ${err}`);
      }
    }

    setLoading(false);
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
      {loading ? <div>Loading...</div> : null}
      <GameBoard blocks={blocks} gotMatch={gotMatch} />
      <Score saveScore={saveScore} currScore={currScore} />
      <Timer stopGame={stopGame} />
      <button>New Game</button>
      <Link to="/create">temp!!! to create</Link>
      {/* TODO remove link after finish develop */}
    </div>
  );
}

export default PlayGame;
