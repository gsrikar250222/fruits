import { Leaf, Truck, ShieldCheck, Smile, Tag } from 'lucide-react';
import products from '../../data/products';
import './TopBar.css';

// Biggest live discount, read from the product catalogue.
const maxDiscount = Math.max(...products.map(p => p.discount || 0));

const items = [
  { icon: Leaf, text: '100% Fresh & Natural' },
  { icon: Truck, text: 'Fast Home Delivery' },
  { icon: Tag, text: `Up to ${maxDiscount}% off fresh picks` },
  { icon: ShieldCheck, text: 'Secure Payments' },
  { icon: Smile, text: 'Happy Customers' },
  { icon: Truck, text: 'Free delivery on orders above ₹499' },
];

/**
 * Infinite announcement ribbon — adapted from Magic UI's "Marquee"
 * (https://github.com/magicuidesign/magicui). Pure CSS, pauses on hover and
 * becomes a static row for reduced-motion users.
 */
const TopBar = () => {
  const row = (hidden) => (
    <ul className="topbar-track" aria-hidden={hidden || undefined}>
      {items.map(({ icon: Icon, text }, i) => (
        <li className="topbar-item" key={i}>
          <Icon size={16} className="topbar-icon" />
          <span>{text}</span>
          <span className="topbar-dot" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="topbar" role="region" aria-label="Store highlights">
      <div className="topbar-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
};

export default TopBar;
