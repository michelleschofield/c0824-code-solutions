import { takeAChance } from './take-a-chance.js';

takeAChance('Minnie Mouse')
  .then((message) => console.log(message))
  .catch((error) => console.log(error.message));
