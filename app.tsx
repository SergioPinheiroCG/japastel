import React from 'react';
import { CartProvider } from './context/CartContext';  // Ajusta o caminho conforme necessário
import Layout from './app/(tabs)/_layout'; // Certifique-se de que este arquivo está correto
import Pedido from './app/(tabs)/pedido';  // Certifique-se de importar corretamente o Pedido

export default function App() {
  return (
    <CartProvider>
      {/* Se Layout for o componente principal, ele pode renderizar o Pedido */}
      <Layout />
    </CartProvider>
  );
}


