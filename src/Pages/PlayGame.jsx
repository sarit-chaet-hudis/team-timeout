import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GameBoard from "../Components/GameBoard";
import Timer from "../Components/Timer";
import Score from "../Components/Score";

function PlayGame({ blocks }) {
  const [currScore, setCurrScore] = useState(0);
  const [matchStreak, setMatchStreak] = useState(0);

  // useEffect(() => {
  //   if (matchStreak > 3) {
  //     if (matchStreak > 8) {
  //       console.log("YOU ARE ON A ROLL!!!");
  //     } else {
  //       console.log("Sweet!");
  //     }
  //   }
  // }, [matchStreak]);

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
      <GameBoard gotMatch={gotMatch} blocks={blocks} />
      <Score saveScore={saveScore} currScore={currScore} />
      <Timer stopGame={stopGame} />
      <button>New Game</button>
      <Link to="/create">temp!!! to create</Link>
      {/* TODO remove link after finish develop */}
    </div>
  );
}

export default PlayGame;
