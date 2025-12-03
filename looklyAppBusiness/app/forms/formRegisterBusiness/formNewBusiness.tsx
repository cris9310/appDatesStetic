import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Image,
} from "react-native";
import {
    Building2,
    Scissors,
    MapPin,
    User,
    Phone,
    Paperclip,
} from "lucide-react-native";
import RNPickerSelect from "react-native-picker-select";
import { useFormContext, Controller } from "react-hook-form";
import * as DocumentPicker from "expo-document-picker";

export default function FormNewBusiness({ data, updateData }) {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState([]);
    const MAPBOX_TOKEN = "pk.eyJ1IjoiY3JpczkzMTAiLCJhIjoiY21paHQxd2UyMGlzbDNkcjFwNTdiM2RlNiJ9.uXXlWPP_kH3gp-tZAOS4Cw";

    const searchAddress = async (query) => {
        if (!query) return [];

        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
        )}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&country=co&language=es`;

        const res = await fetch(url);
        const data = await res.json();
        return data.features || [];
    };

    const handleAddressChange = async (text, onChange) => {
        onChange(text);
        updateData({ address: text });

        const results = await searchAddress(text);
        setSuggestions(results);
    };


    useEffect(() => {
        Promise.all([
            fetch("http://10.192.104.82:8000/companies/Category/").then((r) =>/*192.168.1.249 10.192.104.82*/
                r.json()
            ),
        ])
            .then(([cats]) => {
                setCategorias(cats);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#6c63ff" />;

    return (
        <View style={styles.container}>
            {/* Nombre del negocio */}
            <View style={styles.containerSub}>
                <View style={styles.cardTitle}>
                    <Building2 size={22} color="#6c63ff" />
                    <Text style={styles.label}>Nombre del negocio</Text>
                </View>

                <Controller
                    control={control}
                    name="name_business"
                    rules={{ required: "El nombre del negocio es obligatorio" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa el nombre del negocio"
                            value={value}
                            onChangeText={(text) => {
                                onChange(text);
                                updateData({ name_business: text });
                            }}
                        />
                    )}
                />
                {errors.name_business && (
                    <Text style={styles.error}>{errors.name_business.message}</Text>
                )}
            </View>

            {/* Categoría */}
            <View style={styles.containerSub}>
                <View style={styles.cardTitle}>
                    <Scissors size={22} color="#6c63ff" />
                    <Text style={styles.label}>Categoría del negocio</Text>
                </View>
                <Controller
                    control={control}
                    name="category"
                    rules={{ required: "Selecciona una categoría" }}
                    render={({ field: { onChange, value } }) => (
                        <RNPickerSelect
                            onValueChange={(val) => {
                                onChange(val);
                                updateData({ category: val });
                            }}
                            value={value}
                            items={categorias.map((cat) => ({
                                label: cat.name,
                                value: String(cat.id),
                            }))}
                            placeholder={{ label: "Selecciona una categoría...", value: null }}
                            style={pickerSelectStyles}
                        />
                    )}
                />
                {errors.category && (
                    <Text style={styles.error}>{errors.category.message}</Text>
                )}
            </View>

            {/* Dirección */}
            <View style={styles.containerSub}>
                <View style={styles.cardTitle}>
                    <MapPin size={22} color="#6c63ff" />
                    <Text style={styles.label}>Nombre de vía</Text>
                </View>

                <Controller
                    control={control}
                    name="address"
                    rules={{ required: "Ingrese el nombre de la vía" }}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder="Ingresa la dirección del negocio"
                                value={value}
                                onChangeText={(text) => handleAddressChange(text, onChange)}
                            />

                            {/* SUGERENCIAS */}
                            {suggestions.length > 0 && (
                                <View style={styles.suggestionsBox}>
                                    {suggestions.map((item) => (
                                        <TouchableOpacity
                                            key={item.id}
                                            style={styles.suggestionItem}
                                            onPress={() => {
                                                // asignar la dirección seleccionada
                                                onChange(item.place_name);
                                                updateData({ address: item.place_name });
                                                setSuggestions([]);
                                            }}
                                        >
                                            <Text>{item.place_name}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </>
                    )}
                />
                {errors.address && (
                    <Text style={styles.error}>{errors.address.message}</Text>
                )}
            </View>
            <View style={styles.containerSub}>
                <View style={styles.cardTitle}>
                    <MapPin size={22} color="#6c63ff" />
                    <Text style={styles.label}>Número</Text>
                </View>

                <Controller
                    control={control}
                    name="number"
                    rules={{ required: "El número del negocio es obligatorio" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa el complemento de la direccion"
                            value={value}
                            onChangeText={(text) => {
                                onChange(text);
                                updateData({ number: text });
                            }}
                        />
                    )}
                />
                {errors.number && (
                    <Text style={styles.error}>{errors.number.message}</Text>
                )}
            </View>


            {/* Teléfono */}
            <View style={styles.containerSub}>
                <View style={styles.cardTitle}>
                    <Phone size={22} color="#6c63ff" />
                    <Text style={styles.label}>Teléfono del negocio</Text>
                </View>
                <Controller
                    control={control}
                    name="phone_business"
                    rules={
                        {
                            required: "Ingresa el teléfono",
                            pattern: {
                                value: /^\d{10}$/,
                                message: "El teléfono debe tener 10 dígitos"
                            }
                        }
                    }
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Teléfono del negocio"
                            value={value}
                            onChangeText={(text) => {
                                const numericText = text.replace(/[^0-9]/g, "");
                                if (numericText.length <= 10) {
                                    onChange(numericText);
                                    updateData({ phone_business: numericText });
                                }
                            }}
                            style={styles.input}
                            keyboardType="phone-pad"
                            maxLength={10}
                        />
                    )}
                />
                {errors.phone_business && (
                    <Text style={styles.error}>{errors.phone_business.message}</Text>
                )}
            </View>

            {/* Imagen del negocio */}
            <View style={styles.containerSub}>
                <View style={styles.cardTitle}>
                    <Paperclip size={22} color="#6c63ff" />
                    <Text style={styles.label}>Imagen del negocio</Text>
                </View>

                <Controller
                    control={control}
                    name="image"
                    rules={{ required: "Por favor adjunta una imagen del negocio" }}
                    render={({ field: { value, onChange } }) => (
                        <>
                            <TouchableOpacity
                                style={styles.uploadButton}
                                onPress={async () => {
                                    try {
                                        const result = await DocumentPicker.getDocumentAsync({
                                            type: [
                                                "image/jpeg",
                                                "image/jpg",
                                                "image/png",
                                                "image/webp",
                                                "image/heic",
                                                "image/heif",
                                                "image/*",
                                            ],
                                            copyToCacheDirectory: true,
                                            multiple: false,
                                        });

                                        if (!result.canceled && result.assets?.length > 0) {
                                            const file = result.assets[0];
                                            onChange(file);
                                            updateData({ image: file });
                                        }
                                    } catch (error) {
                                        console.error("Error al seleccionar imagen:", error);
                                    }
                                }}
                            >
                                <Paperclip size={20} color="#6c63ff" />
                                <Text style={styles.uploadText}>
                                    {value?.name
                                        ? value.name.length > 25
                                            ? value.name.substring(0, 22) + "..."
                                            : value.name
                                        : "Seleccionar imagen"}
                                </Text>
                            </TouchableOpacity>

                            {/* Miniatura de la imagen seleccionada */}
                            {value?.uri && (
                                <Image
                                    source={{ uri: value.uri }}
                                    style={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: 10,
                                        marginTop: 10,
                                        alignSelf: "center",
                                    }}
                                />
                            )}

                            {errors.image && (
                                <Text style={styles.error}>{errors.image.message}</Text>
                            )}
                        </>
                    )}
                />
            </View>
            <View style={styles.containerSub}>
                <View style={styles.cardTitle}>
                    <Paperclip size={22} color="#6c63ff" />
                    <Text style={styles.label}>RUT o documento legal</Text>
                </View>

                <Controller
                    control={control}
                    name="rut_document"
                    rules={{ required: "Por favor adjunta el RUT o documento legal" }}
                    render={({ field: { value, onChange } }) => (
                        <>
                            <TouchableOpacity
                                style={styles.uploadButton}
                                onPress={async () => {
                                    try {
                                        const result = await DocumentPicker.getDocumentAsync({
                                            type: ["application/pdf"],
                                            copyToCacheDirectory: true,
                                            multiple: false,
                                        });

                                        if (!result.canceled && result.assets?.length > 0) {
                                            const file = result.assets[0];
                                            onChange(file);
                                            updateData({ rut_document: file });
                                        }
                                    } catch (error) {
                                        console.error("Error al seleccionar PDF:", error);
                                    }
                                }}
                            >
                                <Paperclip size={20} color="#6c63ff" />
                                <Text style={styles.uploadText}>
                                    {value?.name
                                        ? value.name.length > 25
                                            ? value.name.substring(0, 22) + "..."
                                            : value.name
                                        : "Seleccionar PDF"}
                                </Text>
                            </TouchableOpacity>

                            {/* Vista previa: solo mostrar icono si es PDF */}
                            {value?.name && value?.name.endsWith(".pdf") && (
                                <Text style={{ marginTop: 10, textAlign: "center" }}>
                                    📄 Documento seleccionado
                                </Text>
                            )}

                            {errors.rut_document && (
                                <Text style={styles.error}>{errors.rut_document.message}</Text>
                            )}
                        </>
                    )}
                />
            </View>

            {/* NIT */}
            <View style={styles.containerSub}>
                <View style={styles.cardTitle}>
                    <User size={22} color="#6c63ff" />
                    <Text style={styles.label}>NIT</Text>
                </View>
                <Controller
                    control={control}
                    name="nit"
                    rules={{ required: "Ingresa un NIT" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Número de identificación tributaria"
                            value={value}
                            onChangeText={(text) => {
                                onChange(text);
                                updateData({ nit: text });
                            }}
                        />
                    )}
                />
                {errors.nit && <Text style={styles.error}>{errors.nit.message}</Text>}
            </View>
        </View>
    );
}

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
    suggestionsBox: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginTop: 4,
        maxHeight: 200,
    },
    suggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 6,
        color: "black",
        backgroundColor: "#fff",
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 6,
        color: "black",
        backgroundColor: "#fff",
    },
});
