import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600 tracking-tight cursor-pointer">
          UserAuth
        </Link>

        <div className="flex items-center gap-4">
          {
            user ? (
              <>
                <span className="text-sm text-gray-600 hidden sm:inline">
                  Welcome, <span className="font-semibold text-gray-800"> {user.email} </span>
                </span>   
                <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition">
                  Dashboard
                </Link>

                <button onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm 
                    font-medium px-4 py-2 rounded-lg transition cursor-pointer" > Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-1 text-sm font-medium text-gray-700 
                  hover:text-blue-600 transition hover:font-bold" > Login
                </Link>

                <Link to="/register" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white
                  text-sm font-medium px-4 py-2 rounded-lg transition hover:font-bold"> Register
                </Link>
              </>
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;