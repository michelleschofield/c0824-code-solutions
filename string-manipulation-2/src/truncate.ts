/* exported truncate */
function truncate(length: number, string: string): string {
  return string.slice(0, length) + '...';
}
