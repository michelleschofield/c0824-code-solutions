/* exported countdown */
function countdown(num: number): number[] {
  const numbers = [];
  for (let i = 0; i <= num; i++) {
    numbers.unshift(i);
  }
  return numbers;
}
