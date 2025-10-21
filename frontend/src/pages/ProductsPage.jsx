import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';

// ---------- PRODUCT DATA WITH IMAGE LINKS ----------
const initialProducts = [
  // Men
  { _id: 'm1', name: 'Classic T-Shirt', price: 799, stock: 20, category: 'men', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'm2', name: 'Slim Fit Jeans', price: 1999, stock: 15, category: 'men', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'm3', name: 'Leather Jacket', price: 4999, stock: 5, category: 'men', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format' },
  { _id: 'm4', name: 'Formal Shirt', price: 1299, stock: 12, category: 'men', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format' },
  { _id: 'm5', name: 'Chino Pants', price: 1399, stock: 14, category: 'men', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246' },
  { _id: 'm6', name: 'Casual Shirt', price: 999, stock: 18, category: 'men', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'm7', name: 'Bomber Jacket', price: 3599, stock: 7, category: 'men', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'm8', name: 'Crewneck Sweater', price: 1199, stock: 10, category: 'men', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f' },
  { _id: 'm9', name: 'Cargo Shorts', price: 899, stock: 16, category: 'men', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'm10', name: 'Running Shoes', price: 2499, stock: 11, category: 'men', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
  { _id: 'm11', name: 'Sports Hoodie', price: 1499, stock: 13, category: 'men', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'm12', name: 'Leather Belt', price: 699, stock: 20, category: 'men', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'm13', name: 'Wool Coat', price: 5999, stock: 4, category: 'men', image: 'https://images.unsplash.com/photo-1544441893-675973e31985' },
  { _id: 'm14', name: 'Dress Pants', price: 1699, stock: 9, category: 'men', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'm15', name: 'Polo Shirt', price: 999, stock: 17, category: 'men', image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5' },

  // Women
  { _id: 'w1', name: 'Floral Dress', price: 2299, stock: 10, category: 'women', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f' },
  { _id: 'w2', name: 'Denim Skirt', price: 1499, stock: 8, category: 'women', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'w3', name: 'Silk Blouse', price: 1899, stock: 6, category: 'women', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'w4', name: 'Ankle Boots', price: 2799, stock: 7, category: 'women', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'w5', name: 'Wrap Dress', price: 2499, stock: 12, category: 'women', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'w6', name: 'Trench Coat', price: 4599, stock: 5, category: 'women', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'w7', name: 'Pleated Skirt', price: 1299, stock: 11, category: 'women', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'w8', name: 'Crop Top', price: 699, stock: 20, category: 'women', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'w9', name: 'Platform Sandals', price: 1999, stock: 9, category: 'women', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f' },
  { _id: 'w10', name: 'Blazer', price: 2199, stock: 8, category: 'women', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'w11', name: 'Knit Cardigan', price: 1399, stock: 14, category: 'women', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'w12', name: 'Maxi Dress', price: 2699, stock: 6, category: 'women', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'w13', name: 'Slim Jeans', price: 1799, stock: 13, category: 'women', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'w14', name: 'Statement Necklace', price: 499, stock: 25, category: 'women', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'w15', name: 'Evening Gown', price: 7999, stock: 3, category: 'women', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },

  // Kids
  { _id: 'k1', name: 'Kids T-Shirt', price: 399, stock: 25, category: 'kids', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'k2', name: 'Kids Shorts', price: 499, stock: 20, category: 'kids', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'k3', name: 'Kids Hoodie', price: 699, stock: 15, category: 'kids', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'k4', name: 'Kids Sneakers', price: 999, stock: 10, category: 'kids', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff' },
  { _id: 'k5', name: 'Kids Jeans', price: 799, stock: 18, category: 'kids', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'k6', name: 'Kids Jacket', price: 1199, stock: 12, category: 'kids', image: 'https://images.unsplash.com/photo-1544441893-675973e31985' },
  { _id: 'k7', name: 'Kids Dress', price: 599, stock: 14, category: 'kids', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f' },
  { _id: 'k8', name: 'Kids Sandals', price: 399, stock: 20, category: 'kids', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f' },
  { _id: 'k9', name: 'Kids Cap', price: 199, stock: 30, category: 'kids', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'k10', name: 'Kids Sweater', price: 699, stock: 16, category: 'kids', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f' },
  { _id: 'k11', name: 'Kids Leggings', price: 299, stock: 22, category: 'kids', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'k12', name: 'Kids Pajamas', price: 349, stock: 24, category: 'kids', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f' },
  { _id: 'k13', name: 'Kids Raincoat', price: 899, stock: 9, category: 'kids', image: 'https://images.unsplash.com/photo-1544441893-675973e31985' },
  { _id: 'k14', name: 'Kids Backpack', price: 499, stock: 18, category: 'kids', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f' },
  { _id: 'k15', name: 'Kids Socks (5-pack)', price: 249, stock: 40, category: 'kids', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f' }
];

// ---------- COMPONENT ----------
function ProductsPage() {
  const { cart = [], dispatch } = useContext(CartContext) || {};
  const [products, setProducts] = useState(initialProducts);
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();

  function handleAdd(productId) {
    const prod = products.find(p => p._id === productId);
    if (!prod || prod.stock <= 0) return;
    setProducts(prev => prev.map(p => (p._id === productId ? { ...p, stock: p.stock - 1 } : p)));
    if (dispatch) {
      dispatch({ type: 'ADD', product: { _id: prod._id, name: prod.name, price: prod.price } });
    }
  }

  const filtered = category === 'all' ? products : products.filter(p => p.category === category);

  return (
    <div className="page products-page">
      <h2>Fashion Products</h2>

      <div style={{ marginBottom: 12 }}>
        <button onClick={() => navigate('/')}>Home</button>
        {Array.isArray(cart) && cart.length > 0 && (
          <button onClick={() => navigate('/checkout')} style={{ marginLeft: 8 }}>
            Go to your cart
          </button>
        )}
      </div>

      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setCategory('all')} disabled={category === 'all'}>All</button>
        <button onClick={() => setCategory('men')} disabled={category === 'men'} style={{ marginLeft: 8 }}>Men</button>
        <button onClick={() => setCategory('women')} disabled={category === 'women'} style={{ marginLeft: 8 }}>Women</button>
        <button onClick={() => setCategory('kids')} disabled={category === 'kids'} style={{ marginLeft: 8 }}>Kids</button>
      </div>

      <div
        className="products-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          alignItems: 'start'
        }}
      >
        {filtered.map(p => (
          <div
            className="product-card"
            key={p._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: 6,
              padding: 12,
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              gap: 8
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 4 }}
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '8px 0' }}>{p.name}</h3>
              <p style={{ margin: '4px 0' }}>₹{p.price}</p>
              <p style={{ margin: '4px 0', color: p.stock === 0 ? '#c00' : '#333' }}>
                Stock: {p.stock}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => handleAdd(p._id)}
                disabled={p.stock === 0}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  cursor: p.stock === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                {p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                onClick={() => navigate(`/products/${p._id}`)}
                style={{ padding: '8px 12px' }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .products-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .products-grid { grid-template-columns: repeat(1, 1fr); }
        }
      `}</style>
    </div>
  );
}

export default ProductsPage;
