interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  message: HTMLTextAreaElement;
}

const $contactForm = document.querySelector('#contact-form') as HTMLFormElement;

if (!$contactForm) throw new Error('$contactForm query failed');

$contactForm.addEventListener('submit', handleSubmit);

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
