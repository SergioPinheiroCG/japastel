import React, { createContext, useState, useContext, ReactNode } from 'react';

// Tipo do produto
interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  imagem: any;
}

// Tipo do contexto
interface CartContextType {
  cartItems: Produto[];
  addToCart: (item: Produto) => void;
  removeFromCart: (id: string) => void;
}

// Criar contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provedor do contexto
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Produto[]>([]);

  const addToCart = (item: Produto) => {
    setCartItems((prevCart) => {
      // Evitar duplicados
      if (prevCart.some((cartItem) => cartItem.id === item.id)) {
        return prevCart;
      }
      return [...prevCart, item];
    });
  };
  const removeFromCart = (id: string) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar o contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};
