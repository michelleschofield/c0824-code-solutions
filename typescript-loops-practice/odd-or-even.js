'use strict';
/* exported oddOrEven */
function oddOrEven(numbers) {
  const evenOrOdd = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2) {
      evenOrOdd.push('odd');
    } else {
      evenOrOdd.push('even');
    }
  }
  return evenOrOdd;
}
