interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  message: HTMLTextAreaElement;
}

const $userNameInput = document.querySelector('#user-name') as HTMLInputElement;
const $userEmailInput = document.querySelector(
  '#user-email'
) as HTMLInputElement;
const $userMessageInput = document.querySelector(
  '#user-message'
) as HTMLInputElement;
const $contactForm = document.querySelector('#contact-form') as HTMLFormElement;

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

function handleSubmit(event: Event): void {
  event.preventDefault();
  if (!$contactForm) return;
  const $formElements = $contactForm.elements as FormElements;
  const formValues = {
    name: $formElements.name.value,
    email: $formElements.email.value,
    message: $formElements.message.value,
  };
  console.log('formValues:', formValues);
  $contactForm.reset();
}
