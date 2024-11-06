import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';

export type Product = {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  shortDescription: string;
  longDescription: string;
};

export function Catalog() {
  const [products, setProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error(`http error ${response.status}`);

        const products = await response.json();
        setProducts(products);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !products) {
    console.error(error);
    return (
      <div className="text-red-500">
        {error instanceof Error ? error.message : 'there was an unknown error'}
      </div>
    );
  }

  return (
    <div className="px-4">
      <h1 className="text-4xl py-4">Catalog</h1>
      <div className="border-t-2 border-gray-200 flex flex-wrap justify-evenly pt-2">
        {products?.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
}
