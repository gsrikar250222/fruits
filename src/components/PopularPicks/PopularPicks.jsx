import { ArrowRight, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import products from '../../data/products';
import ProductCard from '../ProductCard/ProductCard';
import './PopularPicks.css';

const PopularPicks = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products.slice(0, 5);

  const handleViewAll = () => {
    setSelectedCategory(null);
  };

  const handleBookNowScroll = () => {
    const el = document.getElementById('categories-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="popular-picks" id="popular-picks">
      <div className="popular-container">
        <div className="popular-header">
          <h2 className="popular-title">
            {selectedCategory ? `${selectedCategory} Specials` : 'Fresh Picks for You'}
          </h2>
          {selectedCategory ? (
            <button className="popular-view-all" onClick={handleViewAll}>
              Show All Fruits <ArrowRight size={16} />
            </button>
          ) : (
            <button className="popular-view-all" onClick={() => setSelectedCategory(null)}>
              View All Fruits <ArrowRight size={16} />
            </button>
          )}
        </div>

        <div className="popular-layout">
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Promo Card: "Healthy Choice Happy You!" exactly matching reference */}
          {!selectedCategory && (
            <div className="promo-banner-card">
              <div className="promo-card-top">
                <div className="promo-card-titles">
                  <h3 className="promo-card-heading">
                    Healthy Choice<br />
                    <span>Happy You!</span>
                  </h3>
                  <p className="promo-card-sub">
                    Get fresh fruits at<br />your doorstep.
                  </p>
                </div>
                <div className="promo-card-heart">
                  <Heart size={24} color="#12601D" strokeWidth={1.8} />
                </div>
              </div>

              <button className="promo-card-btn" onClick={handleBookNowScroll}>
                <span>Book Now</span>
                <ArrowRight size={14} />
              </button>

              <div className="promo-card-image-wrap">
                <img
                  src="/images/promo-basket-hd.png"
                  alt="Healthy Choice Fruit Basket"
                  className="promo-card-basket"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularPicks;
