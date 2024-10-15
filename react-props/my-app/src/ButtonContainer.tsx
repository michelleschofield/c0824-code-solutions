type Props = {
  text: string;
};

export function ButtonContainer({ text }: Props) {
  return (
    <div>
      <button>{text}</button>
    </div>
  );
}
