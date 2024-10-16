type Props = {
  onIncreaseTemp: () => void;
  className: string;
};

export function HotButton({ onIncreaseTemp, className }: Props) {
  return (
    <button className={className} onClick={onIncreaseTemp}>
      Heat Up
    </button>
  );
}
