import './ReorderButton.css';

interface ReorderButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

function ReorderButton({ onClick, disabled = false }: ReorderButtonProps) {
  return (
    <button className="reorder-button" disabled={disabled} onClick={onClick} type="button">
      Reorder
    </button>
  );
}

export default ReorderButton;
