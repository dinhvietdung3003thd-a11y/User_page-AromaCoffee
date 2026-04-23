import './ProductSearchBar.css';

interface ProductSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function ProductSearchBar({ value, onChange }: ProductSearchBarProps) {
  return (
    <input
      className="product-search-bar"
      placeholder="Search products..."
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export default ProductSearchBar;
