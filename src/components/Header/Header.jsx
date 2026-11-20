import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { categories } from '../../data/products';
import { scrollToId, scrollToTop, lockScroll } from '../../lib/scroll';
import { webpOf } from '../../lib/images';
import { ease } from '../../lib/motion';
import RollingNumber from '../ui/RollingNumber';
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
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const searchRef = useRef(null);

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
    setOpenDropdown(null);
    setSearchQuery('');
    if (id === 'home') {
      setCurrentPage('home');
      setSelectedCategory(null);
      scrollToTop();
    } else if (id === 'shop' || id === 'offers') {
      setCurrentPage('home');
      setSelectedCategory(null);
      scrollToId('popular-picks');
    } else if (id === 'categories') {
      setCurrentPage('home');
      scrollToId('categories-section');
    } else if (id === 'about') {
      setCurrentPage('home');
      scrollToId('footer');
    } else if (id === 'track') {
      setCurrentPage('home');
      alert('Tracking Feature: Enter your Order ID on checkout confirmation to track live farm-to-home fruit delivery!');
    }
  };

  // Same behaviour as choosing a card in "Shop by Category".
  const handleCategoryPick = (categoryId) => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setSearchQuery('');
    setCurrentPage('home');
    setSelectedCategory(categoryId);
    scrollToId('popular-picks');
  };

  const dropdowns = {
    shop: [
      { label: 'All fresh fruits', hint: 'Browse every fresh pick', onClick: () => handleNavClick('shop') },
      { label: "Today's offers", hint: 'Discounts on daily favourites', onClick: () => handleNavClick('offers') },
      { label: 'Seasonal Specials', hint: 'Curated seasonal boxes', onClick: () => handleCategoryPick('Seasonal Specials') },
    ],
  };

  // Header condenses after scrolling a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // "/" focuses search, Escape closes menus.
  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    lockScroll(mobileMenuOpen);
    return () => lockScroll(false);
  }, [mobileMenuOpen]);

  const renderDropdown = (id) => {
    if (id === 'categories') {
      return (
        <div className="nav-dropdown nav-dropdown--grid">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              className="dropdown-cat"
              onClick={() => handleCategoryPick(cat.id)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.03 * i, duration: 0.35, ease } }}
            >
              <span className="dropdown-cat-img">
                <picture>
                  <source type="image/webp" srcSet={webpOf(cat.image)} />
                  <img src={cat.image} alt="" width="44" height="44" loading="lazy" />
                </picture>
              </span>
              <span>{cat.name}</span>
            </motion.button>
          ))}
        </div>
      );
    }
    return (
      <div className="nav-dropdown">
        {dropdowns[id].map((entry, i) => (
          <motion.button
            key={entry.label}
            className="dropdown-link"
            onClick={entry.onClick}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.04 * i, duration: 0.35, ease } }}
          >
            <span>
              <strong>{entry.label}</strong>
              <small>{entry.hint}</small>
            </span>
            <ArrowRight size={16} />
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        {/* Logo */}
        <button className="brand-logo" onClick={() => handleNavClick('home')} aria-label="Fruteria home">
          <motion.div
            className="brand-leaf-icon"
            whileHover={{ rotate: -8, scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 300, damping: 14 }}
          >
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
              <path d="M17 31C17 31 17 21 27 15C27 25 21 31 17 31Z" fill="#145128" />
              <path d="M17 31C17 31 17 17 7 11C7 22 13 31 17 31Z" fill="#7DB343" />
              <path d="M17 31V7" stroke="#145128" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </motion.div>
          <div className="brand-meta">
            <span className="brand-name">Fruteria</span>
            <span className="brand-tagline">Freshness Delivered</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="desktop-nav" aria-label="Main" onMouseLeave={() => setHovered(null)}>
          {navItems.map(item => {
            const isActive = item.id === 'home' && currentPage === 'home';
            const isOpen = openDropdown === item.id;
            return (
              <div
                key={item.id}
                className="nav-item"
                onMouseEnter={() => {
                  setHovered(item.id);
                  setOpenDropdown(item.hasDropdown ? item.id : null);
                }}
                onMouseLeave={() => setOpenDropdown(null)}
                onFocus={() => item.hasDropdown && setOpenDropdown(item.id)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setOpenDropdown(null);
                }}
              >
                <button
                  className={`nav-pill ${isActive ? 'active-pill' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  aria-haspopup={item.hasDropdown ? 'true' : undefined}
                  aria-expanded={item.hasDropdown ? isOpen : undefined}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span layoutId="nav-active" className="nav-pill-active-bg" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  {hovered === item.id && !isActive && (
                    <motion.span layoutId="nav-hover" className="nav-pill-hover-bg" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />
                  )}
                  <span className="nav-pill-label">{item.label}</span>
                  {item.hasDropdown && <ChevronDown size={14} className={`nav-dropdown-carat ${isOpen ? 'open' : ''}`} />}
                </button>

                <AnimatePresence>
                  {item.hasDropdown && isOpen && (
                    <motion.div
                      className="nav-dropdown-wrap"
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease } }}
                      exit={{ opacity: 0, y: 6, scale: 0.98, transition: { duration: 0.15 } }}
                    >
                      {renderDropdown(item.id)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Right tools */}
        <div className="header-tools">
          <label className="search-pill">
            <Search size={17} className="search-icon" />
            <span className="sr-only">Search fresh fruits</span>
            <input
              ref={searchRef}
              type="search"
              placeholder="Search fresh fruits..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentPage !== 'home') setCurrentPage('home');
              }}
            />
            <AnimatePresence initial={false} mode="popLayout">
              {searchQuery ? (
                <motion.button
                  key="clear"
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                >
                  <X size={13} />
                </motion.button>
              ) : (
                <motion.kbd key="kbd" className="search-kbd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  /
                </motion.kbd>
              )}
            </AnimatePresence>
          </label>

          <button className="icon-btn user-icon-btn" title="Account / Profile" aria-label="Account">
            <User size={20} />
          </button>

          <motion.button
            id="cart-button"
            className="icon-btn cart-icon-btn"
            onClick={() => setIsCartOpen(true)}
            title="Shopping Cart"
            aria-label={`Shopping cart, ${cartCount} items`}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingCart size={20} />
            <motion.span
              key={cartCount}
              className={`cart-count-badge ${cartCount === 0 ? 'is-empty' : ''}`}
              initial={{ scale: 0.4 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              <RollingNumber value={cartCount} />
            </motion.span>
          </motion.button>

          <button
            className="icon-btn mobile-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={mobileMenuOpen ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{ display: 'grid' }}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="mobile-nav-scrim"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.nav
              className="mobile-nav-panel"
              aria-label="Mobile"
              data-lenis-prevent
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease } }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  className={`mobile-nav-link ${item.id === 'home' && currentPage === 'home' ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.04 * i + 0.05, duration: 0.35, ease } }}
                >
                  {item.label}
                  <ArrowRight size={18} />
                </motion.button>
              ))}
              <div className="mobile-nav-cats">
                {categories.map(cat => (
                  <button key={cat.id} className="mobile-cat-chip" onClick={() => handleCategoryPick(cat.id)}>
                    {cat.name}
                  </button>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
