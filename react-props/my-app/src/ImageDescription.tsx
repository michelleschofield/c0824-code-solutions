type Props = {
  text: string;
};

export function ImageDescription({ text }: Props) {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
}
