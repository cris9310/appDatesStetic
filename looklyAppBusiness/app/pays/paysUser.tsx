import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { API_URL } from '@/constants/config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import { MoveRight, ChevronLeft, Building2, Banknote, BanknoteArrowDown } from 'lucide-react-native';
import { useRouter } from 'expo-router';
const PayUser = () => {

    const [subscription, setSubscription] = useState([]);
    const router = useRouter();


    useEffect(() => {
        const getSuscription = async () => {
            const token = await AsyncStorage.getItem("access");
            try {
                const response = await axios.get(
                    `${API_URL}/billing/get-detail-suscription/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setSubscription(response.data);
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "No se pudieron obtener los datos .");
            }
        };

        getSuscription();
    }, []);


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => router.back()}
                        >
                            <ChevronLeft size={24} color="#6c63ff" />
                        </TouchableOpacity>
                        <View style={styles.headerTitle}>
                            <View>
                                <Text style={styles.title}>Pagos del usuario</Text>
                                <Text style={styles.subtitle}>
                                    Realiza el pago de tu suscripción
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerSub}>
                        {subscription.status === "trial" && (
                            <View style={{ padding: 12 }}>
                                <Text style={styles.label}>
                                    Tu prueba termina el {subscription.trial_end}
                                </Text>
                            </View>
                        )}

                        {(subscription.status === "past_due" ||
                            subscription.status === "suspended") && (
                                <View style={{ padding: 12 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                        <Building2 size={20} color="#6c63ff" style={styles.iconButton} />
                                        <Text style={styles.label}>
                                            Locales activos: {subscription.locations_count}
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                        <Banknote size={20} color="#6c63ff" style={styles.iconButton} />
                                        <Text style={styles.label}>
                                            Precio por local: ${subscription.price_per_location}
                                        </Text>
                                    </View>
                                    <View style={styles.divider} />
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                        <BanknoteArrowDown size={20} color="#6c63ff" style={styles.iconButton} />
                                        <Text style={styles.label}>
                                            Total mensual: ${subscription.estimated_total}
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.button}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.buttonText}>Pagar</Text>
                                        <MoveRight size={18} color="white" style={styles.iconButton} />
                                    </TouchableOpacity>
                                </View>
                            )}

                        {subscription.status === "active" && (
                            <View style={{ padding: 12 }}>
                                <Text style={styles.label}>
                                    Felicitaciones, estás al día con tus pagos.
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView >

    );
}

export default PayUser;

const styles = StyleSheet.create({
    container: {
        padding: 4,
    },
    headerTitle: { flexDirection: 'row' },
    header: {
        flexDirection: 'row',
        marginTop: 45,
        backgroundColor: "white",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        alignItems: "center"
    },
    title: { fontSize: 22, fontWeight: "bold", color: "#000" },
    subtitle: { fontSize: 14, color: "#666", marginTop: 5 },
    button: {
        width: '100%', backgroundColor: '#6c63ff', paddingVertical: 12, borderRadius: 6, alignItems: 'center', marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: { color: '#fff', fontWeight: '600' },
    icon: { marginRight: 2 },
    iconButton: { marginLeft: 8, marginRight: 8, color: '#6c63ff', },
    iconContainer: {
        backgroundColor: "#6c63ff20",
        padding: 8,
        borderRadius: 8,
        marginRight: 20,
    },
    containerSub: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginBottom: 24,
        marginTop: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginLeft: 8,
        marginRight: 8,
    },
    label: {
        fontSize: 17,
        fontWeight: "400",
        color: "#333",
        marginLeft: 8,
    },
    divider: {
        height: 1,
        backgroundColor: "#ddd",
        marginVertical: 12,
    }

});