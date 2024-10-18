type Props = {
  items: string[];
  filterText: string;
};

export function ItemList({ items, filterText }: Props) {
  return (
    <ul>
      {items.map((item) => {
        if (item.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
          return null;
        }
        return <li key={item}>{item}</li>;
      })}
    </ul>
  );
}
