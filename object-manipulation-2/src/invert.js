'use strict';
/* exported invert */
function invert(source) {
  const newObj = {};
  for (const key in source) {
    newObj[source[key]] = key;
  }
  return newObj;
}
