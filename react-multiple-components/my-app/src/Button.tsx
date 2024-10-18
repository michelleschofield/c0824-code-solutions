type Props = {
  label: string;
  className?: string;
  onClick?: () => void;
};

export function Button({ label, className, onClick }: Props) {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
}
