import { Indicators } from './Indicators';
import { ImageDisplay } from './ImageDisplay';
import { BackButton } from './BackButton';
import { NextButton } from './NextButton';
import { useCallback, useEffect, useState } from 'react';

type Image = {
  src: string;
  alt: string;
};

type Props = {
  images: Image[];
};

export function Carousel({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = images.length;

  const incrementCarousel = useCallback(() => {
    setCurrentIndex((currentIndex + 1) % length);
  }, [length, currentIndex]);

  function decrementCarousel() {
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  }

  useEffect(() => {
    const intervalId = setTimeout(incrementCarousel, 3000);
    return () => clearTimeout(intervalId);
  }, [incrementCarousel]);

  return (
    <>
      <div className="flex">
        <BackButton onBack={decrementCarousel} />
        <ImageDisplay image={images[currentIndex]} />
        <NextButton onNext={incrementCarousel} />
      </div>
      <Indicators
        onSelect={(index) => setCurrentIndex(index)}
        count={length}
        current={currentIndex}
      />
    </>
  );
}
