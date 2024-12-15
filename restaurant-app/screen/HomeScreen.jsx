import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [partySize, setPartySize] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://192.168.0.104:3000/me`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch restaurants
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get("http://192.168.0.104:3000/restaurants");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReservation = async () => {
    if (!user) {
      Alert.alert("Authentication Required", "Please log in to make a reservation.");
      return;
    }

    const reservationData = {
      userId: user._id,
      restaurantId: selectedRestaurant._id,
      partySize,
      date,
      time,
    };

    try {
      await axios.post("http://192.168.0.104:3000/reservations", reservationData, {
        withCredentials: true,
      });
      Alert.alert("Success", "Reservation made successfully!");
      setModalVisible(false);
    } catch (error) {
      console.error("Error making reservation:", error);
      Alert.alert("Error", "Failed to make reservation.");
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.greeting}>
          Hi, {user ? `${user.firstName} ${user.lastName}` : "Guest"}
        </Text>
        <Text style={styles.date}>Thursday, Jan 22 - today</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search your location here"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <Text style={styles.heading}>Restaurants nearby</Text>

        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedRestaurant(item);
                setModalVisible(true);
              }}
            >
              <View style={styles.card}>
                <Image
                  source={{ uri: `http://192.168.0.104:3000/${item.images[0]}` }}
                  style={styles.image}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text>⭐ {item.rating}</Text>
                  <Text>🕒 {item.hours || "Hours not specified"}</Text>
                  <Text>📍 {item.address}</Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="heart-outline" size={24} color="gray" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Modal for Restaurant Details */}
      {selectedRestaurant && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{selectedRestaurant.name}</Text>
            <Image
              source={{ uri: `http://192.168.0.104:3000/${selectedRestaurant.images[0]}` }}
              style={styles.modalImage}
            />
            <Text>📍 {selectedRestaurant.address}</Text>
            <Text>⭐ {selectedRestaurant.rating}</Text>

            {/* Reservation Form */}
            <TextInput
              style={styles.input}
              placeholder="Party Size"
              keyboardType="numeric"
              value={partySize}
              onChangeText={setPartySize}
            />
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              value={date}
              onChangeText={setDate}
            />
            <TextInput
              style={styles.input}
              placeholder="Time (HH:MM)"
              value={time}
              onChangeText={setTime}
            />

            <Button
              title="Make Reservation"
              onPress={handleReservation}
              disabled={!user}
            />
            <Button
              title="Close"
              color="red"
              onPress={() => setModalVisible(false)}
            />
          </SafeAreaView>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e9f5e9", padding: 20 },
  greeting: { fontSize: 24, fontWeight: "bold", color: "#000" },
  date: { fontSize: 14, color: "gray", marginVertical: 5 },
  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  heading: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  loadingText: { fontSize: 18, color: "gray", textAlign: "center", marginTop: 20 },
  modalContainer: { flex: 1, padding: 20, backgroundColor: "#fff" },
  modalTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  modalImage: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});
