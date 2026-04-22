import type { ProductItem } from '../../../types/product.types';
import './ProductCard.css';

interface ProductCardProps {
  product: ProductItem;
  onAdd?: (productId: string) => void;
}

const FALLBACK_IMAGE = '/placeholder-product.png';

const formatPrice = (price: number, currency: ProductItem['currency']) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);

function ProductCard({ product, onAdd }: ProductCardProps) {
  const imageSrc = product.imageUrl.trim() ? product.imageUrl : FALLBACK_IMAGE;

  return (
    <article className="product-card">
      <img alt={product.name} className="product-card__image" src={imageSrc} />
      <div className="product-card__content">
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__footer">
          <strong className="product-card__price">{formatPrice(product.price, product.currency)}</strong>
          <button className="product-card__add-button" onClick={() => onAdd?.(product.id)} type="button">
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
