import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../../../services/orderService';
import { useAuthStore } from '../../../store/authStore';
import type { ProductItem } from '../../../types/product.types';
import type { CartStorageItem } from '../../../utils/cartStorage';
import CartItemRow from '../CartItemRow/CartItemRow';
import ConfirmOrderModal from '../ConfirmOrderModal/ConfirmOrderModal';
import OrderSuccessModal from '../OrderSuccessModal/OrderSuccessModal';
import './CartDrawer.css';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartStorageItem[];
  products: ProductItem[];
  onClose: () => void;
  onUpdateItem: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearItems: () => void;
}

function CartDrawer({
  isOpen,
  items,
  products,
  onClose,
  onUpdateItem,
  onRemoveItem,
  onClearItems
}: CartDrawerProps) {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isSubmittingOrder, setSubmittingOrder] = useState(false);
  const [orderErrorMessage, setOrderErrorMessage] = useState('');
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  const resolvedItems = useMemo(
    () =>
      items
        .map((item) => ({
          ...item,
          product: products.find((product) => product.id === item.productId)
        }))
        .filter((item): item is CartStorageItem & { product: ProductItem } => Boolean(item.product)),
    [items, products]
  );

  const total = useMemo(
    () =>
      resolvedItems.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
      }, 0),
    [resolvedItems]
  );

  const handlePlaceOrderClick = () => {
    if (resolvedItems.length === 0 || isSubmittingOrder) {
      return;
    }

    setOrderErrorMessage('');
    setConfirmModalOpen(true);
  };

  const handleConfirmOrder = async () => {
    if (isSubmittingOrder) {
      return;
    }

    if (!token) {
      setOrderErrorMessage('Please login to place an order.');
      setConfirmModalOpen(false);
      return;
    }

    const details = resolvedItems
      .map((item) => ({
        productId: Number(item.product.id),
        quantity: item.quantity
      }))
      .filter((item) => Number.isFinite(item.productId));

    if (details.length === 0) {
      setOrderErrorMessage('Your cart items are invalid.');
      setConfirmModalOpen(false);
      return;
    }

    setSubmittingOrder(true);
    setOrderErrorMessage('');

    try {
      const createdOrder = await orderService.createClientOrder(
        {
          orderDate: new Date().toISOString(),
          tableId: null,
          note: '',
          details
        },
        token
      );

      setLastOrderId(String(createdOrder.orderId));
      setConfirmModalOpen(false);
      setSuccessModalOpen(true);
      onClearItems();
      onClose();
    } catch (error) {
      const fallback = 'Unable to place order. Please try again.';
      setOrderErrorMessage(error instanceof Error ? error.message : fallback);
      setConfirmModalOpen(false);
    } finally {
      setSubmittingOrder(false);
    }
  };

  return (
    <>
      <aside className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}>
        <div className="cart-drawer__header">
          <h3>My Cart</h3>
          <button onClick={onClose} type="button">
            Close
          </button>
        </div>

        <div className="cart-drawer__body">
          {resolvedItems.length > 0 ? (
            resolvedItems.map((item) => (
              <CartItemRow
                key={item.productId}
                product={item.product}
                quantity={item.quantity}
                onIncrease={() => onUpdateItem(item.productId, item.quantity + 1)}
                onDecrease={() => onUpdateItem(item.productId, item.quantity - 1)}
                onRemove={() => onRemoveItem(item.productId)}
              />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}

          {orderErrorMessage ? <p>{orderErrorMessage}</p> : null}
        </div>

        <div className="cart-drawer__footer">
          <strong>
            Total: {resolvedItems[0]?.product.currency ? `${resolvedItems[0].product.currency} ` : ''}
            {total.toFixed(2)}
          </strong>
          <button
            disabled={resolvedItems.length === 0 || isSubmittingOrder}
            onClick={handlePlaceOrderClick}
            type="button"
          >
            {isSubmittingOrder ? 'Placing...' : 'Place Order'}
          </button>
        </div>
      </aside>

      {isOpen ? <div className="cart-drawer__backdrop" onClick={onClose} role="presentation" /> : null}

      <ConfirmOrderModal
        isOpen={isConfirmModalOpen}
        isSubmitting={isSubmittingOrder}
        onCancel={() => setConfirmModalOpen(false)}
        onConfirm={() => {
          void handleConfirmOrder();
        }}
      />

      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        orderId={lastOrderId}
        onViewOrders={() => navigate('/my-orders')}
        onClose={() => setSuccessModalOpen(false)}
      />
    </>
  );
}

export default CartDrawer;
