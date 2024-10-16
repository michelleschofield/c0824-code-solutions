type Props = {
  onDecreaseTemp: () => void;
  className: string;
};

export function CoolButton({ onDecreaseTemp, className }: Props) {
  return (
    <button className={className} onClick={onDecreaseTemp}>
      Cool down
    </button>
  );
}
