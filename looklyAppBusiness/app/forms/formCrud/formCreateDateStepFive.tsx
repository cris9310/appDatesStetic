import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { Calendar } from 'react-native-big-calendar'
import dayjs from "dayjs";
import { useState, useEffect } from "react";


const FormSelectDate = ({ selectedDate, onDateSelect }) => {
    const [currentDate, setCurrentDate] = useState(
        selectedDate || new Date()
    );
    useEffect(() => {
        if (selectedDate) {
            setCurrentDate(selectedDate);
        }
    }, [selectedDate]);
    return (
        <View style={{ height: 500 }}>
            <Text style={styles.sectionTitle}>Selecciona el día de preferencia</Text>
            <Text style={styles.monthTitle}>
                {dayjs(currentDate).format("MMMM YYYY")}
            </Text>
            <Calendar
                mode="month"
                height={500}
                events={[]}
                onPressCell={(date) => {
                    if (dayjs(date).isBefore(dayjs(), "day")) return;

                    const selected = dayjs(date).startOf("day").toDate();
                    onDateSelect(selected);
                    setCurrentDate(selected);
                }}
                dayStyleGetter={(date) => {
                    const isSelected =
                        dayjs(date).format("YYYY-MM-DD") ===
                        dayjs(currentDate).format("YYYY-MM-DD");

                    const isPast = dayjs(date).isBefore(dayjs(), "day");

                    if (isSelected) {
                        return {
                            backgroundColor: "#6c63ff",
                            borderRadius: 8,
                        };
                    }

                    if (isPast) {
                        return {
                            backgroundColor: "#f1f1f1",
                            opacity: 0.4,
                        };
                    }

                    return {};
                }}
                theme={{
                    palette: {
                        primary: {
                            main: "#6c63ff",
                            contrastText: "#f4f4f4",
                        },
                    },
                }}
            />
        </View>
    );
};
export default FormSelectDate;

const styles = StyleSheet.create({

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: "center",
    },
    monthTitle: {
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 12,
        color: "#111",
    },

});