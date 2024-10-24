import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Popup } from './Popup';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {}, [buttonRef]);

  return (
    <>
      <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        Pop up!
      </button>
      <Popup
        onClose={() => setIsOpen(false)}
        positionTo={buttonRef.current}
        isOpen={isOpen}>
        <div>Open!</div>
      </Popup>
      <p>aowireughnaowrigfna[wbegiru</p>
    </>
  );
}

export default App;
