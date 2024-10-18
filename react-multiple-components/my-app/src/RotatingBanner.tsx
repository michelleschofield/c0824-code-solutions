import { Indicators } from './Indicators';
import { Button } from './Button';
import { H2 } from './H2';
import { useState } from 'react';

type Props = {
  items: string[];
};

export function RotatingBanner({ items }: Props) {
  const [currentIndex /* setCurrentIndex */] = useState(5);

  return (
    <div>
      <H2 label={items[currentIndex]} />
      <Button label="next" className="" />
      <Indicators items={items} current={currentIndex} />
      <Button label="previous" />
    </div>
  );
}
