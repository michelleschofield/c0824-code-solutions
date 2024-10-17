import { useState } from 'react';

export function ValidatedInput() {
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const checkMark = <i>&#9989;</i>;
  const xMark = <i>&#10060;</i>;

  const capitalLetterChecker = /([A-Z])/g;
  const digitChecker = /\d/g;
  const specialCharacterChecker = /[\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)]/g;

  let isValid = false;
  let message = '';

  if (password.length === 0) {
    message += ' You must enter a password.';
  } else if (password.length < 8) {
    message += ' Your password is too short.';
  } else if (!password.match(capitalLetterChecker)) {
    message += ' Your password must contain a capital letter.';
  } else if (!password.match(digitChecker)) {
    message += ' Your password must contain a numerical digit.';
  } else if (!password.match(specialCharacterChecker)) {
    message += ' Your password must conation a special character (!@#$%^&*())';
  } else if (message.length === 0) {
    isValid = true;
  }

  let isVerified = false;
  let verificationMessage = '';

  if (!isValid) {
    verificationMessage = 'Create a valid password first';
  } else if (confirmedPassword !== password) {
    isVerified = false;
    verificationMessage = 'Passwords do not match';
  } else {
    isVerified = true;
  }

  return (
    <>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isValid ? checkMark : xMark}
        {message ? <p>{message}</p> : <></>}
      </div>
      <div>
        <label>Verify your password:</label>
        <input
          type="password"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
        {isVerified ? checkMark : xMark}
        {verificationMessage ? <p>{verificationMessage}</p> : <></>}
      </div>
    </>
  );
}
