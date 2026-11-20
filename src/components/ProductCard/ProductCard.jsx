import { ShoppingCart, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="product-card">
      <div className="product-card-top">
        {product.discount ? (
          <span className="product-discount-badge">{product.discount}% OFF</span>
        ) : (
          <div></div>
        )}
        <button
          className={`product-heart-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={16} fill={isWishlisted ? '#e53e3e' : 'none'} color={isWishlisted ? '#e53e3e' : '#8fa088'} />
        </button>
      </div>

      <div className="product-image-area">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="product-details">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-weight">{product.weight}</p>
        
        <div className="product-price-row">
          <span className="product-current-price">₹{product.price}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="product-old-price">₹{product.originalPrice}</span>
          )}
        </div>

        <button className="product-book-btn" onClick={() => addToCart(product)}>
          <ShoppingCart size={15} />
          <span>Book Now</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
