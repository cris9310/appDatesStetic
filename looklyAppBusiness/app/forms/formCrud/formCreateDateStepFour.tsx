import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import dayjs from "dayjs";
import { useRouter } from 'expo-router';
import React, { useState } from "react";



const FormSelectDateConfirm = ({ onselectClientName, datetime, onConfirm, serviceName, clientId, serviceId }) => {
    const router = useRouter();
    const [service, setService] = useState(null);
    const [user, setUser] = useState(null);



    return (
        <View style={styles.container}>

            <Text style={styles.title}>Confirmar cita</Text>
            <View style={styles.card}>
                <Text style={styles.label}>Nombre del cliente</Text>
                <Text>{onselectClientName}</Text>

                <Text style={styles.label}>Servicio</Text>
                <Text>{serviceName}</Text>

                <Text style={styles.label}>Fecha y hora</Text>
                <Text>{dayjs(datetime).format("DD/MM/YYYY HH:mm")}</Text>
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                <Text style={styles.confirmText}>Crear cita</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FormSelectDateConfirm;

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#f8fafc",
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    label: {
        fontWeight: "600",
        marginTop: 8,
    },
    confirmButton: {
        backgroundColor: "#22c55e",
        padding: 16,
        borderRadius: 10,
        alignItems: "center",
    },
    confirmText: {
        color: "#fff",
        fontWeight: "700",
    },
    iconContainer: {
        backgroundColor: "#6c63ff20",
        padding: 8,
        borderRadius: 8,
        marginRight: 20,
    },
    cardTitle: {

        flexDirection: "row",
        alignItems: "center",
        marginBottom: 1,
        justifyContent: "flex-start",
        paddingBottom: 12,
    },
});