type Props = {
  label: string;
  handleClick: () => void;
};

export function Button({ label, handleClick }: Props) {
  return (
    <div>
      <button onClick={handleClick}>{label}</button>
    </div>
  );
}
