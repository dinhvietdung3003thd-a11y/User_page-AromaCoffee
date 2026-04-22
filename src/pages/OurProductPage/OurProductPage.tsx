import { useSearchParams } from 'react-router-dom';
import './OurProductPage.css';

function OurProductPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  return (
    <main className="our-product-page">
      <h1>Our Product</h1>
      <p>This is a skeleton page for Task 1. Product list/features will be added later.</p>
      {category ? <p>Selected category: {category}</p> : <p>No category selected.</p>}
    </main>
  );
}

export default OurProductPage;
