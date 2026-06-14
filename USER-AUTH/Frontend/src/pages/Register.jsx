import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { HiOutlineLockClosed } from "react-icons/hi"

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return toast.error('Please fill in all fields');
    }
    if (password !== confirmPassword) {
      return toast.error('Error! Passwords do not match');
    }
    if (password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    setIsSubmitting(true);

    try {
      await register(name, email, password);
      navigate("/login");
    } 
    catch (err) {
      const message =
        err.response?.data?.message || err.response?.data?.error || "User's Registration is failed";
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
              <HiOutlineLockClosed size={35} />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 underline"> Create Account </h2>
          <p className="text-[15px] text-gray-500 mt-1"> Join us today and get started! </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"> Full Name </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name...." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"> Email Address </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email address..." className="w-full px-4 py-2.5 border border-gray-300 
              rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"> Password </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password..." className="w-full px-4 py-2.5 border border-gray-300 
              rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"> Confirm Password </label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Enter your confirm password..." className="w-full px-4 py-2.5 border border-gray-300 
              rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"/>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 
            disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg 
            text-sm cursor-pointer" > {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium active:text-red-600">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;