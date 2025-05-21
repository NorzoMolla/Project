import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CartSidebar from '../shop/CartSidebar';
import Button from '../ui/Button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-navy shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-offwhite flex items-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="mr-2"
              >
                <ShoppingBag className="h-8 w-8 text-accent" />
              </motion.div>
              <span>SnackHaven</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className="text-offwhite hover:text-accent transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-offwhite hover:text-accent transition-colors"
              >
                Products
              </Link>
              <Link 
                to="/products?category=snacks" 
                className="text-offwhite hover:text-accent transition-colors"
              >
                Snacks
              </Link>
              <Link 
                to="/products?category=beverages" 
                className="text-offwhite hover:text-accent transition-colors"
              >
                Beverages
              </Link>
            </nav>
            
            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
                className="p-2 rounded-full hover:bg-charcoal transition-colors"
              >
                <Search className="h-5 w-5 text-offwhite" />
              </button>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                aria-label="Shopping cart"
                className="p-2 rounded-full hover:bg-charcoal transition-colors relative"
              >
                <ShoppingBag className="h-5 w-5 text-offwhite" />
                {totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>
              
              <Link 
                to={isAuthenticated ? "/account" : "/account/login"} 
                className="p-2 rounded-full hover:bg-charcoal transition-colors"
              >
                <User className="h-5 w-5 text-offwhite" />
              </Link>
              
              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full hover:bg-charcoal transition-colors md:hidden"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-offwhite" />
                ) : (
                  <Menu className="h-6 w-6 text-offwhite" />
                )}
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 overflow-hidden"
              >
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full px-4 py-2 bg-charcoal rounded-lg text-offwhite focus:outline-none"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Search className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy pt-24 px-6"
          >
            <nav className="flex flex-col space-y-6 text-lg">
              <Link 
                to="/" 
                className="text-offwhite hover:text-accent transition-colors py-2 border-b border-gray-800"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-offwhite hover:text-accent transition-colors py-2 border-b border-gray-800"
              >
                All Products
              </Link>
              <Link 
                to="/products?category=snacks" 
                className="text-offwhite hover:text-accent transition-colors py-2 border-b border-gray-800"
              >
                Snacks
              </Link>
              <Link 
                to="/products?category=beverages" 
                className="text-offwhite hover:text-accent transition-colors py-2 border-b border-gray-800"
              >
                Beverages
              </Link>
              <Link 
                to="/account" 
                className="text-offwhite hover:text-accent transition-colors py-2 border-b border-gray-800"
              >
                My Account
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Cart Sidebar */}
      <CartSidebar />
    </>
  );
};

export default Navbar;