import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Package, Truck, ShieldCheck, CreditCard } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/shop/ProductCard';
import { Product } from '../components/shop/ProductCard';
import { mockProducts } from '../data/mockData';

const HomePage = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  
  // Simulate fetching products
  useEffect(() => {
    // Get 4 products for each category
    const bestsellers = mockProducts
      .filter(product => product.isBestSeller)
      .slice(0, 4);
    
    setFeaturedProducts(bestsellers);
  }, []);

  // Banner rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const banners = [
    {
      title: "Premium Snacks Delivered",
      subtitle: "Satisfaction in every bite",
      image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      cta: "Shop Now",
      color: "from-accent to-accent-light"
    },
    {
      title: "Refreshing Beverages",
      subtitle: "Quench your thirst with our selection",
      image: "https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      cta: "Explore Drinks",
      color: "from-blue-600 to-blue-400"
    },
    {
      title: "Healthy Alternatives",
      subtitle: "Snack guilt-free with our organic options",
      image: "https://images.pexels.com/photos/8967931/pexels-photo-8967931.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      cta: "Discover",
      color: "from-green-600 to-green-400"
    }
  ];
  
  const categories = [
    {
      name: "Sweet Treats",
      image: "https://images.pexels.com/photos/1343504/pexels-photo-1343504.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      link: "/products?category=snacks-sweet"
    },
    {
      name: "Savory Snacks",
      image: "https://images.pexels.com/photos/1618917/pexels-photo-1618917.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      link: "/products?category=snacks-savory"
    },
    {
      name: "Cold Drinks",
      image: "https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      link: "/products?category=beverages-cold"
    },
    {
      name: "Hot Beverages",
      image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      link: "/products?category=beverages-hot"
    }
  ];
  
  const bannerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        {banners.map((banner, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate={currentBanner === index ? "visible" : "hidden"}
            variants={bannerVariants}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 ${index === currentBanner ? 'z-10' : 'z-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70 z-10"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center z-0" 
              style={{ backgroundImage: `url(${banner.image})` }}
            ></div>
            
            <div className="relative h-full z-20 container-custom flex flex-col justify-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="max-w-xl"
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">{banner.title}</h1>
                <p className="text-xl text-gray-200 mb-8">{banner.subtitle}</p>
                <Link to="/products">
                  <Button 
                    variant="primary" 
                    size="lg"
                    className={`bg-gradient-to-r ${banner.color}`}
                  >
                    {banner.cta}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
        
        {/* Banner Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentBanner === index ? 'bg-accent scale-110' : 'bg-white bg-opacity-50'
              }`}
              onClick={() => setCurrentBanner(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-charcoal">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop By Category</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover our wide range of snacks and beverages, carefully selected for quality and flavor.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Link to={category.link} className="block relative group overflow-hidden rounded-lg aspect-square">
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 z-10"></div>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <h3 className="text-2xl font-bold text-white bg-black bg-opacity-30 px-4 py-2 rounded-lg group-hover:bg-accent group-hover:bg-opacity-90 transition-all duration-300">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Bestsellers Section */}
      <section className="py-16 bg-navy">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Bestsellers</h2>
            <Link to="/products?tag=bestseller" className="flex items-center text-accent hover:text-accent-light transition-colors">
              <span className="mr-1">View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Promo Banner */}
      <section className="relative py-20 bg-gradient-to-r from-accent to-accent-light overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Free Shipping on Orders Over $50
            </h2>
            <p className="text-white text-lg mb-8">
              Treat yourself to premium snacks and beverages with the added bonus of free shipping.
            </p>
            <Link to="/products">
              <Button variant="secondary" size="lg">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-charcoal">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-navy w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="text-accent w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Selection</h3>
              <p className="text-gray-300">Carefully curated snacks and beverages from around the world.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-navy w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-accent w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-300">Quick shipping to satisfy your cravings without the wait.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-navy w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="text-accent w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Guaranteed</h3>
              <p className="text-gray-300">All products are inspected for quality and freshness.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-navy w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="text-accent w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Secure Checkout</h3>
              <p className="text-gray-300">Safe and secure payment processing for peace of mind.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-navy">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-gray-300 mb-8">
              Subscribe to get special offers, free giveaways, and new product announcements.
            </p>
            <div className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="input flex-grow"
              />
              <Button variant="primary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;