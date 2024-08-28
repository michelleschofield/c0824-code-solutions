interface Person {
  firstName: string;
  lastName: string;
}

function convertMinutesToSeconds(minutes: number): number {
  return minutes * 60;
}
console.log('convertMinutesToSeconds(12):', convertMinutesToSeconds(12));

function greet(name: string): string {
  return `Good morning ${name}!`;
}
console.log('greet("Shawn"):', greet('Shawn'));

const getArea = (width: number, height: number): number => width * height;
console.log('getArea(12, 4):', getArea(12, 4));

const getFirstName = (person: Person): string => person.firstName;
console.log(
  'getFirstName({firstName: "John", lastName: "Smith}):',
  getFirstName({ firstName: 'John', lastName: 'Smith' })
);

const getLastElement = (array: unknown[]): unknown => array[array.length - 1];
console.log('getLastElement([1, 2, 3, 4]):', getLastElement([1, 2, 3, 4]));

function callOtherFunction(otherFunction: Function, params: unknown): any {
  return otherFunction(params);
}
console.log(
  'callOtherFunction(convertMinutesToSeconds, 4):',
  callOtherFunction(convertMinutesToSeconds, 4)
);
