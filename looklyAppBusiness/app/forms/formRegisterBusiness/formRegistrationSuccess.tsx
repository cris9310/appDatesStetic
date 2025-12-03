import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { CheckCircle, Sparkles, Check, Download } from "lucide-react-native";
import { useRouter } from 'expo-router';

const RegistrationSuccessScreen = () => {
  const router = useRouter();

  useEffect(() => {
    // Scroll al inicio si fuera necesario
  }, []);

  const handleSelectBusiness = async () => {
    router.replace('/businessSelectionOwner');
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <CheckCircle size={48} color="#E0E0FF" />
        </View>

        <View style={styles.titleContainer}>
          <Sparkles size={24} color="#FACC15" />
          <Text style={styles.title}>¡Registro Exitoso!</Text>
          <Sparkles size={24} color="#FACC15" />
        </View>

        <Text style={styles.subtitle}>
          Tu local ha sido creado correctamente
        </Text>

        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Check size={20} color="#1E1E2C" />
            <Text style={styles.infoText}>Ahora puedes acceder al panel de control de tu local</Text>
          </View>

        </View>

        <TouchableOpacity style={styles.button} onPress={handleSelectBusiness} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Inicio</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default RegistrationSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 25
  },
  content: {
    alignItems: "center",
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#6c63ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E1E2C",
    marginHorizontal: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontWeight: "600",
    color: "#6c63ff",
    flexShrink: 1,
  },
  downloadSection: {
    alignItems: "center",
  },
  downloadTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E1E2C",
    marginBottom: 8,
  },
  downloadSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
  },
  button: { width: '100%', backgroundColor: '#6c63ff', paddingVertical: 12, borderRadius: 6, alignItems: 'center', marginTop: 12 },
  buttonText: { color: '#fff', fontWeight: '600' },
  appStoreButton: {
    backgroundColor: "#000",
  },
  playStoreButton: {
    backgroundColor: "#6c63ff",
  },
  buttonTextContainer: {
    marginLeft: 8,
    alignItems: "flex-start",
  },
  buttonTextSmall: {
    fontSize: 10,
    color: "#FFF",
  },
  buttonTextBold: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "700",
  },
});
