type Props = {
  items: string[];
  current: number;
};

export function NumberButtons({ current, items }: Props) {
  return (
    <>
      {items.map((_, index) => (
        <button className={index === current ? 'active' : ''} key={index}>
          {index + 1}
        </button>
      ))}
    </>
  );
}
