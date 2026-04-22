import './CartButton.css';

interface CartButtonProps {
  count: number;
}

function CartButton({ count }: CartButtonProps) {
  return (
    <button className="cart-button" type="button">
      <span aria-hidden="true">🛒</span>
      <span>Cart</span>
      <span className="cart-button__badge">{count}</span>
    </button>
  );
}

export default CartButton;
