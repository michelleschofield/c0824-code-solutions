import { Link } from 'react-router-dom';
import { Product, toDollars } from './lib';

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <Link
      to={`/details/${product.productId}`}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="w-full h-96 flex items-center">
        <img className="" src={product.imageUrl} />
      </div>
      <h5 className="text-xl">{product.name}</h5>
      <p>{toDollars(product.price)}</p>
      <p>{product.shortDescription}</p>
    </Link>
  );
}
