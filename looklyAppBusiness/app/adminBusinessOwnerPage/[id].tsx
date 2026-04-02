import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    ScrollView,
    FlatList,
    Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import {
    LayoutDashboard,
    CalendarDays,
    Scissors,
    Settings,
    Plus,
    ChevronLeft,
    Star,
    Trash2,
    Pencil,
    X,
    Building2,
    MapPin,
    Phone,
    Clock

} from "lucide-react-native";
import { Calendar } from 'react-native-big-calendar'
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { citasHoyList, calculosPorDia, mapAppointmentsToEvents, formatCOP, getDaysNames } from "@/scripts/utils";
import { API_URL } from '@/constants/config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const AdminBusiness = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [locations, setLocations] = useState(null);
    const [selectedValue, setSelectedValue] = useState("week");
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const windowHeight = Dimensions.get('window').height;
    const [events, setEvents] = useState([]);
    const [eventsCalendar, setEventsCalendar] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const [DatesToday, setDatesToday] = useState([]);
    const [mode, setMode] = useState<'day' | 'week' | 'month'>('week');
    const insets = useSafeAreaInsets();

    const calendarHeight = Math.max(windowHeight - 220, 600);

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "appointments", label: "Calendario", icon: CalendarDays },
        { id: "add", label: "Citas", icon: Plus },
        { id: "services", label: "Servicios", icon: Scissors },
        { id: "settings", label: "Información", icon: Settings },
    ];

    const [estadisticas, setEstadisticas] = useState({
        citasHoy: 0,
        citasAyer: 0,
        citasVariacion: '0%',
        ingresosHoy: 0,
        ingresosAyer: 0,
        ingresosVariacion: '0%',
        citasMes: 0
    });

    const getLocation = async () => {
        try {
            const token = await AsyncStorage.getItem("access");
            const res = await fetch(
                `${API_URL}/companies/locations/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await res.json();
            setLocations(data);
        } catch (error) {
            console.error("Error cargando local:", error);
        }
    };
    const getAppoiments = async () => {
        try {
            const token = await AsyncStorage.getItem("access");
            const res = await fetch(
                `${API_URL}/dates/appointments/?id=${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();
            const appointments = Array.isArray(data) ? data : [data];

            setEvents(appointments)
        } catch (error) {
            console.error("Error cargando citas del local:", error);
        }
    };

    const getServices = async () => {
        try {
            const token = await AsyncStorage.getItem("access");
            const res = await fetch(
                `${API_URL}/services/services/?location_id=${id}`,
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

    const handleBack = () => {
        router.replace("/businessSelectionOwner");
    };

    useFocusEffect(
        useCallback(() => {
            getAppoiments();
            getLocation();
            getServices();
        }, [])
    );

    useEffect(() => {
        if (!events.length) return;

        setEstadisticas(calculosPorDia(events));
        setEventsCalendar(mapAppointmentsToEvents(events));
    }, [events]);

    useEffect(() => {
        if (!events.length || !selectedDate) return;

        setDatesToday(citasHoyList(events, selectedDate));
    }, [events, selectedDate]);

    const todayAppointments = events
        .filter(item =>
            (item.status === "Completada" || item.status === "Pendiente") &&
            dayjs(item.datetime).isSame(dayjs(), "day")
        )
        .sort((a, b) =>
            new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
        )
        .slice(0, 5);

    const appointments = Array.isArray(events) ? events : [events];

    const today = dayjs().startOf("day");

    const filteredAppointments = appointments.filter(app => {
        const appDate = dayjs(app.datetime);

        const isFutureOrToday = appDate.isSame(today, "day") || appDate.isAfter(today);
        const validStatus = ["Pendiente", "Completado"].includes(app.status);

        return isFutureOrToday && validStatus;
    });
    return (
        <View style={{ flex: 1 }}>
            {/* HEADER */}
            < View style={styles.header} >
                <View style={styles.headerTitle}>
                    <TouchableOpacity
                        style={styles.iconContainer}
                        onPress={handleBack}
                    >
                        <ChevronLeft size={24} color="#6c63ff" />
                    </TouchableOpacity>

                    <View style={{ marginLeft: 15 }}>
                        <Text style={styles.title}>
                            {locations?.name_business || ""}
                        </Text>

                        <View style={styles.ratingRow}>
                            <Star size={14} color="#6c63ff" />
                            <Text style={styles.subtitle}>
                                {" "}
                                {locations?.average_score || 0} (
                                {locations?.total_reviews || 0}{" "}
                                {locations?.total_reviews === 1
                                    ? "reseña"
                                    : "reseñas"}
                                )
                            </Text>
                        </View>
                    </View>
                </View>
            </View >

            {/* CONTENIDO */}

            < View style={styles.container} >
                {activeTab === "dashboard" && (
                    <View style={styles.dashboardContainer} >
                        <Text style={styles.sectionTitle}>Resumen</Text>
                        <View style={styles.cardsRow}>
                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>Hoy</Text>
                                <Text style={styles.cardValue}>{estadisticas.citasHoy}</Text>
                                <Text style={styles.smallText}>Citas hoy</Text>
                            </View>

                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>Mes</Text>
                                <Text style={styles.cardValue}>{estadisticas.citasMes}</Text>
                                <Text style={styles.smallText}>Citas del mes</Text>
                            </View>

                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>Valoración</Text>
                                <Text style={styles.cardValue}>{locations?.average_score ? locations.average_score : 0}</Text>
                                <Text style={styles.smallText}>Promedio</Text>
                            </View>
                        </View>

                        <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Próximas citas</Text>
                        <FlatList
                            data={todayAppointments}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.upcomingItem}>
                                    <View>
                                        <Text style={{ fontWeight: '600' }}>
                                            {item.service_data.name}
                                        </Text>
                                        <Text style={styles.smallText}>
                                            {dayjs(item.datetime).format('DD/MM/YYYY HH:mm')}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.smallText}>
                                            {item.service_data.duration_minutes} min
                                        </Text>
                                        {item.status === 'Completado' && (
                                            <Text style={[styles.badgeText, styles.success]}>Confirmada</Text>
                                        )}

                                        {item.status === 'Pendiente' && (
                                            <Text style={[styles.badgeText, styles.warning]}>Pendiente</Text>
                                        )}

                                        {item.status === 'Cancelado' && (
                                            <Text style={[styles.badgeText, styles.error]}>Cancelada</Text>
                                        )}
                                    </View>

                                </TouchableOpacity>
                            )}
                            ListEmptyComponent={
                                <Text style={styles.smallText}>No hay citas próximas</Text>
                            }
                        />



                        <View style={styles.actionRow}>
                            <TouchableOpacity style={styles.actionButton} onPress={() => setActiveTab('add')}>
                                <Text style={styles.actionText}>Ir a Citas</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#6c63ff' }]} onPress={() =>
                                router.push({
                                    pathname: "/forms/formCrud/formCreateDateFull",
                                    params: {
                                        locationId: id,
                                        professional: locations.owner.id
                                    },
                                })
                            } >
                                <Text style={[styles.actionText, { color: '#fff' }]}>Crear cita ahora</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                )}

                {
                    activeTab === "appointments" && (
                        <View >
                            <View style={styles.buttonGroup}>
                                <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#6c63ff' }]} onPress={() => setMode('day')} >
                                    <Text style={[styles.actionText, { color: '#fff' }]}>Día</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#6c63ff' }]} onPress={() => setMode('week')}>
                                    <Text style={[styles.actionText, { color: '#fff' }]}>Semana</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#6c63ff' }]} onPress={() => setMode('month')} >
                                    <Text style={[styles.actionText, { color: '#fff' }]}>Mes</Text>
                                </TouchableOpacity>

                            </View>

                            <View >
                                <Calendar
                                    events={eventsCalendar}
                                    height={calendarHeight}
                                    mode={mode}
                                    hourRowHeight={60}
                                    dayStartHour={7}
                                    dayEndHour={24}
                                    onPressEvent={(event) => setSelectedEvent(event.raw)}
                                    theme={{
                                        palette: {
                                            primary: {
                                                main: "#6c63ff",
                                                contrastText: '#f4f4f4',
                                            },
                                            gray: {
                                                100: "#f4f4f4",
                                                300: "#ccc",
                                                500: "#999",
                                            },
                                        },
                                        typography: {
                                            fontFamily: "System",
                                        },
                                    }}
                                />


                            </View>

                        </View >
                    )
                }

                {
                    activeTab === "add" && (
                        <View style={[{ padding: 8 }]}>
                            <Text style={styles.sectionTitle}>Citas</Text>
                            <FlatList
                                data={filteredAppointments}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.upcomingItem}>
                                        <View>
                                            <Text style={{ fontWeight: '600' }}>
                                                {item.service_data.name}
                                            </Text>
                                            <Text style={styles.smallText}>
                                                {dayjs(item.datetime).format('DD/MM/YYYY HH:mm')}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={styles.smallText}>
                                                {item.service_data.duration_minutes} min
                                            </Text>
                                            {item.status === 'Completado' && (
                                                <Text style={[styles.badgeText, styles.success]}>Completado</Text>
                                            )}

                                            {item.status === 'Pendiente' && (
                                                <Text style={[styles.badgeText, styles.warning]}>Pendiente</Text>
                                            )}

                                            {item.status === 'Cancelado' && (
                                                <Text style={[styles.badgeText, styles.error]}>Cancelada</Text>
                                            )}
                                        </View>
                                        {item.status === 'Pendiente' && (
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <TouchableOpacity style={{ marginRight: 10 }}
                                                    onPress={() =>
                                                        router.push({
                                                            pathname: "/forms/formCrud/formDeleteDate",
                                                            params: {
                                                                dateId: item.id,
                                                                locations: id
                                                            },
                                                        })
                                                    }>
                                                    <Trash2 size={18} color="#b91c1c" />
                                                </TouchableOpacity>

                                            </View>
                                        )}
                                    </TouchableOpacity>
                                )}
                                ListEmptyComponent={
                                    <Text style={styles.smallText}>No hay citas próximas</Text>
                                }
                            />
                        </View>

                    )
                }

                {
                    activeTab === "services" && (
                        <View style={[{ padding: 8 }]}>
                            <Text style={styles.sectionTitle}>Servicios</Text>


                            <FlatList
                                data={services}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={styles.upcomingItem}>
                                        <View>
                                            <Text style={{ fontWeight: '600' }}>
                                                {item.name}
                                            </Text>
                                            <Text style={styles.smallText}>
                                                {item.status === true ?
                                                    <Text style={[styles.badgeText, styles.success]}>Activo</Text> :
                                                    <Text style={[styles.badgeText, styles.error]}>Inactivo</Text>}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={styles.smallText}>
                                                {item.duration_minutes} min
                                            </Text>
                                            <Text style={styles.smallText}>
                                                {formatCOP(item.price)}
                                            </Text>

                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity style={{ marginRight: 10 }}
                                                onPress={() =>
                                                    router.push({
                                                        pathname: "/forms/formCrud/formUpdateService",
                                                        params: {
                                                            serviceId: item.id,
                                                        },
                                                    })
                                                }>
                                                <Pencil size={18} color="#6c63ff" />
                                            </TouchableOpacity>

                                        </View>

                                    </TouchableOpacity>
                                )}
                                ListEmptyComponent={
                                    <Text style={styles.smallText}>No hay citas próximas</Text>
                                }
                            />

                        </View>

                    )
                }

                {
                    activeTab === "settings" && (
                        <ScrollView contentContainerStyle={{ padding: 8 }}>
                            <Text style={styles.sectionTitle}>Información del Negocio</Text>
                            <View style={styles.information}>
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Building2 size={22} color="#6c63ff" />
                                        <Text style={[styles.businessInfo, { fontWeight: "bold" }]}>  Nombre:</Text>
                                    </View>
                                    <Text style={styles.businessInfo}>{locations?.name_business}</Text>
                                </View>
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Scissors size={22} color="#6c63ff" />
                                        <Text style={[styles.businessInfo, { fontWeight: "bold" }]}>  Categoría:</Text>
                                    </View>
                                    <Text style={styles.businessInfo}>{locations?.category}</Text>
                                </View>

                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <MapPin size={22} color="#6c63ff" />
                                        <Text style={[styles.businessInfo, { fontWeight: "bold" }]}>  Dirección:</Text>
                                    </View>
                                    <Text style={styles.businessInfo}>{locations?.address}</Text>
                                </View>

                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Phone size={22} color="#6c63ff" />
                                        <Text style={[styles.businessInfo, { fontWeight: "bold" }]}>  Teléfono:</Text>
                                    </View>
                                    <Text style={styles.businessInfo}>{locations?.phone_business}</Text>
                                </View>
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <CalendarDays size={22} color="#6c63ff" />
                                        <Text style={[styles.businessInfo, { fontWeight: "bold" }]}>  Días de funcionamiento:</Text>
                                    </View>
                                    <Text style={styles.businessInfo}>{getDaysNames(locations?.available_days).join(', ')}</Text>
                                </View>
                                <View style={{ marginBottom: 15 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Clock size={22} color="#6c63ff" />
                                        <Text style={[styles.businessInfo, { fontWeight: "bold" }]}>  Horarios:</Text>
                                    </View>
                                    <Text style={styles.businessInfo}>{locations?.opening_time} - {locations?.closing_time}</Text>
                                </View>



                            </View>


                        </ScrollView>
                    )
                }

                {
                    selectedEvent && (
                        <Modal transparent animationType="slide">
                            <View style={styles.modalOverlay}>
                                <View style={styles.modalContent}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18, fontWeight: '700' }}>
                                            {selectedEvent.service_data.name}
                                        </Text>
                                        <TouchableOpacity onPress={() => setSelectedEvent(null)}>
                                            <X />
                                        </TouchableOpacity>
                                    </View>

                                    <Text style={{ marginTop: 8 }}>
                                        Estado: {selectedEvent.status}
                                    </Text>

                                    <Text style={{ marginTop: 8 }}>
                                        {dayjs(selectedEvent.datetime).format('DD/MM/YYYY HH:mm')}
                                    </Text>

                                    <Text style={{ marginTop: 8 }}>
                                        Duración: {selectedEvent.service_data.duration_minutes} min
                                    </Text>
                                    <Text style={{ marginTop: 8 }}>
                                        Nombre del cliente: {selectedEvent.client_data.name}
                                    </Text>
                                    <Text style={{ marginTop: 8 }}>
                                        Teléfono del cliente: {selectedEvent.client_data.phone}
                                    </Text>
                                </View>
                            </View>
                        </Modal>


                    )
                }

            </View >
            {activeTab === "services" &&
                <TouchableOpacity style={[
                    styles.addServicebutton,
                    { bottom: 90 + insets.bottom }
                ]}
                    onPress={() =>
                        router.push({
                            pathname: "/forms/formCrud/formCreateService",
                            params: {
                                serviceId: id
                            },
                        })
                    }>
                    <Plus size={18} color="#fff" />
                </TouchableOpacity>
            }

            {
                activeTab === "add" &&
                <TouchableOpacity style={[
                    styles.addServicebutton,
                    { bottom: 90 + insets.bottom }
                ]}
                    onPress={() =>
                        router.push({
                            pathname: "/forms/formCrud/formCreateDateFull",
                            params: {
                                locationId: id,
                                professional: locations.owner.id
                            },
                        })
                    }>
                    <Plus size={18} color="#fff" />
                </TouchableOpacity>
            }
            {/* FOOTER */}
            <View
                style={[
                    styles.footerNav,
                    {
                        paddingBottom: insets.bottom,
                        paddingTop: 8,
                    },
                ]}
            >
                {
                    menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.navItem}
                            onPress={() => setActiveTab(item.id)}
                        >
                            <item.icon
                                size={22}
                                color={
                                    activeTab === item.id ? "#6c63ff" : "#999"
                                }
                            />
                            <Text
                                style={[
                                    styles.navText,
                                    {
                                        color:
                                            activeTab === item.id
                                                ? "#6c63ff"
                                                : "#999",
                                    },
                                ]}
                            >
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View >
        </View >
    );
};

