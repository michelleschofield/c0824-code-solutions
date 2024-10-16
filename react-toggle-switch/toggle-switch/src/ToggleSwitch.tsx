import { useState } from 'react';

export function ToggleSwitch() {
  const [active, setActive] = useState(false);

  function handleClick() {
    setActive(!active);
  }

  return (
    <div className="switch-container">
      <div onClick={handleClick} className={`switch ${active ? 'on' : 'off'}`}>
        <div className="circle"></div>
      </div>
      <p>{active ? 'on' : 'off'}</p>
    </div>
  );
}
