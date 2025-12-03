import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const handleSubmit = async () => {
        setError("");
        setLoading(true)
        if (!email.trim() || !password.trim()) {
            setError("Por favor, ingresa tu correo y contraseña.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true)
            const response = await fetch('http://10.192.104.82:8000/api/token/', { /**10.192.104.82 en la residencia */
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                await AsyncStorage.setItem('access', data.access);
                await AsyncStorage.setItem('refresh', data.refresh);
                await AsyncStorage.setItem('loggedIn', 'true');
                const profileResponse = await fetch("http://10.192.104.82:8000/user/profile/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${data.access}`,
                        "Content-Type": "application/json",
                    }
                });

                const userProfile = await profileResponse.json();
                await AsyncStorage.setItem("user", JSON.stringify(userProfile));
                router.replace('/businessSelectionOwner');
                setLoading(false);
            } else {
                const errorData = await response.json();
                setError(errorData.detail);
                setLoading(false);
            }
        } catch (err) {
            setError("Verifica tu conexión, por favor.");
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    };

    const handlegister = async () => {
        try {
            router.push('/forms/formsRegisterUser/formOwnerBusiness');

        } catch (error) {
            console.error('Error al intentar registrarse:', error);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Image
                source={require('../assets/images/Logo_negro.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Iniciar Sesión</Text>

            <View style={styles.inputContainer}>
                <Mail color="#6c63ff" size={20} style={styles.icon} />
                <TextInput
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
            </View>

            <View style={styles.inputContainer}>
                <Lock color="#6c63ff" size={20} style={styles.icon} />
                <TextInput
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={styles.input}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} color="#6c63ff" /> : <Eye size={20} color="#6c63ff" />}
                </TouchableOpacity>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.7 }]}
                onPress={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handlegister} activeOpacity={0.7}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            <View style={styles.divider} />


        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#f9fafb' },
    title: { fontSize: 24, fontWeight: '600', marginBottom: 24, color: '#1e293b' },
    inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 6, paddingHorizontal: 8, marginBottom: 12, backgroundColor: '#f9fafb', width: '100%' },
    icon: { marginRight: 8 },
    input: { flex: 1, height: 40 },
    button: { width: '100%', backgroundColor: '#6c63ff', paddingVertical: 12, borderRadius: 6, alignItems: 'center', marginTop: 12 },
    buttonText: { color: '#fff', fontWeight: '600' },
    error: { color: 'red', marginBottom: 12 },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 12,
        resizeMode: 'contain',
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#d1d5db',
        marginVertical: 20,
    },
    socialContainer: {
        marginTop: 5,
        alignItems: 'center',
    },
    socialText: {
        fontSize: 16,
        color: '#1e293b',
        marginBottom: 12,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        paddingVertical: 10,
        marginHorizontal: 5,
    },
    socialLogo: {
        width: 20,
        height: 20,
        marginRight: 8,
        resizeMode: 'contain',
    },
    socialButtonText: {
        fontSize: 14,
        color: '#1e293b',
        fontWeight: '600',
    },
});

export default Login;