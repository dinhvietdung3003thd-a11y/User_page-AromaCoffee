import { useNavigate } from 'react-router-dom';
import { routePaths } from '../../../router/routePaths';
import './HeroSection.css';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-section__content">
        <h1>Freshly brewed happiness in every cup.</h1>
        <p>
          Discover your favorite drinks and snacks from Aroma Coffee. Fast ordering,
          smooth pickup, and cozy vibes.
        </p>
        <button onClick={() => navigate(routePaths.ourProduct)} type="button">
          Order Coffee
        </button>
      </div>
      <div className="hero-section__image-placeholder" aria-label="Coffee banner image placeholder">
        Image Placeholder
      </div>
    </section>
  );
}

export default HeroSection;
