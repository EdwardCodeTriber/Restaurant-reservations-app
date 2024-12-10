import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BottomNavigation = ({ navigation, currentScreen }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.navItem, currentScreen === 'Home' && styles.activeItem]}
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="home" size={24} color={currentScreen === 'Home' ? 'green' : 'gray'} />
        <Text style={[styles.label, currentScreen === 'Home' && styles.activeLabel]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, currentScreen === 'Map' && styles.activeItem]}
        onPress={() => navigation.navigate('Map')}
      >
        <Ionicons name="map" size={24} color={currentScreen === 'Map' ? 'green' : 'gray'} />
        <Text style={[styles.label, currentScreen === 'Map' && styles.activeLabel]}>Map</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, currentScreen === 'Favourites' && styles.activeItem]}
        onPress={() => navigation.navigate('Favourites')}
      >
        <Ionicons name="heart" size={24} color={currentScreen === 'Favourites' ? 'green' : 'gray'} />
        <Text style={[styles.label, currentScreen === 'Favourites' && styles.activeLabel]}>Favourites</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navItem, currentScreen === 'Profile' && styles.activeItem]}
        onPress={() => navigation.navigate('Profile')}
      >
        <Ionicons name="person" size={24} color={currentScreen === 'Profile' ? 'green' : 'gray'} />
        <Text style={[styles.label, currentScreen === 'Profile' && styles.activeLabel]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 12,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeItem: {
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
  activeLabel: {
    color: 'green',
  },
});

export default BottomNavigation;