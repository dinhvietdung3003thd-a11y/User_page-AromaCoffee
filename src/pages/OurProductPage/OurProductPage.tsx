import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductSection from '../../components/product/ProductSection/ProductSection';
import ProductToolbar from '../../components/product/ProductToolbar/ProductToolbar';
import SearchResultSection from '../../components/product/SearchResultSection/SearchResultSection';
import { productService } from '../../services/productService';
import type { ProductCategory } from '../../types/product.types';
import { cartStorage } from '../../utils/cartStorage';
import './OurProductPage.css';

function OurProductPage() {
  const [searchParams] = useSearchParams();
  const defaultCategory = searchParams.get('category');

  const catalog = useMemo(() => productService.getProductCatalog(), []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(defaultCategory);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const searchResults = useMemo(() => productService.searchProducts(searchTerm), [searchTerm]);
  const isSearching = searchTerm.trim().length > 0;
  const cartCount = cartStorage.getCartCount();

  const scrollToCategory = (categoryId: string) => {
    const targetSection = sectionRefs.current[categoryId];
    if (!targetSection) {
      return;
    }

    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSearchTerm('');
    window.setTimeout(() => scrollToCategory(categoryId), 0);
  };

  useEffect(() => {
    if (!defaultCategory) {
      return;
    }

    setSelectedCategoryId(defaultCategory);
    setSearchTerm('');
    window.setTimeout(() => scrollToCategory(defaultCategory), 0);
  }, [defaultCategory]);

  const categoriesWithProducts = useMemo(
    () =>
      catalog.categories.map((category: ProductCategory) => ({
        category,
        products: productService.getProductsByCategory(category.id)
      })),
    [catalog.categories]
  );

  return (
    <main className="our-product-page">
      <ProductToolbar
        categories={catalog.categories}
        searchTerm={searchTerm}
        selectedCategoryId={selectedCategoryId}
        cartCount={cartCount}
        onSearchChange={setSearchTerm}
        onCategorySelect={handleCategorySelect}
      />

      {isSearching ? (
        <SearchResultSection results={searchResults} searchTerm={searchTerm} />
      ) : (
        categoriesWithProducts.map(({ category, products }) => (
          <ProductSection
            key={category.id}
            category={category}
            products={products}
            sectionRef={(element) => {
              sectionRefs.current[category.id] = element;
            }}
          />
        ))
      )}
    </main>
  );
}

export default OurProductPage;
