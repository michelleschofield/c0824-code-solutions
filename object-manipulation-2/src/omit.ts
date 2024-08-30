/* exported omit */
function omit(
  source: Record<string, unknown>,
  keys: string[]
): Record<string, unknown> {
  const newObj: Record<string, unknown> = {};
  for (const prop in source) {
    if (!keys.includes(prop)) {
      newObj[prop] = source[prop];
    }
  }
  return newObj;
}
