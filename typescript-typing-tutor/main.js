'use strict';
const $letters = document.querySelectorAll('.letter');
const $accuracy = document.querySelector('.accuracy');
let currentLetterIndex = 0;
let missedLetters = 0;
if (!$letters) throw new Error('$letters query failed');
if (!$accuracy) throw new Error('$accuracy query failed');
function handleKeyDown(event) {
  const $currentLetter = $letters[currentLetterIndex];
  if (
    event.key === $currentLetter.textContent ||
    ($currentLetter.textContent === '_' && event.key === ' ')
  ) {
    $currentLetter.className += ' completedLetter';
    currentLetterIndex++;
    const $nextLetter = $letters[currentLetterIndex];
    if ($nextLetter) {
      $nextLetter.className += ' currentLetter';
    } else {
      calculateAccuracy();
    }
  } else {
    $currentLetter.className += ' missedLetter';
    missedLetters++;
  }
}
function calculateAccuracy() {
  if (!$accuracy) throw new Error('$accuracy query failed');
  const accuracy = (($letters.length - missedLetters) / $letters.length) * 100;
  $accuracy.textContent = `Accuracy: ${accuracy}%`;
}
document.addEventListener('keydown', handleKeyDown);
