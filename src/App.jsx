import { useEffect } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useApp } from './context/AppContext';
import Header from './components/Header/Header';
import TopBar from './components/TopBar/TopBar';
import Hero from './components/Hero/Hero';
import Categories from './components/Categories/Categories';
import PopularPicks from './components/PopularPicks/PopularPicks';
import WholesaleBanner from './components/WholesaleBanner/WholesaleBanner';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import CartDrawer from './components/CartDrawer/CartDrawer';
import Checkout from './components/Checkout/Checkout';
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation';
import SearchResults from './components/SearchResults/SearchResults';
import useSmoothScroll from './lib/useSmoothScroll';
import { pageTransition, ease } from './lib/motion';
import { scrollToTop } from './lib/scroll';
import './App.css';

function App() {
  const { currentPage, toasts, searchQuery } = useApp();
  useSmoothScroll();

  // Checkout & confirmation always open at the top of the page.
  useEffect(() => {
    if (currentPage !== 'home') scrollToTop({ immediate: true });
  }, [currentPage]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        {/* Toast Notifications */}
        <div className="toast-container" role="status" aria-live="polite">
          <AnimatePresence initial={false}>
            {toasts.map(toast => (
              <motion.div
                key={toast.id}
                layout
                className="toast"
                initial={{ opacity: 0, y: -14, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 420, damping: 30 } }}
                exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
              >
                <span className="toast-icon"><Check size={15} strokeWidth={3} /></span>
                {toast.message}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Header />
        <CartDrawer />

        <AnimatePresence mode="wait" initial={false}>
          <motion.main key={currentPage} className="page" {...pageTransition}>
            {currentPage === 'home' && (
              <>
                <TopBar />
                <AnimatePresence mode="wait" initial={false}>
                  {searchQuery ? (
                    <motion.div
                      key="search"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.35, ease } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    >
                      <SearchResults />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="browse"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.35, ease } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    >
                      <Hero />
                      <Categories />
                      <PopularPicks />
                      <WholesaleBanner />
                    </motion.div>
                  )}
                </AnimatePresence>
                <Features />
                <Footer />
              </>
            )}

            {currentPage === 'checkout' && <Checkout />}
            {currentPage === 'order-confirmation' && <OrderConfirmation />}
          </motion.main>
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}

export default App;
