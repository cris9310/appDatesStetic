import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Linking,
} from 'react-native';
import { User, Phone, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useNavigation } from "expo-router";
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import axios from "axios";

const FormOwnerBusiness = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [error, setError] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const [checking, setChecking] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            title: "Crear una cuenta profesional",
            animation: "fade",
        });
    }, []);

    const handleRegister = async () => {
        setLoading(true);
        setErrorEmail("");
        setErrorName("");
        setErrorPassword("");
        setErrorPhone("");
        if (!email.trim()) {
            setErrorEmail("Por favor, ingresa un email");
            setLoading(false);
            return;
        } else if (!password.trim()) {
            setErrorPassword("Por favor, ingresa una contraseña");
            setLoading(false);
            return;
        } else if (!name.trim()) {
            setErrorName("Por favor, ingresa tu nombre");
            setLoading(false);
            return;
        } else if (!phone.trim()) {
            setErrorPhone("Por favor, ingresa tu teléfono celular");
            setLoading(false);
            return;
        }
        else {
            try {
                const response = await fetch('http://192.168.1.250:8000/user/register/professional/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, name, phone }),
                });
                if (response.ok) {
                    const data = await response.json();
                    Toast.show({
                        type: "success",
                        text1: "Tu cuenta ha sido creada con éxito.",
                        visibilityTime: 4000, // 4 segundos
                        onHide: () => {
                            setLoading(false);
                            router.replace('/login');
                        }
                    });

                } else {
                    const errorData = await response.json();
                    setError(errorData.detail);
                    setLoading(false);
                }


            } catch (error) {
                setError("Verifica tu conexión, por favor.");
                setLoading(false);
            } finally {
                setLoading(false);
            }

        }
    };

    const validateEmail = async () => {
        setChecking(true);
        try {
            const res = await axios.get(`http://192.168.1.250:8000/companies/verify-forms/?email=${email}`);
            if (res.data.exists) {
                setErrorEmail("")
                setErrorEmail("Este email ya está registrado");
            } else {
                setErrorEmail("");
            }
        } catch (error) {
            setError("Error al verificar el email");
        } finally {
            setChecking(false);
        }
    };
    const validatePhone = async () => {
        setChecking(true);

        if (phone.length !== 10) {
            setErrorPhone("")
            setErrorPhone("El número de teléfono debe tener 10 dígitos");
            return;
        }
        try {
            const res = await axios.get(`http://192.168.1.250:8000/companies/verify-forms/?phone=${phone}`);
            if (res.data.exists) {
                setErrorPhone("")
                setErrorPhone("Este teléfono ya está registrado");
            } else {
                setErrorPhone("");
            }
        } catch (error) {
            setError("Error al verificar el teléfono");
        } finally {
            setChecking(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: '#f9fafb' }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <Text style={styles.title}>Cuéntanos sobre ti</Text>
                        <Text style={styles.subtitle}>
                            Crea tu cuenta profesional completando estos datos.
                        </Text>
                    </View>
                    <View style={styles.card}>
                        {/* Header */}


                        {/* Inputs */}
                        {errorName ? <Text style={styles.error}>{errorName}</Text> : null}
                        <View style={styles.inputContainer}>
                            <User color="#6c63ff" size={20} style={styles.icon} />
                            <TextInput
                                placeholder="Nombre completo"
                                value={name}
                                onChangeText={setName}
                                style={styles.input}
                            />
                        </View>
                        {errorPhone ? <Text style={styles.error}>{errorPhone}</Text> : null}
                        <View style={styles.inputContainer}>
                            <Phone color="#6c63ff" size={20} style={styles.icon} />
                            <TextInput
                                placeholder="Teléfono"
                                value={phone}
                                onChangeText={(text) => {
                                    const numericText = text.replace(/[^0-9]/g, '');
                                    if (numericText.length <= 10) {
                                        setPhone(numericText);
                                    }
                                }}
                                style={styles.input}
                                keyboardType="phone-pad"
                                maxLength={10}
                                onBlur={validatePhone}
                            />
                        </View>
                        {errorEmail ? <Text style={styles.error}>{errorEmail}</Text> : null}
                        <View style={styles.inputContainer}>
                            <Mail color="#6c63ff" size={20} style={styles.icon} />
                            <TextInput
                                placeholder="Correo electrónico"
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onBlur={validateEmail}
                            />
                        </View>

                        {errorPassword ? <Text style={styles.error}>{errorPassword}</Text> : null}
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
                                {showPassword ? (
                                    <EyeOff size={20} color="#6c63ff" />
                                ) : (
                                    <Eye size={20} color="#6c63ff" />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>



                    {/* Checkbox */}
                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity
                            style={[styles.checkbox, accepted && styles.checkboxChecked]}
                            onPress={() => setAccepted(!accepted)}
                        >
                            {accepted && <Text style={styles.checkmark}>✓</Text>}
                        </TouchableOpacity>
                        <Text style={styles.checkboxText}>
                            Estoy de acuerdo con la{' '}
                            <Text
                                style={styles.linkText}
                                onPress={() => Linking.openURL('https://tuweb.com/politica-privacidad')}
                            >
                                política de privacidad
                            </Text>
                            ,{' '}
                            <Text
                                style={styles.linkText}
                                onPress={() => Linking.openURL('https://tuweb.com/condiciones-servicio')}
                            >
                                condiciones de servicio
                            </Text>{' '}
                            y{' '}
                            <Text
                                style={styles.linkText}
                                onPress={() => Linking.openURL('https://tuweb.com/condiciones-negocio')}
                            >
                                condiciones del negocio
                            </Text>
                            .
                        </Text>
                    </View>
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    {/* Botón de registro */}
                    <TouchableOpacity
                        style={[
                            styles.button,
                            !accepted && { backgroundColor: '#ccc' },
                        ]}
                        onPress={handleRegister}
                        disabled={!accepted}
                    >
                        <Text style={styles.buttonText}>Crear cuenta</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    {/* Login social 
                    <View style={styles.socialContainer}>
                        <Text style={styles.socialText}>O inicia sesión con</Text>

                        <View style={styles.socialButtons}>
                            <TouchableOpacity style={styles.socialButton} onPress={() => alert('Google')}>
                                <Image
                                    source={require('../../../assets/images/google.png')}
                                    style={styles.socialLogo}
                                />
                                <Text style={styles.socialButtonText}>Google</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.socialButton} onPress={() => alert('Facebook')}>
                                <Image
                                    source={require('../../../assets/images/facebook.png')}
                                    style={styles.socialLogo}
                                />
                                <Text style={styles.socialButtonText}>Facebook</Text>
                            </TouchableOpacity>
                        </View>
                    </View>*/}
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 100,
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#6c63ff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 30,
        backgroundColor: '#fff',
        width: '100%',
    },
    icon: { marginRight: 8 },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    button: {
        width: '100%',
        backgroundColor: '#6c63ff',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderWidth: 2,
        borderColor: '#6c63ff',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkboxChecked: {
        backgroundColor: '#6c63ff',
    },
    checkmark: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    checkboxText: {
        flex: 1,
        color: '#374151',
        fontSize: 14,
        lineHeight: 20,
    },
    linkText: {
        color: '#6c63ff',
        fontWeight: '600',
        textDecorationLine: 'underline',
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
    error: { color: 'red', marginBottom: 12 },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 24,
    },
});

export default FormOwnerBusiness;
