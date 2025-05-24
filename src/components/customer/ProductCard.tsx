import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { ShoppingCart } from 'lucide-react';

import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { ShoppingCart } from 'lucide-react';

const IMAGE_BASE_PATH = import.meta.env.VITE_IMAGE_BASE_PATH || '';
const PRODUCT_NAME = import.meta.env.VITE_PRODUCT_NAME || '';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<string>(product.weightOptions ? product.weightOptions[0] : '');

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(product.price);

  const handleWeightChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeight(event.target.value);
  };

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-blue-900 opacity-10"></div>
        <img 
          src={`${IMAGE_BASE_PATH}${product.image}`} 
          alt={PRODUCT_NAME} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">
            Out of Stock
          </div>
        )}
      </div>
      
      <CardContent className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{PRODUCT_NAME}</h3>
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <p className="font-bold text-blue-600">{formattedPrice}</p>
        {product.weightOptions && product.weightOptions.length > 0 && (
          <div className="mt-2">
            <label htmlFor="weight-select" className="block text-sm font-medium text-gray-700 mb-1">
              Select Weight:
            </label>
            <select
              id="weight-select"
              value={selectedWeight}
              onChange={handleWeightChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              {product.weightOptions.map((weight) => (
                <option key={weight} value={weight}>
                  {weight}
                </option>
              ))}
            </select>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          onClick={handleAddToCart}
          variant="primary"
          fullWidth
          disabled={!product.inStock}
          icon={<ShoppingCart size={18} />}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
};
