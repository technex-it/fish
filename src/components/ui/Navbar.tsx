import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Fish, Menu, X, ShoppingCart, LogOut, User, Briefcase } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPortalName = () => {
    if (!user) return 'Fishermen Catch';
    
    switch (user.role) {
      case 'customer': return 'Customer Portal';
      case 'employee': return 'Employee Portal';
      case 'admin': return 'Admin Panel';
      default: return 'Fishermen Catch';
    }
  };

  const getNavLinks = () => {
    if (!user) {
      return [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About Us' },
        { to: '/products', label: 'Products' },
        { to: '/contact', label: 'Contact' },
        { to: '/login', label: 'Customer Login' },
        { 
          to: '/employee/login', 
          label: 'Employee Login',
          icon: <Briefcase className="h-4 w-4 mr-1" />
        }
      ];
    }

    switch (user.role) {
      case 'customer':
        return [
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/products', label: 'Shop' },
          { to: '/orders', label: 'My Orders' },
          { to: '/profile', label: 'Profile' }
        ];
      case 'employee':
        return [
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/leave', label: 'Leave Requests' },
          { to: '/profile', label: 'Profile' }
        ];
      case 'admin':
        return [
          { to: '/dashboard', label: 'Dashboard' },
          { to: '/users', label: 'Users' },
          { to: '/products', label: 'Products' },
          { to: '/orders', label: 'Orders' },
          { to: '/leave', label: 'Leave Requests' }
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Fish className="h-8 w-8 text-teal-400" />
              <span className="text-xl font-bold">{getPortalName()}</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-blue-700 flex items-center
                  ${location.pathname === link.to ? 'bg-blue-700' : ''}`}
              >
                {link.icon && link.icon}
                {link.label}
              </Link>
            ))}

            {user?.role === 'customer' && (
              <Link to="/cart" className="relative px-3 py-2">
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated && (
              <div className="flex items-center ml-4 space-x-2">
                <div className="flex items-center space-x-2 border-l pl-4 border-blue-700">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                  <span className="text-sm hidden lg:block">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-2 p-2 text-white hover:bg-blue-700 rounded-full"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            {user?.role === 'customer' && (
              <Link to="/cart" className="relative mr-4">
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-blue-700"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center
                ${location.pathname === link.to ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.icon && link.icon}
              {link.label}
            </Link>
          ))}

          {isAuthenticated && (
            <div className="border-t border-blue-700 pt-3 mt-3">
              <div className="flex items-center px-3 py-2">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full mr-2 object-cover"
                  />
                ) : (
                  <User className="h-6 w-6 mr-2" />
                )}
                <span>{user?.name}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 flex items-center"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};