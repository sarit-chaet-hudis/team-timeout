import { useState, useEffect } from "react";

const Timer = ({ stopGame }) => {
  const [time, setTime] = useState(10); //TODO restart on "new Game"

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
        if (time === 1) {
          clearInterval(timerInterval);
          stopGame();
        }
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  });

  return <div className="Timer">{time}</div>;
};

export default Timer;
