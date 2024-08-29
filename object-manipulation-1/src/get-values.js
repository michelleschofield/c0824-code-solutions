'use strict';
/* exported getValues */
function getValues(obj) {
  const keys = [];
  for (const key in obj) {
    keys.push(obj[key]);
  }
  return keys;
}
