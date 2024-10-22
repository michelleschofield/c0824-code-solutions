import { DotButton } from './DotButton';

type Props = {
  count: number;
  current: number;
  onSelect: (index: number) => void;
};

export function Indicators({ count, current, onSelect }: Props) {
  const dots = [];
  for (let i = 0; i < count; i++) {
    dots.push(
      <DotButton onClick={() => onSelect(i)} active={i === current} key={i} />
    );
  }
  return <div className="flex self-center">{dots}</div>;
}
