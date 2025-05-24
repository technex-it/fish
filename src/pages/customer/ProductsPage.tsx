import React, { useState } from 'react';
import { Navbar } from '../../components/ui/Navbar';
import { Footer } from '../../components/ui/Footer';
import { ProductCard } from '../../components/customer/ProductCard';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { mockProducts } from '../../data/mockData';
import { Filter, Search } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  
  // Filter products based on search query and category
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'name-a-z':
        return a.name.localeCompare(b.name);
      case 'name-z-a':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Fresh Seafood Products</h1>
            <p className="text-gray-600">Browse our selection of premium, sustainably-sourced seafood.</p>
          </div>
          
          {/* Filters and Search */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <Select
                label=""
                options={[
                  { value: 'all', label: 'All Categories' },
                  { value: 'fish', label: 'Fish' },
                  { value: 'shellfish', label: 'Shellfish' },
                  { value: 'crustacean', label: 'Crustacean' },
                  { value: 'other', label: 'Other' }
                ]}
                value={categoryFilter}
                onChange={setCategoryFilter}
                fullWidth
              />
              
              <Select
                label=""
                options={[
                  { value: 'default', label: 'Default Sorting' },
                  { value: 'price-low-high', label: 'Price: Low to High' },
                  { value: 'price-high-low', label: 'Price: High to Low' },
                  { value: 'name-a-z', label: 'Name: A to Z' },
                  { value: 'name-z-a', label: 'Name: Z to A' }
                ]}
                value={sortBy}
                onChange={setSortBy}
                fullWidth
              />
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            
            {sortedProducts.length === 0 && (
              <div className="col-span-full py-8 text-center">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};