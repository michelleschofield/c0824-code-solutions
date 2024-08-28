'use strict';
function convertMinutesToSeconds(minutes) {
  return minutes * 60;
}
console.log('convertMinutesToSeconds(12):', convertMinutesToSeconds(12));
function greet(name) {
  return `Good morning ${name}!`;
}
console.log('greet("Shawn"):', greet('Shawn'));
const getArea = (width, height) => width * height;
console.log('getArea(12, 4):', getArea(12, 4));
const getFirstName = (person) => person.firstName;
console.log(
  'getFirstName({firstName: "John", lastName: "Smith}):',
  getFirstName({ firstName: 'John', lastName: 'Smith' })
);
const getLastElement = (array) => array[array.length - 1];
console.log('getLastElement([1, 2, 3, 4]):', getLastElement([1, 2, 3, 4]));
function callOtherFunction(otherFunction, params) {
  return otherFunction(params);
}
console.log(
  'callOtherFunction(convertMinutesToSeconds, 4):',
  callOtherFunction(convertMinutesToSeconds, 4)
);
