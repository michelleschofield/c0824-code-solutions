type Props = {
  onChangeTemp: () => void;
  className: string;
  label: string;
};

export function TempChangingButton({ onChangeTemp, className, label }: Props) {
  return (
    <button className={className} onClick={onChangeTemp}>
      {label}
    </button>
  );
}
