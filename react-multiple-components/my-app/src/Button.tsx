type Props = {
  label: string;
  className?: string;
};

export function Button({ label, className }: Props) {
  return <button className={className}>{label}</button>;
}
