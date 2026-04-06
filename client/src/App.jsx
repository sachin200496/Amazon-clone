import { useState, useEffect } from 'react'
import { Button, Typography, Container } from "@mui/material";
import './App.css'
import Header from './components/header.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Cart from './pages/cart.jsx';
import Home from './pages/home.jsx';
import ProductDetails from './pages/productDetails.jsx';
import Login from './pages/login.jsx';
import NotFound from './pages/notFound.jsx';
import { Route, Routes, useLocation } from "react-router-dom";
import Register from './pages/register.jsx';
import AdminLayout from './admin/adminLayout.jsx';
import Dashboard from './admin/dashboard.jsx';
import Products from './admin/products.jsx';
import Orders from './admin/orders.jsx';
import Users from './admin/users.jsx';
import AddProduct from './admin/components/addProduct.jsx';
import { useAuthStore } from './store/authStore';
import api from './api/axios';
import { useNavigate } from 'react-router-dom';
import EditProducts from './admin/components/editProduct.jsx';

function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const location = useLocation();

   useEffect(() => {
    if(!user && !isInitializing){
      navigate('/login');
    }
  },[user,isInitializing])

  useEffect(() => {
    // Check if user has a valid session on page load
    const verifySession = async () => {
      try {
        

        // Try to get current user from server (if they have a valid token in cookies)
        const response = await api.get('/auth/me');
        if (response.data && response.data.user) {
          login(response.data.user, response.data.isAdmin ? 'admin' : 'customer');
          console.log("User session restored from server:", response.data.user);
        }
      } catch (error) {
        console.log("No active session or token expired");
      } finally {
        setIsInitializing(false);
      }
    };

    verifySession();
  }, []);



  // Show loading state while verifying session
  if (isInitializing) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  // Don't show regular header for admin routes (AdminLayout has its own header)
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        {/* Customer Routes */}
        <Route path='/cart' element={<ProtectedRoute requiredRole="customer"><Cart /></ProtectedRoute>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProducts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>
        
        {/* Not Found */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}
       
export default App


