/* exported pick */
function pick(
  source: Record<string, unknown>,
  keys: string[]
): Record<string, unknown> {
  const newObj: Record<string, unknown> = {};
  for (let i = 0; i < keys.length; i++) {
    if (source[keys[i]] !== undefined) {
      newObj[keys[i]] = source[keys[i]];
    }
  }
  return newObj;
}
