/* exported getIndexes */
function getIndexes(array: unknown[]): number[] {
  const indexes = [];
  for (let i = 0; i < array.length; i++) {
    indexes.push(i);
  }
  return indexes;
}
