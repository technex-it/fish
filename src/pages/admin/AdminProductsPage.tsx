import React, { useState } from 'react';
import { Navbar } from '../../components/ui/Navbar';
import { Footer } from '../../components/ui/Footer';
import { AdminProductForm } from '../../components/admin/AdminProductForm';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { mockProducts } from '../../data/mockData';
import { Product } from '../../types';
import { Edit, Trash, Plus } from 'lucide-react';

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newProduct: Product = {
        id: String(Date.now()),
        ...productData
      };
      
      setProducts(prev => [newProduct, ...prev]);
      setIsFormVisible(false);
      setIsLoading(false);
      
      alert('Product added successfully!');
    }, 1000);
  };

  const handleUpdateProduct = (productData: Omit<Product, 'id'>) => {
    if (!editingProduct) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const updatedProduct: Product = {
        ...editingProduct,
        ...productData
      };
      
      setProducts(prev => 
        prev.map(product => 
          product.id === editingProduct.id ? updatedProduct : product
        )
      );
      
      setEditingProduct(null);
      setIsFormVisible(false);
      setIsLoading(false);
      
      alert('Product updated successfully!');
    }, 1000);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(product => product.id !== productId));
      alert('Product deleted successfully!');
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsFormVisible(true);
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsFormVisible(true);
  };

  const handleCancelForm = () => {
    setEditingProduct(null);
    setIsFormVisible(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
              <p className="text-gray-600">Add, edit, or remove products from your inventory.</p>
            </div>
            
            {!isFormVisible && (
              <Button 
                onClick={handleAddClick}
                variant="primary"
                icon={<Plus size={18} />}
              >
                Add New Product
              </Button>
            )}
          </div>
          
          {isFormVisible ? (
            <div className="mb-8">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <Button
                      onClick={handleCancelForm}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <AdminProductForm
                    product={editingProduct || undefined}
                    onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
                    isLoading={isLoading}
                  />
                </CardContent>
              </Card>
            </div>
          ) : null}
          
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800">Products ({products.length})</h2>
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
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt={product.name} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditClick(product)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                          No products found. Add a new product to get started.
                        </td>
                      </tr>
                    )}
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