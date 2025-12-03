import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import { Clock } from 'lucide-react-native';
import { useFormContext, Controller } from "react-hook-form";

interface BusinessDetailsStepProps {
    data: any;
    updateData: (newData: any) => void;
}

const FormDetailsHoursBusiness = ({ data, updateData }: BusinessDetailsStepProps) => {
    const [showOpeningPicker, setShowOpeningPicker] = useState(false);
    const [showClosingPicker, setShowClosingPicker] = useState(false);

    const {
        control,
        formState: { errors },
    } = useFormContext();

    const daysOfWeek = [
        { id: 0, name: "Lunes" },
        { id: 1, name: "Martes" },
        { id: 2, name: "Miércoles" },
        { id: 3, name: "Jueves" },
        { id: 4, name: "Viernes" },
        { id: 5, name: "Sábado" },
        { id: 6, name: "Domingo" },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Horarios de atención</Text>
                <Text style={styles.subtitle}>
                    Define cuándo tu negocio estará disponible para recibir clientes
                </Text>
            </View>

            {/* Horario */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Clock size={20} color="#6c63ff" />
                    <Text style={styles.cardTitle}>Horario de Funcionamiento</Text>
                </View>

                <View style={styles.row}>
                    {/* Hora de apertura */}
                    <Controller
                        control={control}
                        name="opening_time"
                        rules={{ required: "Selecciona la hora de apertura" }}
                        render={({ field: { value, onChange } }) => (
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Apertura</Text>

                                <TouchableOpacity
                                    style={styles.timeButton}
                                    onPress={() => setShowOpeningPicker(true)}
                                >
                                    <Text style={styles.timeText}>
                                        {value || "Seleccionar hora"}
                                    </Text>
                                </TouchableOpacity>

                                {showOpeningPicker && (
                                    <DateTimePicker
                                        value={new Date(`2024-01-01T${value || "08:00"}`)}
                                        mode="time"
                                        display={Platform.OS === "ios" ? "spinner" : "default"}
                                        onChange={(e, date) => {
                                            if (date) {
                                                const time = date.toTimeString().slice(0, 5);
                                                onChange(time);                         // ← NECESARIO
                                                updateData({ opening_time: time });
                                            }
                                            setShowOpeningPicker(false);
                                        }}
                                    />
                                )}
                            </View>
                        )}
                    />

                    {/* Hora de cierre */}
                    <Controller
                        control={control}
                        name="closing_time"
                        rules={{ required: "Selecciona la hora de cierre" }}
                        render={({ field: { value, onChange } }) => (
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Cierre</Text>

                                <TouchableOpacity
                                    style={styles.timeButton}
                                    onPress={() => setShowClosingPicker(true)}
                                >
                                    <Text style={styles.timeText}>
                                        {value || "Seleccionar hora"}
                                    </Text>
                                </TouchableOpacity>

                                {showClosingPicker && (
                                    <DateTimePicker
                                        value={new Date(`2024-01-01T${value || "18:00"}`)}
                                        mode="time"
                                        display={Platform.OS === "ios" ? "spinner" : "default"}
                                        onChange={(e, date) => {
                                            if (date) {
                                                const time = date.toTimeString().slice(0, 5);
                                                onChange(time);                         // ← NECESARIO
                                                updateData({ closing_time: time });
                                            }
                                            setShowClosingPicker(false);
                                        }}
                                    />
                                )}
                            </View>
                        )}
                    />
                </View>

                {(errors.opening_time || errors.closing_time) && (
                    <Text style={styles.error}>
                        {errors.opening_time?.message || errors.closing_time?.message}
                    </Text>
                )}

                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        <Text style={{ fontWeight: "bold" }}>Horario:</Text>{" "}
                        {data.opening_time || "--:--"} - {data.closing_time || "--:--"}
                    </Text>
                </View>
            </View>

            {/* Días Laborales */}
            <Controller
                control={control}
                name="available_days"
                rules={{
                    validate: (value) =>
                        value.length > 0 || "Selecciona al menos un día laboral",
                }}
                render={({ field: { value, onChange } }) => (
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Icon name="calendar" size={20} color="#6c63ff" />
                            <Text style={styles.cardTitle}>Días Laborales</Text>
                        </View>

                        <View style={styles.daysGrid}>
                            {daysOfWeek.map((day) => (
                                <View key={day.id} style={styles.dayItem}>
                                    <Switch
                                        value={value.includes(day.id)}
                                        onValueChange={(checked) => {
                                            let newDays = checked
                                                ? [...value, day.id]
                                                : value.filter((id) => id !== day.id);

                                            onChange(newDays);                        // ← NECESARIO
                                            updateData({ available_days: newDays });
                                        }}
                                        trackColor={{ true: "#6c63ff", false: "#ccc" }}
                                    />

                                    <Text style={styles.dayLabel}>{day.name}</Text>
                                </View>
                            ))}
                        </View>

                        {errors.available_days ? (
                            <View style={[styles.infoBox, { backgroundColor: "#fee2e2" }]}>
                                <Text style={[styles.infoText, { color: "#b91c1c" }]}>
                                    {errors.available_days.message}
                                </Text>
                            </View>
                        ) : (
                            <View style={[styles.infoBox, { backgroundColor: "#dcfce7" }]}>
                                <Text style={[styles.infoText, { color: "#166534" }]}>
                                    <Text style={{ fontWeight: "bold" }}>
                                        Días seleccionados:
                                    </Text>{" "}
                                    {value.length} día{value.length !== 1 ? "s" : ""}
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

export default FormDetailsHoursBusiness;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: { alignItems: "center", marginBottom: 16 },
    title: { fontSize: 20, fontWeight: "600", color: "#1e1b4b" },
    subtitle: { color: "#6b7280", textAlign: "center", marginTop: 4 },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        marginBottom: 16,
    },
    cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    cardTitle: { fontSize: 16, fontWeight: "500", color: "#1e1b4b", marginLeft: 6 },
    label: { fontSize: 14, color: "#374151", marginBottom: 4 },
    row: { flexDirection: "row", justifyContent: "space-between" },
    inputBlock: { flex: 1, marginHorizontal: 4 },
    timeButton: {
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        alignItems: "center",
    },
    timeText: { fontSize: 16, color: "#111827" },
    infoBox: { marginTop: 10, padding: 8, borderRadius: 8, backgroundColor: "#eff6ff" },
    infoText: { color: "#1e3a8a", fontSize: 14 },
    daysGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
    dayItem: { flexDirection: "row", alignItems: "center", marginBottom: 8, width: "48%" },
    dayLabel: { marginLeft: 8, fontSize: 14, color: "#111827" },
    error: { color: "red", fontSize: 13, marginTop: 4 },
});
