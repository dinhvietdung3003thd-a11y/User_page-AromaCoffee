import type { ProductCategory, ProductItem } from '../../../types/product.types';
import ProductGrid from '../ProductGrid/ProductGrid';
import './ProductSection.css';

interface ProductSectionProps {
  category: ProductCategory;
  products: ProductItem[];
  sectionRef: (element: HTMLDivElement | null) => void;
  onAdd?: (productId: string) => void;
}

function ProductSection({ category, products, sectionRef, onAdd }: ProductSectionProps) {
  return (
    <section className="product-section" ref={sectionRef}>
      <h2>{category.name}</h2>
      <ProductGrid products={products} onAdd={onAdd} />
    </section>
  );
}

export default ProductSection;
