import { Leaf, Truck, ShieldCheck, Headphones } from 'lucide-react';
import './Features.css';

const Features = () => {
  return (
    <section className="features-strip">
      <div className="features-strip-container">
        <div className="feature-strip-item">
          <Leaf size={26} className="feature-strip-icon" />
          <span className="feature-strip-text">Natural & Fresh</span>
        </div>
        <div className="feature-strip-divider"></div>

        <div className="feature-strip-item">
          <Truck size={26} className="feature-strip-icon" />
          <span className="feature-strip-text">Quick Delivery</span>
        </div>
        <div className="feature-strip-divider"></div>

        <div className="feature-strip-item">
          <ShieldCheck size={26} className="feature-strip-icon" />
          <span className="feature-strip-text">Safe & Secure</span>
        </div>
        <div className="feature-strip-divider"></div>

        <div className="feature-strip-item">
          <Headphones size={26} className="feature-strip-icon" />
          <span className="feature-strip-text">24/7 Support</span>
        </div>
      </div>
    </section>
  );
};

export default Features;
