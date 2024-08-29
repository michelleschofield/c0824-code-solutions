'use strict';
/* exported filterOutNulls */
function filterOutNulls(values) {
  const withoutNulls = [];
  for (let i = 0; i < values.length; i++) {
    if (values[i]) {
      withoutNulls.push(values[i]);
    }
  }
  return withoutNulls;
}
