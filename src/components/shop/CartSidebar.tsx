import { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

const CartSidebar = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const sidebarVariants = {
    hidden: { x: '100%' },
    visible: { x: 0 },
    exit: { x: '100%' }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <Fragment>
          {/* Overlay */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-50"
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Cart Sidebar */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-navy shadow-xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <div className="flex items-center">
                <ShoppingBag className="w-5 h-5 text-accent mr-2" />
                <h2 className="text-lg font-semibold text-offwhite">Your Cart ({totalItems})</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-400 hover:text-offwhite transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto py-4 px-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-500 mb-4" />
                  <p className="text-gray-300 mb-4">Your cart is empty</p>
                  <Button 
                    variant="primary" 
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/products');
                    }}
                  >
                    Browse Products
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-gray-800">
                  {items.map((item) => (
                    <motion.li 
                      key={`${item.id}-${item.variant}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="py-4 flex"
                    >
                      {/* Product Image */}
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-800">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between text-base font-medium text-offwhite">
                          <h3>{item.name}</h3>
                          <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                        {item.variant && (
                          <p className="mt-1 text-sm text-gray-400">{item.variant}</p>
                        )}
                        
                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-gray-700 rounded-md">
                            <button
                              type="button"
                              className="p-2 text-gray-400 hover:text-offwhite"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="px-2 text-sm text-offwhite">{item.quantity}</span>
                            <button
                              type="button"
                              className="p-2 text-gray-400 hover:text-offwhite"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            type="button"
                            className="text-gray-400 hover:text-accent transition-colors"
                            onClick={() => removeItem(item.id)}
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-800 p-4">
                <div className="flex justify-between text-base font-medium text-offwhite mb-4">
                  <p>Subtotal</p>
                  <p>{formatPrice(totalPrice)}</p>
                </div>
                <p className="text-xs text-gray-400 mb-4">
                  Shipping and taxes calculated at checkout.
                </p>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
                <div className="flex justify-center mt-3">
                  <button
                    type="button"
                    className="text-sm text-gray-400 hover:text-offwhite transition-colors"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;