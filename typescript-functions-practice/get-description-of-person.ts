/* exported getDescriptionOfPerson */
function getDescriptionOfPerson(person: {
  name: string;
  occupation: string;
  birthPlace: string;
}): string {
  return `${person.name} is a ${person.occupation} from ${person.birthPlace}.`;
}
