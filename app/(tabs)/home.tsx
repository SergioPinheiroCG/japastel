import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Lista de produtos
const produtos = [
  { id: '1', imagem: require('../../assets/images/pastel_queijo.png') },
  { id: '2', imagem: require('../../assets/images/pastel_camarao.png') },
  { id: '3', imagem: require('../../assets/images/pastel_franpiry.png') },
  { id: '4', imagem: require('../../assets/images/pastel_carne.png') },
  { id: '5', imagem: require('../../assets/images/refrigerante.png') },
  { id: '6', imagem: require('../../assets/images/coca.png') },
  { id: '7', imagem: require('../../assets/images/guarana.png') },
];

// Postagens de clientes
const depoimentos = [
  { id: '1', nome: 'João', comentario: 'O pastel de carne é simplesmente maravilhoso! Muito saboroso!' },
  { id: '2', nome: 'Maria', comentario: 'O atendimento é excelente, e o pastel de camarão é imperdível!' },
  { id: '3', nome: 'Carlos', comentario: 'Melhor pastel que já comi! Preço justo e qualidade incrível!' },
];

// Componente de item do produto
const ProdutoItem = ({ item }) => (
  <View style={styles.itemCard}>
    <Image source={item.imagem} style={styles.itemImage} resizeMode="cover" />
    <TouchableOpacity style={styles.cartButton}>
      <FontAwesome name="shopping-cart" size={20} color="#FFF" />
    </TouchableOpacity>
  </View>
);

// Componente para os depoimentos
const DepoimentoItem = ({ item }) => (
  <View style={styles.depoimentoCard}>
    <Text style={styles.depoimentoNome}>{item.nome}</Text>
    <Text style={styles.depoimentoComentario}>{item.comentario}</Text>
  </View>
);

export default function Home() {
  const fadeAnim = new Animated.Value(0); // Controle de animação de fade

  React.useEffect(() => {
    // Animação de fade in ao carregar a tela
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* BANNER */}
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerText}>FAÇA SEU PEDIDO!</Text>
      </View>

      {/* CARROSSEL DE PRODUTOS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carrosselContainer}>
        {produtos.slice(0, 6).map((produto) => (
          <View key={produto.id} style={styles.carrosselItem}>
            <Image source={produto.imagem} style={styles.carrosselImage} />
          </View>
        ))}
      </ScrollView>

      {/* DEPOIMENTOS */}
      <Animated.View style={[styles.depoimentosContainer, { opacity: fadeAnim }]}>
        <Text style={styles.depoimentosTitle}>O que nossos clientes dizem:</Text>
        <FlatList
          data={depoimentos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DepoimentoItem item={item} />}
          contentContainerStyle={styles.depoimentosList}
        />
      </Animated.View>

      {/* SOBRE A EMPRESA */}
      <View style={styles.sobreContainer}>
        <Text style={styles.sobreTitle}>Sobre a empresa</Text>
        <Text style={styles.sobreText}>
          O Japastel foi fundado por Gustavo Kubo, um japonês que chegou ao Brasil com uma visão única. Ao longo dos anos,
          Gustavo e sua família consolidaram o Japastel como uma referência em qualidade e sabor, oferecendo deliciosos
          pastéis e refrigerantes em um ambiente acolhedor e familiar.
        </Text>
        <TouchableOpacity style={styles.sobreButton}>
          <Text style={styles.sobreButtonText}>Saiba mais</Text>
        </TouchableOpacity>
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
  carrosselContainer: {
    marginVertical: 10,
  },
  carrosselItem: {
    marginRight: 10,
  },
  carrosselImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  depoimentosContainer: {
    padding: 20,
    backgroundColor: '#F0F0F0',
    marginTop: 20,
    borderRadius: 10,
  },
  depoimentosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  depoimentosList: {
    marginTop: 10,
  },
  depoimentoCard: {
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  depoimentoNome: {
    fontWeight: 'bold',
    color: '#333',
  },
  depoimentoComentario: {
    color: '#666',
    marginTop: 5,
  },
  sobreContainer: {
    padding: 20,
    backgroundColor: '#FFF',
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sobreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sobreText: {
    fontSize: 14,
    color: '#666',
  },
  sobreButton: {
    marginTop: 15,
    backgroundColor: '#CE0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  sobreButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
}); 