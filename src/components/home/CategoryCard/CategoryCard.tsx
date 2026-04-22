import './CategoryCard.css';

interface CategoryCardProps {
  label: string;
  onClick: () => void;
}

function CategoryCard({ label, onClick }: CategoryCardProps) {
  return (
    <button className="category-card" onClick={onClick} type="button">
      {label}
    </button>
  );
}

export default CategoryCard;
