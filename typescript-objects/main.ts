interface StudentProps {
  firstName: string;
  lasName: string;
  age: number;
  livesInIrvine?: boolean;
  previousOccupation?: string;
}

interface Vehicle {
  make: string;
  model: string;
  year: number;
  color?: string;
  isConvertible?: boolean;
}

interface Pet {
  name?: string;
  kind?: string;
}

const student: StudentProps = {
  firstName: 'Michelle',
  lasName: 'Schofield',
  age: 18,
};

const fullName: string = `${student.firstName} ${student.lasName}`;

console.log('Value of fullName:', fullName);

student.livesInIrvine = true;
student.previousOccupation = 'Restaurant Worker';

console.log('Value of student.livesInIrvine:', student.livesInIrvine);
console.log('Value of student.previousOccupation:', student.previousOccupation);
console.log('Value of student:', student);
console.log('Type of student:', typeof student);

const vehicle: Vehicle = {
  make: 'Honda',
  model: 'Civic',
  year: 2003,
};

vehicle['color'] = 'gray';
vehicle['isConvertible'] = false;

console.log('Value of vehicle[color]:', vehicle['color']);
console.log('Value of vehicle[isConvertible]:', vehicle['isConvertible']);
console.log('Value of vehicle:', vehicle);
console.log('Type of vehicle:', typeof vehicle);

const pet: Pet = {
  name: 'Fluffy',
  kind: 'cat',
};

delete pet.kind;
delete pet.name;

console.log('Value of pet:', pet);
console.log('Type of pet:', typeof pet);
