import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, StarHalf } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Generate rating stars
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="w-4 h-4 fill-accent text-accent" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="w-4 h-4 fill-accent text-accent" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-400" />);
    }
    
    return stars;
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Link to={`/products/${product.id}`} className="block h-full">
        <div className="card h-full flex flex-col">
          {/* Product Image */}
          <div className="relative overflow-hidden aspect-square">
            <motion.img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center transition-transform duration-500"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-2">
              {product.isNew && (
                <span className="bg-accent text-white text-xs px-2 py-1 rounded">New</span>
              )}
              {product.isBestSeller && (
                <span className="bg-accent-light text-white text-xs px-2 py-1 rounded">Best Seller</span>
              )}
            </div>
            
            {/* Quick add button */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="sm"
                icon={<ShoppingBag className="w-4 h-4" />}
              >
                Add to Cart
              </Button>
            </motion.div>
          </div>
          
          {/* Product Info */}
          <div className="p-4 flex flex-col flex-grow">
            <div className="flex items-center mb-2">
              {renderRatingStars(product.rating)}
              <span className="ml-1 text-xs text-gray-400">({product.rating.toFixed(1)})</span>
            </div>
            
            <h3 className="text-offwhite font-semibold line-clamp-1">{product.name}</h3>
            
            <div className="mt-2 text-accent font-medium">{formatPrice(product.price)}</div>
            
            <div className="mt-auto pt-3">
              <span className="text-xs text-gray-400 capitalize">{product.category.replace('-', ' ')}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;