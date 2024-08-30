'use strict';
/* exported take */
function take(array, count) {
  const newArray = [];
  if (array.length) {
    for (let i = 0; i < count; i++) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}
