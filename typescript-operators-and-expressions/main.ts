const width: number = 12;
const height: number = 32;
const area: number = width * height;
console.log('area:', area);
console.log('Type of area:', typeof area);

const bill: number = 27;
const payment: number = 30;
const change: number = payment - bill;
console.log('change:', change);
console.log('Type of change:', typeof change);

const quizzes: number = 76;
const midterm: number = 67;
const final: number = 58;
const grade: number = (quizzes + midterm + final) / 3;
console.log('grade:', grade);
console.log('Type of grade:', typeof grade);

const firstName: string = 'Ebenezer';
const lastName: string = 'Scrooge';
const fullName: string = firstName + ' ' + lastName;
console.log('fullName:', fullName);
console.log('Type of fullName:', typeof fullName);

const pH: number = 9;
const isAcidic: boolean = pH < 7;
console.log('isAcidic:', isAcidic);
console.log('Type of isAcidic:', typeof isAcidic);

const headCount: number = 200;
const isSparta: boolean = headCount === 300;
console.log('isSparta:', isSparta);
console.log('Type of isSparta:', typeof isSparta);

let motto: string = fullName;
motto += ' is a humbug!';
console.log('motto:', motto);
console.log('Type of motto:', typeof motto);
