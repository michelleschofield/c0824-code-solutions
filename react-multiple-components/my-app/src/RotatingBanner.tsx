import { Indicators } from './Indicators';
import { Button } from './Button';
import { H2 } from './H2';
import { useState } from 'react';

type Props = {
  items: string[];
};

export function RotatingBanner({ items }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleNext() {
    const nextIndex = currentIndex + 1 >= items.length ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  }

  function handlePrevious() {
    const nextIndex =
      currentIndex - 1 < 0 ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(nextIndex);
  }

  function handleIndicatorClick(index: number): void {
    setCurrentIndex(index);
  }

  return (
    <>
      <H2 label={items[currentIndex]} />
      <Button onClick={handlePrevious} label="Previous" />
      <Indicators
        onClick={handleIndicatorClick}
        items={items}
        current={currentIndex}
      />
      <Button onClick={handleNext} label="Next" />
    </>
  );
}
