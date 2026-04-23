import type { ProductItem } from '../../../types/product.types';
import ProductGrid from '../ProductGrid/ProductGrid';
import './SearchResultSection.css';

interface SearchResultSectionProps {
  searchTerm: string;
  results: ProductItem[];
  isLoading?: boolean;
  errorMessage?: string;
  onAdd?: (productId: string) => void;
}

function SearchResultSection({ searchTerm, results, isLoading = false, errorMessage, onAdd }: SearchResultSectionProps) {
  return (
    <section className="search-result-section">
      <h2>Results for "{searchTerm}"</h2>
      {isLoading ? <p>Searching products...</p> : null}
      {errorMessage ? <p>{errorMessage}</p> : null}
      {!isLoading && !errorMessage ? (
        results.length > 0 ? <ProductGrid products={results} onAdd={onAdd} /> : <p>No products found.</p>
      ) : null}
    </section>
  );
}

export default SearchResultSection;
