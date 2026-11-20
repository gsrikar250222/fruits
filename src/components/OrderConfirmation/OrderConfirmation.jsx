import {
  CheckCircle,
  Package,
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  ArrowRight,
  Printer,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderDetails, setCurrentPage } = useApp();

  if (!orderDetails) {
    return (
      <div className="order-wrapper">
        <div className="order-not-found">
          <h2>No order found</h2>
          <button onClick={() => setCurrentPage('home')}>
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const { orderId, items, subtotal, deliveryFee, total, customer, date, time } = orderDetails;

  return (
    <div className="order-wrapper">
      <div className="order-container">
        <div className="order-success-icon">
          <CheckCircle size={64} />
        </div>

        <h1 className="order-success-title">Order Placed Successfully!</h1>
        <p className="order-success-subtitle">
          Thank you for shopping with Fruteria. Your fresh fruits are on the way!
        </p>

        <div className="order-id-card">
          <span className="order-id-label">Order ID</span>
          <span className="order-id-value">{orderId}</span>
        </div>

        <div className="order-details-grid">
          {/* Order Items */}
          <div className="order-section">
            <h3><Package size={18} /> Order Items</h3>
            <div className="order-items-list">
              {items.map(item => (
                <div key={item.id} className="order-item-row">
                  <div className="order-item-img">
                    <img src={item.image} alt={item.name} />
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
          </div>

          {/* Delivery Details */}
          <div className="order-section">
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
          </div>
        </div>

        <div className="order-actions">
          <button className="order-home-btn" onClick={() => setCurrentPage('home')}>
            Continue Shopping <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
