import React, { useState } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Regex para validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Função para validar o e-mail em tempo real
    const validateEmail = (text: string) => {
        setEmail(text);
        if (!text) {
            setEmailError('E-mail é obrigatório');
        } else if (!emailRegex.test(text)) {
            setEmailError('E-mail inválido');
        } else {
            setEmailError('');
        }
    };

    // Função para validar o formulário ao tentar entrar
    const validateForm = () => {
        let isValid = true;

        if (!email) {
            setEmailError('E-mail é obrigatório');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError('E-mail inválido');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Senha é obrigatória');
            isValid = false;
        }

        return isValid;
    };

    // Função para lidar com o login
    const handleEntrar = async () => {
        if (validateForm()) {
            try {
                // Recupera a lista de usuários
                const usersString = await AsyncStorage.getItem('users');
                if (usersString) {
                    const users = JSON.parse(usersString);

                    // Verifica se há um usuário com o e-mail e senha fornecidos
                    const user = users.find(
                        (u: any) => u.email === email && u.password === password
                    );

                    if (user) {
                        router.push('/(tabs)/home'); // Redireciona para a tela inicial
                    } else {
                        Alert.alert('Erro', 'E-mail ou senha incorretos.');
                    }
                } else {
                    Alert.alert('Erro', 'Nenhum usuário cadastrado.');
                }
            } catch (error) {
                Alert.alert('Erro', 'Ocorreu um erro ao recuperar os dados.');
            }
        } else {
            Alert.alert('Erro', 'Login Inválido! Por favor, digite E-mail e senha válidos.');
        }
    };

    // Redireciona para a tela de cadastro
    const handleRegister = () => {
        router.push('/register');
    };

    return (
        <LinearGradient
            colors={['#FF0000', '#FFFF00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            {/* LOGO */}
            <Image source={require('../assets/images/LogoJapastel.png')} style={styles.logo} />

            {/* FRASE DE IMPACTO */}
            <Text style={styles.slogan}>A FRANQUIA QUE MAIS {'\n'}CRESCE NO{'\n'}BRASIL</Text>

            {/* FORMULÁRIO */}
            <View style={styles.formContainer}>
                {/* INPUT EMAIL */}
                <View style={styles.inputWrapper}>
                    <View style={styles.inputContainer}>
                        <FontAwesome name="envelope" size={20} color="#999" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu e-mail"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={validateEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                </View>

                {/* INPUT SENHA */}
                <View style={styles.inputWrapper}>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock" size={24} color="#999" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite sua senha"
                            placeholderTextColor="#999"
                            secureTextEntry
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                </View>

                {/* BOTÃO ENTRAR */}
                <TouchableOpacity style={styles.buttonLogin} onPress={handleEntrar}>
                    <Text style={styles.buttonText}>ENTRAR</Text>
                </TouchableOpacity>

                {/* BOTÃO CADASTRAR */}
                <TouchableOpacity style={styles.buttonRegister} onPress={handleRegister}>
                    <Text style={styles.buttonTextRegister}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 10,
    },
    slogan: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'yellow',
        textAlign: 'center',
        marginBottom: 20,
    },
    formContainer: {
        width: '90%',
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    inputWrapper: {
        width: '100%',
        marginBottom: 10, // Espaço entre os campos
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 10,
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
    buttonLogin: {
        backgroundColor: 'red',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
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
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 0, // Espaço entre o campo e o aviso
        marginLeft: 10, // Alinhado à esquerda
    },
});

export default Login;