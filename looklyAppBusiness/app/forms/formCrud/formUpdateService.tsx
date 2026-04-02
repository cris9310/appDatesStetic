import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    TextInput,
    Switch,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from "react-native";
import { Scissors, CircleDollarSign, Clock8, ShieldCheck, ChevronLeft } from "lucide-react-native";
import React, { useState, useEffect } from "react";
import { API_URL } from '@/constants/config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from "expo-router";

function UpdateServices() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState(0);
    const [duration_minutes, setDuration] = useState(0);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [service, setService] = useState(null);
    const router = useRouter();
    const { serviceId } = useLocalSearchParams();
    const [status, setStatus] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});



    const getLocationService = async () => {
        try {
            const token = await AsyncStorage.getItem("access");
            const res = await fetch(
                `${API_URL}/services/services/${serviceId}/`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await res.json();
            setService(data);
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
            setDuration(data.duration_minutes);
            setLocation(data.location);
            setStatus(data.status);
        } catch (error) {
            console.error("Error cargando servicios", error);
        }
    };




    useEffect(() => {
        if (serviceId) {
            getLocationService();
        }
    }, [serviceId]);

    if (!serviceId) return null;

    const validateForm = () => {
        const errors = {};

        if (!name.trim()) errors.name = true;
        if (!description.trim()) errors.description = true;
        if (Number(price) <= 0) errors.price = true;
        if (Number(duration_minutes) <= 0) errors.duration_minutes = true;

        setFieldErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        console.log("BOTÓN PRESIONADO");
        if (!validateForm()) {
            Alert.alert("Ups", "Aún existen campos en blanco");
            return;
        }
        try {
            const token = await AsyncStorage.getItem("access");

            const res = await fetch(
                `${API_URL}/services/services/${serviceId}/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name,
                        description,
                        price,
                        duration_minutes,
                        status,
                    }),
                }
            );

            if (!res.ok) {
                const errorData = await res.json();
                setErrors(errorData);
                return;
            }
            Alert.alert("Éxito", "Servicio actualizado correctamente");
            router.replace(`/adminBusinessOwnerPage/${location}`);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "No se pudo actualizar el servicio");
        }
    };


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={{ paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
            >


                <View style={[styles.container, { marginTop: 20, paddingTop: 35 }]}>

                    <View style={styles.cardTitle}>
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => router.back()}
                        >
                            <ChevronLeft size={24} color="#6c63ff" />
                        </TouchableOpacity>
                        <Text style={styles.labeltittle}>Actualización de servicios</Text>
                    </View>
                    <View style={styles.containerSub}>


                        <View>
                            <View >
                                <View style={styles.inputTitle}>
                                    <Scissors size={22} color="#6c63ff" />
                                    <Text style={styles.label}>Nombre del servicio</Text>
                                </View>
                                <TextInput value={name} style={[
                                    styles.input,
                                    fieldErrors.name && styles.inputError
                                ]} onChangeText={setName} placeholder="Nombre del servicio" />
                            </View>
                            <View >
                                <View style={styles.inputTitle}>
                                    <Scissors size={22} color="#6c63ff" />
                                    <Text style={styles.label}>Descripción del servicio</Text>
                                </View>
                                <TextInput value={description} style={[
                                    styles.input,
                                    fieldErrors.description && styles.inputError
                                ]} onChangeText={setDescription} placeholder="Descripción del servicio" />
                            </View>
                            <View >
                                <View style={styles.inputTitle}>
                                    <CircleDollarSign size={22} color="#6c63ff" />
                                    <Text style={styles.label}>Precio</Text>
                                </View>
                                <TextInput value={String(price)} style={[
                                    styles.input,
                                    fieldErrors.price && styles.inputError
                                ]} onChangeText={(text) => setPrice(Number(text))} placeholder="Precio" keyboardType="numeric" />
                            </View>
                            <View >
                                <View style={styles.inputTitle}>
                                    <Clock8 size={22} color="#6c63ff" />
                                    <Text style={styles.label}>Duración en minutos</Text>
                                </View>
                                <TextInput value={String(duration_minutes)} style={[
                                    styles.input,
                                    fieldErrors.duration_minutes && styles.inputError
                                ]} onChangeText={(text) => setDuration(Number(text))} placeholder="Duración en minutos" keyboardType="numeric" />
                            </View>
                            <View >
                                <View style={styles.inputTitle}>
                                    <ShieldCheck size={22} color="#6c63ff" />
                                    <Text style={styles.label}>Estado del servicio</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Switch
                                        value={status}
                                        style={styles.switch}
                                        onValueChange={setStatus}
                                        trackColor={{ false: '#e74c3c', true: '#4cd137' }}
                                        thumbColor={status ? '#fff' : '#f4f3f4'}
                                    />

                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            color: status ? '#4cd137' : '#e74c3c',
                                            fontWeight: '600'
                                        }}
                                    >
                                        {status ? 'Activo' : 'Inactivo'}
                                    </Text>
                                </View>
                            </View>

                            <View>
                                <TouchableOpacity style={styles.button}
                                    onPress={handleSubmit} >
                                    <Text style={styles.buttonText}>Completar</Text>
                                </TouchableOpacity>


                            </View>
                        </View>
                    </View>


                </View>
            </ScrollView>
        </KeyboardAvoidingView >

    );

}

export default UpdateServices;



const styles = StyleSheet.create({
    container: {
        padding: 4,
    },
    containerSub: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginLeft: 8,
        marginRight: 8,
    },
    label: {
        fontSize: 15,
        fontWeight: "400",
        color: "#333",
        marginLeft: 8,
    },
    labeltittle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 12,
        marginBottom: 4,
        color: "#000",

    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        paddingHorizontal: 10,
        height: 45,
        fontSize: 15,
    },
    error: {
        color: "red",
        fontSize: 13,
        marginTop: 4,
    },
    cardTitle: {

        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        justifyContent: "center",
        paddingBottom: 25,
    },
    uploadButton: {
        flexDirection: "row",
        backgroundColor: "#6c63ff",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginHorizontal: 4,
        marginTop: 20,
    },
    uploadText: {
        marginLeft: 8,
        color: "#6c63ff",
        fontWeight: "500",
    },
    suggestionsBox: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginTop: 4,
        maxHeight: 200,
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    inputTitle: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 1,
        justifyContent: "flex-start",
        paddingBottom: 5,
        marginTop: 20,
    },
    button: { width: '100%', backgroundColor: '#6c63ff', paddingVertical: 12, borderRadius: 6, alignItems: 'center', marginTop: 12 },
    buttonText: { color: '#fff', fontWeight: '600' },
    switch: { alignSelf: 'flex-start', marginTop: 1 },
    iconContainer: {
        backgroundColor: "#6c63ff20",
        padding: 8,
        borderRadius: 8,
        marginRight: 20,
    },
    inputError: {
        borderColor: '#e74c3c',
        borderWidth: 1.5,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 6,
        color: "black",
        backgroundColor: "#fff",
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 6,
        color: "black",
        backgroundColor: "#fff",
    },
});