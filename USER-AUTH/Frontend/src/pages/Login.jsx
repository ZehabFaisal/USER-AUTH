import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from "../context/AuthContext";
import { HiOutlineLogin } from 'react-icons/hi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Please fill in all fields of form, in order to login to website');
    }
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } 
    catch (err) {
      const message =
        err.response?.data?.message || err.response?.data?.error || "User's login is failed!";
      toast.error(message);
    } 
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-amber-700 cursor-pointer w-full max-w-md rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 
            rounded-full mb-4">
               <HiOutlineLogin className="ml-1" size={30} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 underline"> Welcome Back </h2>
          <p className="text-[15px] text-gray-500 mt-1"> Sign in to your account! </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"> Email Address </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500
               focus:border-blue-500 outline-none transition text-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"> Password </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm" />
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 
            disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg 
            transition text-sm cursor-pointer" >  {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium active:text-red-700">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;