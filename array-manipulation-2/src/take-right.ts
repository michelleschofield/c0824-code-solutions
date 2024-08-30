/* exported takeRight */
function takeRight(array: unknown[], count: number): unknown[] {
  if (count >= array.length) {
    return array;
  }
  const newArray = [];
  for (let i = array.length - count; i < array.length; i++) {
    newArray.push(array[i]);
  }
  return newArray;
}
