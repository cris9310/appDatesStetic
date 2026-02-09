import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@/constants/config";
import { router, useLocalSearchParams } from "expo-router";

import FormSelectDateService from "./formCreateDateStepOne";
import FormSelectDateTime from "./formCreateDateStepTwo";
import FormSelectDateUser from "./formCreateDateStepThree";
import FormSelectDateConfirm from "./formCreateDateStepFour";
import FormSelectDate from "./formCreateDateStepFive";





const FormCreateDateFull = () => {

    const [step, setStep] = useState(1);

    const [clientId, setClientId] = useState<number | null>(null);
    const [clientName, setClientName] = useState<string | null>(null);
    const [serviceId, setServiceId] = useState<number | null>(null);
    const [serviceName, setServiceName] = useState<string | null>(null);
    const [dateDate, setDateDate] = useState<Date | null>(null);
    const [datetime, setDatetime] = useState<string | null>(null);
    const { locationId } = useLocalSearchParams();
    const { professional } = useLocalSearchParams();




    const nextStep = () => {
        if (step === 1 && !clientId) {
            Alert.alert("Selecciona un cliente");
            return;
        }
        if (step === 2 && !serviceId) {
            Alert.alert("Selecciona un servicio");
            return;
        }
        if (step === 3 && !dateDate) {
            Alert.alert("Selecciona una fecha");
            return;
        }
        if (step === 4 && !datetime) {
            Alert.alert("Selecciona una hora");
            return;
        }

        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };
    const handleDateSelected = (date: Date) => {
        setDateDate(date);
        setDatetime(null);
    };



    const createDate = async () => {
        try {
            const token = await AsyncStorage.getItem("access");

            const res = await fetch(`${API_URL}/dates/appointments/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    client: clientId,
                    service: serviceId,
                    location: locationId,
                    datetime,
                    professional
                }),
            });

            if (!res.ok) {
                throw new Error("Error creando cita");
            }
            Alert.alert("Éxito", "Cita creada correctamente");
            router.replace(`/adminBusinessOwnerPage/${locationId}`);
        } catch (error) {
            Alert.alert("Error", "No se pudo crear la cita");
        }
    };
    return (
        <View style={[styles.container, { marginTop: 20, paddingTop: 35 }]}>
            <View style={styles.containerSub}>
                {step === 1 && (
                    <FormSelectDateUser
                        selectedClient={clientId}
                        onSelectClient={setClientId}
                        onselectClientName={setClientName}
                    />
                )}

                {step === 2 && (
                    <FormSelectDateService
                        idLocation={locationId}
                        selectedService={serviceId}
                        onSelect={setServiceId}
                        onSelectedServiceName={setServiceName}
                    />
                )}
                {step === 3 && (
                    <FormSelectDate
                        selectedDate={dateDate}
                        onDateSelect={handleDateSelected}
                    />
                )}

                {step === 4 && (

                    <FormSelectDateTime
                        idLocation={locationId}
                        selectedService={serviceId}
                        selectedSlot={datetime}
                        onSelectSlot={setDatetime}
                        date={dateDate}
                    />
                )}

                {step === 5 && (
                    <FormSelectDateConfirm
                        onselectClientName={clientName}
                        datetime={datetime}
                        onConfirm={createDate}
                        serviceName={serviceName}
                        clientId={clientId}
                        serviceId={serviceId}
                    />
                )}

                {/* BOTONES */}
                <View style={styles.footer}>
                    {step > 1 && step < 5 && (
                        <TouchableOpacity onPress={prevStep}>
                            <Text style={styles.link}>Atrás</Text>
                        </TouchableOpacity>
                    )}

                    {step < 5 && (
                        <TouchableOpacity style={styles.button} onPress={nextStep}>
                            <Text style={styles.buttonText}>Continuar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );


};

export default FormCreateDateFull;


const styles = StyleSheet.create({

    container: {
        padding: 4,
    },

    containerSub: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginLeft: 8,
        marginRight: 8,

    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#eee",
        backgroundColor: "#fff",
    },

    link: {
        color: "#6c63ff",
        fontWeight: "600",
    },
    button: {
        backgroundColor: "#6c63ff",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700",
    },
});