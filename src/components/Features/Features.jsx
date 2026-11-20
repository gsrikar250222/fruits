import { motion } from 'motion/react';
import { Leaf, Truck, ShieldCheck, Headphones } from 'lucide-react';
import { ease, inView } from '../../lib/motion';
import './Features.css';

const features = [
  { icon: Leaf, title: 'Natural & Fresh', text: 'Farm-direct daily harvest' },
  { icon: Truck, title: 'Quick Delivery', text: 'Free on orders above ₹499' },
  { icon: ShieldCheck, title: 'Safe & Secure', text: 'Secure payments & cash on delivery' },
  { icon: Headphones, title: '24/7 Support', text: 'Call +91 98765 43210' },
];

const list = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const rise = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };

const Features = () => {
  return (
    <section className="features-strip" aria-label="Why Fruteria">
      <motion.div
        className="features-strip-container"
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={inView}
      >
        {features.map(({ icon: Icon, title, text }) => (
          <motion.div className="feature-strip-item" key={title} variants={rise}>
            <span className="feature-strip-icon-wrap">
              <Icon size={22} className="feature-strip-icon" />
            </span>
            <span className="feature-strip-copy">
              <span className="feature-strip-text">{title}</span>
              <span className="feature-strip-sub">{text}</span>
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
