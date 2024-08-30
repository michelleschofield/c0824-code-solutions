/* exported includes */
function includes(array: unknown[], value: unknown): boolean {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return true;
    }
  }
  return false;
}
