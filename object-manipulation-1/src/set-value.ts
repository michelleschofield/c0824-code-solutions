/* exported setValue */
function setValue(
  obj: Record<string, unknown>,
  key: string,
  value: unknown
): undefined {
  obj[key] = value;
}
