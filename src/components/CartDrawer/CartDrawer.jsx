import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { lockScroll } from '../../lib/scroll';
import { tintFor, webpOf } from '../../lib/images';
import { ease } from '../../lib/motion';
import RollingNumber from '../ui/RollingNumber';
import './CartDrawer.css';

const FREE_DELIVERY_AT = 499;

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotal,
    deliveryFee,
    cartCount,
    setCurrentPage,
  } = useApp();

  const closeRef = useRef(null);

  useEffect(() => {
    if (!isCartOpen) return undefined;
    lockScroll(true);
    const prevFocus = document.activeElement;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e) => e.key === 'Escape' && setIsCartOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, [isCartOpen, setIsCartOpen]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progress = Math.min(100, (cartSubtotal / FREE_DELIVERY_AT) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            key="overlay"
            className="cart-overlay"
            onClick={() => setIsCartOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.aside
            key="drawer"
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            data-lenis-prevent
            initial={{ x: '100%' }}
            animate={{ x: 0, transition: { duration: 0.55, ease } }}
            exit={{ x: '100%', transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } }}
          >
            <div className="cart-drawer-header">
              <div className="cart-drawer-title">
                <span className="cart-drawer-title-icon"><ShoppingBag size={20} /></span>
                <h3>
                  Your Cart <span className="cart-drawer-count">(<RollingNumber value={cartCount} />)</span>
                </h3>
              </div>
              <button ref={closeRef} className="cart-close" onClick={() => setIsCartOpen(false)} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <motion.div
                className="cart-empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5, ease } }}
              >
                <span className="cart-empty-icon"><ShoppingBag size={40} strokeWidth={1.4} /></span>
                <h4>Your cart is empty</h4>
                <p>Add fresh fruits to get started!</p>
                <button className="btn btn--primary cart-empty-btn" onClick={() => setIsCartOpen(false)}>
                  Continue Shopping
                </button>
              </motion.div>
            ) : (
              <>
                {/* Free delivery progress (uses the existing ₹499 threshold) */}
                <div className="cart-progress">
                  <div className="cart-progress-text">
                    <Truck size={16} />
                    {deliveryFee > 0 ? (
                      <span className="cart-free-delivery-hint">Add ₹{FREE_DELIVERY_AT - cartSubtotal} more for free delivery!</span>
                    ) : (
                      <span>You've unlocked <strong>free delivery</strong> 🎉</span>
                    )}
                  </div>
                  <div className="cart-progress-track">
                    <motion.div
                      className="cart-progress-bar"
                      initial={false}
                      animate={{ width: `${progress}%` }}
                      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    />
                  </div>
                </div>

                <div className="cart-items">
                  <AnimatePresence initial={false}>
                    {cart.map((item, i) => (
                      <motion.div
                        key={item.id}
                        layout
                        className="cart-item"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0, transition: { duration: 0.45, ease, delay: 0.1 + i * 0.05 } }}
                        exit={{ opacity: 0, x: 60, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0, transition: { duration: 0.3 } }}
                      >
                        <div className="cart-item-image" style={{ background: tintFor(item.category) }}>
                          <picture>
                            <source type="image/webp" srcSet={webpOf(item.image)} />
                            <img src={item.image} alt={item.name} width="72" height="72" />
                          </picture>
                        </div>
                        <div className="cart-item-details">
                          <h4 className="cart-item-name">{item.name}</h4>
                          <span className="cart-item-weight">{item.weight}</span>
                          <span className="cart-item-price">
                            <RollingNumber value={item.price * item.quantity} prefix="₹" />
                          </span>
                        </div>
                        <div className="cart-item-actions">
                          <div className="cart-qty-control">
                            <motion.button whileTap={{ scale: 0.85 }} onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease ${item.name}`}>
                              <Minus size={14} />
                            </motion.button>
                            <RollingNumber value={item.quantity} className="cart-qty-value" />
                            <motion.button whileTap={{ scale: 0.85 }} onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase ${item.name}`}>
                              <Plus size={14} />
                            </motion.button>
                          </div>
                          <button
                            className="cart-item-remove"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="cart-summary">
                  <div className="cart-summary-row">
                    <span>Subtotal</span>
                    <RollingNumber value={cartSubtotal} prefix="₹" />
                  </div>
                  <div className="cart-summary-row">
                    <span>Delivery</span>
                    <span className={deliveryFee === 0 ? 'free-delivery' : ''}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="cart-summary-row cart-total-row">
                    <span>Total</span>
                    <RollingNumber value={cartTotal} prefix="₹" />
                  </div>
                  <button className="btn btn--primary cart-checkout-btn" onClick={handleCheckout}>
                    Proceed to Checkout <ArrowRight size={18} className="btn-arrow" />
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
