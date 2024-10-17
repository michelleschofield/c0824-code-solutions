import { useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

export function StopWatch() {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [time, setTime] = useState(0);

  function incrementTime(): void {
    setTime((time) => time + 1);
  }

  function startTimer() {
    setIntervalId(setInterval(incrementTime, 1000));
  }

  function pauseTimer() {
    clearInterval(intervalId);
    setIntervalId(undefined);
  }

  function resetTimer() {
    if (!intervalId) {
      setTime(0);
    }
  }

  return (
    <>
      <div className="circle" onClick={resetTimer}>
        <h2>{time}</h2>
      </div>
      <button onClick={intervalId ? pauseTimer : startTimer}>
        {intervalId ? <FaPause /> : <FaPlay />}
      </button>
    </>
  );
}
