const $userNameInput = document.querySelector('#user-name') as HTMLInputElement;
const $userEmailInput = document.querySelector(
  '#user-email'
) as HTMLInputElement;
const $userMessageInput = document.querySelector(
  '#user-message'
) as HTMLInputElement;

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

function handleFocus(event: Event): void {
  console.log('focus event fired');
  const $eventTarget = event.target as HTMLInputElement | HTMLTextAreaElement;
  console.log('$eventTarget.name:', $eventTarget.name);
}

function handleBlur(event: Event): void {
  console.log('blur event fired');
  const $eventTarget = event.target as HTMLInputElement | HTMLTextAreaElement;
  console.log('$eventTarget.name:', $eventTarget.name);
}

function handleInput(event: Event): void {
  const $eventTarget = event.target as HTMLInputElement | HTMLTextAreaElement;
  console.log('$eventTarget.name:', $eventTarget.name);
  console.log('$eventTarget.value', $eventTarget.value);
}
