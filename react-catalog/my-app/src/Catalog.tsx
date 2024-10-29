import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { Product, readCatalog } from './lib';

export function Catalog() {
  const [products, setProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function getProducts() {
      try {
        const products = await readCatalog();
        setProducts(products);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    getProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{`${error}`}</div>;
  }

  return (
    <div className="px-4">
      <h1 className="text-4xl py-4">Catalog</h1>
      <div className="border-t-2 border-gray-200 flex flex-wrap">
        {products?.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
}
