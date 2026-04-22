import type { ProductCategory } from '../../../types/product.types';
import CartButton from '../CartButton/CartButton';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown';
import ProductSearchBar from '../ProductSearchBar/ProductSearchBar';
import './ProductToolbar.css';

interface ProductToolbarProps {
  categories: ProductCategory[];
  searchTerm: string;
  selectedCategoryId: string | null;
  cartCount: number;
  onSearchChange: (value: string) => void;
  onCategorySelect: (categoryId: string) => void;
  onCartClick: () => void;
}

function ProductToolbar({
  categories,
  searchTerm,
  selectedCategoryId,
  cartCount,
  onSearchChange,
  onCategorySelect,
  onCartClick
}: ProductToolbarProps) {
  return (
    <section className="product-toolbar" aria-label="Product toolbar">
      <ProductSearchBar value={searchTerm} onChange={onSearchChange} />
      <CategoryDropdown
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={onCategorySelect}
      />
      <CartButton count={cartCount} onClick={onCartClick} />
    </section>
  );
}

export default ProductToolbar;
