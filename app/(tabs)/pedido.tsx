import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Lista de produtos
const produtos = [
  { id: '1', nome: 'Pastel de Queijo', descricao: 'Pastel frito com recheio de queijo', preco: 'R$ 16,00', imagem: require('../../assets/images/pastel_queijo.png') },
  { id: '2', nome: 'Pastel de Camarão', descricao: 'Pastel frito com recheio de camarão', preco: 'R$ 18,00', imagem: require('../../assets/images/pastel_camarao.png') },
  { id: '3', nome: 'Pastel de FranPiry', descricao: 'Pastel frito com frango desfiado e catupiry', preco: 'R$ 16,00', imagem: require('../../assets/images/pastel_franpiry.png') },
  { id: '4', nome: 'Pastel de Carne', descricao: 'Pastel frito com carne moída e bacon', preco: 'R$ 16,00', imagem: require('../../assets/images/pastel_carne.png') },
  { id: '5', nome: 'Refrigerantes', descricao: 'Melão, Mirtilo, Morango, Original, Laranja', preco: 'R$ 25,00', imagem: require('../../assets/images/refrigerante.png') },
  { id: '6', nome: 'Coca-Cola', descricao: 'É feito a partir de água gaseificada, açúcar, extrato de noz de cola e cafeína ', preco: 'R$ 8,00', imagem: require('../../assets/images/coca.png') },
  { id: '7', nome: 'Guarana', descricao: 'Água gaseificada,açúcar,semente de guaraná,aroma natural de guaraná,acidulante:ácido cítrico;conservadores:sorbato de potássio e benzoato de sódio;corante;caramelo tipo IV', preco: 'R$ 8,00', imagem: require('../../assets/images/guarana.png') },
 ];

// Componente de item do produto
const ProdutoItem = ({ item }: { item: typeof produtos[0] }) => (
  <View style={styles.itemCard}>
    <Image source={item.imagem} style={styles.itemImage} resizeMode="cover" />
    <View style={styles.itemInfo}>
      <Text style={styles.itemName}>{item.nome}</Text>
      <Text style={styles.itemDescription}>{item.descricao}</Text>
      <Text style={styles.itemPrice}>{item.preco}</Text>
    </View>
    <TouchableOpacity style={styles.cartButton}>
      <FontAwesome name="shopping-cart" size={20} color="#FFF" />
    </TouchableOpacity>
  </View>
);

export default function Pedido() {
  
  return (
    <View style={styles.container}>
      {/* BANNER */}
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerText}>FAÇA SEU PEDIDO</Text>
      </View>

      {/* LISTA DE PRODUTOS */}
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProdutoItem item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  bannerContainer: {
    backgroundColor: '#FFD700',
    padding: 10,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#CE0000',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 10,
    padding: 10,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#CE0000',
  },
  cartButton: {
    backgroundColor: '#CE0000',
    borderRadius: 25,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});