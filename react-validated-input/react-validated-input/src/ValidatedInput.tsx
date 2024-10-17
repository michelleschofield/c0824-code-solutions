import { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

export function ValidatedInput() {
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  function validatePassword(password: string): string {
    if (password.length === 0) return 'You must enter a password.';
    if (password.length < 8) return 'Your password is too short.';
    if (!password.match(/([A-Z])/g))
      return 'Your password must contain a capital letter.';
    if (!password.match(/\d/g))
      return 'Your password must contain a numerical digit.';
    if (!password.match(/[\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)]/g))
      return 'Your password must conation a special character (!@#$%^&*())';
    return '';
  }

  function confirmPassword(password: string, confirmation: string) {
    return confirmation === password ? '' : 'Passwords do not match';
  }

  const message = validatePassword(password);
  const isValid = !message;

  const confirmationMessage = isValid
    ? confirmPassword(password, confirmedPassword)
    : 'Create a valid password first';
  const isConfirmed = !confirmationMessage;

  return (
    <>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isValid ? <FaCheck color="green" /> : <FaTimes color="red" />}
          {message && <p>{message}</p>}
        </label>
      </div>
      <div>
        <label>
          Verify your password:
          <input
            type="password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
          {isConfirmed ? <FaCheck color="green" /> : <FaTimes color="red" />}
          {confirmationMessage && <p>{confirmationMessage}</p>}
        </label>
      </div>
    </>
  );
}
