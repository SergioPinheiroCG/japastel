import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useCart } from '../../context/CartContext';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart() as unknown as { cartItems: CartItem[], removeFromCart: (id: string) => void, updateQuantity: (id: string, quantity: number) => void };
  const router = useRouter();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Dinheiro');
  const [userName, setUserName] = useState<string>('');

  const [cardNumber, setCardNumber] = useState<string>('');
  const [securityCode, setSecurityCode] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');

  useEffect(() => {
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

    if (selectedPaymentMethod === 'Cartão de Crédito') {
      if (!cardNumber || !securityCode || !expiryDate) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos do cartão de crédito.');
        return;
      }
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
    const isSelected = selectedPaymentMethod === paymentMethod;
    const iconName = isSelected ? 'check-square' : 'square';
    let paymentIcon = null;

    switch (paymentMethod) {
      case 'Dinheiro':
        paymentIcon = <FontAwesome name="money" size={24} color="green" />;
        break;
      case 'Pix':
        paymentIcon = <FontAwesome name="qrcode" size={24} color="blue" />;
        break;
      case 'Cartão de Crédito':
        paymentIcon = <FontAwesome name="credit-card" size={24} color="red" />;
        break;
      default:
        paymentIcon = null;
    }

    return (
      <View style={styles.paymentOption}>
        <TouchableOpacity
          style={styles.paymentOptionButton}
          onPress={() => setSelectedPaymentMethod(paymentMethod)}
        >
          <FontAwesome name={iconName} size={24} color={isSelected ? 'green' : 'gray'} />
          <Text style={styles.paymentText}>{paymentMethod}</Text>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          {paymentIcon}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Seu Carrinho, {userName}</Text>

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

                    <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                      <FontAwesome name="trash" size={24} color="gray" style={styles.trashIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />

            <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>

            <View style={styles.paymentMethodContainer}>
              <Text style={styles.paymentMethodTitle}>Forma de pagamento</Text>
              <View style={styles.paymentMethodOptions}>
                {['Dinheiro', 'Pix', 'Cartão de Crédito'].map((paymentMethod) => (
                  <View key={paymentMethod} style={styles.paymentOptionContainer}>
                    {renderPaymentOption(paymentMethod)}
                  </View>
                ))}
              </View>
            </View>

            {selectedPaymentMethod === 'Cartão de Crédito' && (
              <View style={styles.cardInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Número do Cartão"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="numeric"
                  maxLength={16}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Código de Segurança"
                  value={securityCode}
                  onChangeText={setSecurityCode}
                  keyboardType="numeric"
                  maxLength={3}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Data de Validade (MM/AA)"
                  value={expiryDate}
                  onChangeText={setExpiryDate}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>

      <View style={styles.finalizarButton}>
        <Button title="Finalizar Pedido" color="green" onPress={finalizarPedido} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80, // espaço para o botão no final
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
    color: 'gray',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  trashIcon: {
    marginLeft: 10,
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'right',
  },
  paymentMethodContainer: {
    marginTop: 20,
  },
  paymentMethodTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentMethodOptions: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  paymentOptionContainer: {
    marginBottom: 10,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
    marginLeft: 10,
  },
  iconContainer: {
    marginLeft: 10,
  },
  cardInputContainer: {
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 8,
    marginVertical: 10,
    fontSize: 16,
  },
  finalizarButton: {
    position: 'relative',
    bottom: 10,
    left: 20,
    right: 20,
    padding: 60,
  },
});

export default Cart;
