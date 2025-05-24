import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar } from '../../components/ui/Navbar';
import { Footer } from '../../components/ui/Footer';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { mockOrders } from '../../data/mockData';
import { ShoppingCart, Package, User, ArrowRight } from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const recentOrders = mockOrders.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="text-gray-600">Here's what's happening with your account today.</p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Orders</p>
                    <p className="text-3xl font-bold">{mockOrders.length}</p>
                  </div>
                  <div className="p-3 bg-blue-400 bg-opacity-30 rounded-full">
                    <Package className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Active Order</p>
                    <p className="text-3xl font-bold">1</p>
                  </div>
                  <div className="p-3 bg-green-400 bg-opacity-30 rounded-full">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Saved Items</p>
                    <p className="text-3xl font-bold">4</p>
                  </div>
                  <div className="p-3 bg-purple-400 bg-opacity-30 rounded-full">
                    <User className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Orders */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <Link to="/orders">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Package className="h-10 w-10 text-blue-500" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">Order #{order.id}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items • ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        } mr-4`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <Link to={`/orders/${order.id}`} className="text-blue-600 hover:text-blue-800">
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                
                {recentOrders.length === 0 && (
                  <div className="p-6 text-center text-gray-500">
                    <p>No orders yet. Start shopping to place your first order!</p>
                    <Link to="/products" className="mt-2 inline-block text-blue-600 hover:underline">
                      Browse Products
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Recommended Products */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recommended For You</h2>
              <Link to="/products">
                <Button variant="outline" size="sm">
                  View All Products
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Product 1 */}
              <Card className="hover:shadow-lg transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3296434/pexels-photo-3296434.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Fresh Atlantic Salmon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Fresh Atlantic Salmon</h3>
                  <p className="text-blue-600 font-bold mb-3">$24.99</p>
                  <Link to="/products">
                    <Button variant="primary" size="sm" fullWidth>
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              {/* Product 2 */}
              <Card className="hover:shadow-lg transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Jumbo Shrimp"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Jumbo Shrimp</h3>
                  <p className="text-blue-600 font-bold mb-3">$18.99</p>
                  <Link to="/products">
                    <Button variant="primary" size="sm" fullWidth>
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              {/* Product 3 */}
              <Card className="hover:shadow-lg transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/2871757/pexels-photo-2871757.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Pacific Cod"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Pacific Cod</h3>
                  <p className="text-blue-600 font-bold mb-3">$15.99</p>
                  <Link to="/products">
                    <Button variant="primary" size="sm" fullWidth>
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              {/* Product 4 */}
              <Card className="hover:shadow-lg transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Fresh Oysters"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Fresh Oysters</h3>
                  <p className="text-blue-600 font-bold mb-3">$21.99</p>
                  <Link to="/products">
                    <Button variant="primary" size="sm" fullWidth>
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};