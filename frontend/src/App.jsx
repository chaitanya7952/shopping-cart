import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function App() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <center>
      <div className="app-container">
        <h1>🛒 Mini Shopping Cart</h1>
        
        {isAuthenticated ? (
          <div>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              Welcome, {user?.name}! 👋
            </p>
            <button onClick={() => navigate('/products')}>Add to Cart</button>
            <button onClick={() => navigate('/checkout')} style={{ marginLeft: 8 }}>Check Out</button>
            <button 
              onClick={handleLogout} 
              style={{ 
                marginLeft: 8, 
                backgroundColor: '#dc3545', 
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              Please login to access the shopping cart
            </p>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')} style={{ marginLeft: 8 }}>Register</button>
          </div>
        )}
      </div>
    </center>
  );
}

export default App;
