'use strict';
const $lightBulb = document.querySelector('.light-bulb');
const $container = document.querySelector('.container');
const $moon = document.querySelector('.moon');
if (!$lightBulb) throw new Error('$lightBulb query failed');
if (!$container) throw new Error('$container query failed');
if (!$moon) throw new Error('$moon query failed');
let time = 'day';
function toggleDay() {
  time = time === 'day' ? 'night' : 'day';
  console.log('time:', time);
}
function updateStyles() {
  if (!$lightBulb || !$container || !$moon)
    throw new Error('$lightBulb or $container query failed');
  $lightBulb.className = `light-bulb ${time}`;
  $container.className = `container ${time}`;
  $moon.className = `moon ${time}`;
}
$lightBulb.addEventListener('click', () => {
  toggleDay();
  updateStyles();
});
