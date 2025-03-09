import React from 'react';
import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Login = () => {
    const router = useRouter(); 

    // Redireciona para a tela HOME
    const handleEntrar = () => {
        router.push('/(tabs)/home'); 
    }
    
    // Redireciona para a tela REGISTER
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
                <View style={styles.inputContainer}>
                    <FontAwesome name="envelope" size={20} color="#999" style={styles.icon} />
                    <TextInput style={styles.input} placeholder="Digite seu e-mail" placeholderTextColor="#999" />
                </View>

                {/* INPUT SENHA */}
                <View style={styles.inputContainer}>
                    <MaterialIcons name="lock" size={24} color="#999" style={styles.icon} />
                    <TextInput style={styles.input} placeholder="Digite sua senha" placeholderTextColor="#999" secureTextEntry />
                </View>

                {/* BOTÃO ENTRAR */}
                <TouchableOpacity style={styles.buttonLogin} onPress={handleEntrar}>
                    <Text style={styles.buttonText}>ENTRAR</Text>
                </TouchableOpacity>

                {/* BOTÃO CADASTRAR */}
                <TouchableOpacity style={styles.buttonRegister} onPress={(handleRegister)}>
                    <Text style={styles.buttonTextRegister}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>

            {/* VERSÃO */}
            {/*<Text style={styles.version}>Versão 1.0</Text>*/}
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
    version: {
        marginTop: 10,
        color: 'black',
        fontSize: 12,
    },
});

export default Login;
