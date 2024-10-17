import { FormEvent } from 'react';

export function RegistrationFormUncontrolled() {
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const $eventTarget = event.currentTarget;
    console.log($eventTarget);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input />
      </label>
      <label>
        Password:
        <input />
      </label>
      <button>Submit</button>
    </form>
  );
}
