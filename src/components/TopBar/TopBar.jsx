import { Leaf, Truck, ShieldCheck, Smile } from 'lucide-react';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar-container">
        <div className="topbar-item">
          <Leaf size={18} className="topbar-icon" />
          <span>100% Fresh & Natural</span>
          <span className="topbar-leaf-emoji">🍃</span>
        </div>
        <div className="topbar-divider"></div>
        <div className="topbar-item">
          <Truck size={18} className="topbar-icon" />
          <span>Fast Home Delivery</span>
        </div>
        <div className="topbar-divider"></div>
        <div className="topbar-item">
          <ShieldCheck size={18} className="topbar-icon" />
          <span>Secure Payments</span>
        </div>
        <div className="topbar-divider"></div>
        <div className="topbar-item">
          <Smile size={18} className="topbar-icon" />
          <span>Happy Customers</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
