import { Sparkles, PhoneCall, ArrowRight, ShieldCheck } from 'lucide-react';
import './WholesaleBanner.css';

const WholesaleBanner = () => {
  return (
    <section className="wholesale-banner">
      <div className="wholesale-container">
        <div className="wholesale-card">
          <div className="wholesale-badge">
            <Sparkles size={16} />
            <span>Majha Agro Fresh Direct</span>
          </div>

          <div className="wholesale-grid">
            <div className="wholesale-text-col">
              <h2 className="wholesale-heading">
                Get Premium Quality Fruits<br />
                <span className="wholesale-highlight">at Wholesale Prices!</span>
              </h2>
              <p className="wholesale-sub">
                Freshness • Quality • Great Value — Direct from Punjab & Himachal Orchards to your doorstep.
              </p>

              <div className="wholesale-perks">
                <div className="wholesale-perk">
                  <ShieldCheck size={18} className="perk-icon" />
                  <span>Farm-Direct Daily Harvest</span>
                </div>
                <div className="wholesale-perk">
                  <ShieldCheck size={18} className="perk-icon" />
                  <span>No Middlemen, Best Prices</span>
                </div>
                <div className="wholesale-perk">
                  <ShieldCheck size={18} className="perk-icon" />
                  <span>Bulk & Family Box Discounts</span>
                </div>
              </div>

              <div className="wholesale-actions">
                <button
                  className="wholesale-btn"
                  onClick={() => {
                    const el = document.getElementById('popular-picks');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Order Wholesale Boxes</span>
                  <ArrowRight size={16} />
                </button>
                <a href="tel:+919876543210" className="wholesale-call">
                  <PhoneCall size={16} />
                  <span>Call: +91 98765 43210</span>
                </a>
              </div>
            </div>

            <div className="wholesale-image-col">
              <img
                src="/images/fruteria-wholesale-banner.png"
                alt="Fruteria by Majha Agro Fresh - Wholesale Prices"
                className="wholesale-banner-graphic"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleBanner;
