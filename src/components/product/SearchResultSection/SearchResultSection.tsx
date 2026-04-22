import type { ProductItem } from '../../../types/product.types';
import ProductGrid from '../ProductGrid/ProductGrid';
import './SearchResultSection.css';

interface SearchResultSectionProps {
  searchTerm: string;
  results: ProductItem[];
}

function SearchResultSection({ searchTerm, results }: SearchResultSectionProps) {
  return (
    <section className="search-result-section">
      <h2>Results for "{searchTerm}"</h2>
      {results.length > 0 ? <ProductGrid products={results} /> : <p>No products found.</p>}
    </section>
  );
}

export default SearchResultSection;
