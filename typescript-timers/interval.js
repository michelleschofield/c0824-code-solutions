'use strict';
const $countdownDisplay = document.querySelector('.countdown-display');
if (!$countdownDisplay) throw new Error('$countdownDisplay query failed');
let countdown = 4;
const intervalId = setInterval(updateDisplay, 1000);
function updateDisplay() {
  if (!$countdownDisplay) throw new Error('$countdownDisplay query failed');
  countdown--;
  if (countdown < 1) {
    $countdownDisplay.textContent = '~Earth Beeeelooowww Us~';
    clearInterval(intervalId);
  } else {
    $countdownDisplay.textContent = `${countdown}`;
  }
}
