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
import './App.css';

function App() {
  const { currentPage, toasts, searchQuery } = useApp();

  return (
    <div className="app">
      {/* Toast Notifications */}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map(toast => (
            <div key={toast.id} className="toast">
              <span>✓</span> {toast.message}
            </div>
          ))}
        </div>
      )}

      <Header />
      <CartDrawer />

      {currentPage === 'home' && (
        <>
          <TopBar />
          {searchQuery ? (
            <SearchResults />
          ) : (
            <>
              <Hero />
              <Categories />
              <PopularPicks />
              <WholesaleBanner />
            </>
          )}
          <Features />
          <Footer />
        </>
      )}

      {currentPage === 'checkout' && <Checkout />}
      {currentPage === 'order-confirmation' && <OrderConfirmation />}
    </div>
  );
}

export default App;
