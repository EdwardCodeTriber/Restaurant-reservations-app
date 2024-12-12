import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";


const restaurants = [
  {
    id: "1",
    name: "High Rise",
    rating: 5.0,
    hours: "09:00AM-8:00PM",
    address: "JHB main str",
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Rosebank",
    rating: 3.0,
    hours: "09:00AM-8:00PM",
    address: "JHB bram str",
    image: "https://via.placeholder.com/150",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
      <Text style={styles.greeting}>Hi, Guest</Text>
      <Text style={styles.date}>Thursday, Jan 22 - today</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search your location here"
      />

      <Text style={styles.heading}>Restaurants nearby</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text>⭐ {item.rating}</Text>
              <Text>🕒 {item.hours}</Text>
              <Text>📍 {item.address}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
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
});
