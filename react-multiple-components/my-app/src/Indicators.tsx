import { Button } from './Button';

type Props = {
  items: string[];
  current: number;
};

export function Indicators({ current, items }: Props) {
  return (
    <>
      {items.map((_, index) => (
        <Button
          label={`${index + 1}`}
          className={index === current ? 'active' : ''}
          key={index}
        />
      ))}
    </>
  );
}
