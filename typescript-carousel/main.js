'use strict';
/* eslint-disable no-useless-return */
const $image = document.querySelector('img');
const $nextButton = document.querySelector('#next-button');
const $backButton = document.querySelector('#back-button');
const $dotsRow = document.querySelector('.dots-row');
const dots = document.querySelectorAll('.fa-circle');
if (!$image) throw new Error('$image query failed');
if (!$nextButton) throw new Error('$newButton query failed');
if (!$backButton) throw new Error('$backButton query failed');
if (!$dotsRow) throw new Error('$dotsRow query failed');
let imageNumber = 0;
let intervalId;
const urls = [
  'images/001.png',
  'images/004.png',
  'images/007.png',
  'images/025.png',
  'images/039.png',
];
document.addEventListener('DOMContentLoaded', () => {
  intervalId = startCarousel();
});
$nextButton.addEventListener('click', forwardOne);
$backButton.addEventListener('click', backwardOne);
$dotsRow.addEventListener('click', (event) => {
  const $eventTarget = event.target;
  if (!$eventTarget.matches('.fa-circle')) return;
  setByDot($eventTarget);
});
function startCarousel() {
  const id = setInterval(moveCarousel, 3000);
  if (typeof id === 'number') return id;
  else throw new Error('id is not a number');
}
function restartCarousel() {
  clearInterval(intervalId);
  intervalId = startCarousel();
}
function moveCarousel() {
  dots[imageNumber].className = 'fa-regular fa-circle';
  imageNumber++;
  if (imageNumber > urls.length - 1) imageNumber = 0;
  setCarousel();
}
function forwardOne() {
  moveCarousel();
  restartCarousel();
}
function backwardOne() {
  imageNumber--;
  if (imageNumber < 0) {
    imageNumber = 4;
  }
  setCarousel();
  restartCarousel();
}
function setCarousel() {
  if (!$image) throw new Error('$image is null');
  $image.setAttribute('src', urls[imageNumber]);
  dots.forEach(($dot, index) => {
    if (index === imageNumber) {
      $dot.className = 'fa-solid fa-circle';
    } else {
      $dot.className = 'fa-regular fa-circle';
    }
  });
}
function setByDot($dot) {
  const dotNumber = $dot.getAttribute('id');
  if (!dotNumber) throw new Error(`${$dot} doesn't have an id attribute`);
  imageNumber = +dotNumber;
  setCarousel();
  restartCarousel();
}
