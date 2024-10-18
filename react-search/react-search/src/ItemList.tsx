type Props = {
  items: string[];
  filterText: string;
};

export function ItemList({ items, filterText }: Props) {
  const shownItems: JSX.Element[] = [];

  items.forEach((item) => {
    if (item.toLowerCase().indexOf(filterText.toLowerCase()) === -1) return;
    shownItems.push(<li key={item}>{item}</li>);
  });

  return shownItems.length ? (
    <ul>{shownItems}</ul>
  ) : (
    <p>No items match your search</p>
  );
}
