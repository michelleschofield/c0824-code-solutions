type Props = {
  label: string;
};
export function Button({ label }: Props) {
  function handleClick() {
    alert('button was clicked');
  }

  return <button onClick={handleClick}>{label}</button>;
}
