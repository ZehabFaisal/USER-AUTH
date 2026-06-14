import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import ProtectedRoute from './components/ProtectedRoutes';
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';
import Loader from './components/Loader';
import Footer from "./components/Footer";

const App = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <Loader />;
  } 

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        
        <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />

        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />

        <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;