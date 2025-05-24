import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { Navbar } from '../../components/ui/Navbar';
import { Footer } from '../../components/ui/Footer';
import { Button } from '../../components/ui/Button';
import { CartItem } from '../../components/customer/CartItem';
import { Card, CardContent, CardHeader, CardFooter } from '../../components/ui/Card';
import { ArrowLeft, ShoppingCart, Trash } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, clearCart, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Checkout successful! Your order has been placed.');
      clearCart();
      setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart</h1>
            <p className="text-gray-600">Review your items before checkout.</p>
          </div>
          
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="border-b">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold">Cart Items ({cart.length})</h2>
                      <button
                        onClick={clearCart}
                        className="text-red-500 flex items-center text-sm hover:text-red-700 transition-colors"
                      >
                        <Trash size={16} className="mr-1" />
                        Clear Cart
                      </button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="divide-y divide-gray-200">
                    {cart.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              {/* Order Summary */}
              <div>
                <Card className="sticky top-24">
                  <CardHeader className="border-b">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                  </CardHeader>
                  
                  <CardContent className="py-4">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium">$0.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium">${(totalPrice * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-4 flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-xl">${(totalPrice + totalPrice * 0.08).toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button
                      variant="primary"
                      fullWidth
                      isLoading={isCheckingOut}
                      onClick={handleCheckout}
                      icon={<ShoppingCart size={18} />}
                    >
                      Proceed to Checkout
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-blue-100 rounded-full p-6 inline-flex mb-6">
                <ShoppingCart className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link to="/products">
                <Button variant="primary" icon={<ArrowLeft size={18} />}>
                  Continue Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};