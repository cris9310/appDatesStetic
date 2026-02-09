
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '@/constants/config';
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from 'expo-router';



const FormSelectDateUser = ({ selectedClient, onSelectClient, onselectClientName }) => {

    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const searchUsers = async () => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const token = await AsyncStorage.getItem("access");
            const res = await fetch(
                `${API_URL}/user/profile/date/${query}/`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await res.json();
            console.log(data);
            setUsers(data);
        } catch (error) {
            console.error("Error cargando usuarios:", error);
            setLoading(false);
        }
    };


    return (
        <View>
            <View style={styles.cardTitle}>
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => router.back()}
                >
                    <ChevronLeft size={24} color="#6c63ff" />
                </TouchableOpacity>
                <Text style={styles.sectionTitle}>Selecciona el cliente</Text>
            </View>

            <View style={styles.searchRow}>
                <TextInput
                    placeholder="Número de telefono del cliente"
                    value={query}
                    onChangeText={setQuery}
                    style={styles.searchInput}
                />

                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={searchUsers}
                >
                    <Text style={{ color: '#fff', fontWeight: '600' }}>Buscar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const isSelected = selectedClient === item.id;

                    return (
                        <TouchableOpacity
                            style={[
                                styles.clientItem,
                                isSelected && styles.clientSelected,
                            ]}
                            onPress={() => {onSelectClient(item.id); onselectClientName(item.name)}}
                        >
                            <Text style={{ fontWeight: '600' }}>
                                {item.name}
                            </Text>
                            <Text style={{ fontWeight: '300' }}>
                                {item.email}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
                ListEmptyComponent={
                    <Text style={{ fontWeight: '300' }}>
                        No se encontraron clientes
                    </Text>
                }
            />
        </View>
    );











};

export default FormSelectDateUser;


const styles = StyleSheet.create({

    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
    },

    searchButton: {
        marginLeft: 8,
        backgroundColor: '#6c63ff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
    },

    clientItem: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f8f8ff',
        marginBottom: 8,
    },

    clientSelected: {
        backgroundColor: '#dcfce7',
        borderColor: '#22c55e',
        borderWidth: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
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