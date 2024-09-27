interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Pokemon {
  name: string;
  height: number;
  weight: number;
}

async function fetchUsers(): Promise<void> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const users = (await response.json()) as User[];
    console.log('Users:', users);
  } catch (error) {
    console.log('Error:', error);
  }
}

fetchUsers();

async function fetchPokemon(): Promise<void> {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/1');

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const pokemon = (await response.json()) as Pokemon;
    console.log('Pokemon:', pokemon);
  } catch (error) {
    console.log('Error:', error);
  }
}

fetchPokemon();
