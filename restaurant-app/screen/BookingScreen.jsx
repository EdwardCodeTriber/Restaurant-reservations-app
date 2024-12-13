import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BookingTableScreen = () => {
  const [partySize, setPartySize] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [hour, setHour] = useState("11");
  const [minute, setMinute] = useState("00");
  const [meridian, setMeridian] = useState("AM");

  const renderCalendar = () => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1); 
    return (
      <View style={styles.calendarContainer}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.date,
              selectedDate === day && styles.selectedDate,
            ]}
            onPress={() => setSelectedDate(day)}
          >
            <Text style={styles.dateText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView contentContainerStyle={styles.container}>
        <ScrollView >
      <Text style={styles.title}>Booking Table</Text>

      <Text style={styles.label}>Party size</Text>
      <View style={styles.partySizeContainer}>
        {[1, 2, 4, 5].map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.partySizeButton,
              partySize === size && styles.selectedPartySize,
            ]}
            onPress={() => setPartySize(size)}
          >
            <Text style={styles.partySizeText}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Date</Text>
      <View style={styles.dateHeaderContainer}>
        <Text style={styles.dateHeader}>Jan</Text>
        <Text style={styles.dateHeader}>2024</Text>
      </View>
      {renderCalendar()}

      <Text style={styles.label}>Enter Time</Text>
      <View style={styles.timeContainer}>
        <TextInput
          style={styles.timeInput}
          value={hour}
          keyboardType="numeric"
          onChangeText={setHour}
          maxLength={2}
        />
        <Text style={styles.colon}>:</Text>
        <TextInput
          style={styles.timeInput}
          value={minute}
          keyboardType="numeric"
          onChangeText={setMinute}
          maxLength={2}
        />
        <TouchableOpacity
          style={styles.meridianButton}
          onPress={() => setMeridian(meridian === "AM" ? "PM" : "AM")}
        >
          <Text style={styles.meridianText}>{meridian}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.proceedButton}>
        <Text style={styles.proceedText}>Proceed next</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#8cff8c",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  partySizeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  partySizeButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    width: 50,
    alignItems: "center",
  },
  selectedPartySize: {
    backgroundColor: "#d9ffd9",
  },
  partySizeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  date: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  selectedDate: {
    backgroundColor: "#d9ffd9",
  },
  dateText: {
    fontSize: 14,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  timeInput: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 18,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  colon: {
    fontSize: 24,
  },
  meridianButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  meridianText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  proceedButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  proceedText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BookingTableScreen;
