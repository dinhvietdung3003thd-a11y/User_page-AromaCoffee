import './ConfirmOrderModal.css';

interface ConfirmOrderModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

function ConfirmOrderModal({ isOpen, onCancel, onConfirm }: ConfirmOrderModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirm-order-modal__backdrop">
      <div className="confirm-order-modal">
        <h3>Confirm Order</h3>
        <p>Are you sure you want to place this order?</p>
        <div className="confirm-order-modal__actions">
          <button onClick={onCancel} type="button">
            Cancel
          </button>
          <button className="confirm-order-modal__confirm" onClick={onConfirm} type="button">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrderModal;
