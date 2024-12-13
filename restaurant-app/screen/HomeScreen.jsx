import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://192.168.1.48:3000/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.greeting}>Hi, Guest</Text>
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
            <View style={styles.card}>
              <Image 
                source={{ uri: `http://192.168.1.48:3000/${item.images[0]}` }} 
                style={styles.image} 
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text>⭐ {item.rating}</Text>
                <Text>🕒 {item.hours || 'Hours not specified'}</Text>
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