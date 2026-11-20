import { Leaf, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <Leaf size={22} />
              </div>
              <div>
                <span className="footer-brand-name">Fruteria</span>
                <span className="footer-brand-tag">Freshness Delivered</span>
              </div>
            </div>
            <p className="footer-desc">
              Premium quality fresh fruits delivered from our farm to your doorstep. 
              Experience the taste of nature with Fruteria.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="#">Offers</a></li>
              <li><a href="#">About Us</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-links">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <div className="contact-item">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </div>
            <div className="contact-item">
              <Mail size={16} />
              <span>hello@fruteria.in</span>
            </div>
            <div className="contact-item">
              <MapPin size={16} />
              <span>Farm Fresh Road, Pune, India</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Fruteria. All rights reserved. Made with 💚 for fresh fruit lovers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
