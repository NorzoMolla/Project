import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Heart, LogOut, CreditCard, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

// Account subpages
import LoginPage from './account/LoginPage';
import RegisterPage from './account/RegisterPage';
import ProfilePage from './account/ProfilePage';
import OrdersPage from './account/OrdersPage';
import WishlistPage from './account/WishlistPage';

const AccountPage = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');
  
  useEffect(() => {
    // Set active tab based on URL
    const path = location.pathname.split('/').pop();
    if (path && ['profile', 'orders', 'wishlist'].includes(path)) {
      setActiveTab(path);
    }
    
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [location]);

  // If not logged in, show login/register pages
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="bg-charcoal rounded-lg overflow-hidden">
            {/* User Info */}
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-accent" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-offwhite">{user?.name}</p>
                  <p className="text-sm text-gray-400">{user?.email}</p>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="p-2">
              <ul>
                <li>
                  <Link
                    to="/account/profile"
                    className={`flex items-center px-4 py-3 rounded-md ${
                      activeTab === 'profile'
                        ? 'bg-navy text-accent'
                        : 'text-gray-300 hover:bg-navy hover:bg-opacity-50'
                    }`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="w-5 h-5 mr-3" />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/orders"
                    className={`flex items-center px-4 py-3 rounded-md ${
                      activeTab === 'orders'
                        ? 'bg-navy text-accent'
                        : 'text-gray-300 hover:bg-navy hover:bg-opacity-50'
                    }`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <Package className="w-5 h-5 mr-3" />
                    <span>Orders</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/wishlist"
                    className={`flex items-center px-4 py-3 rounded-md ${
                      activeTab === 'wishlist'
                        ? 'bg-navy text-accent'
                        : 'text-gray-300 hover:bg-navy hover:bg-opacity-50'
                    }`}
                    onClick={() => setActiveTab('wishlist')}
                  >
                    <Heart className="w-5 h-5 mr-3" />
                    <span>Wishlist</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/payment"
                    className={`flex items-center px-4 py-3 rounded-md ${
                      activeTab === 'payment'
                        ? 'bg-navy text-accent'
                        : 'text-gray-300 hover:bg-navy hover:bg-opacity-50'
                    }`}
                    onClick={() => setActiveTab('payment')}
                  >
                    <CreditCard className="w-5 h-5 mr-3" />
                    <span>Payment Methods</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/settings"
                    className={`flex items-center px-4 py-3 rounded-md ${
                      activeTab === 'settings'
                        ? 'bg-navy text-accent'
                        : 'text-gray-300 hover:bg-navy hover:bg-opacity-50'
                    }`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </nav>
            
            {/* Logout */}
            <div className="p-4 border-t border-gray-800">
              <Button
                variant="secondary"
                onClick={handleLogout}
                icon={<LogOut className="w-4 h-4" />}
                fullWidth
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Routes>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="*" element={<ProfilePage />} />
            </Routes>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;