import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { 
    path: '/products', 
    element: (
      <ProtectedRoute>
        <ProductsPage />
      </ProtectedRoute>
    ) 
  },
  { 
    path: '/checkout', 
    element: (
      <ProtectedRoute>
        <CheckoutPage />
      </ProtectedRoute>
    ) 
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);