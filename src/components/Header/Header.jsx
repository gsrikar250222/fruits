import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './Header.css';

const Header = () => {
  const {
    searchQuery,
    setSearchQuery,
    cartCount,
    setIsCartOpen,
    currentPage,
    setCurrentPage,
    setSelectedCategory,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Shop', id: 'shop', hasDropdown: true },
    { label: 'Categories', id: 'categories', hasDropdown: true },
    { label: 'Offers', id: 'offers' },
    { label: 'About Us', id: 'about' },
    { label: 'Track Order', id: 'track' },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    setSearchQuery('');
    if (id === 'home') {
      setCurrentPage('home');
      setSelectedCategory(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'shop' || id === 'offers') {
      setCurrentPage('home');
      setSelectedCategory(null);
      setTimeout(() => {
        const el = document.getElementById('popular-picks');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (id === 'categories') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById('categories-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (id === 'about') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById('footer');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (id === 'track') {
      setCurrentPage('home');
      alert('Tracking Feature: Enter your Order ID on checkout confirmation to track live farm-to-home fruit delivery!');
    }
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo */}
        <div className="brand-logo" onClick={() => handleNavClick('home')}>
          <div className="brand-leaf-icon">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path
                d="M17 31C17 31 17 21 27 15C27 25 21 31 17 31Z"
                fill="#12601D"
              />
              <path
                d="M17 31C17 31 17 17 7 11C7 22 13 31 17 31Z"
                fill="#3BA52C"
              />
              <path
                d="M17 31V7"
                stroke="#12601D"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="brand-meta">
            <span className="brand-name">Fruteria</span>
            <span className="brand-tagline">Freshness Delivered</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-pill ${item.id === 'home' && currentPage === 'home' ? 'active-pill' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <span>{item.label}</span>
              {item.hasDropdown && <span className="nav-dropdown-carat">▾</span>}
            </button>
          ))}
        </nav>

        {/* Right tools */}
        <div className="header-tools">
          <div className="search-pill">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search fresh fruits..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentPage !== 'home') setCurrentPage('home');
              }}
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
              >
                <X size={13} />
              </button>
            )}
          </div>

          <button className="user-icon-btn" title="Account / Profile">
            <User size={20} />
          </button>

          <button
            className="cart-icon-btn"
            onClick={() => setIsCartOpen(true)}
            title="Shopping Cart"
          >
            <ShoppingCart size={20} />
            <span className="cart-count-badge">{cartCount}</span>
          </button>

          <button
            className="mobile-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-panel">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`mobile-nav-link ${item.id === 'home' && currentPage === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
