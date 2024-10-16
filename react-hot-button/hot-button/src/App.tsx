import { useState } from 'react';
import './App.css';
import { HotButton } from './HotButton';
import { CoolButton } from './CoolButton';

export function App() {
  const [temp, setTemp] = useState(0);

  function handleIncreaseTemp() {
    setTemp(temp + 1);
  }

  function handleDecreaseTemp() {
    setTemp(temp - 1);
  }

  const className = determineClass(temp);

  return (
    <>
      <HotButton className={className} onIncreaseTemp={handleIncreaseTemp} />
      <CoolButton className={className} onDecreaseTemp={handleDecreaseTemp} />
    </>
  );
}

function determineClass(temp: number): string {
  if (temp < -9) return 'freezing';
  else if (temp < -6) return 'cold';
  else if (temp < -3) return 'cool';
  else if (temp < 3) return 'normal';
  else if (temp < 6) return 'warm';
  else if (temp < 9) return 'hot';
  else if (temp < 12) return 'really-hot';
  else return 'blazing';
}
