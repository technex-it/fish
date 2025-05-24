import React from 'react';
import { Order } from '../../types';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Package, Clock } from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <div className="flex flex-col">
          <div className="text-xs text-gray-500 flex items-center">
            <Clock size={14} className="mr-1" />
            {formatDate(order.createdAt)}
          </div>
          <h3 className="text-lg font-medium">Order #{order.id}</h3>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Items</p>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex items-center">
                    <Package size={16} className="mr-2 text-blue-500" />
                    <span>{item.name}</span>
                  </div>
                  <div className="text-sm">
                    <span>{item.quantity} × ${item.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-gray-500 mb-1">Shipping Address</p>
            <p className="text-sm">{order.address}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">Payment Method</p>
            <p className="text-sm">{order.paymentMethod}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};