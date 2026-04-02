import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const router = useRouter();

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1200,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 4,
                    tension: 80,
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(800),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            router.replace("/login");
        });
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require("../assets/images/Logo_negro.png")}
                style={[
                    styles.logo,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 200,
        height: 200,
    },
});
