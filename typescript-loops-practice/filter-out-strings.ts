/* exported filterOutStrings */
function filterOutStrings(values: unknown[]): unknown[] {
  const withoutStrings = [];
  for (let i = 0; i < values.length; i++) {
    if (typeof values[i] !== 'string') {
      withoutStrings.push(values[i]);
    }
  }
  return withoutStrings;
}
