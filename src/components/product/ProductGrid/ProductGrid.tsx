import type { ProductItem } from '../../../types/product.types';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

interface ProductGridProps {
  products: ProductItem[];
  onAdd?: (productId: string) => void;
}

function ProductGrid({ products, onAdd }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
}

export default ProductGrid;
