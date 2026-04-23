import { useMemo, useState } from 'react';
import type { ProductCategory } from '../../../types/product.types';
import './CategoryDropdown.css';

interface CategoryDropdownProps {
  categories: ProductCategory[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string) => void;
}

function CategoryDropdown({ categories, selectedCategoryId, onSelectCategory }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCategoryName = useMemo(() => {
    if (!selectedCategoryId) {
      return 'Category';
    }

    return categories.find((category) => category.id === selectedCategoryId)?.name ?? 'Category';
  }, [categories, selectedCategoryId]);

  return (
    <div className="category-dropdown">
      <button
        aria-expanded={isOpen}
        className="category-dropdown__trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        {selectedCategoryName}
      </button>

      {isOpen ? (
        <div className="category-dropdown__menu">
          {categories.map((category) => (
            <button
              className="category-dropdown__item"
              key={category.id}
              onClick={() => {
                onSelectCategory(category.id);
                setIsOpen(false);
              }}
              type="button"
            >
              {category.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default CategoryDropdown;
