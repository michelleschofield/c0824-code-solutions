import { useContext } from 'react';
import { CartContext } from './CartContext';

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart)
    throw new Error('useCart can only be used inside CartProvider tree');
  return cart;
}
