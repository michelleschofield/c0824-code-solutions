'use strict';
const $image = document.querySelector('img');
const dots = document.querySelectorAll('.fa-circle');
if (!$image) throw new Error('$image query failed');
let imageNumber = 0;
const urls = [
  'images/001.png',
  'images/004.png',
  'images/007.png',
  'images/025.png',
  'images/039.png',
];
document.addEventListener('DOMContentLoaded', startCarousel);
function startCarousel() {
  setInterval(moveCarousel, 3000);
}
function moveCarousel() {
  if (!$image) throw new Error('$image is null');
  $image.setAttribute('src', urls[imageNumber]);
  dots[imageNumber].className = 'fa-regular fa-circle';
  imageNumber++;
  if (imageNumber > urls.length - 1) imageNumber = 0;
  dots[imageNumber].className = 'fa-solid fa-circle';
}
