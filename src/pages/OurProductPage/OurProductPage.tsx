import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CartDrawer from '../../components/cart/CartDrawer/CartDrawer';
import ProductSection from '../../components/product/ProductSection/ProductSection';
import ProductToolbar from '../../components/product/ProductToolbar/ProductToolbar';
import SearchResultSection from '../../components/product/SearchResultSection/SearchResultSection';
import { categoryService } from '../../services/categoryService';
import { productService } from '../../services/productService';
import { useCartStore } from '../../store/cartStore';
import type { ProductCategory, ProductItem } from '../../types/product.types';
import './OurProductPage.css';

function OurProductPage() {
  const [searchParams] = useSearchParams();
  const defaultCategory = searchParams.get('category');

  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(defaultCategory);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const cartStore = useCartStore();

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const [loadedCategories, loadedProducts] = await Promise.all([
          categoryService.fetchCategories(),
          productService.fetchProducts()
        ]);

        setCategories(loadedCategories);
        setProducts(loadedProducts);
      } catch (error) {
        const fallback = 'Unable to load products.';
        setErrorMessage(error instanceof Error ? error.message : fallback);
      }
    };

    void loadCatalog();
  }, []);

  const catalog = useMemo(() => productService.buildCatalog(categories, products), [categories, products]);
  const searchResults = useMemo(
    () => productService.searchProducts(searchTerm, catalog.products),
    [searchTerm, catalog.products]
  );
  const isSearching = searchTerm.trim().length > 0;

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
      catalog.categories.map((category) => ({
        category,
        products: productService.getProductsByCategory(category.id, catalog.products)
      })),
    [catalog.categories, catalog.products]
  );

  const handleAddToCart = (productId: string) => {
    cartStore.addItem(productId);
  };

  return (
    <main className="our-product-page">
      <ProductToolbar
        categories={catalog.categories}
        searchTerm={searchTerm}
        selectedCategoryId={selectedCategoryId}
        cartCount={cartStore.itemCount}
        onSearchChange={setSearchTerm}
        onCategorySelect={handleCategorySelect}
        onCartClick={cartStore.openDrawer}
      />

      {errorMessage ? <p>{errorMessage}</p> : null}

      {isSearching ? (
        <SearchResultSection results={searchResults} searchTerm={searchTerm} onAdd={handleAddToCart} />
      ) : (
        categoriesWithProducts.map(({ category, products: categoryProducts }) => (
          <ProductSection
            key={category.id}
            category={category}
            products={categoryProducts}
            onAdd={handleAddToCart}
            sectionRef={(element) => {
              sectionRefs.current[category.id] = element;
            }}
          />
        ))
      )}

      <CartDrawer
        isOpen={cartStore.isDrawerOpen}
        items={cartStore.items}
        products={catalog.products}
        onClose={cartStore.closeDrawer}
        onUpdateItem={cartStore.updateItem}
        onRemoveItem={cartStore.removeItem}
        onClearItems={cartStore.clearItems}
      />
    </main>
  );
}

export default OurProductPage;
