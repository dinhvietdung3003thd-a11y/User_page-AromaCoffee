import type { ProductItem } from '../../../types/product.types';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

interface ProductGridProps {
  products: ProductItem[];
}

function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
