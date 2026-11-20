import { motion } from 'motion/react';
import { Sparkles, PhoneCall, ArrowRight, ShieldCheck } from 'lucide-react';
import { scrollToId } from '../../lib/scroll';
import { ease, inView } from '../../lib/motion';
import SmartImage from '../ui/SmartImage';
import './WholesaleBanner.css';

const list = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } };
const rise = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };

const perks = ['Farm-Direct Daily Harvest', 'No Middlemen, Best Prices', 'Bulk & Family Box Discounts'];

const WholesaleBanner = () => {
  const onMove = (e) => {
    // Spotlight that follows the cursor (Aceternity UI "spotlight" pattern).
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section className="wholesale-banner">
      <div className="wholesale-container">
        <motion.div
          className="wholesale-card"
          onPointerMove={onMove}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.9, ease }}
        >
          <div className="wholesale-glow wholesale-glow--a" aria-hidden="true" />
          <div className="wholesale-glow wholesale-glow--b" aria-hidden="true" />
          <div className="wholesale-spotlight" aria-hidden="true" />

          <motion.div className="wholesale-grid" variants={list} initial="hidden" whileInView="show" viewport={inView}>
            <div className="wholesale-text-col">
              <motion.div className="wholesale-badge" variants={rise}>
                <Sparkles size={15} />
                <span>Majha Agro Fresh Direct</span>
              </motion.div>

              <motion.h2 className="wholesale-heading" variants={rise}>
                Get Premium Quality Fruits<br />
                <span className="wholesale-highlight">at Wholesale Prices!</span>
              </motion.h2>
              <motion.p className="wholesale-sub" variants={rise}>
                Freshness • Quality • Great Value — Direct from Punjab &amp; Himachal Orchards to your doorstep.
              </motion.p>

              <motion.div className="wholesale-perks" variants={list}>
                {perks.map(p => (
                  <motion.div className="wholesale-perk" key={p} variants={rise}>
                    <ShieldCheck size={17} className="perk-icon" />
                    <span>{p}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="wholesale-actions" variants={rise}>
                <button className="btn btn--light wholesale-btn" onClick={() => scrollToId('popular-picks')}>
                  <span>Order Wholesale Boxes</span>
                  <ArrowRight size={16} className="btn-arrow" />
                </button>
                <a href="tel:+919876543210" className="wholesale-call">
                  <span className="wholesale-call-icon"><PhoneCall size={15} /></span>
                  <span>Call: +91 98765 43210</span>
                </a>
              </motion.div>
            </div>

            <motion.div
              className="wholesale-image-col"
              initial={{ opacity: 0, rotate: 4, scale: 0.92 }}
              whileInView={{ opacity: 1, rotate: -2, scale: 1 }}
              viewport={inView}
              transition={{ duration: 1.1, ease, delay: 0.2 }}
            >
              <div className="wholesale-image-frame">
                <SmartImage
                  src="/images/fruteria-wholesale-banner.png"
                  alt="Fruteria by Majha Agro Fresh - Wholesale Prices"
                  imgClassName="wholesale-banner-graphic"
                  width="1024"
                  height="512"
                  sizes="(max-width: 900px) 90vw, 560px"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WholesaleBanner;
