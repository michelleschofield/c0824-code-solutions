'use strict';
/* exported dropRight */
function dropRight(array, count) {
  const newArray = [];
  for (let i = 0; i < array.length - count; i++) {
    newArray.push(array[i]);
  }
  return newArray;
}
