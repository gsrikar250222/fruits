import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { categories } from '../../data/products';
import { scrollToId } from '../../lib/scroll';
import { tintFor } from '../../lib/images';
import { ease, inView } from '../../lib/motion';
import SmartImage from '../ui/SmartImage';
import Reveal from '../ui/Reveal';
import './Categories.css';

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = {
  hidden: { opacity: 0, y: 26, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } },
};

const Categories = () => {
  const { selectedCategory, setSelectedCategory, setSearchQuery } = useApp();

  const handleCategoryClick = (categoryId) => {
    setSearchQuery('');
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
      scrollToId('popular-picks');
    }
  };

  return (
    <section className="categories" id="categories-section">
      <div className="categories-container">
        <Reveal className="categories-header">
          <span className="eyebrow">Browse the orchard</span>
          <h2 className="section-title categories-title">Shop by <em>Category</em></h2>
        </Reveal>

        <motion.div
          className="categories-grid"
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {categories.map(category => {
            const isSelected = selectedCategory === category.id;
            return (
              <motion.button
                key={category.id}
                variants={item}
                className={`category-card ${isSelected ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
                title={`Filter by ${category.name}`}
                aria-pressed={isSelected}
                style={{ '--tint': tintFor(category.id) }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="category-image">
                  <SmartImage src={category.image} alt="" width="120" height="120" sizes="120px" />
                </span>
                <span className="category-name">{category.name}</span>
                {isSelected && (
                  <motion.span
                    layoutId="category-check"
                    className="category-check"
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  >
                    <Check size={13} strokeWidth={3} />
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
