type Props = {
  label: string;
};

export function Header({ label }: Props) {
  return <h2>{label}</h2>;
}
