import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-offwhite">SnackHaven</h3>
            <p className="text-gray-300 mb-4">
              Premium snacks and beverages for your everyday cravings. Quality, taste, and convenience delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-offwhite">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=snacks-sweet" className="text-gray-300 hover:text-accent transition-colors">
                  Sweet Snacks
                </Link>
              </li>
              <li>
                <Link to="/products?category=snacks-savory" className="text-gray-300 hover:text-accent transition-colors">
                  Savory Snacks
                </Link>
              </li>
              <li>
                <Link to="/products?category=beverages-cold" className="text-gray-300 hover:text-accent transition-colors">
                  Cold Drinks
                </Link>
              </li>
              <li>
                <Link to="/products?category=beverages-hot" className="text-gray-300 hover:text-accent transition-colors">
                  Hot Drinks
                </Link>
              </li>
              <li>
                <Link to="/products?tag=new" className="text-gray-300 hover:text-accent transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/products?tag=bestseller" className="text-gray-300 hover:text-accent transition-colors">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-offwhite">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-gray-300 hover:text-accent transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-accent transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-accent transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-accent transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-offwhite">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-accent mt-1 mr-2 shrink-0" size={18} />
                <span className="text-gray-300">123 Snack Street, Foodville, FV 98765</span>
              </li>
              <li className="flex items-center">
                <Phone className="text-accent mr-2 shrink-0" size={18} />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-accent mr-2 shrink-0" size={18} />
                <a href="mailto:hello@snackhaven.com" className="text-gray-300 hover:text-accent transition-colors">
                  hello@snackhaven.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {currentYear} SnackHaven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;