import { useState } from 'react';
import './App.css';

type Product = {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
};

type ProductCategoryRowProps = {
  category: string;
};

function ProductCategoryRow({ category }: ProductCategoryRowProps) {
  return (
    <tr>
      <th>{category}</th>
    </tr>
  );
}

type ProductRowProps = {
  product: Product;
};

function ProductRow({ product }: ProductRowProps) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

type ProductTableProps = {
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
};

function ProductTable({
  products,
  filterText,
  inStockOnly,
}: ProductTableProps) {
  const rows: JSX.Element[] = [];
  let lastCategory: string;

  products.forEach((product) => {
    const { name, stocked, category } = product;

    if (name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !stocked) {
      return;
    }

    if (category !== lastCategory) {
      rows.push(<ProductCategoryRow category={category} />);
    }

    rows.push(<ProductRow product={product} />);
    lastCategory = category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

type SearchBarProps = {
  filterText: string;
  inStockOnly: boolean;
  setInStockOnly: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBar({
  filterText,
  inStockOnly,
  setInStockOnly,
  setFilterText,
}: SearchBarProps) {
  function handleFilterTextChange(event: Event) {
    setFilterText(event.target.value);
  }

  function handleInStockOnlyChange(event: Event) {
    setFilterText(event.target.checked);
  }

  return (
    <form>
      <input
        onChange={handleFilterTextChange}
        type="text"
        value={filterText}
        placeholder="Search..."
      />
      <label>
        <input
          onChange={handleInStockOnlyChange}
          type="checkbox"
          checked={inStockOnly}
        />{' '}
        Only show products in stock
      </label>
    </form>
  );
}

type FilterableProductTableProps = {
  products: Product[];
};

function FilterableProductTable({ products }: FilterableProductTableProps) {
  const [filterText, setFilterText] = useState('apple');
  const [inStockOnly, setInStockOnly] = useState(true);

  return (
    <div>
      <SearchBar
        setInStockOnly={setInStockOnly}
        setFilterText={setFilterText}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
      <ProductTable
        filterText={filterText}
        inStockOnly={inStockOnly}
        products={products}
      />
    </div>
  );
}

export function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}

const PRODUCTS = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
];
