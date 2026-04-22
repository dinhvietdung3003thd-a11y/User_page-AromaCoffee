import type { ProductCategory, ProductItem } from '../../../types/product.types';
import ProductGrid from '../ProductGrid/ProductGrid';
import './ProductSection.css';

interface ProductSectionProps {
  category: ProductCategory;
  products: ProductItem[];
  sectionRef: (element: HTMLDivElement | null) => void;
}

function ProductSection({ category, products, sectionRef }: ProductSectionProps) {
  return (
    <section className="product-section" ref={sectionRef}>
      <h2>{category.name}</h2>
      <ProductGrid products={products} />
    </section>
  );
}

export default ProductSection;
