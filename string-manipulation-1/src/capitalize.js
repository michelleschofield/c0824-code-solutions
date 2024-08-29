'use strict';
/* exported capitalize */
function capitalize(string) {
  const firstChar = string[0].toUpperCase();
  const restOfWord = string.slice(1).toLowerCase();
  return firstChar + restOfWord;
}
