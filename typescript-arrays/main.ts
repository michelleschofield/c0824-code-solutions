const colors: string[] = ['red', 'white', 'blue'];

console.log('Value of colors[0]:', colors[0]);
console.log('Value of colors[1]:', colors[1]);
console.log('Value of colors[2]:', colors[2]);

console.log(`America is ${colors[0]}, ${colors[1]}, and ${colors[2]}`);

colors[2] = 'green';

console.log(`Mexico is ${colors[0]}, ${colors[1]}, and ${colors[2]}`);
console.log('Value of colors:', colors);
console.log('Type of colors:', typeof colors);

const students: string[] = ['Zoobia', 'Michelle', 'Tre', 'Lucas'];
const numberOfStudents: number = students.length;

console.log('Value of numberOfStudents:', numberOfStudents);

const lastIndex: number = numberOfStudents - 1;
const lastStudent: string = students[lastIndex];

console.log('Value of lastStudent:', lastStudent);
console.log('Type of students:', typeof students);
