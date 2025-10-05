/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from "../../../redux/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      // Direct login logic with hardcoded credentials
      if (email === 'ameybiz0@gmail.com' && password === '12345678') {
        // Set user for ADHD dashboard
        const user = {
          id: 1,
          email: 'ameybiz0@gmail.com',
          username: 'ADHD User',
          role: 'adhd'
        };
        
        dispatch(setUser({ user }));
        localStorage.setItem('token', 'adhd_user_token_123');
        localStorage.setItem('user', JSON.stringify(user));
        
        navigate('/dashboards/adhd-dashboard');
      } 
      else if (email === 'ameykandal@gmail.com' && password === '12345678') {
        // Set user for Parent dashboard
        const user = {
          id: 2,
          email: 'ameykandal@gmail.com',
          username: 'Parent User',
          role: 'parent'
        };
        
        dispatch(setUser({ user }));
        localStorage.setItem('token', 'parent_user_token_456');
        localStorage.setItem('user', JSON.stringify(user));
        
        navigate('/dashboards/parents-dashboard');
      } 
      else {
        setMessage("Invalid email or password!");
      }
      
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Welcome Back!
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {message && <p className="text-red-500 text-center text-sm">{message}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-pink-600 dark:text-pink-400 hover:underline">
            Register
          </Link>{' '}
          here.
        </p>
      </div>
    </div>
  );
};

export default Login;