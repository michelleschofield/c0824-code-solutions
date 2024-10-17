import { FormEvent } from 'react';

export function RegistrationFormUncontrolled() {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const strangeFormData = new FormData(form);
    const { username, password } = Object.fromEntries(strangeFormData);
    console.log(`{ ${username}, ${password} }`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input name="username" />
      </label>
      <label>
        Password:
        <input name="password" />
      </label>
      <button>Submit</button>
    </form>
  );
}
