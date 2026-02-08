import { useState } from 'react'
import { Button, Typography, Container } from "@mui/material";
import './App.css'
import Header from './components/header.jsx';
import Cart from './pages/cart.jsx';
import Home from './pages/home.jsx';
import ProductDetails from './pages/productDetails.jsx';
import Login from './pages/login.jsx';
import NotFound from './pages/notFound.jsx';
import { Route, Routes } from "react-router-dom";
import Register from './pages/register.jsx';
import AdminLayout from './admin/adminLayout.jsx';
import Dashboard from './admin/dashboard.jsx';
import Products from './admin/products.jsx';
import Orders from './admin/orders.jsx';
import Users from './admin/users.jsx';
import AddProduct from './admin/components/addProduct.jsx';


function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<Users />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App


