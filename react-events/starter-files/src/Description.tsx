import { useState } from 'react';

type Props = {
  texts: string[];
};
export function Description({ texts }: Props) {
  const [textIndex, setTextIndex] = useState(0);

  function handleClick() {
    if (textIndex >= texts.length - 1) {
      setTextIndex(0);
    } else {
      setTextIndex(textIndex + 1);
    }
  }

  return <p onClick={handleClick}>{texts[textIndex]}</p>;
}
