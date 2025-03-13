import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definindo o tipo do contexto
interface CartItem {
  id: number;
  quantidade: number;
  [key: string]: any;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantidade: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// CartItem interface moved outside
export const CartProvider = ({ children }: { children: ReactNode }) => {
  interface CartItem {
    id: number;
    quantidade: number;
    [key: string]: any;
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Função para adicionar item ao carrinho
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantidade: (i.quantidade || 1) + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantidade: 1 }];
    });
  };

  // Função para remover um item do carrinho
  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Função para atualizar a quantidade do item no carrinho
  interface UpdateQuantity {
    (id: number, quantidade: number): void;
  }

  const updateQuantity: UpdateQuantity = (id, quantidade) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantidade: Math.max(1, quantidade) } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar o carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};
