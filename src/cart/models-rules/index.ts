import { Cart } from '../models';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Cart): number {
  return cart.items.reduce((acc, item) => acc + item.count, 0);
}
