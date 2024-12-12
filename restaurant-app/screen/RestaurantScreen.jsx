import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function RestaurantScreen() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:3000/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const renderRestaurant = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: item.images[0] || 'https://via.placeholder.com/150' }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.rating}>Rating: {item.rating}</Text>
        <Text style={styles.address}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurants Nearby</Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item._id} // Assuming MongoDB ObjectId as key
        renderItem={renderRestaurant}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f5e9',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
  },
  details: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 14,
    color: 'gray',
  },
  address: {
    fontSize: 14,
    color: 'gray',
  },
});
