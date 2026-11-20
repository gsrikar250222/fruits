import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [orderDetails, setOrderDetails] = useState(null);
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  }, [showToast]);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, delta) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotal = cartSubtotal >= 499 ? cartSubtotal : cartSubtotal + 40;
  const deliveryFee = cartSubtotal >= 499 ? 0 : 40;

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        showToast(`${product.name} removed from wishlist`);
        return prev.filter(item => item.id !== product.id);
      }
      showToast(`${product.name} added to wishlist!`);
      return [...prev, product];
    });
  }, [showToast]);

  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const placeOrder = useCallback((customerInfo) => {
    const orderId = 'FRU' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
    const order = {
      orderId,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee,
      total: cartTotal,
      customer: customerInfo,
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      time: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setOrderDetails(order);
    clearCart();
    setCurrentPage('order-confirmation');
    return order;
  }, [cart, cartSubtotal, deliveryFee, cartTotal, clearCart]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartSubtotal,
    cartTotal,
    deliveryFee,
    clearCart,
    wishlist,
    toggleWishlist,
    isInWishlist,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    isCartOpen,
    setIsCartOpen,
    currentPage,
    setCurrentPage,
    orderDetails,
    placeOrder,
    toasts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
