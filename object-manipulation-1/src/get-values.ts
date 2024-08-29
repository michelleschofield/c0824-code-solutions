/* exported getValues */
function getValues(obj: Record<string, unknown>): string[] {
  const keys = [];
  for (const key in obj) {
    keys.push(obj[key]);
  }
  return keys;
}
