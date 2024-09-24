'use strict';
const $heading = document.querySelector('.message');
if (!$heading) throw new Error('$heading query failed');
setTimeout(changeHeading, 2000);
function changeHeading() {
  if (!$heading) throw new Error('$heading query failed');
  $heading.textContent = 'Hello There';
}
