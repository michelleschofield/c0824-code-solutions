'use strict';
/* exported lastChars */
function lastChars(length, string) {
  if (length > string.length) {
    return string;
  }
  return string.slice(string.length - length);
}
