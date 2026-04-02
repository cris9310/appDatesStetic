import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
    ChevronLeft,
    ArrowDownToLine

} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { formatCOP } from "@/scripts/utils";
import { API_URL } from '@/constants/config';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';


const InvoiceList = () => {

    const [invoices, setInvoices] = useState([]);
    const router = useRouter();

    const downloadInvoice = async (invoiceId) => {
        try {
            const token = await AsyncStorage.getItem("access");

            const url = `${API_URL}/billing/invoice/${invoiceId}/download/`;

            const fileUri = FileSystem.cacheDirectory + `factura_${invoiceId}.pdf`;

            await FileSystem.downloadAsync(url, fileUri, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Abre el visor del sistema
            await Sharing.shareAsync(fileUri);

        } catch (error) {
            console.log("Error viendo factura:", error);
        }
    };

    const getInvoices = async () => {
        try {
            const token = await AsyncStorage.getItem("access");
            const res = await fetch(
                `${API_URL}/billing/get-invoices/`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await res.json();
            setInvoices(data);
        } catch (error) {
            console.error("Error cargando facturas:", error);
        }
    };

    useEffect(() => {
        getInvoices();
    }, []);


    return (
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
                        <Text style={styles.title}>Mis facturas</Text>
                        <Text style={styles.subtitle}>
                            Descarga tus facturas mensuales.
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ padding: 10 }}>
                <FlatList
                    data={invoices}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.upcomingItem}>
                            <View>
                                <Text style={{ fontWeight: '600' }}>
                                    Factura #{item.id}
                                </Text>
                                <Text style={styles.smallText}>
                                    {dayjs(item.period_start).format('DD/MM/YYYY')} -
                                    {dayjs(item.period_end).format('DD/MM/YYYY')}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.smallText}>
                                    {formatCOP(item.total_amount)}
                                </Text>
                                {item.status === 'paid' && (
                                    <Text style={[styles.badgeText, styles.success]}>Pagada</Text>
                                )}

                                {item.status === 'pending' && (
                                    <Text style={[styles.badgeText, styles.warning]}>Pendiente</Text>
                                )}

                                {item.status === 'failed' && (
                                    <Text style={[styles.badgeText, styles.error]}>Cancelada</Text>
                                )}
                            </View>
                            {item.status === 'paid' && (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity style={{ marginRight: 10 }}
                                        onPress={() => downloadInvoice(item.id)}>
                                        <ArrowDownToLine size={18} color="#6c63ff" />
                                    </TouchableOpacity>

                                </View>
                            )}

                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.smallText}>No hay ninguna factura</Text>
                    }
                />
            </View>
        </View>
    );

}

export default InvoiceList;
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
    iconContainer: {
        backgroundColor: "#6c63ff20",
        padding: 8,
        borderRadius: 8,
        marginRight: 20,
    },
    upcomingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: '#f8f8ff'
    },
    smallText: {
        fontSize: 12,
        color: '#666',
    },
    success: {
        backgroundColor: '#dcfce7', // green-100
        color: '#15803d',           // green-700
    },
    warning: {
        backgroundColor: '#fef9c3', // yellow-100
        color: '#a16207',           // yellow-700
    },
    error: {
        backgroundColor: '#fee2e2', // red-100
        color: '#b91c1c',           // red-700
    },
    badgeText: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        fontSize: 12,
        fontWeight: '600',
        overflow: 'hidden',
    },
});