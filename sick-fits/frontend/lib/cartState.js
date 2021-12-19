import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();

const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  /* our custom provider that
    stores state and functionality (updaters).
    can be accessed via the consumer. */

  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider value={{ cartOpen, setCartOpen, closeCart, openCart }}>
      {children}
    </LocalStateProvider>
  );
}

function useCart() {
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
