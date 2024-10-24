import { useEffect, useState } from 'react';
import { Product, readProduct } from './lib';

export function Details() {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    async function getProduct() {
      try {
        const product = await readProduct(11);
        setProduct(product);
      } catch (err) {
        console.log(err);
      } finally {
        console.log('finally');
      }
    }
    getProduct();
  });

  return <div>{product?.name}</div>;
}
