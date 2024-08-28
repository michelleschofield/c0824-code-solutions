// Math Object stuff
const heroes = ['Spiderman', 'Batman', 'Superman', 'Doctor Strange'];
let randomNumber = Math.random();
randomNumber *= heroes.length;
const randomIndex = Math.floor(randomNumber);

console.log('randomIndex:', randomIndex);

const randomHero = heroes[randomIndex];

console.log('randomHero:', randomHero);

// Array Method stuff
const library = [
  {
    title: 'Way of Kings',
    author: 'Brandon Sanderson',
  },
  {
    title: "Man's Search for Meaning",
    author: 'Viktor E. Frankl',
  },
  {
    title: 'Extreme Ownership',
    author: 'Jocko Willink',
  },
];

const lastBook = library.pop();
console.log('lastBook:', lastBook);

const firstBook = library.shift();
console.log('firstBook:', firstBook);

const js = {
  title: 'JavaScript for Impatient Programmers',
  author: 'Dr. Axel Rauschmayer',
};
const css = {
  title: 'CSS Secrets',
  author: 'Lea Verou',
};

library.push(js);
library.unshift(css);
library.splice(1, 1);

console.log('library:', library);

// String method stuff
const fullName = 'Rachel North';
const firstAndLastName = fullName.split(' ');

console.log('firstAndLastName:', firstAndLastName);

const firstName = firstAndLastName[0];
const sayMyName = firstName.toUpperCase();

console.log('sayMyName:', sayMyName);

// Object method stuff
const employee = {
  name: 'Vivian',
  age: 17,
  position: 'cashier',
};

const employeeKeys = Object.keys(employee);
console.log('employeeKeys:', employeeKeys);

const employeeValues = Object.values(employee);
console.log('employeeValues:', employeeValues);

const employeePairs = Object.entries(employee);
console.log('employeePairs:', employeePairs);
