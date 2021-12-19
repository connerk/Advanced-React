export default function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally;
    return cartItem.quantity * cartItem.product.price + tally;
  }, 0);
}
