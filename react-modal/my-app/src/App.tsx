import { useState } from 'react';
import './App.css';
import { Modal } from './Modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function handleDelete(): void {
    alert('you deleted');
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Delete Me!</button>
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
        <p>Do you want to delete?</p>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
        <button onClick={handleDelete} className="text-red">
          Delete
        </button>
      </Modal>
    </>
  );
}

export default App;
