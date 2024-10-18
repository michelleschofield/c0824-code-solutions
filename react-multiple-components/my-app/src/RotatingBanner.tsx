import { NumberButtons } from './NumberButtons';

type Props = {
  items: string[];
};

export function RotatingBanner({ items }: Props) {
  const current = 3;

  return (
    <div>
      <h2>{items[current]}</h2>
      <button>Previous</button>
      <NumberButtons items={items} current={current} />
      <button>Next</button>
    </div>
  );
}
