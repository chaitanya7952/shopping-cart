import { createContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.product];
    case 'REMOVE':
      return state.filter(p => p._id !== action.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}


