import { User, Product, Order, LeaveRequest } from '../types';

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Customer User',
    email: 'customer@example.com',
    role: 'customer',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    name: 'Employee User',
    email: 'employee@example.com',
    role: 'employee',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Atlantic Salmon',
    description: 'Premium salmon fillets, perfect for grilling or baking.',
    price: 24.99,
    image: 'https://images.pexels.com/photos/3296434/pexels-photo-3296434.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'fish',
    inStock: true
  },
  {
    id: '2',
    name: 'Jumbo Shrimp',
    description: 'Large, succulent shrimp, ready to cook and serve.',
    price: 18.99,
    image: 'https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'shellfish',
    inStock: true
  },
  {
    id: '3',
    name: 'Pacific Cod',
    description: 'Wild-caught cod fillets, mild flavor and flaky texture.',
    price: 15.99,
    image: 'https://images.pexels.com/photos/2871757/pexels-photo-2871757.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'fish',
    inStock: true
  },
  {
    id: '4',
    name: 'Live Maine Lobster',
    description: 'Fresh live lobsters from the cold waters of Maine.',
    price: 34.99,
    image: 'https://images.pexels.com/photos/1578921/pexels-photo-1578921.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'shellfish',
    inStock: true
  },
  {
    id: '5',
    name: 'Fresh Oysters',
    description: 'Dozen fresh oysters, harvested daily.',
    price: 21.99,
    image: 'https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'shellfish',
    inStock: true
  },
  {
    id: '6',
    name: 'Ahi Tuna Steaks',
    description: 'Sushi-grade tuna steaks, perfect for grilling or searing.',
    price: 29.99,
    image: 'https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'fish',
    inStock: false
  }
];

// Mock Orders Data
export const mockOrders: Order[] = [
  {
    id: '1',
    customerId: '1',
    items: [
      { ...mockProducts[0], quantity: 2 },
      { ...mockProducts[1], quantity: 1 }
    ],
    total: 2 * mockProducts[0].price + mockProducts[1].price,
    status: 'delivered',
    createdAt: '2023-10-15T10:30:00Z',
    address: '123 Ocean Dr, Seaside, CA 90210',
    paymentMethod: 'Credit Card'
  },
  {
    id: '2',
    customerId: '1',
    items: [
      { ...mockProducts[3], quantity: 1 },
      { ...mockProducts[4], quantity: 2 }
    ],
    total: mockProducts[3].price + 2 * mockProducts[4].price,
    status: 'shipped',
    createdAt: '2023-11-02T14:45:00Z',
    address: '123 Ocean Dr, Seaside, CA 90210',
    paymentMethod: 'UPI'
  },
  {
    id: '3',
    customerId: '1',
    items: [
      { ...mockProducts[2], quantity: 3 }
    ],
    total: 3 * mockProducts[2].price,
    status: 'pending',
    createdAt: '2023-11-10T09:15:00Z',
    address: '123 Ocean Dr, Seaside, CA 90210',
    paymentMethod: 'Credit Card'
  }
];

// Mock Leave Requests Data
export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeId: '2',
    employeeName: 'Employee User',
    startDate: '2023-11-20',
    endDate: '2023-11-22',
    reason: 'Family emergency',
    status: 'approved',
    createdAt: '2023-11-15T08:30:00Z'
  },
  {
    id: '2',
    employeeId: '2',
    employeeName: 'Employee User',
    startDate: '2023-12-24',
    endDate: '2023-12-26',
    reason: 'Christmas holidays',
    status: 'pending',
    createdAt: '2023-11-30T10:15:00Z'
  }
];