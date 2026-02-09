
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
import dayjs from "dayjs";

const FormSelectDateTime = ({
    idLocation,
    selectedService,
    selectedSlot,
    onSelectSlot,
    date,
}) => {
    const [slots, setSlots] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const getAvailableSlots = async () => {
        if (!selectedService || !date) return;

        setLoading(true);
        setError(null);

        try {
            const token = await AsyncStorage.getItem("access");

            const res = await fetch(
                `${API_URL}/dates/locations/availability/${idLocation}/${selectedService}/${dayjs(date).format("YYYY-MM-DD")}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();
            if (!res.ok) {
                setSlots([]);
                setError(data.error || "Error al cargar horarios");
                return;
            }

            setSlots(data);
            if (data.length === 0) {
                setError("No hay citas disponibles para este día");
            }
        } catch (error) {
            console.error("Error cargando horarios:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAvailableSlots();
    }, [selectedService, date]);

    return (
        <View style={{ padding: 8 }}>
            <Text style={styles.sectionTitle}>Horarios disponibles</Text>

            <FlatList
                data={slots}
                keyExtractor={(item) => item.datetime}
                numColumns={3}
                contentContainerStyle={{ gap: 10 }}
                style={{ maxHeight: 400 }}
                renderItem={({ item }) => {
                    const isSelected = selectedSlot === item.datetime;

                    return (
                        <TouchableOpacity
                            disabled={!item.available}
                            onPress={() => onSelectSlot(item.datetime)}
                            style={[
                                styles.slot,
                                !item.available && styles.slotDisabled,
                                isSelected && styles.slotSelected,
                            ]}
                        >
                            <Text style={styles.slotTime}>
                                {dayjs(item.datetime).format("HH:mm")}


                            </Text>

                            <Text style={styles.slotDuration}>
                                {item.duration_minutes} min
                            </Text>
                        </TouchableOpacity>
                    );
                }}
                ListEmptyComponent={
                    loading ? (
                        <Text>Cargando horarios...</Text>
                    ) : error ? (
                        <Text style={styles.errorText}>{error}</Text>
                    ) : null
                }
            />
        </View>
    );
};

export default FormSelectDateTime;

const styles = StyleSheet.create({

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
        textAlign: "center",

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
    slot: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        flex: 1,
    },

    slotDisabled: {
        backgroundColor: '#e5e7eb',
        opacity: 0.5,
    },

    slotSelected: {
        backgroundColor: '#dcfce7',
        borderWidth: 1,
        borderColor: '#22c55e',
    },

    slotTime: {
        fontWeight: '700',
    },

    slotDuration: {
        fontSize: 12,
        color: '#555',
    },
    dayItem: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 10,
        backgroundColor: "#f1f5f9",
    },

    daySelected: {
        backgroundColor: "#dcfce7",
        borderWidth: 1,
        borderColor: "#22c55e",
    },

    dayText: {
        fontWeight: "600",
    },
    errorText: {
        textAlign: "center",
        marginTop: 20,
        color: "#ef4444",
        fontWeight: "600",
    },
});

