import { FormEvent, useState } from 'react';

type User = {
  username: string;
  password: string;
};

type Props = {
  user?: User;
};

export function UserForm({ user }: Props) {
  const [username, setUsername] = useState(user?.username ?? '');
  const [password, setPassword] = useState(user?.password ?? '');
  const isCreating = user === undefined;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    user = { username, password };
    console.log(isCreating ? `created user` : `updated user`, user);
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
