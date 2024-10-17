import { FormEvent, useState } from 'react';

export function RegistrationFormControlled() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(`{ ${username}, ${password} }`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input onChange={(e) => setUsername(e.target.value)} value={username} />
      </label>
      <label>
        Password:
        <input onChange={(e) => setPassword(e.target.value)} value={password} />
      </label>
      <button>Submit</button>
    </form>
  );
}
