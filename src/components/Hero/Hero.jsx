import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Truck, Leaf, ShieldCheck } from 'lucide-react';
import { scrollToId } from '../../lib/scroll';
import { ease } from '../../lib/motion';
import SplitText from '../ui/SplitText';
import SmartImage from '../ui/SmartImage';
import './Hero.css';

const fade = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay } },
});

const Leaf1 = (props) => (
  <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" {...props}>
    <path d="M8 52C8 52 6 20 50 8C52 40 30 56 8 52Z" fill="url(#lg1)" />
    <path d="M8 52C20 38 32 26 48 11" stroke="#0f3d1e" strokeOpacity=".35" strokeWidth="1.4" strokeLinecap="round" />
    <defs>
      <linearGradient id="lg1" x1="8" y1="52" x2="50" y2="8" gradientUnits="userSpaceOnUse">
        <stop stopColor="#25813f" />
        <stop offset="1" stopColor="#9bcf55" />
      </linearGradient>
    </defs>
  </svg>
);

const Hero = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90]);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.04, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -40]);

  const handleBookNow = () => scrollToId('popular-picks');

  return (
    <section className="hero-section" ref={ref}>
      <div className="hero-container">
        <motion.div
          className="hero-banner-card"
          initial={{ scale: 0.985 }}
          animate={{ scale: 1, transition: { duration: 1.1, ease } }}
        >
          <motion.div className="hero-bg-image-wrapper" style={{ y: imgY, scale: imgScale }}>
            <SmartImage
              src="/images/hero-panoramic-hd.png"
              srcSetWebp="/images/opt/hero-panoramic-hd-800.webp 800w, /images/opt/hero-panoramic-hd.webp 1400w"
              sizes="(max-width: 800px) 100vw, 1320px"
              alt="Fresh Fruits Online - Farm to Home"
              className="hero-bg-media"
              imgClassName="hero-bg-img"
              width="1376"
              height="768"
              priority
            />
          </motion.div>
          <div className="hero-left-vignette" />
          <div className="hero-sun" aria-hidden="true" />

          {/* Floating decorative leaves */}
          <div className="hero-floaters" aria-hidden="true">
            <Leaf1 className="floater floater--a" />
            <Leaf1 className="floater floater--b" />
            <Leaf1 className="floater floater--c" />
          </div>

          <motion.div className="hero-overlay-content" style={{ y: contentY }}>
            <motion.span className="eyebrow hero-eyebrow" {...fade(0.15)}>
              Freshness Delivered
            </motion.span>

            <h1 className="hero-headline">
              <SplitText text="Fresh Fruits" delay={0.25} />
              <br />
              <SplitText text="Online" className="hero-headline-accent" delay={0.45} />
            </h1>

            <motion.p className="hero-tagline" {...fade(0.65)}>
              From Farm to Your Home
            </motion.p>

            <motion.div className="hero-actions" {...fade(0.8)}>
              <button className="btn btn--primary hero-action-btn" onClick={handleBookNow}>
                <span>Book Now</span>
                <ArrowRight size={18} className="btn-arrow hero-btn-arrow" />
              </button>
              <button className="btn btn--ghost" onClick={() => scrollToId('categories-section')}>
                Shop by category
              </button>
            </motion.div>

            <motion.ul className="hero-perks" {...fade(0.95)}>
              <li><Leaf size={15} /> Farm-direct daily harvest</li>
              <li><ShieldCheck size={15} /> Secure payments</li>
            </motion.ul>
          </motion.div>

          {/* Floating glass card */}
          <motion.div
            className="hero-float-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 1.05 } }}
          >
            <span className="hero-float-icon"><Truck size={18} /></span>
            <span>
              <strong>Free delivery</strong>
              <small>on orders above ₹499</small>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