export default AdminBusiness;

/* ================== STYLES ================== */

const styles = StyleSheet.create({
    header: {
        marginTop: 45,
        backgroundColor: "#fff",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    headerTitle: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        backgroundColor: "#6c63ff20",
        padding: 8,
        borderRadius: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",

    },
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    footerNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },
    navItem: {
        alignItems: "center",
        paddingVertical: 8,
        flex: 1,
    },
    navText: {
        fontSize: 10,
        marginTop: 4,
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    buttonActive: {
        backgroundColor: "#6c63ff",
        borderColor: "#6c63ff",
        color: "#fff",
    },
    TextNoActive: {
        color: "#000",
    },
    TextActive: {
        color: "#fff",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 6,
        marginBottom: 12,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 6,
        alignItems: 'center',
        marginHorizontal: 6,
    },
    modalButtonText: {
        fontWeight: '600',
    },
    dashboardContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 8,
    },
    cardsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    card: {
        flex: 1,
        backgroundColor: '#f8f8ff',
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 6,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 12,
        color: '#666',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardValue: {
        fontSize: 20,
        fontWeight: '700',
        marginVertical: 6,
    },
    upcomingList: {
        marginTop: 8,
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
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#6c63ff',
        alignItems: 'center',
        marginHorizontal: 6,
    },
    actionText: {
        color: '#6c63ff',
        fontWeight: '700',
    },
    serviceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 8,
        backgroundColor: '#fff',
    },
    smallButton: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 4,
        marginLeft: 4,
        alignItems: 'center',
    },
    smallButtonText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
    },
    titleMidle: { fontSize: 18, fontWeight: 'bold', color: '#1a1a40', marginBottom: 15, marginTop: 15 },
    value: { fontSize: 14, fontWeight: 'bold', color: '#222', marginLeft: 8, marginBottom: 8 },
    cardTitleIcon: { alignItems: 'center', marginLeft: 10 },
    labelValue: {
        flexDirection: "column",
        marginLeft: 10,
    },
    badge: {
        backgroundColor: '#e9d5ff', color: '#6c63ff', marginTop: 8, paddingHorizontal: 8
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
    badgeText: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        fontSize: 12,
        fontWeight: '600',
        overflow: 'hidden',
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
    addServicebutton: {
        position: 'absolute',
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#6c63ff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6, // Android sombra
        shadowColor: '#000', // iOS sombra
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    information: {
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
    businessInfo: {
        fontSize: 14,
        color: "#333",
        marginTop: 8,
        lineHeight: 20,
    },
});
