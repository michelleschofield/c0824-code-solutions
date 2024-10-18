import { useState } from 'react';
import { ItemList } from './ItemList';
import { SearchBar } from './SearchBar';

type Props = {
  items: string[];
};

export function SearchableList({ items }: Props) {
  const [filterText, setFilterText] = useState('');

  function handleSearch(search: string) {
    setFilterText(search);
  }

  return (
    <div>
      <SearchBar value={filterText} onSearch={handleSearch} />
      <ItemList filterText={filterText} items={items} />
    </div>
  );
}
