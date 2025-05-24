import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Product } from '../../types';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';

interface AdminProductFormProps {
  product?: Product;
  onSubmit: (data: Omit<Product, 'id'>) => void;
  isLoading?: boolean;
}

export const AdminProductForm: React.FC<AdminProductFormProps> = ({
  product,
  onSubmit,
  isLoading = false
}) => {
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price.toString() || '');
  const [image, setImage] = useState(product?.image || '');
  const [category, setCategory] = useState(product?.category || 'fish');
  const [inStock, setInStock] = useState(product?.inStock || true);
  
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    price?: string;
    image?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      name?: string;
      description?: string;
      price?: string;
      image?: string;
    } = {};
    
    if (!name) {
      newErrors.name = 'Product name is required';
    }
    
    if (!description) {
      newErrors.description = 'Description is required';
    }
    
    if (!price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!image) {
      newErrors.image = 'Image URL is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        name,
        description,
        price: Number(price),
        image,
        category,
        inStock
      });
    }
  };

  const categoryOptions = [
    { value: 'fish', label: 'Fish' },
    { value: 'shellfish', label: 'Shellfish' },
    { value: 'crustacean', label: 'Crustacean' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Product Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            fullWidth
          />
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={`block w-full px-4 py-2 rounded-md border ${
                errors.description
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              } shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              placeholder="Product description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Price ($)"
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              error={errors.price}
              fullWidth
            />
            
            <Select
              label="Category"
              id="category"
              options={categoryOptions}
              value={category}
              onChange={setCategory}
              fullWidth
            />
          </div>
          
          <Input
            label="Image URL"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            error={errors.image}
            fullWidth
          />
          
          <div className="flex items-center">
            <input
              id="inStock"
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900">
              In Stock
            </label>
          </div>
          
          {image && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Image Preview</p>
              <div className="w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={image}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                  }}
                />
              </div>
            </div>
          )}
          
          <CardFooter className="px-0 pb-0 pt-4">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              {product ? 'Update Product' : 'Add Product'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};