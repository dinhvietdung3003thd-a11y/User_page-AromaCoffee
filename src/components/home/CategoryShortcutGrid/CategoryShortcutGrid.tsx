import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '../../../services/categoryService';
import type { ProductCategory } from '../../../types/product.types';
import { getCategoryQueryPath } from '../../../utils/queryParams';
import CategoryCard from '../CategoryCard/CategoryCard';
import './CategoryShortcutGrid.css';

function CategoryShortcutGrid() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const loadedCategories = await categoryService.fetchCategories();
        setCategories(loadedCategories);
      } catch (error) {
        const fallback = 'Unable to load categories.';
        setErrorMessage(error instanceof Error ? error.message : fallback);
      }
    };

    void loadCategories();
  }, []);

  return (
    <section className="category-shortcut-grid">
      <h2>Browse by Category</h2>
      {errorMessage ? <p>{errorMessage}</p> : null}
      <div className="category-shortcut-grid__items">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            label={category.name}
            onClick={() => navigate(getCategoryQueryPath(category.id))}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryShortcutGrid;
