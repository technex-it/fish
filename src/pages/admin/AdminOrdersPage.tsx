import React, { useState } from 'react';
import { Navbar } from '../../components/ui/Navbar';
import { Footer } from '../../components/ui/Footer';
import { AdminOrdersTable } from '../../components/admin/AdminOrdersTable';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { mockOrders } from '../../data/mockData';
import { Order } from '../../types';
import { BarChart2 } from 'lucide-react';

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleUpdateStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  // Calculate some basic stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const ordersByStatus = {
    pending: orders.filter(order => order.status === 'pending').length,
    processing: orders.filter(order => order.status === 'processing').length,
    shipped: orders.filter(order => order.status === 'shipped').length,
    delivered: orders.filter(order => order.status === 'delivered').length,
    cancelled: orders.filter(order => order.status === 'cancelled').length
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
            <p className="text-gray-600">View and manage customer orders.</p>
          </div>
          
          {/* Order Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            <Card className="col-span-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Revenue</p>
                    <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
                  </div>
                  <BarChart2 className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-xl font-bold text-yellow-600">{ordersByStatus.pending}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-gray-500">Processing</p>
                <p className="text-xl font-bold text-blue-600">{ordersByStatus.processing}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-gray-500">Shipped</p>
                <p className="text-xl font-bold text-purple-600">{ordersByStatus.shipped}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-sm text-gray-500">Delivered</p>
                <p className="text-xl font-bold text-green-600">{ordersByStatus.delivered}</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Orders Table */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800">All Orders</h2>
            </CardHeader>
            
            <CardContent className="p-0">
              <AdminOrdersTable orders={orders} onUpdateStatus={handleUpdateStatus} />
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};