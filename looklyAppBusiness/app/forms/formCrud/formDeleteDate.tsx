import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native";
import { ChevronLeft } from "lucide-react-native";
import React, { useState, useEffect } from "react";
import { API_URL } from '@/constants/config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from "expo-router";

function DeleteDate() {

    const { dateId } = useLocalSearchParams();
    const { locations } = useLocalSearchParams();
    const router = useRouter();

    console.log(locations);
    const deleteClient = async () => {
        try {
            const token = await AsyncStorage.getItem("access");

            const res = await fetch(
                `${API_URL}/dates/appointments/${dateId}/`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Error al eliminar");
            }

            Alert.alert("Éxito", "Cita eliminada correctamente");
            router.replace(`/adminBusinessOwnerPage/${locations}`);
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "No se pudo eliminar");
        }
    };



    return (
        <View style={[styles.container, { marginTop: 20, paddingTop: 35 }]}>

            <View style={styles.cardTitle}>
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => router.back()}
                >
                    <ChevronLeft size={24} color="#6c63ff" />
                </TouchableOpacity>
                <Text style={styles.labeltittle}>Eliminación de citas</Text>
            </View>
            <View style={styles.containerSub}>


                <View>
                    <View >
                        <View style={styles.inputTitle}>
                            <Text style={styles.label}>¿Confirma que desea eliminar la cita?</Text>
                        </View>
                    </View>


                    <View>
                        <TouchableOpacity style={styles.button}
                            onPress={deleteClient} >
                            <Text style={styles.buttonText}>Si, confirmar</Text>
                        </TouchableOpacity>


                    </View>
                </View>
            </View>


        </View>
    );
}

export default DeleteDate;


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
        fontSize: 16,
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
