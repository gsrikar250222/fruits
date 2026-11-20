import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Package,
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  ArrowRight,
  Copy,
  Check,
  ClipboardCheck,
  PackageCheck,
  Truck,
  Home,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { tintFor, webpOf } from '../../lib/images';
import { ease } from '../../lib/motion';
import './OrderConfirmation.css';

const rise = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay } },
});

const OrderConfirmation = () => {
  const { orderDetails, setCurrentPage } = useApp();
  const [copied, setCopied] = useState(false);

  if (!orderDetails) {
    return (
      <div className="order-wrapper">
        <div className="order-not-found">
          <h2>No order found</h2>
          <button className="btn btn--primary" onClick={() => setCurrentPage('home')}>
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const { orderId, items, subtotal, deliveryFee, total, customer, date, time } = orderDetails;

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  const steps = [
    { icon: ClipboardCheck, label: 'Order placed', sub: `${date}, ${time}`, done: true },
    { icon: PackageCheck, label: 'Packed at farm', sub: 'Pending' },
    { icon: Truck, label: 'Out for delivery', sub: customer.timeSlot },
    { icon: Home, label: 'Delivered', sub: customer.deliveryDate },
  ];

  return (
    <div className="order-wrapper">
      <div className="order-container">
        {/* Animated success mark */}
        <div className="order-success-icon" aria-hidden="true">
          <span className="order-ring order-ring--1" />
          <span className="order-ring order-ring--2" />
          <motion.svg
            viewBox="0 0 64 64"
            width="84"
            height="84"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          >
            <circle cx="32" cy="32" r="30" fill="#145128" />
            <motion.path
              d="M19 33.5 L28 42 L45 23"
              fill="none"
              stroke="#fff"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.35 }}
            />
          </motion.svg>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="order-confetti" style={{ '--i': i }} />
          ))}
        </div>

        <motion.h1 className="order-success-title" {...rise(0.25)}>Order Placed Successfully!</motion.h1>
        <motion.p className="order-success-subtitle" {...rise(0.35)}>
          Thank you for shopping with Fruteria. Your fresh fruits are on the way!
        </motion.p>

        <motion.div className="order-id-card" {...rise(0.45)}>
          <span className="order-id-label">Order ID</span>
          <span className="order-id-value">{orderId}</span>
          <button className="order-id-copy" onClick={copyId} aria-label="Copy order ID">
            {copied ? <Check size={15} strokeWidth={3} /> : <Copy size={15} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </motion.div>

        {/* Order status tracker */}
        <motion.ol className="order-tracker" aria-label="Order status" {...rise(0.55)}>
          {steps.map(({ icon: Icon, label, sub, done }, i) => (
            <li key={label} className={done ? 'done' : ''}>
              <span className="order-tracker-dot">
                <Icon size={18} />
              </span>
              <span className="order-tracker-text">
                <strong>{label}</strong>
                <small>{sub}</small>
              </span>
              {i < steps.length - 1 && (
                <span className="order-tracker-line">
                  {done && (
                    <motion.span
                      className="order-tracker-fill"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 0.5 }}
                      transition={{ duration: 0.9, ease, delay: 1 }}
                    />
                  )}
                </span>
              )}
            </li>
          ))}
        </motion.ol>

        <div className="order-details-grid">
          {/* Order Items */}
          <motion.div className="order-section" {...rise(0.65)}>
            <h3><Package size={18} /> Order Items</h3>
            <div className="order-items-list">
              {items.map(item => (
                <div key={item.id} className="order-item-row">
                  <div className="order-item-img" style={{ background: tintFor(item.category) }}>
                    <picture>
                      <source type="image/webp" srcSet={webpOf(item.image)} />
                      <img src={item.image} alt={item.name} width="52" height="52" />
                    </picture>
                  </div>
                  <div className="order-item-info">
                    <span className="order-item-name">{item.name}</span>
                    <span className="order-item-qty">{item.weight} × {item.quantity}</span>
                  </div>
                  <span className="order-item-price">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="order-price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="price-row">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="price-row total">
                <span>Total Paid</span>
                <span>₹{total}</span>
              </div>
            </div>
          </motion.div>

          {/* Delivery Details */}
          <motion.div className="order-section" {...rise(0.75)}>
            <h3><MapPin size={18} /> Delivery Details</h3>

            <div className="delivery-detail">
              <span className="detail-label">Name</span>
              <span className="detail-value">{customer.name}</span>
            </div>
            <div className="delivery-detail">
              <span className="detail-label">Mobile</span>
              <span className="detail-value">+91 {customer.mobile}</span>
            </div>
            <div className="delivery-detail">
              <span className="detail-label">Address</span>
              <span className="detail-value">{customer.address}</span>
            </div>
            <div className="delivery-detail">
              <span className="detail-label">Pincode</span>
              <span className="detail-value">{customer.pincode}</span>
            </div>
            <div className="delivery-detail">
              <span className="detail-label"><Calendar size={14} /> Date</span>
              <span className="detail-value">{customer.deliveryDate}</span>
            </div>
            <div className="delivery-detail">
              <span className="detail-label"><Clock size={14} /> Time Slot</span>
              <span className="detail-value">{customer.timeSlot}</span>
            </div>
            <div className="delivery-detail">
              <span className="detail-label"><CreditCard size={14} /> Payment</span>
              <span className="detail-value">
                {customer.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div className="order-actions" {...rise(0.85)}>
          <button className="btn btn--primary order-home-btn" onClick={() => setCurrentPage('home')}>
            Continue Shopping <ArrowRight size={16} className="btn-arrow" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
