/* exported lastChars */
function lastChars(length: number, string: string): string {
  if (length > string.length) {
    return string;
  }
  return string.slice(string.length - length);
}
