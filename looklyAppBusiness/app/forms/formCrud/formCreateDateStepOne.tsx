
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '@/constants/config';



const FormSelectDateService = ({ idLocation, selectedService, onSelect, onSelectedServiceName, }) => {

    const [services, setServices] = useState([]);

    const getServices = async () => {
        try {
            const token = await AsyncStorage.getItem("access");
            const res = await fetch(
                `${API_URL}/services/services/?location_id=${idLocation}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await res.json();
            setServices(data);
        } catch (error) {
            console.error("Error cargando servicios:", error);
        }
    };

    useEffect(() => {
        getServices();

    }, [idLocation]);

    const filterActiveServices = services.filter(service => service.status === true);
    return (
        <View style={[{ padding: 8 }]}>
            <Text style={styles.sectionTitle}>Selecciona el servicio</Text>

            <FlatList
                data={filterActiveServices}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const isSelected = item.id === selectedService;

                    return (
                        <TouchableOpacity
                            onPress={() => { onSelect(item.id); onSelectedServiceName(item.name); }}
                            style={[
                                styles.serviceItem,
                                isSelected && styles.serviceSelected
                            ]}
                        >
                            <Text style={styles.serviceName}>{item.name} - {item.duration_minutes} min</Text>
                        </TouchableOpacity>
                    );
                }}
            />

        </View>
    );

};

export default FormSelectDateService;

const styles = StyleSheet.create({

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },

    serviceItem: {
        padding: 14,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    serviceSelected: {
        backgroundColor: '#e6f9ed', // verde claro
        borderColor: '#4cd137',
    },
    serviceName: {
        fontWeight: '600',
    },
});

