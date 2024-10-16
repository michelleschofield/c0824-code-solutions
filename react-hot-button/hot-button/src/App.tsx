import { useState } from 'react';
import './App.css';

import { TempChangingButton } from './TempChangingButton';

export function App() {
  const [temp, setTemp] = useState(0);

  function handleIncreaseTemp() {
    setTemp(temp + 1);
  }

  function handleDecreaseTemp() {
    setTemp(temp - 1);
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

  const className = determineClass(temp);

  return (
    <>
      <TempChangingButton
        className={className}
        onChangeTemp={handleIncreaseTemp}
        label="Heat Up"
      />
      <TempChangingButton
        className={className}
        onChangeTemp={handleDecreaseTemp}
        label="Cool Down"
      />
    </>
  );
}
