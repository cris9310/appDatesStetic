import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import { useForm, FormProvider } from "react-hook-form";
import Toast from "react-native-toast-message";
import Animated, { FadeInDown } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import FormNewBusiness from "../formRegisterBusiness/formNewBusiness";
import FormDetailsHoursBusiness from "../formRegisterBusiness/formDetailsHoursBusiness";
import FormReviewFinalBusiness from "../formRegisterBusiness/formReviewFinalBusiness";

import RegistrationSuccessScreen from "../formRegisterBusiness/formRegistrationSuccess";
import RegistrationSuccessMessage from "../formRegisterBusiness/formRegistrationMessageProgress";


const steps = [
    { id: 1, title: "Información del Negocio", icon: "briefcase" },
    { id: 2, title: "Detalles del Negocio", icon: "clock" },
    { id: 3, title: "Revisión", icon: "eye" },
];

const BusinessRegistrationForm = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionProgress, setSubmissionProgress] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();
    const scrollRef = useRef<ScrollView | null>(null);

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: "",
        password: "",
        profile_image: null,
        category: "",
        image: null,
        number: "",
        rut_document: null,
        nit: "",
        name_business: "",
        address: "",
        phone_business: "",
        opening_time: "08:00",
        closing_time: "23:59",
        available_days: [0, 1, 2, 3, 4, 5, 6],
        is_verified: false,
    });

    const methods = useForm({
        mode: "onChange",
        defaultValues: formData,
    });

    const wait = (ms: number) => new Promise(res => setTimeout(res, ms));


    const nextStep = async () => {
        const isStepValid = await methods.trigger();
        if (currentStep < steps.length && isStepValid) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const updateFormData = (newData: any) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const onSubmit = async () => {
        const values = methods.getValues();

        const token = await AsyncStorage.getItem("access");
        const userData = await AsyncStorage.getItem("user");
        const user = JSON.parse(userData);

        const normalizeFile = (file: any) => ({
            uri: file.uri,
            type: file.mimeType || file.type || "application/octet-stream",
            name: file.name || "file",
        });

        const joinAddress = (via, numero) => {
            if (!via) return numero || "";
            if (!numero) return via;

            const partes = via.split(",");
            return `${partes[0]}  ${numero}${partes.length > 1 ? ", " + partes.slice(1).join(",") : ""}`;
        };

        const address = joinAddress(values.address, values.number)

        const formDataToSend = new FormData();
        formDataToSend.append("owner", user.id.toString());
        formDataToSend.append("category", values.category.toString());
        formDataToSend.append("nit", values.nit);
        formDataToSend.append("name_business", values.name_business);
        formDataToSend.append("address", address);
        formDataToSend.append("phone_business", values.phone_business);
        formDataToSend.append("opening_time", values.opening_time + ":00");
        formDataToSend.append("closing_time", values.closing_time + ":00");
        formDataToSend.append("available_days", values.available_days.join(","));
        formDataToSend.append("is_verified", values.is_verified ? "true" : "false");

        if (values.image) formDataToSend.append("image", normalizeFile(values.image));
        if (values.rut_document) formDataToSend.append("rut_document", normalizeFile(values.rut_document));

        setIsSubmitting(true);
        setSubmissionProgress(0);

        try {
            const response = await fetch("http://10.192.104.82:8000/companies/app/locations/", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formDataToSend,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                console.log("Error 400 detalle:", errorData);
                throw new Error(`HTTP ${response.status}`);
            }

            const progressSteps = [
                { progress: 20, message: "Validando información personal..." },
                { progress: 40, message: "Procesando datos del negocio..." },
                { progress: 60, message: "Configurando horarios..." },
                { progress: 80, message: "Ultimando detalles..." },
                { progress: 100, message: "¡Registro completado exitosamente!" }
            ];

            for (const step of progressSteps) {
                await new Promise(resolve => setTimeout(resolve, 800));
                setSubmissionProgress(step.progress);

                if (step.progress === 100) {
                    setIsSuccess(true);
                }
            }


        } catch (error) {
            setIsSubmitting(false);
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "No se ha podido completar el registro",
            });
        } finally {
            setTimeout(() => {
                setIsSubmitting(false);
                setSubmissionProgress(0);
            }, 2000);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <FormNewBusiness data={formData} updateData={updateFormData} />;
            case 2:
                return <FormDetailsHoursBusiness data={formData} updateData={updateFormData} />;
            case 3:
                return <FormReviewFinalBusiness data={formData} updateData={updateFormData} />;
            default:
                return null;
        }
    };


    if (isSuccess) {
        return <RegistrationSuccessScreen />;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: "#f9fafb" }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    ref={scrollRef}
                    onContentSizeChange={() =>
                        scrollRef.current?.scrollTo({ y: 0, animated: true })
                    }
                >
                    <Animated.View entering={FadeInDown.duration(400)}>
                        {/* Título y pasos */}
                        <View style={styles.cardTitle}>
                            <Icon name={steps[currentStep - 1].icon} size={25} color="#6c63ff" />
                            <Text style={styles.stepTitle}>
                                {steps[currentStep - 1].title}
                            </Text>
                        </View>

                        <View style={styles.progressContainer}>
                            <Text style={styles.progressText}>
                                Paso {currentStep} de {steps.length}
                            </Text>
                            <View style={styles.progressBar}>
                                <View
                                    style={[
                                        styles.progressFill,
                                        { width: `${(currentStep / steps.length) * 100}%` },
                                    ]}
                                />
                            </View>
                        </View>

                        {/* Formulario */}
                        <View style={styles.card}>
                            <View style={styles.stepContent}>
                                <FormProvider {...methods}>{renderStep()}</FormProvider>
                            </View>
                        </View>

                        {/* Botones */}
                        <View style={styles.buttonsContainer}>
                            {currentStep > 1 && (
                                <TouchableOpacity style={styles.button} onPress={prevStep}>
                                    <Icon name="arrow-left" size={16} color="#fff" />
                                    <Text style={styles.buttonText}>Anterior</Text>
                                </TouchableOpacity>
                            )}

                            {currentStep < steps.length ? (
                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        {
                                            backgroundColor: methods.formState.isValid
                                                ? "#6c63ff"
                                                : "#ccc",
                                        },
                                    ]}
                                    onPress={nextStep}
                                    disabled={!methods.formState.isValid}
                                >
                                    <Text style={styles.buttonText}>Siguiente</Text>
                                    <Icon name="arrow-right" size={16} color="#fff" />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={methods.handleSubmit(onSubmit)}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <>
                                            <Text style={styles.buttonText}>Completar</Text>
                                            <Icon name="check" size={16} color="#fff" />
                                        </>
                                    )}
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Overlay de carga */}
                        <RegistrationSuccessMessage
                            isSubmitting={isSubmitting}
                            submissionProgress={submissionProgress}
                        />
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default BusinessRegistrationForm;


const styles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        flexDirection: "row",
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#6c63ff",
        marginLeft: 8,
    },
    progressContainer: {
        marginVertical: 20,
    },
    progressText: {
        fontSize: 14,
        color: "#555",
        marginBottom: 6,
    },
    progressBar: {
        height: 6,
        backgroundColor: "#ddd",
        borderRadius: 10,
    },
    progressFill: {
        height: 6,
        backgroundColor: "#6c63ff",
        borderRadius: 10,
    },
    stepContent: {
        marginTop: 12,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        flexDirection: "row",
        backgroundColor: "#6c63ff",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginHorizontal: 4,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        marginHorizontal: 6,
    },
});
