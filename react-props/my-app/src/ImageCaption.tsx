type Props = {
  text: string;
};

export function ImageCaption({ text }: Props) {
  return (
    <div>
      <h3>{text}</h3>
    </div>
  );
}
