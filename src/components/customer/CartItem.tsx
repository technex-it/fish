import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { CartItem as CartItemType } from '../../types';
import { Trash, Minus, Plus } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="text-base font-medium text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecreaseQuantity}
          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>
        
        <span className="w-8 text-center">{item.quantity}</span>
        
        <button
          onClick={handleIncreaseQuantity}
          className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="ml-6 text-right">
        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 transition-colors mt-1"
          aria-label="Remove item"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};