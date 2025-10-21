import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';

function CartPage() {
  const { cart, dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="page cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="muted">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map(item => (
              <div className="cart-item" key={item._id}>
                <span>{item.name}</span>
                <span>₹{item.price}</span>
                <button className="btn" onClick={() => dispatch({ type: 'REMOVE', id: item._id })}>Remove</button>
              </div>
            ))}
          </div>
          <h3>Total: ₹{total}</h3>
          <button className="btn primary" onClick={() => navigate('/checkout')}>Check Out</button>
        </>
      )}
    </div>
  );
}

export default CartPage;
