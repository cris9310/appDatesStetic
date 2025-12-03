import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card, Badge } from 'react-native-paper';
import {
    Building,
    Clock,
    MapPin,
    Calendar,
    Check,
    CreditCard
} from 'lucide-react-native';

interface ReviewStepProps {
    data: any;
    updateData: (newData: any) => void;
}

const FormReviewFinalBusiness = ({ data }: ReviewStepProps) => {
    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    const getSelectedDays = () => {
        return data.available_days.map((dayId: number) => daysOfWeek[dayId]).join(", ");
    };


    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <View >
                    <Check size={22} color="#6c63ff" />
                </View>
                <Text style={styles.title}>¡Casi terminamos!</Text>
                <Text style={styles.subtitle}>
                    Revisa cuidadosamente toda la información antes de completar tu registro profesional.
                </Text>
            </View>
            <Text style={styles.titleMidle}>Información del Negocio</Text>
            <View style={styles.containerSub}>
                <View style={styles.cardTitle}>
                    <Building style={styles.cardTitleIcon} size={22} color="#6c63ff" />
                    <View style={styles.labelValue}>
                        <Text style={styles.label}>Nombre del negocio</Text>
                        <Text style={styles.value}>{data.name_business}</Text>
                    </View>
                </View>
                <View style={styles.cardTitle}>
                    <CreditCard style={styles.cardTitleIcon} size={22} color="#6c63ff" />
                    <View style={styles.labelValue}>
                        <Text style={styles.label}>NIT</Text>
                        <Text style={styles.value}>{data.nit}</Text>
                    </View>
                </View>
                <View style={styles.cardTitle}>
                    <MapPin style={styles.cardTitleIcon} size={22} color="#6c63ff" />
                    <View style={styles.labelValue}>
                        <Text style={styles.label}>Dirección</Text>
                        <Text style={styles.value}>{data.address}</Text>
                    </View>
                </View>
                <View style={styles.cardTitle}>
                    <Building style={styles.cardTitleIcon} size={22} color="#6c63ff" />
                    <View style={styles.labelValue}>
                        <Text style={styles.label}>Teléfono</Text>
                        <Text style={styles.value}>{data.phone_business}</Text>
                    </View>
                </View>
                <Text style={styles.titleMidle}>Documentos cargados</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                    {data.image && <Badge style={styles.badge}>✓ Imagen del negocio</Badge>}
                    {data.rut_document && <Badge style={styles.badge}>✓ Documento RUT</Badge>}
                </View>
            </View>
        </View>


    );
};

const InfoItem = ({ icon, label, value }: any) => (
    <View style={styles.infoItem}>
        {icon}
        <View>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    </View>
);


const styles = StyleSheet.create({
    container: {
        padding: 4,
    },
    containerSub: {
        marginBottom: 8,
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        marginTop: 12,
        marginBottom: 4,
        color: "#333",
        marginLeft: 8,
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
        backgroundColor: "#f7f7f7",
        borderRadius: 15
    },
    uploadButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#6c63ff",
        borderRadius: 8,
        paddingVertical: 10,
        marginTop: 6,
    },
    uploadText: {
        marginLeft: 8,
        color: "#6c63ff",
        fontWeight: "500",
    },
    infoItem: {
        flexDirection: 'row', alignItems: 'center', gap: 8,
        backgroundColor: '#f7f7f7', borderRadius: 8, padding: 10, marginTop: 6
    },
    title: { fontSize: 22, fontWeight: 'bold', color: '#1a1a40' },
    titleMidle: { fontSize: 18, fontWeight: 'bold', color: '#1a1a40', marginBottom: 15, marginTop: 15 },
    subtitle: { color: '#555', textAlign: 'center', marginTop: 4 },
    value: { fontSize: 14, fontWeight: 'bold', color: '#222', marginLeft: 8, marginBottom: 8 },
    header: { alignItems: 'center', marginBottom: 20 },
    cardTitleIcon: { alignItems: 'center', marginLeft: 10 },
    labelValue: {
        flexDirection: "column",
        marginLeft: 10,
    },
    badge: {
        backgroundColor: '#e9d5ff', color: '#6c63ff', marginTop: 8, paddingHorizontal: 8
    },

});


export default FormReviewFinalBusiness;
