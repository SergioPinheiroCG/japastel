import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Welcome = () => {
  const navigate = useRouter();

  // Redireciona para a página de login
  const replacePath = () => {
    navigate.replace('/login'); // Certifique-se de que a rota está correta
  };

  return (
    <TouchableOpacity style={styles.container} onPress={replacePath} activeOpacity={1}>
      <LinearGradient 
      colors={['#FF0000', '#FFFF00']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      {/* LOGO - */}
        <Image source={require('../assets/images/LogoJapastel.png')} style={styles.logo} />
      

      {/* Mensagem de boas-vindas */}
     
       <Text style={styles.slogan}>Seja bem-vindo...</Text>
   

       {/* FRASE DE IMPACTO */}
            <Text style={styles.slogan}>A FRANQUIA QUE MAIS {'\n'}CRESCE NO{'\n'}BRASIL</Text>
    </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,  // Garante que o TouchableOpacity ocupe toda a tela
    },
    gradient: {
      flex: 1, // Garante que o LinearGradient ocupe toda a tela
      justifyContent: 'center',  // Centraliza o conteúdo
      alignItems: 'center',      // Centraliza o conteúdo
    },
    logo: {
      width: 150,
      height: 150,
    },
    slogan: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'yellow',
      textAlign: 'center',
      marginTop: 20,
    },
  });
  

export default Welcome;

