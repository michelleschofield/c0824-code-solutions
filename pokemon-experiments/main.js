'use strict';
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
