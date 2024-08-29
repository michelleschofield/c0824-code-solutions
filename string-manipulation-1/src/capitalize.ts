/* exported capitalize */
function capitalize(string: string): string {
  const firstChar = string[0].toUpperCase();
  const restOfWord = string.slice(1).toLowerCase();
  return firstChar + restOfWord;
}
