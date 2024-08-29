/* exported addSuffixToAll */
function addSuffixToAll(words: string[], suffix: string): string[] {
  for (let i = 0; i < words.length; i++) {
    words[i] += suffix;
  }
  return words;
}
