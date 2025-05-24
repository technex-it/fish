import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { LogIn } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user: loginUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const loggedInUser = await login(email, password);
      
      if (loggedInUser) {
        // Redirect based on user role
        if (loggedInUser.role === 'employee') {
          navigate('/employee/dashboard');
        } else if (loggedInUser.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (loggedInUser.role === 'customer') {
          navigate('/customer/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
      </CardHeader>
      
      <CardContent>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            className="mb-4"
          />
          
          <Input
            label="Password"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            className="mb-6"
          />
          
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            isLoading={isLoading}
            icon={<LogIn size={18} />}
          >
            Log In
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="text-center text-gray-600 text-sm">
        <div className="mb-2">
          <p>Demo Users:</p>
        </div>
        <div className="grid grid-cols-1 gap-2 text-left">
          <div className="text-xs">
            <p><strong>Customer:</strong> customer@example.com</p>
            <p><strong>Employee:</strong> employee@example.com</p>
            <p><strong>Admin:</strong> admin@example.com</p>
          </div>
        </div>
        <div className="mt-2">
          <p>Password for all accounts: password</p>
        </div>
      </CardFooter>
    </Card>
  );
};