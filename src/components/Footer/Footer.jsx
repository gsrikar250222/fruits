import { Leaf, Phone, Mail, MapPin } from 'lucide-react';
import Reveal from '../ui/Reveal';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <Reveal className="footer-grid">
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
          <nav className="footer-links" aria-label="Quick links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="#">Offers</a></li>
              <li><a href="#">About Us</a></li>
            </ul>
          </nav>

          {/* Customer Service */}
          <nav className="footer-links" aria-label="Customer service">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Return Policy</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <a className="contact-item" href="tel:+919876543210">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </a>
            <a className="contact-item" href="mailto:hello@fruteria.in">
              <Mail size={16} />
              <span>hello@fruteria.in</span>
            </a>
            <div className="contact-item">
              <MapPin size={16} />
              <span>Farm Fresh Road, Pune, India</span>
            </div>
          </div>
        </Reveal>

        <div className="footer-wordmark" aria-hidden="true">Fruteria</div>

        <div className="footer-bottom">
          <p>© 2026 Fruteria. All rights reserved. Made with 💚 for fresh fruit lovers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
