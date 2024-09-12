const $openModal = document.querySelector('.open-modal');
const $dismissModal = document.querySelector('.dismiss-modal');
const $dialog = document.querySelector('dialog') as HTMLDialogElement;

if (!$openModal) throw new Error('$openModal query failed');
if (!$dismissModal) throw new Error('$dismissModal query failed');
if (!$dialog) throw new Error('$dialog query failed');

$openModal.addEventListener('click', () => {
  $dialog.showModal();
});

$dismissModal.addEventListener('click', () => {
  $dialog.close();
});

console.log('Oops');
