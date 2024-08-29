'use strict';
/* exported countdown */
function countdown(num) {
  const numbers = [];
  for (let i = 0; i <= num; i++) {
    numbers.unshift(i);
  }
  return numbers;
}
