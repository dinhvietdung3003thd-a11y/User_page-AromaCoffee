import HeroSection from '../../components/home/HeroSection/HeroSection';
import CategoryShortcutGrid from '../../components/home/CategoryShortcutGrid/CategoryShortcutGrid';
import './HomePage.css';

function HomePage() {
  return (
    <main className="home-page">
      <HeroSection />
      <CategoryShortcutGrid />
    </main>
  );
}

export default HomePage;
