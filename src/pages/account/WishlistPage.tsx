import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../../components/ui/Button';
import { Product } from '../../components/shop/ProductCard';
import { mockProducts } from '../../data/mockData';

// Mock wishlist data
const mockWishlist: Product[] = [
  mockProducts[0],
  mockProducts[3],
  mockProducts[5],
];

const WishlistPage = () => {
  const { addItem } = useCart();
  const [wishlist, setWishlist] = useState(mockWishlist);

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  const handleAddToCart = (product: Product) => {
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

  return (
    <div className="bg-charcoal rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">My Wishlist ({wishlist.length})</h2>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-8">
          <Heart className="w-16 h-16 mx-auto text-gray-500 mb-4" />
          <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
          <p className="text-gray-400 mb-6">
            Add items to your wishlist to keep track of products you're interested in.
          </p>
          <Button
            variant="primary"
            onClick={() => window.location.href = '/products'}
          >
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {wishlist.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-navy rounded-lg overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-32 sm:h-32">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-accent mt-1">{formatPrice(product.price)}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="text-gray-400 hover:text-accent transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      onClick={() => handleAddToCart(product)}
                      icon={<ShoppingBag className="w-4 h-4" />}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;