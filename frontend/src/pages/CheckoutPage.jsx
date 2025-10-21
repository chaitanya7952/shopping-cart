import { useContext, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const { cart = [], dispatch } = useContext(CartContext) || {};
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const total = Array.isArray(cart) ? cart.reduce((sum, item) => sum + (item.price || 0), 0) : 0;

  async function handleBuyAll() {
    if (loading) return;
    if (!Array.isArray(cart) || cart.length === 0) {
      setMessage('Cart is empty. Please add products before checkout.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      // use vite proxy: '/api/orders' -> backend
      const res = await axios.post('/orders', { items: cart });
      // optional: check response status/data
      setMessage(res?.data?.message || 'Order placed successfully.');
      if (dispatch) dispatch({ type: 'CLEAR' });
      // navigate home after short delay
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      console.error('Checkout error:', err);
      const errMsg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        'Order not placed, please try again.';
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page checkout-page">
      <h2>Check Out</h2>
      {(!Array.isArray(cart) || cart.length === 0) ? (
        <div>
          <p className="muted">Your cart is empty.</p>
          <button onClick={() => navigate('/products')}>Go to Products</button>
        </div>
      ) : (
        <div>
          <div className="cart-list">
            {cart.map(item => (
              <div className="cart-item" key={item._id} style={{ display: 'flex', justifyContent: 'space-between', padding: 8 }}>
                <span>{item.name}</span>
                <span>₹{item.price}</span>
                <button className="btn" onClick={() => dispatch({ type: 'REMOVE', id: item._id })}>Remove</button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
            <h3>Total: ₹{total}</h3>
            <div>
              <button className="btn" onClick={() => navigate('/')}>Home</button>
              <button className="btn" onClick={() => navigate('/products')} style={{ marginLeft: 8 }}>Add more</button>
              <button
                type="button"
                className="btn primary"
                onClick={handleBuyAll}
                disabled={loading}
                style={{ marginLeft: 8 }}
              >
                {loading ? 'Processing...' : 'BUY'}
              </button>
            </div>
          </div>
        </div>
      )}  
      {message && <p className="notice">{message}</p>}
    </div>
  );
}

export default CheckoutPage;


