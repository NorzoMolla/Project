import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const shippingPrice = totalPrice >= 50 ? 0 : 5.99;
  const taxPrice = totalPrice * 0.08;
  const totalWithExtras = totalPrice + shippingPrice + taxPrice;

  if (items.length === 0) {
    return (
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ShoppingBag className="w-20 h-20 mx-auto text-gray-500 mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/products')}
            >
              Start Shopping
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart ({totalItems} items)</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-charcoal rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800">
              <h2 className="text-lg font-medium">Items</h2>
            </div>
            
            <ul className="divide-y divide-gray-800">
              {items.map((item) => (
                <motion.li 
                  key={`${item.id}-${item.variant}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-6 py-6 flex items-center"
                >
                  {/* Product Image */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-base font-medium text-offwhite">
                          <Link 
                            to={`/products/${item.id}`} 
                            className="hover:text-accent transition-colors"
                          >
                            {item.name}
                          </Link>
                        </h3>
                        {item.variant && (
                          <p className="mt-1 text-sm text-gray-400">{item.variant}</p>
                        )}
                      </div>
                      <p className="text-base font-medium text-offwhite">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
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
                        <span className="px-3 text-sm text-offwhite">{item.quantity}</span>
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
                        className="text-gray-400 hover:text-accent transition-colors flex items-center"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Continue Shopping */}
          <div className="mt-6">
            <Link
              to="/products"
              className="text-accent hover:text-accent-light transition-colors flex items-center"
            >
              <span className="mr-1">Continue Shopping</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-charcoal rounded-lg overflow-hidden sticky top-24">
            <div className="px-6 py-4 border-b border-gray-800">
              <h2 className="text-lg font-medium">Order Summary</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-offwhite">{formatPrice(totalPrice)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-offwhite">
                    {shippingPrice === 0 ? 'Free' : formatPrice(shippingPrice)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax (estimated)</span>
                  <span className="text-offwhite">{formatPrice(taxPrice)}</span>
                </div>
                
                <div className="border-t border-gray-800 pt-4 flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-semibold text-accent">
                    {formatPrice(totalWithExtras)}
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>
              </div>
              
              <div className="mt-4">
                <p className="text-xs text-gray-400 text-center">
                  Free shipping on all orders over $50
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;