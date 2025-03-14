import React, { useState, useEffect } from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = () => {
    const router = useRouter();

    // Estados para os campos do formulário
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Estados para mensagens de erro
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

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

    // Função para formatar e validar o CPF
    const formatAndValidateCpf = (text: string) => {
        let formattedText = text.replace(/\D/g, '');
        if (formattedText.length > 3) {
            formattedText = formattedText.replace(/^(\d{3})(\d)/, '$1.$2');
        }
        if (formattedText.length > 6) {
            formattedText = formattedText.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        }
        if (formattedText.length > 9) {
            formattedText = formattedText.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
        }
        if (formattedText.length > 14) {
            formattedText = formattedText.substring(0, 14);
        }
        setCpf(formattedText);

        // Validação do CPF
        if (formattedText.length === 14) {
            setCpfError('');
        } else {
            setCpfError('CPF inválido');
        }
    };

    // Função para verificar se um valor já está cadastrado
    const isValueUnique = async (key: string, value: string) => {
        try {
            const usersString = await AsyncStorage.getItem('users');
            const users = usersString ? JSON.parse(usersString) : [];
            return !users.some((user: any) => user[key] === value);
        } catch (error) {
            console.error('Erro ao verificar unicidade:', error);
            return false;
        }
    };

    // Função para validar o formulário
    const validateForm = async () => {
        let isValid = true;

        if (!name || name.length < 2) {
            setNameError('Nome deve ter pelo menos 2 caracteres');
            isValid = false;
        } else {
            setNameError('');
        }

        if (!phone) {
            setPhoneError('Telefone é obrigatório');
            isValid = false;
        } else if (!(await isValueUnique('phone', phone))) {
            setPhoneError('Telefone já cadastrado');
            isValid = false;
        } else {
            setPhoneError('');
        }

        if (!email) {
            setEmailError('E-mail é obrigatório');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError('E-mail inválido');
            isValid = false;
        } else if (!(await isValueUnique('email', email))) {
            setEmailError('E-mail já cadastrado');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!cpf || cpf.length < 14) {
            setCpfError('CPF inválido');
            isValid = false;
        } else if (!(await isValueUnique('cpf', cpf))) {
            setCpfError('CPF já cadastrado');
            isValid = false;
        } else {
            setCpfError('');
        }

        if (!password) {
            setPasswordError('Senha é obrigatória');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!confirmPassword) {
            setConfirmPasswordError('Confirme sua senha');
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('As senhas não coincidem');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        return isValid;
    };

    // Função para lidar com o cadastro
    const handleRegister = async () => {
        if (await validateForm()) {
            const user = {
                name,
                phone,
                email,
                cpf,
                password,
            };

            try {
                const usersString = await AsyncStorage.getItem('users');
                const users = usersString ? JSON.parse(usersString) : [];
                users.push(user);
                await AsyncStorage.setItem('users', JSON.stringify(users));
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
                router.push('/login'); // Redireciona para a tela de login
            } catch (error) {
                Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados.');
            }
        } else {
            Alert.alert('Erro', 'Por favor, preencha corretamente todos os campos.');
        }
    };

    // Função para voltar à tela inicial
    const handleBackToHome = () => {
        router.push('/');
    };

    return (
        <LinearGradient
            colors={['#FF0000', '#FFFF00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* LOGO */}
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/images/LogoJapastel.png')} style={styles.logo} />
                </View>

                {/* FORMULÁRIO */}
                <View style={styles.formContainer}>
                    {/* NOME */}
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputContainer}>
                            <FontAwesome name="user" size={20} color="#999" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Digite seu nome"
                                placeholderTextColor="#999"
                                value={name}
                                onChangeText={(text) => setName(text)}
                            />
                        </View>
                        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
                    </View>

                    {/* TELEFONE */}
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputContainer}>
                            <FontAwesome name="phone" size={20} color="#999" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Digite nº de seu telefone"
                                placeholderTextColor="#999"
                                value={phone}
                                onChangeText={(text) => setPhone(text)}
                                keyboardType="phone-pad"
                            />
                        </View>
                        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
                    </View>

                    {/* E-MAIL */}
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

                    {/* CPF */}
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputContainer}>
                            <FontAwesome name="id-card" size={20} color="#999" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Digite seu CPF"
                                placeholderTextColor="#999"
                                value={cpf}
                                onChangeText={formatAndValidateCpf}
                                keyboardType="numeric"
                                maxLength={14}
                            />
                        </View>
                        {cpfError ? <Text style={styles.errorText}>{cpfError}</Text> : null}
                    </View>

                    {/* SENHA */}
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="lock" size={24} color="#999" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Digite sua senha"
                                placeholderTextColor="#999"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry
                            />
                        </View>
                        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                    </View>

                    {/* CONFIRMAR SENHA */}
                    <View style={styles.inputWrapper}>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="lock" size={24} color="#999" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Digite novamente sua senha"
                                placeholderTextColor="#999"
                                value={confirmPassword}
                                onChangeText={(text) => setConfirmPassword(text)}
                                secureTextEntry
                            />
                        </View>
                        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
                    </View>

                    {/* BOTÃO CADASTRAR */}
                    <TouchableOpacity style={styles.buttonRegister} onPress={handleRegister}>
                        <Text style={styles.buttonTextRegister}>CADASTRAR</Text>
                    </TouchableOpacity>
                </View>

                {/* ÍCONE DE VOLTAR À TELA INICIAL */}
                <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
                    <MaterialIcons name="arrow-back" size={40} color="red" />
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
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
        marginTop: 20,
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 30,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 0, // Espaço entre o campo e o aviso
        marginLeft: 10, // Alinhado à esquerda
    },
});

export default Register;