import { AnimatePresence, motion } from 'motion/react';
import { Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import products from '../../data/products';
import { ease } from '../../lib/motion';
import ProductCard from '../ProductCard/ProductCard';
import RollingNumber from '../ui/RollingNumber';
import './SearchResults.css';

const SearchResults = () => {
  const { searchQuery, setSearchQuery } = useApp();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="search-results" id="search-results">
      <div className="search-results-container">
        <div className="search-results-header">
          <span className="search-results-icon"><Search size={20} /></span>
          <div>
            <span className="eyebrow">Search</span>
            <h2>
              Results for “<span>{searchQuery}</span>”
            </h2>
          </div>
          <span className="search-count">
            <RollingNumber value={filtered.length} /> found
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              className="search-empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <span className="search-empty-icon"><Search size={36} strokeWidth={1.5} /></span>
              <h3>No fruits found</h3>
              <p>Try a different search term like "apple", "mango", or "grapes".</p>
              <button className="btn btn--primary" onClick={() => setSearchQuery('')}>Clear Search</button>
            </motion.div>
          ) : (
            <motion.div key="grid" className="search-grid" layout>
              <AnimatePresence mode="popLayout" initial={false}>
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 24, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease, delay: Math.min(i, 6) * 0.05 } }}
                    exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SearchResults;
