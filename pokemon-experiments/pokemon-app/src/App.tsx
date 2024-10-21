import './App.css';
import { PokeballCard } from './PokeballCard';
import { PokemonCard } from './PokemonCard';
import { TextCard } from './TextCard';

function App() {
  function formatFlavorText(text: string) {
    return text.split('\n').join(' ').split('\f').join(' ');
  }

  return (
    <>
      <PokeballCard />
      <PokemonCard caption="Bulbasaur" imageSrc="bulbasaur.png" />
      <TextCard
        text={formatFlavorText(
          'A strange seed was\nplanted on its\nback at birth.\fThe plant sprouts\nand grows with\nthis POKéMON.'
        )}
      />
    </>
  );
}

export default App;
