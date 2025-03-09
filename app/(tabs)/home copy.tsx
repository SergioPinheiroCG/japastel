import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Lista de produtos
const produtos = [
  { id: '1', nome: 'Pastel de Queijo', descricao: 'Pastel frito com recheio de queijo', preco: 'R$ 16,00', imagem: require('../../assets/images/pastel_queijo.png') },
  { id: '2', nome: 'Pastel de Camarão', descricao: 'Pastel frito com recheio de camarão', preco: 'R$ 18,00', imagem: require('../../assets/images/pastel_camarao.png') },
  { id: '3', nome: 'Pastel de FranPiry', descricao: 'Pastel frito com frango desfiado e catupiry', preco: 'R$ 16,00', imagem: require('../../assets/images/pastel_franpiry.png') },
  { id: '4', nome: 'Pastel de Carne', descricao: 'Pastel frito com carne moída e bacon', preco: 'R$ 16,00', imagem: require('../../assets/images/pastel_carne.png') },
  { id: '5', nome: 'Refrigerantes', descricao: 'Melão, Mirtilo, Morango, Original, Laranja', preco: 'R$ 25,00', imagem: require('../../assets/images/refrigerante.png') },
  { id: '6', nome: 'Coca-Cola', descricao: 'É feito a partir de água gaseificada, açúcar, extrato de noz de cola e cafeína ', preco: 'R$ 8,00', imagem: require('../../assets/images/coca.png') },
  { id: '7', nome: 'Guarana', descricao: 'Água gaseificada, açúcar, semente de guaraná, aroma natural de guaraná, acidulante: ácido cítrico', preco: 'R$ 8,00', imagem: require('../../assets/images/guarana.png') },
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

// Componente Home
export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* IMAGENS LADO A LADO */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/pastel_queijo.png')} style={styles.image} />
        <Image source={require('../../assets/images/pastel_camarao.png')} style={styles.image} />
        <Image source={require('../../assets/images/pastel_franpiry.png')} style={styles.image} />
      </View>

      {/* POSTAGENS DE CLIENTES */}
      <View style={styles.reviewsContainer}>
        <Text style={styles.sectionTitle}>O que nossos clientes dizem</Text>
        <Text style={styles.reviewText}>“Os melhores pastéis que já comi! A massa é super crocante e o recheio é maravilhoso!” - João</Text>
        <Text style={styles.reviewText}>“Eu sou fã do pastel de camarão! Não tem comparação.” - Maria</Text>
        <Text style={styles.reviewText}>“Recomendo a todos. Pastéis deliciosos e atendimento excelente!” - Pedro</Text>
      </View>

      {/* SOBRE A EMPRESA */}
      <View style={styles.aboutContainer}>
        <Text style={styles.sectionTitle}>Sobre a empresa</Text>
        <Text style={styles.aboutText}>
          O Japastel foi fundado por Gustavo Kubo, um japonês que chegou ao Brasil com uma visão única.
          Ao longo dos anos, Gustavo e sua família consolidaram o Japastel como uma referência em qualidade
          e sabor, oferecendo deliciosos pastéis e refrigerantes em um ambiente acolhedor e familiar.
        </Text>
      </View>
    </ScrollView>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewsContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  aboutContainer: {
    paddingHorizontal: 10,
    marginTop: 30,
    backgroundColor: '#F9F9F9',
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  aboutText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
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
