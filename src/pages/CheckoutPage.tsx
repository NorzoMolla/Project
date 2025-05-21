import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    saveInfo: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  
  useEffect(() => {
    if (items.length === 0 && !isOrderComplete) {
      navigate('/cart');
    }
    
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [items, navigate, isOrderComplete]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeStep === 1) {
      setActiveStep(2);
    } else {
      // Process payment
      setIsProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        setIsOrderComplete(true);
        clearCart();
      }, 2000);
    }
  };

  const shippingPrice = totalPrice >= 50 ? 0 : 5.99;
  const taxPrice = totalPrice * 0.08;
  const totalWithExtras = totalPrice + shippingPrice + taxPrice;

  if (isOrderComplete) {
    return (
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-charcoal rounded-lg p-8"
          >
            <div className="w-16 h-16 mx-auto bg-accent rounded-full flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Order Completed!</h1>
            <p className="text-gray-300 mb-6">
              Thank you for your purchase. We've sent a confirmation email to {formData.email}.
            </p>
            <p className="text-gray-300 mb-6">
              Your order number is: <span className="font-semibold text-accent">#ORD{Math.floor(Math.random() * 10000)}</span>
            </p>
            <Button
              variant="primary"
              fullWidth
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {/* Progress Steps */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center max-w-xs mx-auto">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            activeStep >= 1 ? 'bg-accent' : 'bg-gray-700'
          } text-white font-medium`}>
            1
          </div>
          <div className={`w-12 h-1 ${
            activeStep >= 2 ? 'bg-accent' : 'bg-gray-700'
          }`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
            activeStep >= 2 ? 'bg-accent' : 'bg-gray-700'
          } text-white font-medium`}>
            2
          </div>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            {activeStep === 1 ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-charcoal rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                
                <div className="space-y-4">
                  {!isAuthenticated && (
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="input"
                      />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                        First Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="input"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                        Last Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Street Address <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="input"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="input"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">
                        State <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="input"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                        Zip Code <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="saveInfo"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                    />
                    <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-300">
                      Save this information for next time
                    </label>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                  >
                    Continue to Payment
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-charcoal rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                      Name on Card <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                      Card Number <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="input"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expDate" className="block text-sm font-medium mb-1">
                        Expiration Date <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="expDate"
                        name="expDate"
                        value={formData.expDate}
                        onChange={handleInputChange}
                        required
                        placeholder="MM/YY"
                        className="input"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                        CVV <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        placeholder="123"
                        className="input"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-400 mt-2">
                    <Lock className="w-4 h-4 mr-1" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col md:flex-row gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setActiveStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Complete Order'}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-charcoal rounded-lg overflow-hidden sticky top-24">
            <div className="px-6 py-4 border-b border-gray-800">
              <h2 className="text-lg font-medium">Order Summary</h2>
            </div>
            
            <div className="px-6 py-4 border-b border-gray-800 max-h-72 overflow-y-auto">
              <ul className="divide-y divide-gray-800">
                {items.map((item) => (
                  <li key={`${item.id}-${item.variant}`} className="py-3 flex">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-3 flex flex-col flex-1">
                      <div className="flex justify-between text-sm font-medium">
                        <h3 className="text-offwhite">{item.name}</h3>
                        <p className="text-offwhite">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <p>{item.variant && `${item.variant}, `}Qty {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;