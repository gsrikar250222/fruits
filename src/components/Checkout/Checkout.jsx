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
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './Checkout.css';

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
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (cart.length === 0) {
    return (
      <div className="checkout-wrapper">
        <div className="checkout-empty">
          <h2>Your cart is empty</h2>
          <p>Add some fresh fruits before checking out.</p>
          <button onClick={() => setCurrentPage('home')}>
            <ArrowLeft size={16} /> Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        <button className="checkout-back" onClick={() => setCurrentPage('home')}>
          <ArrowLeft size={18} /> Back to Shopping
        </button>

        <h2 className="checkout-title">Checkout</h2>

        <div className="checkout-layout">
          {/* Form */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
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
                {errors.name && <span className="form-error">{errors.name}</span>}
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
                {errors.mobile && <span className="form-error">{errors.mobile}</span>}
              </div>
            </div>

            <div className="form-section">
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
                {errors.address && <span className="form-error">{errors.address}</span>}
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
                {errors.pincode && <span className="form-error">{errors.pincode}</span>}
              </div>
            </div>

            <div className="form-section">
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
                  {errors.deliveryDate && (
                    <span className="form-error">{errors.deliveryDate}</span>
                  )}
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
                  {errors.timeSlot && (
                    <span className="form-error">{errors.timeSlot}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
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
                  <Banknote size={20} />
                  <div>
                    <span className="payment-label">Cash on Delivery</span>
                    <span className="payment-desc">Pay when you receive</span>
                  </div>
                </label>

                <label className={`payment-option ${form.paymentMethod === 'online' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={form.paymentMethod === 'online'}
                    onChange={handleChange}
                  />
                  <CreditCard size={20} />
                  <div>
                    <span className="payment-label">Online Payment</span>
                    <span className="payment-desc">UPI / Card / Net Banking</span>
                  </div>
                </label>
              </div>
            </div>

            <button type="submit" className="checkout-submit">
              <ShieldCheck size={18} />
              Place Order — ₹{cartTotal}
            </button>
          </form>

          {/* Order Summary */}
          <div className="order-summary-card">
            <h3>Order Summary</h3>

            <div className="summary-items">
              {cart.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-img">
                    <img src={item.image} alt={item.name} />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
