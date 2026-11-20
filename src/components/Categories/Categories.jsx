import { useApp } from '../../context/AppContext';
import { categories } from '../../data/products';
import './Categories.css';

const Categories = () => {
  const { selectedCategory, setSelectedCategory, setSearchQuery } = useApp();

  const handleCategoryClick = (categoryId) => {
    setSearchQuery('');
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
      setTimeout(() => {
        const el = document.getElementById('popular-picks');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <section className="categories" id="categories-section">
      <div className="categories-container">
        <div className="categories-header">
          <div className="categories-line"></div>
          <h2 className="categories-title">Shop by Category</h2>
          <div className="categories-line"></div>
        </div>

        <div className="categories-grid">
          {categories.map(category => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                className={`category-card ${isSelected ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
                title={`Filter by ${category.name}`}
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} loading="lazy" />
                </div>
                <span className="category-name">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
