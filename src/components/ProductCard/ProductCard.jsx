import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ShoppingCart, Heart, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { tintFor } from '../../lib/images';
import flyToCart from '../../lib/flyToCart';
import SmartImage from '../ui/SmartImage';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const isWishlisted = isInWishlist(product.id);
  const imgRef = useRef(null);
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const handleAdd = () => {
    addToCart(product);
    flyToCart(imgRef.current);
    setJustAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article className="product-card" style={{ '--tint': tintFor(product.category) }}>
      <div className="product-image-area">
        <div className="product-card-top">
          {product.discount ? (
            <span className="product-discount-badge">{product.discount}% OFF</span>
          ) : (
            <span />
          )}
          <motion.button
            className={`product-heart-btn ${isWishlisted ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={isWishlisted}
            whileTap={{ scale: 0.8 }}
          >
            <motion.span
              key={isWishlisted ? 'on' : 'off'}
              initial={isWishlisted ? { scale: 0.3 } : false}
              animate={{ scale: [null, 1.25, 1] }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{ display: 'grid' }}
            >
              <Heart size={17} fill={isWishlisted ? '#d63f4f' : 'none'} color={isWishlisted ? '#d63f4f' : '#6c786d'} />
            </motion.span>
            {isWishlisted && <span className="heart-burst" aria-hidden="true" />}
          </motion.button>
        </div>

        <SmartImage
          ref={imgRef}
          src={product.image}
          alt={product.name}
          className="product-media"
          width="400"
          height="400"
          sizes="(max-width: 640px) 50vw, 260px"
        />
      </div>

      <div className="product-details">
        <div className="product-meta">
          <span className="product-weight">{product.weight}</span>
          {product.inStock && (
            <span className="product-stock">
              <span className="product-stock-dot" /> In stock
            </span>
          )}
        </div>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-price-row">
          <span className="product-current-price">₹{product.price}</span>
          {hasDiscount && (
            <>
              <span className="product-old-price">₹{product.originalPrice}</span>
              <span className="product-save">Save ₹{product.originalPrice - product.price}</span>
            </>
          )}
        </div>

        <motion.button
          className={`product-book-btn ${justAdded ? 'is-added' : ''}`}
          onClick={handleAdd}
          whileTap={{ scale: 0.95 }}
          aria-label={`Add ${product.name} to cart`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {justAdded ? (
              <motion.span
                key="added"
                className="product-book-label"
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Check size={16} strokeWidth={3} /> Added
              </motion.span>
            ) : (
              <motion.span
                key="book"
                className="product-book-label"
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ShoppingCart size={15} /> Book Now
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </article>
  );
};

export default ProductCard;
