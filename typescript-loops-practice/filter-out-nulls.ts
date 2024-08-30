/* exported filterOutNulls */
function filterOutNulls(values: unknown[]): unknown[] {
  const withoutNulls = [];
  for (let i = 0; i < values.length; i++) {
    if (values[i]) {
      withoutNulls.push(values[i]);
    }
  }
  return withoutNulls;
}
