import { Button } from './Button';

type Props = {
  items: string[];
  current: number;
  onClick: (index: number) => void;
};

export function Indicators({ current, items, onClick }: Props) {
  return (
    <>
      {items.map((_, index) => (
        <Button
          label={`${index + 1}`}
          className={index === current ? 'active' : ''}
          key={index}
          onClick={() => onClick(index)}
        />
      ))}
    </>
  );
}
