import { useNavigate } from 'react-router-dom';
import { productService } from '../../../services/productService';
import { getCategoryQueryPath } from '../../../utils/queryParams';
import CategoryCard from '../CategoryCard/CategoryCard';
import './CategoryShortcutGrid.css';

function CategoryShortcutGrid() {
  const navigate = useNavigate();
  const categories = productService.getHomeCategories();

  return (
    <section className="category-shortcut-grid">
      <h2>Browse by Category</h2>
      <div className="category-shortcut-grid__items">
        {categories.map((category) => (
          <CategoryCard
            key={category.value}
            label={category.label}
            onClick={() => navigate(getCategoryQueryPath(category.value))}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryShortcutGrid;
