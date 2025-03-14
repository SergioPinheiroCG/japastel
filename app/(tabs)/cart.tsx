import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useCart } from '../../context/CartContext';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart() as unknown as { cartItems: CartItem[], removeFromCart: (id: string) => void, updateQuantity: (id: string, quantity: number) => void };
  const router = useRouter(); // Inicializando o roteador

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Dinheiro'); // Estado para o método de pagamento
  const [userName, setUserName] = useState<string>(''); // Estado para o nome do usuário

  useEffect(() => {
    // Recupera o nome do usuário logado do AsyncStorage
    const fetchUserName = async () => {
      const storedUserName = await AsyncStorage.getItem('loggedInUser');
      if (storedUserName) {
        setUserName(storedUserName);
      }
    };

    fetchUserName();
  }, []);

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

  const renderPaymentOption = (paymentMethod: string) => {
    switch (paymentMethod) {
      case 'Dinheiro':
        return (
          <View style={styles.paymentOption}>
            <FontAwesome name="money" size={24} color="green" />
            <Text style={styles.paymentText}>Dinheiro</Text>
          </View>
        );
      case 'Pix':
        return (
          <View style={styles.paymentOption}>
            <FontAwesome name="qrcode" size={24} color="blue" />
            <Text style={styles.paymentText}>Pix</Text>
          </View>
        );
      case 'Cartão de Crédito':
        return (
          <View style={styles.paymentOption}>
            <FontAwesome name="credit-card" size={24} color="red" />
            <Text style={styles.paymentText}>Cartão de Crédito</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Exibindo o nome do usuário logado no título */}
      <Text style={styles.title}>Seu Carrinho, {userName ? userName : 'Carregando...'}</Text>

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

          {/* Seção de seleção de forma de pagamento */}
          <View style={styles.paymentMethodContainer}>
            <Text style={styles.paymentMethodTitle}>Forma de pagamento</Text>
            <View style={styles.paymentMethodOptions}>
              {['Dinheiro', 'Pix', 'Cartão de Crédito'].map((paymentMethod) => (
                <TouchableOpacity
                  key={paymentMethod}
                  style={styles.paymentMethodButton}
                  onPress={() => setSelectedPaymentMethod(paymentMethod)}
                >
                  {renderPaymentOption(paymentMethod)}
                </TouchableOpacity>
              ))}
            </View>
          </View>

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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemInfo: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 16,
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  trashIcon: {
    marginLeft: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  paymentMethodContainer: {
    marginTop: 20,
  },
  paymentMethodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentMethodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  paymentMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    marginLeft: 10,
    fontSize: 16,
  },
  voltarButton: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    alignItems: 'center',
  },
  voltarButtonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default Cart;
