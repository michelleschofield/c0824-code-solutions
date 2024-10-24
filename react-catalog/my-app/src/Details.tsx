import { useEffect, useState } from 'react';
import { Product, readProduct, toDollars } from './lib';
import { Link, useNavigate, useParams } from 'react-router-dom';

export function Details() {
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { productId } = useParams();

  useEffect(() => {
    async function loadProduct(productId: number) {
      try {
        const product = await readProduct(productId);
        setProduct(product);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (productId) {
      loadProduct(+productId);
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Error loading product {productId}</div>;
  }

  function handleAddToCart(): void {
    alert(`${product?.name} added to cart`);
    navigate('/');
  }

  return (
    <div>
      <Link to="/">&lt; Back to Catalog</Link>
      <img src={product.imageUrl} />
      <h2>{product.name}</h2>
      <p>{toDollars(product.price)}</p>
      <p>{product.longDescription}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
