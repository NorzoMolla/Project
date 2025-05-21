import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import ProductCard from '../components/shop/ProductCard';
import Button from '../components/ui/Button';
import { Product } from '../components/shop/ProductCard';
import { mockProducts } from '../data/mockData';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('');
  const [activeSort, setActiveSort] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get category from URL params if present
  useEffect(() => {
    const category = searchParams.get('category') || '';
    setActiveCategoryFilter(category);
    
    const sort = searchParams.get('sort') || '';
    setActiveSort(sort);
  }, [searchParams]);

  // Simulate fetching products
  useEffect(() => {
    // Simulate loading
    setLoading(true);
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (activeCategoryFilter) {
      result = result.filter(product => 
        product.category.includes(activeCategoryFilter.toLowerCase())
      );
    }
    
    // Apply price filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    if (activeSort) {
      switch (activeSort) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating-desc':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'name-asc':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
    }
    
    setFilteredProducts(result);
  }, [products, activeCategoryFilter, activeSort, priceRange]);

  // Categories
  const categories = [
    { id: '', name: 'All Products' },
    { id: 'snacks-sweet', name: 'Sweet Snacks' },
    { id: 'snacks-savory', name: 'Savory Snacks' },
    { id: 'beverages-cold', name: 'Cold Drinks' },
    { id: 'beverages-hot', name: 'Hot Drinks' },
  ];

  // Sort options
  const sortOptions = [
    { id: '', name: 'Featured' },
    { id: 'price-asc', name: 'Price: Low to High' },
    { id: 'price-desc', name: 'Price: High to Low' },
    { id: 'rating-desc', name: 'Top Rated' },
    { id: 'name-asc', name: 'Name: A to Z' },
  ];

  // Get current category name
  const getCurrentCategoryName = () => {
    const category = categories.find(c => c.id === activeCategoryFilter);
    return category ? category.name : 'All Products';
  };

  // Get current sort name
  const getCurrentSortName = () => {
    const sort = sortOptions.find(s => s.id === activeSort);
    return sort ? sort.name : 'Featured';
  };

  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{getCurrentCategoryName()}</h1>
          <p className="text-gray-400">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-charcoal rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        onClick={() => setActiveCategoryFilter(category.id)}
                        className={`text-sm ${
                          activeCategoryFilter === category.id
                            ? 'text-accent font-medium'
                            : 'text-gray-300 hover:text-offwhite'
                        }`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="5"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-400">${priceRange[0]}</span>
                    <span className="text-xs text-gray-400">${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* Reset Filters */}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setActiveCategoryFilter('');
                  setPriceRange([0, 50]);
                }}
                fullWidth
              >
                Reset Filters
              </Button>
            </div>
          </div>
          
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <Button
              variant="secondary"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              icon={<Filter className="w-4 h-4" />}
              fullWidth
            >
              Filter & Sort
            </Button>
          </div>
          
          {/* Mobile Filters */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-navy z-50 overflow-y-auto lg:hidden">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 rounded-full hover:bg-charcoal transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <button
                          onClick={() => setActiveCategoryFilter(category.id)}
                          className={`text-sm ${
                            activeCategoryFilter === category.id
                              ? 'text-accent font-medium'
                              : 'text-gray-300 hover:text-offwhite'
                          }`}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Sort Options */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Sort By</h3>
                  <ul className="space-y-2">
                    {sortOptions.map((option) => (
                      <li key={option.id}>
                        <button
                          onClick={() => setActiveSort(option.id)}
                          className={`text-sm ${
                            activeSort === option.id
                              ? 'text-accent font-medium'
                              : 'text-gray-300 hover:text-offwhite'
                          }`}
                        >
                          {option.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Price Range</h3>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="5"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-gray-400">${priceRange[0]}</span>
                      <span className="text-xs text-gray-400">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setActiveCategoryFilter('');
                      setActiveSort('');
                      setPriceRange([0, 50]);
                    }}
                    fullWidth
                  >
                    Reset
                  </Button>
                  
                  <Button
                    variant="primary"
                    onClick={() => setIsFilterOpen(false)}
                    fullWidth
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Products */}
          <div className="flex-1">
            {/* Sort - Desktop */}
            <div className="hidden lg:flex justify-end mb-6">
              <div className="relative inline-block">
                <button
                  className="flex items-center px-4 py-2 bg-charcoal rounded-lg text-sm"
                  onClick={() => setActiveSort(activeSort ? '' : 'price-asc')}
                >
                  <span className="mr-2">Sort: {getCurrentSortName()}</span>
                  {activeSort ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                
                {activeSort && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-charcoal z-10">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setActiveSort(option.id)}
                          className={`block px-4 py-2 text-sm w-full text-left ${
                            activeSort === option.id
                              ? 'bg-accent bg-opacity-10 text-accent'
                              : 'text-gray-300 hover:bg-gray-800'
                          }`}
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-charcoal rounded-lg overflow-hidden animate-pulse">
                    <div className="h-64 bg-gray-800"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-800 rounded mb-2"></div>
                      <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <Button
                  variant="primary"
                  onClick={() => {
                    setActiveCategoryFilter('');
                    setPriceRange([0, 50]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;