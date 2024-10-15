type Props = {
  desc: string;
};

export function ImageDescription({ desc }: Props) {
  return (
    <div>
      <p>{desc}</p>
    </div>
  );
}
