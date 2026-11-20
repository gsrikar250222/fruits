import { Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import products from '../../data/products';
import ProductCard from '../ProductCard/ProductCard';
import './SearchResults.css';

const SearchResults = () => {
  const { searchQuery, setSearchQuery } = useApp();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="search-results">
      <div className="search-results-container">
        <div className="search-results-header">
          <Search size={20} />
          <h2>
            Search results for "<span>{searchQuery}</span>"
          </h2>
          <span className="search-count">{filtered.length} found</span>
        </div>

        {filtered.length === 0 ? (
          <div className="search-empty">
            <Search size={48} strokeWidth={1} />
            <h3>No fruits found</h3>
            <p>Try a different search term like "apple", "mango", or "grapes".</p>
            <button onClick={() => setSearchQuery('')}>Clear Search</button>
          </div>
        ) : (
          <div className="search-grid">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
