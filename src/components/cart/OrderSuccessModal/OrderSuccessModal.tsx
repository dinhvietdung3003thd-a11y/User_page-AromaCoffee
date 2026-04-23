import './OrderSuccessModal.css';

interface OrderSuccessModalProps {
  isOpen: boolean;
  orderId: string | null;
  onViewOrders: () => void;
  onClose: () => void;
}

function OrderSuccessModal({ isOpen, orderId, onViewOrders, onClose }: OrderSuccessModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="order-success-modal__backdrop">
      <div className="order-success-modal">
        <h3>Order Placed Successfully</h3>
        <p>Your order ID: {orderId}</p>
        <div className="order-success-modal__actions">
          <button onClick={onViewOrders} type="button">
            View My Orders
          </button>
          <button onClick={onClose} type="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessModal;
