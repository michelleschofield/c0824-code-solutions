'use strict';
const $userNameInput = document.querySelector('#user-name');
const $userEmailInput = document.querySelector('#user-email');
const $userMessageInput = document.querySelector('#user-message');
if (!$userNameInput) throw new Error('$userNameInput query failed');
if (!$userEmailInput) throw new Error('$userEmailInput query failed');
if (!$userMessageInput) throw new Error('$userMessageInput query failed');
$userNameInput.addEventListener('focus', handleFocus);
$userNameInput.addEventListener('blur', handleBlur);
$userNameInput.addEventListener('input', handleInput);
$userEmailInput.addEventListener('focus', handleFocus);
$userEmailInput.addEventListener('blur', handleBlur);
$userEmailInput.addEventListener('input', handleInput);
$userMessageInput.addEventListener('focus', handleFocus);
$userMessageInput.addEventListener('blur', handleBlur);
$userMessageInput.addEventListener('input', handleInput);
function handleFocus(event) {
  console.log('focus event fired');
  const $eventTarget = event.target;
  console.log('$eventTarget.name:', $eventTarget.name);
}
function handleBlur(event) {
  console.log('blur event fired');
  const $eventTarget = event.target;
  console.log('$eventTarget.name:', $eventTarget.name);
}
function handleInput(event) {
  const $eventTarget = event.target;
  console.log('$eventTarget.name:', $eventTarget.name);
  console.log('$eventTarget.value', $eventTarget.value);
}
