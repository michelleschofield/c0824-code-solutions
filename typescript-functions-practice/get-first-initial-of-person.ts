/* exported getFirstInitialOfPerson */
function getFirstInitialOfPerson(person: {
  firstName: string;
  lastName: string;
}): string {
  return person.firstName[0];
}
