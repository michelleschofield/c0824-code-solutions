'use strict';
/* exported chunk */
function chunk(array, size) {
  const primaryArray = [];
  for (let i = 0; i < array.length; i += size) {
    const subArray = [];
    for (let a = 0; a < size; a++) {
      if (i + a < array.length) {
        subArray.push(array[i + a]);
      }
    }
    primaryArray.push(subArray);
  }
  return primaryArray;
}
