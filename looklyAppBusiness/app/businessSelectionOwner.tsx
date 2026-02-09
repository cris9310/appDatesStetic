import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";
import { Building2, MapPin, Clock, Star, Power, MoveRight, Menu } from 'lucide-react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from 'expo-router';
import { useNavigation } from "@react-navigation/native";
import { API_URL } from '@/constants/config';

const BusinessSelection = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        const getLocations = async () => {
            const token = await AsyncStorage.getItem("access");
            try {
                const response = await axios.get(
                    `${API_URL}/companies/List-my-locations/`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setLocations(response.data);
            } catch (error) {
                console.error(error);
                Alert.alert("Error", "No se pudieron obtener los locales.");
            } finally {
                setLoading(false);
            }
        };

        getLocations();
    }, []);

    const handleSelectBusiness = (id) => {
        router.replace(`/adminBusinessOwnerPage/${id}`);
    };
    const handlegister = async () => {
        try {
            router.push('/forms/formRegisterBusiness/formBusinessAll');


        } catch (error) {
            console.error('Error al intentar registrarse:', error);
        }
    };

    const getStatusColor = (is_active) => {
        return is_active ? styles.badgeActive : styles.badgeInactive;
    };
    const handleLogout = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Estás seguro de que quieres salir?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancelado"),
                    style: "cancel"
                },
                {
                    text: "Salir",
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('access');
                            router.replace('/login');
                        } catch (error) {
                            console.error("Error al cerrar sesión:", error);
                        }
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#6c63ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTitle}>
                    <View >
                        <View style={styles.iconContainer}>
                            <Menu size={24} color="#6c63ff" style={styles.icon} onPress={handleLogout} />
                        </View>
                    </View>

                    <View style={{ width: 30 }}>

                    </View>
                    <View >
                        <Text style={styles.title}>Selecciona tu Negocio</Text>
                        <Text style={styles.subtitle}>Elige el local que deseas administrar</Text>
                    </View>

                </View>
                <TouchableOpacity style={styles.button} onPress={handlegister} activeOpacity={0.7}>
                    <Building2 size={20} color="white" style={styles.iconButton} />
                    <Text style={styles.buttonText}>Registrar nuevo local</Text>
                </TouchableOpacity>
            </View>

            {/* Lista de negocios */}
            <ScrollView contentContainerStyle={styles.list}>
                {locations.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Building2 size={64} color="#aaa" />
                        <Text style={styles.emptyText}>No tienes negocios registrados</Text>
                        <TouchableOpacity style={styles.button} onPress={handlegister} activeOpacity={0.7}>
                            <Building2 size={18} color="white" style={styles.icon} />
                            <Text style={styles.buttonText}>
                                Registrar Mi Negocio
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    locations.map((business) => (
                        <TouchableOpacity
                            key={business.id}
                            style={styles.card}
                            onPress={() => handleSelectBusiness(business.id)}
                        >
                            <View style={styles.cardHeader}>
                                <View style={styles.iconContainer}>
                                    <Building2 size={28} color="#6c63ff" style={styles.icon} />
                                </View>
                                <View style={[styles.badge, getStatusColor(business.is_active)]}>
                                    <Text style={styles.badgeText}>
                                        {business.is_active ? "Activo" : "Inactivo"}
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.businessName}>{business.name_business}</Text>
                            <Text style={styles.category}>{business.category}</Text>
                            <Text style={styles.address}>
                                <MapPin size={14} color="#6c63ff" />{" "}
                                {business.address}
                            </Text>

                            <View style={styles.footer}>
                                <Text style={styles.infoText}>
                                    <Star size={14} color="#6c63ff" />{" "}
                                    {business.average_score} ★
                                </Text>
                                <Text style={styles.infoText}>
                                    <Clock size={14} color="#6c63ff" />{" "}
                                    {business.opening_time} - {business.closing_time}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleSelectBusiness(business.id)}
                                activeOpacity={0.7}
                            >

                                <Text style={styles.buttonText}>
                                    Administrar Negocio
                                </Text>

                                <MoveRight size={18} color="white" style={styles.iconButton} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </View>
    );
};

export default BusinessSelection;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f4f4f4" },
    header: {
        marginTop: 45,
        backgroundColor: "white",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        alignItems: "center"
    },
    title: { fontSize: 22, fontWeight: "bold", color: "#000" },
    subtitle: { fontSize: 14, color: "#666", marginTop: 5 },
    addButton: { marginTop: 10, backgroundColor: "#6c63ff" },
    list: { padding: 15 },
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: { flexDirection: "row", justifyContent: "space-between" },
    iconContainer: {
        backgroundColor: "#6c63ff20",
        padding: 8,
        borderRadius: 8,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 8,
    },
    badgeActive: { backgroundColor: "#d1fae5" },
    badgeInactive: { backgroundColor: "#fee2e2" },
    badgeText: { color: "#333", fontSize: 12 },
    businessName: { fontSize: 18, fontWeight: "bold", marginTop: 8, color: "#000" },
    category: { fontSize: 14, color: "#777" },
    address: { marginTop: 6, fontSize: 13, color: "#555" },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    infoText: { color: "#555", fontSize: 13 },
    manageButton: {
        marginTop: 12,
        backgroundColor: "#6c63ff",
    },
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
    },
    emptyText: { fontSize: 16, color: "#777", marginVertical: 10 },
    centered: { flex: 1, alignItems: "center", justifyContent: "center" },
    button: {
        width: '100%', backgroundColor: '#6c63ff', paddingVertical: 12, borderRadius: 6, alignItems: 'center', marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: { color: '#fff', fontWeight: '600' },
    icon: { marginRight: 2 },
    iconButton: { marginLeft: 8, marginRight: 8 },
    iconContainerOff: {
        backgroundColor: "#6c63ff20",
        padding: 8,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: { flexDirection: 'row' },
    containerMenu: {
        backgroundColor: '#6c63ff20',
        borderRadius: 15,
    },
});
