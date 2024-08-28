'use strict';
/* exported isUnderFive,
            isEven,
            startsWithJ,
            isOldEnoughToDrink,
            isOldEnoughToDrive,
            isOldEnoughToDrinkAndDrive,
            categorizeAcidity,
            introduceWarnerBro,
            recommendMovie
 */
function isUnderFive(number) {
  return number < 5;
}
function isEven(number) {
  if (number % 2) {
    return false;
  } else {
    return true;
  }
}
function startsWithJ(string) {
  if (string[0].toUpperCase() === 'J') {
    return true;
  }
  return false;
}
function isOldEnoughToDrink(person) {
  return person.age > 20;
}
function isOldEnoughToDrive(person) {
  return person.age > 15;
}
function isOldEnoughToDrinkAndDrive(person) {
  return false;
}
function categorizeAcidity(pH) {
  if (pH >= 0 && pH < 7) {
    return 'acid';
  } else if (pH === 7) {
    return 'neutral';
  } else if (pH > 7 && pH <= 14) {
    return 'base';
  } else {
    return 'invalid pH level';
  }
}
function introduceWarnerBro(name) {
  switch (name) {
    case 'yakko':
      return "We're the warner brothers!";
    case 'wakko':
      return "We're the warner brothers!";
    case 'dot':
      return "I'm cute";
    default:
      return 'Goodnight everybody!';
  }
}
function recommendMovie(genre) {
  switch (genre) {
    case 'action':
      return 'Die Hard';
    case 'comedy':
      return 'The Big Lebowski';
    case 'horror':
      return 'The Ring';
    case 'drama':
      return 'It Ends With Us';
    case 'musical':
      return 'Sound of Music';
    case 'sci-fi':
      return 'Interstellar';
    default:
      return 'Genre not recognized. Choose between action, comedy, horror, drama, musical, or sci-fi';
  }
}
