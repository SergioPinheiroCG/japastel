import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useCart } from '../../context/CartContext';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart() as unknown as { cartItems: CartItem[], removeFromCart: (id: string) => void, updateQuantity: (id: string, quantity: number) => void };
  const router = useRouter(); // Inicializando o roteador

  interface CartItem {
    id: string;
    nome: string;
    preco: string;
    quantidade: number;
  }

  const parsePrice = (preco: string): number => {
    return Number(preco.replace('R$', '').replace(',', '.').trim());
  };

  const total = cartItems.reduce((sum, item) => sum + (item.quantidade || 1) * parsePrice(item.preco), 0);

  const finalizarPedido = () => {
    if (cartItems.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione itens ao carrinho antes de finalizar o pedido.');
      return;
    }

    const numeroPedido = Math.floor(1000 + Math.random() * 9000);

    Alert.alert('Pedido Finalizado!', `Seu pedido foi confirmado com o número: #${numeroPedido}`, [{ text: 'OK' }]);

    cartItems.forEach((item) => removeFromCart(item.id));
  };

  const handleRemoveItem = (id: string) => {
    Alert.alert('Remover item', 'Tem certeza que deseja remover este item?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', onPress: () => removeFromCart(id), style: 'destructive' },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu Carrinho</Text>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemText}>{item.nome}</Text>
                  <Text style={styles.itemPrice}>
                    R$ {((item.quantidade || 1) * parsePrice(item.preco)).toFixed(2)}
                  </Text>
                </View>

                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantidade - 1)} disabled={item.quantidade <= 1}>
                    <FontAwesome name="minus-circle" size={24} color={item.quantidade > 1 ? "red" : "gray"} />
                  </TouchableOpacity>

                  <Text style={styles.quantityText}>{item.quantidade || 1}</Text>

                  <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantidade + 1)}>
                    <FontAwesome name="plus-circle" size={24} color="green" />
                  </TouchableOpacity>

                  {/* Ícone de lixeira para remover o item */}
                  <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                    <FontAwesome name="trash" size={24} color="gray" style={styles.trashIcon} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>

          <Button title="Finalizar Pedido" color="green" onPress={finalizarPedido} />
        </>
      )}

      {/* BOTÃO PARA VOLTAR PARA PEDIDOS - Sempre visível */}
      <TouchableOpacity style={styles.voltarButton} onPress={() => router.push('/(tabs)/pedido')}>
        <Text style={styles.voltarButtonText}>Voltar para Pedidos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemInfo: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#CE0000',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'right',
  },
  voltarButton: {
    backgroundColor: '#CE0000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  voltarButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  trashIcon: {
    marginLeft: 10,
  },
});

export default Cart;
