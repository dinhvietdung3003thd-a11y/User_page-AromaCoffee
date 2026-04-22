import type { ProductItem } from '../../../types/product.types';
import ProductGrid from '../ProductGrid/ProductGrid';
import './SearchResultSection.css';

interface SearchResultSectionProps {
  searchTerm: string;
  results: ProductItem[];
  onAdd?: (productId: string) => void;
}

function SearchResultSection({ searchTerm, results, onAdd }: SearchResultSectionProps) {
  return (
    <section className="search-result-section">
      <h2>Results for "{searchTerm}"</h2>
      {results.length > 0 ? <ProductGrid products={results} onAdd={onAdd} /> : <p>No products found.</p>}
    </section>
  );
}

export default SearchResultSection;
