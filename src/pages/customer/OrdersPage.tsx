import React from 'react';
import { Navbar } from '../../components/ui/Navbar';
import { Footer } from '../../components/ui/Footer';
import { OrderCard } from '../../components/customer/OrderCard';
import { mockOrders } from '../../data/mockData';
import { PackageOpen } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Orders</h1>
            <p className="text-gray-600">Track and manage your orders.</p>
          </div>
          
          {mockOrders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-blue-100 rounded-full p-6 inline-flex mb-6">
                <PackageOpen className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">No orders yet</h2>
              <p className="text-gray-600 mb-8">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};