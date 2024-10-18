import { FaMagnifyingGlass } from 'react-icons/fa6';

type Props = {
  value: string;
  onSearch: (search: string) => void;
};

export function SearchBar({ value, onSearch }: Props) {
  return (
    <div>
      <FaMagnifyingGlass />
      <input value={value} onChange={(e) => onSearch(e.target.value)} />
    </div>
  );
}
