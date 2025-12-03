import {
    View, Text, TouchableOpacity, StyleSheet
} from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    LayoutDashboard,
    CalendarDays,
    Scissors,
    Settings,
    Plus
} from 'lucide-react-native';

const AdminBusiness = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const { id } = useLocalSearchParams();

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "appointments", label: "Citas", icon: CalendarDays },
        { id: "add", label: "Añadir", icon: Plus },
        { id: "services", label: "Servicios", icon: Scissors },
        { id: "settings", label: "Configuración", icon: Settings },
    ];

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

                {activeTab === "dashboard" && (
                    <Text>Dash</Text>
                )}

                {activeTab === "appointments" && (
                    <Text>Citas</Text>
                )}

                {activeTab === "add" && (
                    <Text>Añadir</Text>
                )}

                {activeTab === "services" && (
                    <Text>Servicios</Text>
                )}

                {activeTab === "settings" && (
                    <Text>Configuraciones</Text>
                )}
            </View>

            {/* FOOTER */}
            <View style={styles.footerNav}>
                {menuItems.map((item) => (
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => setActiveTab(item.id)}
                        key={item.id}
                    >
                        <item.icon
                            size={22}
                            color={activeTab === item.id ? "#6c63ff" : "#999"}
                        />
                        <Text style={{
                            fontSize: 10,
                            color: activeTab === item.id ? "#6c63ff" : "#999",
                            marginTop: 3
                        }}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

        </View>
    );
};

export default AdminBusiness;

const styles = StyleSheet.create({
    footerNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 75
    },
    navItem: {
        alignItems: "center",
    },
});
