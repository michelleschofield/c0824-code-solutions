/* exported getFullNameOfPerson */
function getFullNameOfPerson(person: {
  firstName: string;
  lastName: string;
}): string {
  return `${person.firstName} ${person.lastName}`;
}
