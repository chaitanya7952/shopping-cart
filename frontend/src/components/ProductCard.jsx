import { useContext, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
// filepath: c:\Users\chait\MiniShoppingCard\miniCart\frontend\src\components\ProductCard.jsx

function ProductCard({ product }) {
  const { dispatch } = useContext(CartContext);
  const [message, setMessage] = useState('');

  async function handleBuy() {
    try {
      await axios.post('/api/orders', { items: [product] });
      setMessage('Order is placed');
    } catch (e) {
      setMessage('Order not placed, please check stock');
    }
  }

  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <div className="row">
        <button className="btn" onClick={() => dispatch({ type: 'ADD', product })}>Add to Cart</button>
        <button className="btn primary" onClick={handleBuy}>Buy</button>
      </div>
      {message && <p className="notice">{message}</p>}
    </div>
  );
}

export default ProductCard;
