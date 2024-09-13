'use strict';
const $userNameInput = document.querySelector('#user-name');
const $userEmailInput = document.querySelector('#user-email');
const $userMessageInput = document.querySelector('#user-message');
const $contactForm = document.querySelector('#contact-form');
if (!$userNameInput) throw new Error('$userNameInput query failed');
if (!$userEmailInput) throw new Error('$userEmailInput query failed');
if (!$userMessageInput) throw new Error('$userMessageInput query failed');
if (!$contactForm) throw new Error('$contactForm query failed');
$userNameInput.addEventListener('focus', handleFocus);
$userNameInput.addEventListener('blur', handleBlur);
$userNameInput.addEventListener('input', handleInput);
$userEmailInput.addEventListener('focus', handleFocus);
$userEmailInput.addEventListener('blur', handleBlur);
$userEmailInput.addEventListener('input', handleInput);
$userMessageInput.addEventListener('focus', handleFocus);
$userMessageInput.addEventListener('blur', handleBlur);
$userMessageInput.addEventListener('input', handleInput);
$contactForm.addEventListener('submit', handleSubmit);
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
function handleSubmit(event) {
  event.preventDefault();
  if (!$contactForm) return;
  const $formElements = $contactForm.elements;
  const formValues = {
    name: $formElements.name.value,
    email: $formElements.email.value,
    message: $formElements.message.value,
  };
  console.log('formValues:', formValues);
  $contactForm.reset();
}
