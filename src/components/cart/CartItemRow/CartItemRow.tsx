import type { ProductItem } from '../../../types/product.types';
import './CartItemRow.css';

interface CartItemRowProps {
  product: ProductItem;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

function CartItemRow({ product, quantity, onIncrease, onDecrease, onRemove }: CartItemRowProps) {
  const lineTotal = product.price * quantity;

  return (
    <div className="cart-item-row">
      <img alt={product.name} className="cart-item-row__image" src={product.imageUrl || '/placeholder-product.png'} />
      <div className="cart-item-row__content">
        <h4>{product.name}</h4>
        <p>
          {product.currency} {product.price.toFixed(2)}
        </p>
        <div className="cart-item-row__actions">
          <button onClick={onDecrease} type="button">
            -
          </button>
          <span>{quantity}</span>
          <button onClick={onIncrease} type="button">
            +
          </button>
          <button className="cart-item-row__remove" onClick={onRemove} type="button">
            Remove
          </button>
        </div>
      </div>
      <strong>
        {product.currency} {lineTotal.toFixed(2)}
      </strong>
    </div>
  );
}

export default CartItemRow;
