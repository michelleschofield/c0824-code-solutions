/* exported swapChars */
function swapChars(
  firstIndex: number,
  secondIndex: number,
  string: string
): string {
  const firstPart = string.slice(0, firstIndex);
  const middlePart = string.slice(firstIndex + 1, secondIndex);
  const lastPart = string.slice(secondIndex + 1);
  return (
    firstPart + string[secondIndex] + middlePart + string[firstIndex] + lastPart
  );
}