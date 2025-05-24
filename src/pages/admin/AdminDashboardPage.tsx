import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar } from '../../components/ui/Navbar';
import { Footer } from '../../components/ui/Footer';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { mockOrders, mockLeaveRequests, mockProducts, mockUsers } from '../../data/mockData';
import { Users, PackageOpen, CalendarDays, BarChart2, ArrowRight, ShoppingCart } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  const pendingOrders = mockOrders.filter(order => order.status === 'pending').length;
  const pendingLeaveRequests = mockLeaveRequests.filter(request => request.status === 'pending').length;
  
  // Calculate revenue
  const totalRevenue = mockOrders.reduce((total, order) => total + order.total, 0);
  
  // Get most recent orders
  const recentOrders = [...mockOrders].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);
  
  // Get pending leave requests
  const pendingLeaves = mockLeaveRequests.filter(request => request.status === 'pending');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}. Here's an overview of your business.</p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Users</p>
                    <p className="text-3xl font-bold">{mockUsers.length}</p>
                  </div>
                  <div className="p-3 bg-blue-400 bg-opacity-30 rounded-full">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 text-blue-100 text-sm">
                  <span>+3 new this week</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Pending Orders</p>
                    <p className="text-3xl font-bold">{pendingOrders}</p>
                  </div>
                  <div className="p-3 bg-green-400 bg-opacity-30 rounded-full">
                    <PackageOpen className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 text-green-100 text-sm">
                  <span>Needs attention</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Pending Leaves</p>
                    <p className="text-3xl font-bold">{pendingLeaveRequests}</p>
                  </div>
                  <div className="p-3 bg-purple-400 bg-opacity-30 rounded-full">
                    <CalendarDays className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 text-purple-100 text-sm">
                  <span>Needs approval</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm font-medium">Total Revenue</p>
                    <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
                  </div>
                  <div className="p-3 bg-red-400 bg-opacity-30 rounded-full">
                    <BarChart2 className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4 text-red-100 text-sm">
                  <span>+12% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Orders */}
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
                <Link to="/orders">
                  <Button variant="outline" size="sm" icon={<ArrowRight size={16} />}>
                    View All
                  </Button>
                </Link>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <ShoppingCart className="h-8 w-8 text-blue-500" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              Order #{order.id}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()} • ${order.total.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Pending Leave Requests */}
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Pending Leave Requests</h2>
                <Link to="/leave">
                  <Button variant="outline" size="sm" icon={<ArrowRight size={16} />}>
                    View All
                  </Button>
                </Link>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200">
                  {pendingLeaves.map((leave) => (
                    <div key={leave.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <CalendarDays className="h-8 w-8 text-blue-500" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              {leave.employeeName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div>
                          <span className="px-2 py-1 text-xs rounded-full font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {pendingLeaves.length === 0 && (
                    <div className="p-4 text-center text-gray-500">
                      <p>No pending leave requests.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Inventory Status */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Inventory Status</h2>
              <Link to="/products">
                <Button variant="outline" size="sm" icon={<ArrowRight size={16} />}>
                  Manage Products
                </Button>
              </Link>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockProducts.slice(0, 5).map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt={product.name} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{product.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};