import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './CartDrawer.css';

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

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
      <div className="cart-drawer">
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            <ShoppingBag size={22} />
            <h3>Your Cart ({cartCount})</h3>
          </div>
          <button className="cart-close" onClick={() => setIsCartOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBag size={64} strokeWidth={1} />
            <h4>Your cart is empty</h4>
            <p>Add fresh fruits to get started!</p>
            <button className="cart-empty-btn" onClick={() => setIsCartOpen(false)}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <span className="cart-item-weight">{item.weight}</span>
                    <span className="cart-item-price">₹{item.price * item.quantity}</span>
                  </div>
                  <div className="cart-item-actions">
                    <div className="cart-qty-control">
                      <button onClick={() => updateQuantity(item.id, -1)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>
              <div className="cart-summary-row">
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? 'free-delivery' : ''}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <div className="cart-free-delivery-hint">
                  Add ₹{499 - cartSubtotal} more for free delivery!
                </div>
              )}
              <div className="cart-summary-row cart-total-row">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
              <button className="cart-checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
