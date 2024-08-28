/* exported getPropertyValue */
function getPropertyValue(
  object: Record<string, unknown>,
  key: string
): unknown {
  return object[key];
}
