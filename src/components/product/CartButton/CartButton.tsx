import './CartButton.css';

interface CartButtonProps {
  count: number;
  onClick: () => void;
}

function CartButton({ count, onClick }: CartButtonProps) {
  return (
    <button className="cart-button" onClick={onClick} type="button">
      <span aria-hidden="true">🛒</span>
      <span>Cart</span>
      <span className="cart-button__badge">{count}</span>
    </button>
  );
}

export default CartButton;
