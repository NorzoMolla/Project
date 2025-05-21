import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, StarHalf, ChevronLeft, ShoppingBag, Heart, Share2, X } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/mockData';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  useEffect(() => {
    // Simulate fetching product details
    setLoading(true);
    const timer = setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        if (foundProduct.variants && foundProduct.variants.length > 0) {
          setSelectedVariant(foundProduct.variants[0].value);
        }
      }
      
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        variant: selectedVariant || undefined,
      });
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };

  // Generate rating stars
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="w-5 h-5 fill-accent text-accent" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="w-5 h-5 fill-accent text-accent" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-400" />);
    }
    
    return stars;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row gap-8 animate-pulse">
          <div className="w-full md:w-1/2">
            <div className="bg-charcoal h-96 rounded-lg"></div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="h-8 bg-charcoal rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-charcoal rounded w-1/4 mb-6"></div>
            <div className="h-4 bg-charcoal rounded mb-2"></div>
            <div className="h-4 bg-charcoal rounded mb-2"></div>
            <div className="h-4 bg-charcoal rounded w-2/3 mb-6"></div>
            <div className="h-10 bg-charcoal rounded w-1/3 mb-6"></div>
            <div className="h-12 bg-charcoal rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-400 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }

  // Prepare gallery images (main image + additional images)
  const galleryImages = [product.image, ...product.gallery || []];

  return (
    <>
      <div className="container-custom py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-accent mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span>Back</span>
        </button>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              <img
                src={galleryImages[selectedImage]}
                alt={product.name}
                className="w-full h-auto rounded-lg cursor-pointer object-cover aspect-square"
                onClick={() => setIsLightboxOpen(true)}
              />
            </div>
            
            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-5 gap-2 mt-4">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? 'border-accent' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-auto aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderRatingStars(product.rating)}
              </div>
              <span className="text-gray-400">
                ({product.rating.toFixed(1)}) · {product.reviewCount || 24} reviews
              </span>
            </div>
            
            {/* Price */}
            <div className="text-2xl font-semibold text-accent mb-6">
              {formatPrice(product.price)}
            </div>
            
            {/* Description */}
            <p className="text-gray-300 mb-6">
              {product.description || 'Experience the perfect blend of flavor and satisfaction with our premium quality snack, carefully crafted to tantalize your taste buds and keep you coming back for more.'}
            </p>
            
            {/* Variants */}
            {product.variants && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">{product.variants.name || 'Size'}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.options.map((variant: any) => (
                    <button
                      key={variant.value}
                      onClick={() => setSelectedVariant(variant.value)}
                      className={`px-4 py-2 rounded-md text-sm ${
                        selectedVariant === variant.value
                          ? 'bg-accent text-white'
                          : 'bg-charcoal text-gray-300 hover:bg-opacity-80'
                      }`}
                    >
                      {variant.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-10 h-10 rounded-l-md bg-charcoal flex items-center justify-center hover:bg-gray-700"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <div className="w-16 h-10 bg-charcoal flex items-center justify-center border-x border-gray-700">
                  {quantity}
                </div>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-10 h-10 rounded-r-md bg-charcoal flex items-center justify-center hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                icon={<ShoppingBag className="w-5 h-5" />}
              >
                Add to Cart
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                icon={<Heart className="w-5 h-5" />}
              >
                Wishlist
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                icon={<Share2 className="w-5 h-5" />}
              >
                Share
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="border-t border-gray-800 pt-6">
              <div className="mb-4">
                <h3 className="font-medium mb-2">Product Details</h3>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>Category: <span className="text-offwhite capitalize">{product.category.replace('-', ' ')}</span></li>
                  <li>Weight: <span className="text-offwhite">{product.weight || '250g'}</span></li>
                  <li>Origin: <span className="text-offwhite">{product.origin || 'Imported'}</span></li>
                  <li>Storage: <span className="text-offwhite">Store in a cool, dry place</span></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Shipping & Returns</h3>
                <p className="text-sm text-gray-300">
                  Free shipping on orders over $50. Returns accepted within 30 days of delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
              onClick={() => setIsLightboxOpen(false)}
            >
              <button
                className="absolute top-4 right-4 text-white hover:text-accent"
                onClick={() => setIsLightboxOpen(false)}
              >
                <X className="w-8 h-8" />
              </button>
              
              <img
                src={galleryImages[selectedImage]}
                alt={product.name}
                className="max-w-full max-h-[90vh] object-contain"
              />
              
              {/* Navigation */}
              {galleryImages.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(index);
                      }}
                      className={`w-3 h-3 rounded-full ${
                        selectedImage === index ? 'bg-accent' : 'bg-white bg-opacity-50'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductDetailPage;