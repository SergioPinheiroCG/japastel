import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Importando ícones

const Welcome = () => {
  const router = useRouter();

  // Redireciona para a página de login
  const handleIniciar = () => {
    router.push('/login'); // Navega para a tela de login
  };

  return (
    <LinearGradient
      colors={['#FF0000', '#FFFF00']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      {/* LOGO */}
      <Image source={require('../assets/images/LogoJapastel.png')} style={styles.logo} />

      {/* Mensagem de boas-vindas */}
      <Text style={styles.slogan}>SEJA BEM-VINDO</Text>

      {/* FRASE DE IMPACTO */}
      <Text style={styles.slogan}>À FRANQUIA QUE MAIS{'\n'}CRESCE NO{'\n'}BRASIL</Text>

      {/* ÍCONE DE SETA PARA A DIREITA */}
      <TouchableOpacity style={styles.arrowButton} onPress={handleIniciar}>
        <MaterialIcons name="arrow-forward" size={60} color="red" /> {/* Tamanho aumentado */}
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Garante que o TouchableOpacity ocupe toda a tela
  },
  gradient: {
    flex: 1, // Garante que o LinearGradient ocupe toda a tela
    justifyContent: 'center', // Centraliza o conteúdo
    alignItems: 'center', // Centraliza o conteúdo
  },
  logo: {
    width: 200,
    height: 200,
  },
  slogan: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'yellow',
    textAlign: 'center',
    marginTop: 20,
  },
  arrowButton: {
    marginTop: 30, // Posiciona a seta logo abaixo do texto de boas-vindas
    backgroundColor: 'transparent', // Fundo transparente
  },
});

export default Welcome;