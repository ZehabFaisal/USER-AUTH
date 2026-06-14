import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axois';
import { toast } from 'react-toastify';
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await API.get("/get-profile");
          setUser(res.data.user);
        }
        catch (error) {
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const register = async (name, email, password) => {
    const res = await API.post('/register', { name, email, password });
    toast.success(res.data.message || 'Registration successful!');
    return res.data;
  };

  const login = async (email, password) => {
    try {
      const res = await API.post('/login', { email, password });
      const { token } = res.data;
      localStorage.setItem('token', token);

      const profile = await API.get('/get-profile');
      setUser(profile.data.user);
      toast.success(res.data.message || 'Login successful!');
      return res.data;
    } 
    catch (err) {
      const message = err.response?.data?.message || 'Login is failed';
      toast.error(message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out is done successfully!');
  };

  const value = { user, setUser, loading, register, login, logout };

  return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
};

export default AuthContext;