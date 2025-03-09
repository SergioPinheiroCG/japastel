import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Register = () => {
  const router = useRouter();

  const handleRegister = () => {
    // Lógica de cadastro antes da navegação
    router.push("/login"); // Redireciona para a tela de login
  };

  const handleBackToHome = () => {
    router.push("/"); // Redireciona para a tela inicial
  };

  return (
    <LinearGradient 
      colors={['#FF0000', '#FFFF00']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/LogoJapastel.png')} style={styles.logo} />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#999" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Digite seu nome" placeholderTextColor="#999" />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="phone" size={20} color="#999" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Digite nº de seu telefone" placeholderTextColor="#999" />
        </View>


        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={20} color="#999" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Digite seu e-mail" placeholderTextColor="#999" />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={24} color="#999" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Digite sua senha" placeholderTextColor="#999" secureTextEntry />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={24} color="#999" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Digite novamente sua senha" placeholderTextColor="#999" secureTextEntry />
        </View>

        {/* BOTÃO CADASTRAR */}
        <TouchableOpacity style={styles.buttonRegister} onPress={handleRegister}>
  <Text style={styles.buttonTextRegister}>CADASTRAR</Text>
</TouchableOpacity>
      </View>

      {/* ÍCONE DE VOLTAR À TELA INICIAL */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
        <MaterialIcons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    alignItems: 'center',
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: 'black',
  },
  buttonRegister: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'red',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonTextRegister: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute', // Fixa o botão na parte inferior
    bottom: 20,           // Ajuste para a posição desejada
    left: '50%',          // Centraliza horizontalmente
    transform: [{ translateX: -20 }], // Ajuste fino do botão
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 30,
  },
});

export default Register;
