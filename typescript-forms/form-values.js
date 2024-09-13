'use strict';
const $contactForm = document.querySelector('#contact-form');
if (!$contactForm) throw new Error('$contactForm query failed');
$contactForm.addEventListener('submit', handleSubmit);
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
