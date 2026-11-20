import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import products, { categories } from '../../data/products';
import { scrollToId } from '../../lib/scroll';
import { ease } from '../../lib/motion';
import ProductCard from '../ProductCard/ProductCard';
import SmartImage from '../ui/SmartImage';
import Reveal from '../ui/Reveal';
import './PopularPicks.css';

const PopularPicks = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products.slice(0, 5);

  const handleViewAll = () => {
    setSelectedCategory(null);
  };

  const handleBookNowScroll = () => scrollToId('categories-section');

  const filters = [{ id: null, name: 'All' }, ...categories];

  return (
    <section className="popular-picks" id="popular-picks">
      <div className="popular-container">
        <div className="popular-header">
          <Reveal className="popular-heading">
            <span className="eyebrow">Hand-picked this morning</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.h2
                key={selectedCategory || 'all'}
                className="section-title popular-title"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease } }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
              >
                {selectedCategory ? <>{selectedCategory} <em>Specials</em></> : <>Fresh Picks <em>for You</em></>}
              </motion.h2>
            </AnimatePresence>
          </Reveal>
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

        {/* Interactive category filters */}
        <Reveal className="filter-chips" role="toolbar" aria-label="Filter by category" delay={0.1}>
          <LayoutGroup id="filters">
            {filters.map(f => {
              const active = selectedCategory === f.id;
              return (
                <button
                  key={f.name}
                  className={`filter-chip ${active ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(f.id)}
                  aria-pressed={active}
                >
                  {active && (
                    <motion.span layoutId="filter-active" className="filter-chip-bg" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                  )}
                  <span className="filter-chip-label">{f.name}</span>
                </button>
              );
            })}
          </LayoutGroup>
        </Reveal>

        <motion.div className="products-grid" layout>
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                className="products-grid-item"
                layout
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                transition={{ duration: 0.65, ease, delay: Math.min(i, 5) * 0.07 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}

            {/* Promo Card: "Healthy Choice Happy You!" */}
            {!selectedCategory && (
              <motion.div
                key="promo"
                className="products-grid-item promo-slot"
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                transition={{ duration: 0.7, ease, delay: 0.35 }}
              >
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
                    <div className="promo-card-heart" aria-hidden="true">
                      <Heart size={22} color="#145128" strokeWidth={1.8} />
                    </div>
                  </div>

                  <button className="btn btn--primary btn--sm promo-card-btn" onClick={handleBookNowScroll}>
                    <span>Book Now</span>
                    <ArrowRight size={14} className="btn-arrow" />
                  </button>

                  <div className="promo-card-image-wrap">
                    <SmartImage
                      src="/images/promo-basket-hd.png"
                      alt="Healthy Choice Fruit Basket"
                      className="promo-card-media"
                      imgClassName="promo-card-basket"
                      width="400"
                      height="400"
                      sizes="300px"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularPicks;
