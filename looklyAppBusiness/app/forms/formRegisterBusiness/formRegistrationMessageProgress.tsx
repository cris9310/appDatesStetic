import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

interface Props {
    isSubmitting: boolean;
    submissionProgress: number;
}

const RegistrationSuccessMessage: React.FC<Props> = ({ isSubmitting, submissionProgress }) => {
    const progressAnim = useRef(new Animated.Value(0)).current;

    // Animar barra de progreso
    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: submissionProgress,
            duration: 400,
            useNativeDriver: false,
        }).start();
    }, [submissionProgress]);

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: [0, screenWidth * 0.75],
    });

    const getProgressMessage = () => {
        if (submissionProgress === 20) return "Validando información personal...";
        if (submissionProgress === 40) return "Procesando datos del negocio...";
        if (submissionProgress === 60) return "Configurando horarios...";
        if (submissionProgress === 80) return "Ultimando detalles...";
        return "¡Registro completado exitosamente!";
    };


    return (
        <View pointerEvents={isSubmitting ? "auto" : "none"} style={[
            styles.overlay,
            isSubmitting && { backgroundColor: "rgba(255, 255, 255, 0.95)" }
        ]}>
            {isSubmitting && (
                <View style={styles.card}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>
                            <Text style={{ color: "#6c63ff" }}>Look</Text>ly
                        </Text>
                    </View>

                    <Text style={styles.title}>Creando tu local...</Text>

                    <View style={styles.progressContainer}>
                        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
                    </View>

                    <Text style={styles.progressMessage}>{getProgressMessage()}</Text>
                    <Text style={styles.progressPercent}>{submissionProgress}% completado</Text>
                </View>
            )}
        </View >
    );
};

export default RegistrationSuccessMessage;

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0, bottom: 0, left: 0, right: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },
    card: {
        width: "85%",
        padding: 25,
        backgroundColor: "#fff",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 7,
        alignItems: "center",
    },
    logoContainer: { marginBottom: 20 },
    logoText: { fontSize: 32, fontWeight: "bold", color: "#222" },
    title: { fontSize: 18, fontWeight: "700", color: "#6c63ff", marginBottom: 20, textAlign: "center" },
    progressContainer: { width: "100%", height: 12, backgroundColor: "#eee", borderRadius: 10, overflow: "hidden", marginBottom: 10 },
    progressBar: { height: "100%", backgroundColor: "#6c63ff", borderRadius: 10 },
    progressMessage: { fontSize: 14, color: "#555", marginTop: 10, textAlign: "center" },
    progressPercent: { fontSize: 12, color: "#888", marginTop: 5 },
});
