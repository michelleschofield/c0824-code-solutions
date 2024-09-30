'use strict';
async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const users = await response.json();
    console.log('Users:', users);
  } catch (error) {
    console.log('Error:', error);
  }
}
fetchUsers();
async function fetchPokemon() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/1');
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const pokemon = await response.json();
    console.log('Pokemon:', pokemon);
  } catch (error) {
    console.log('Error:', error);
  }
}
fetchPokemon();
