import { ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const handleBookNow = () => {
    const el = document.getElementById('popular-picks');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-banner-card">
          <div className="hero-bg-image-wrapper">
            <img
              src="/images/hero-panoramic-hd.png"
              alt="Fresh Fruits Online - Farm to Home"
              className="hero-bg-img"
            />
            <div className="hero-left-vignette"></div>
          </div>

          <div className="hero-overlay-content">
            <div className="hero-leaf-accent">
              <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
                <path d="M13 9C13 9 16 3 23 4C23 11 18 15 13 15L13 9Z" fill="#589F2A" />
                <path d="M6 20C6 20 11 17 16 20C15 26 9 27 5 24L6 20Z" fill="#6FB736" />
                <path d="M16 27C16 27 23 23 28 27C26 34 19 34 14 31L16 27Z" fill="#478B20" />
              </svg>
            </div>

            <h1 className="hero-headline">
              Fresh Fruits<br />
              <span>Online</span>
            </h1>

            <p className="hero-tagline">From Farm to Your Home</p>

            <button className="hero-action-btn" onClick={handleBookNow}>
              <span>Book Now</span>
              <ArrowRight size={18} className="hero-btn-arrow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
