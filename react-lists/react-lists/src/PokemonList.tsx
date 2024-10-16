type Props = {
  pokemon: { name: string; number: string }[];
};

export function PokemonList({ pokemon }: Props) {
  return (
    <ul>
      {pokemon.map((pokemon) => (
        <li key={pokemon.number}>{pokemon.name}</li>
      ))}
    </ul>
  );
}
