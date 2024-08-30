/* exported invert */
function invert(source: any): any {
  const newObj: any = {};
  for (const key in source) {
    newObj[source[key]] = key;
  }
  return newObj;
}
