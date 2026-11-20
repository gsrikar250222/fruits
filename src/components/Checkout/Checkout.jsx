import { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Phone,
  User,
  Calendar,
  Clock,
  CreditCard,
  Banknote,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { tintFor, webpOf } from '../../lib/images';
import { ease } from '../../lib/motion';
import './Checkout.css';

const sectionAnim = (i) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: 0.08 + i * 0.07 } },
});

const FieldError = ({ msg }) => (
  <AnimatePresence initial={false}>
    {msg && (
      <motion.span
        className="form-error"
        role="alert"
        initial={{ opacity: 0, height: 0, y: -4 }}
        animate={{ opacity: 1, height: 'auto', y: 0 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.25 }}
      >
        {msg}
      </motion.span>
    )}
  </AnimatePresence>
);

const Checkout = () => {
  const {
    cart,
    cartSubtotal,
    cartTotal,
    deliveryFee,
    setCurrentPage,
    placeOrder,
  } = useApp();

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    address: '',
    pincode: '',
    deliveryDate: '',
    timeSlot: '',
    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState({});
  const [shakeKey, setShakeKey] = useState(0);

  const timeSlots = [
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM',
    '7:00 PM - 9:00 PM',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(form.mobile.trim()))
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(form.pincode.trim()))
      newErrors.pincode = 'Enter a valid 6-digit pincode';
    if (!form.deliveryDate) newErrors.deliveryDate = 'Select a delivery date';
    if (!form.timeSlot) newErrors.timeSlot = 'Select a time slot';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      placeOrder(form);
    } else {
      setShakeKey(k => k + 1);
      requestAnimationFrame(() => {
        const firstError = document.querySelector('.checkout-form .error');
        firstError?.focus({ preventScroll: true });
        firstError?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (cart.length === 0) {
    return (
      <div className="checkout-wrapper">
        <motion.div className="checkout-empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease } }}>
          <h2>Your cart is empty</h2>
          <p>Add some fresh fruits before checking out.</p>
          <button className="btn btn--primary" onClick={() => setCurrentPage('home')}>
            <ArrowLeft size={16} /> Back to Shop
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        <button className="checkout-back" onClick={() => setCurrentPage('home')}>
          <ArrowLeft size={18} /> Back to Shopping
        </button>

        <div className="checkout-head">
          <motion.h2 className="checkout-title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease } }}>
            Checkout
          </motion.h2>
          <ol className="checkout-steps" aria-label="Checkout progress">
            <li className="done"><span><Check size={12} strokeWidth={3} /></span>Cart</li>
            <li className="current" aria-current="step"><span>2</span>Details</li>
            <li><span>3</span>Confirmation</li>
          </ol>
        </div>

        <div className="checkout-layout">
          {/* Form */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <motion.div className="form-section" {...sectionAnim(0)}>
              <h3 className="form-section-title">
                <User size={18} /> Personal Details
              </h3>

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'error' : ''}
                />
                <FieldError msg={errors.name} />
              </div>

              <div className="form-group">
                <label>Mobile Number *</label>
                <div className="input-with-icon">
                  <Phone size={16} />
                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className={errors.mobile ? 'error' : ''}
                  />
                </div>
                <FieldError msg={errors.mobile} />
              </div>
            </motion.div>

            <motion.div className="form-section" {...sectionAnim(1)}>
              <h3 className="form-section-title">
                <MapPin size={18} /> Delivery Address
              </h3>

              <div className="form-group">
                <label>Full Address *</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="House/Flat No., Street, Locality, City"
                  rows={3}
                  className={errors.address ? 'error' : ''}
                />
                <FieldError msg={errors.address} />
              </div>

              <div className="form-group">
                <label>Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                  maxLength={6}
                  className={errors.pincode ? 'error' : ''}
                />
                <FieldError msg={errors.pincode} />
              </div>
            </motion.div>

            <motion.div className="form-section" {...sectionAnim(2)}>
              <h3 className="form-section-title">
                <Calendar size={18} /> Delivery Schedule
              </h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Delivery Date *</label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={form.deliveryDate}
                    onChange={handleChange}
                    min={today}
                    className={errors.deliveryDate ? 'error' : ''}
                  />
                  <FieldError msg={errors.deliveryDate} />
                </div>

                <div className="form-group">
                  <label>Time Slot *</label>
                  <select
                    name="timeSlot"
                    value={form.timeSlot}
                    onChange={handleChange}
                    className={errors.timeSlot ? 'error' : ''}
                  >
                    <option value="">Select time slot</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  <FieldError msg={errors.timeSlot} />
                </div>
              </div>
            </motion.div>

            <motion.div className="form-section" {...sectionAnim(3)}>
              <h3 className="form-section-title">
                <CreditCard size={18} /> Payment Method
              </h3>

              <div className="payment-options">
                <label className={`payment-option ${form.paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={form.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <span className="payment-icon"><Banknote size={20} /></span>
                  <div>
                    <span className="payment-label">Cash on Delivery</span>
                    <span className="payment-desc">Pay when you receive</span>
                  </div>
                  {form.paymentMethod === 'cod' && (
                    <motion.span layoutId="payment-check" className="payment-check"><Check size={13} strokeWidth={3} /></motion.span>
                  )}
                </label>

                <label className={`payment-option ${form.paymentMethod === 'online' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={form.paymentMethod === 'online'}
                    onChange={handleChange}
                  />
                  <span className="payment-icon"><CreditCard size={20} /></span>
                  <div>
                    <span className="payment-label">Online Payment</span>
                    <span className="payment-desc">UPI / Card / Net Banking</span>
                  </div>
                  {form.paymentMethod === 'online' && (
                    <motion.span layoutId="payment-check" className="payment-check"><Check size={13} strokeWidth={3} /></motion.span>
                  )}
                </label>
              </div>
            </motion.div>

            <motion.button
              key={shakeKey}
              type="submit"
              className="btn btn--primary checkout-submit"
              whileTap={{ scale: 0.98 }}
              animate={shakeKey ? { x: [0, -10, 10, -6, 6, 0] } : undefined}
              transition={{ duration: 0.45 }}
            >
              <ShieldCheck size={18} />
              Place Order — ₹{cartTotal}
            </motion.button>
          </form>

          {/* Order Summary */}
          <motion.aside
            className="order-summary-card"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.2 } }}
          >
            <h3>Order Summary</h3>

            <div className="summary-items">
              {cart.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-img" style={{ background: tintFor(item.category) }}>
                    <picture>
                      <source type="image/webp" srcSet={webpOf(item.image)} />
                      <img src={item.image} alt={item.name} width="56" height="56" />
                    </picture>
                  </div>
                  <div className="summary-item-info">
                    <span className="summary-item-name">{item.name}</span>
                    <span className="summary-item-qty">{item.weight} × {item.quantity}</span>
                  </div>
                  <span className="summary-item-price">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? 'free' : ''}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>
            <p className="summary-secure"><ShieldCheck size={14} /> Secure checkout · Cash on delivery available</p>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
