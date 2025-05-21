import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../../components/ui/Button';

// Sample order data
const mockOrders = [
  {
    id: 'ORD12345',
    date: '2023-05-15',
    status: 'Delivered',
    total: 48.95,
    items: [
      {
        id: '1',
        name: 'Chocolate Chip Cookies',
        price: 9.99,
        quantity: 2,
        image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      {
        id: '2',
        name: 'Iced Coffee',
        price: 4.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/2638019/pexels-photo-2638019.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      {
        id: '3',
        name: 'Mixed Nuts',
        price: 12.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
    ],
  },
  {
    id: 'ORD12346',
    date: '2023-04-28',
    status: 'Delivered',
    total: 29.97,
    items: [
      {
        id: '4',
        name: 'Potato Chips',
        price: 4.99,
        quantity: 3,
        image: 'https://images.pexels.com/photos/568805/pexels-photo-568805.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      {
        id: '5',
        name: 'Energy Drink',
        price: 3.50,
        quantity: 2,
        image: 'https://images.pexels.com/photos/2668308/pexels-photo-2668308.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
    ],
  },
];

const OrdersPage = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-success text-white';
      case 'shipped':
        return 'bg-accent-light text-white';
      case 'processing':
        return 'bg-warning text-white';
      case 'cancelled':
        return 'bg-error text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="bg-charcoal rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Order History</h2>
      
      {mockOrders.length === 0 ? (
        <div className="text-center py-8">
          <Package className="w-16 h-16 mx-auto text-gray-500 mb-4" />
          <h3 className="text-lg font-medium mb-2">No orders yet</h3>
          <p className="text-gray-400 mb-6">
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <Link to="/products">
            <Button variant="primary">
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div key={order.id} className="bg-navy rounded-lg overflow-hidden">
              {/* Order Header */}
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-lg">Order #{order.id}</h3>
                    <span className={`ml-3 text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{formatDate(order.date)}</p>
                </div>
                
                <div className="flex items-center mt-3 sm:mt-0">
                  <p className="font-medium mr-4">{formatPrice(order.total)}</p>
                  <button
                    onClick={() => toggleOrderDetails(order.id)}
                    className="flex items-center text-sm text-accent hover:text-accent-light"
                  >
                    {expandedOrder === order.id ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-1" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-1" />
                        <span>View</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Order Details */}
              <AnimatePresence>
                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-gray-800 p-4">
                      <h4 className="font-medium mb-3">Items</h4>
                      <ul className="divide-y divide-gray-800">
                        {order.items.map((item) => (
                          <li key={item.id} className="py-3 flex">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-3 flex flex-col flex-1">
                              <div className="flex justify-between text-sm font-medium">
                                <h5 className="text-offwhite">{item.name}</h5>
                                <p className="text-offwhite">
                                  {formatPrice(item.price * item.quantity)}
                                </p>
                              </div>
                              <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <p>{formatPrice(item.price)} × {item.quantity}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-4 flex justify-between border-t border-gray-800 pt-4">
                        <Button
                          variant="secondary"
                          size="sm"
                        >
                          Track Order
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          Reorder
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;