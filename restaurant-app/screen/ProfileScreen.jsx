

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
  Modal,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from 'expo-notifications';

// const API_BASE_URL = "http://192.168.18.15:3000";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    withCredentials: true,
  });

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/me');
      if (response.data?.user) {
        setUser(response.data.user);
        setNotificationsEnabled(response.data.user.notificationsEnabled || false); // Set initial notification state
        return response.data.user;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(null);
      if (error.response?.data?.message) {
        Alert.alert("Authentication Error", error.response.data.message);
      }
      return null;
    }
  };

  const fetchFavorites = async (userId) => {
    if (!userId) return;
    try {
      const response = await api.get(`/favorites/${userId}`);
      setFavorites(response.data.favorites || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setFavorites([]);
    }
  };

  const fetchReservations = async (userId) => {
    if (!userId) return;
    try {
      const response = await api.get(`/reservations/${userId}`);
      setReservations(response.data.reservations || []);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      setReservations([]);
    }
  };

  const loadUserData = async () => {
    try {
      const userData = await fetchUserProfile();
      if (userData?._id) {
        await Promise.all([
          fetchFavorites(userData._id),
          fetchReservations(userData._id)
        ]);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadUserData();
  }, []);

  const handleSignOut = async () => {
    try {
      await api.post('/signout');
      setUser(null);
      setFavorites([]);
      setReservations([]);
      Alert.alert("Success", "Signed out successfully");
      navigation.navigate("SignIn");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Sign out failed";
      Alert.alert("Sign Out Error", errorMsg);
    }
  };

  const handleRemoveFromFavorites = async (restaurantId) => {
    if (!user?._id) return;
    try {
      await api.delete(`/favorites/${user._id}/${restaurantId}`);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.restaurantId._id !== restaurantId)
      );
    } catch (error) {
      console.error("Error removing from favorites:", error);
      Alert.alert("Error", "Failed to remove from favorites.");
    }
  };

  const handleCancelReservation = async (reservationId) => {
    if (!user?._id) return;
    Alert.alert(
      "Cancel Reservation",
      "Please note: Your reservation fee is non-refundable. Are you sure you want to cancel this reservation?",
      [
        {
          text: "No, Keep Reservation",
          style: "cancel"
        },
        {
          text: "Yes, Cancel Reservation",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/reservations/${user._id}/${reservationId}`);
              setReservations((prevReservations) =>
                prevReservations.filter((res) => res._id !== reservationId)
              );
              Alert.alert(
                "Reservation Canceled",
                "Your reservation has been canceled. Please note that the reservation fee is non-refundable."
              );
            } catch (error) {
              console.error("Error canceling reservation:", error);
              const errorMsg = error.response?.data?.error || 
                "Failed to cancel reservation. Please try again.";
              Alert.alert("Cancellation Error", errorMsg);
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission', 'You need to enable notifications');
        }
      } catch (error) {
        console.error("Error setting up notifications:", error);
      }
    };

    setupNotifications();
  }, []);

  // Handle toggle change
  const handleToggleNotifications = async (value) => {
    setNotificationsEnabled(value);

    if (value) {
      // If notifications are enabled, send a request to the backend to enable email notifications
      try {
        await api.post(`${process.env.EXPO_PUBLIC_API_URL}/enable-notifications`, { userId: user._id });
        Alert.alert("Success", "Notifications enabled. You will receive emails for favorites and reservations.");
      } catch (error) {
        console.error("Error enabling notifications:", error);
        Alert.alert("Error", "Failed to enable notifications.");
      }
    } else {
      // If notifications are disabled, send a request to the backend to disable email notifications
      try {
        await api.post(`${process.env.EXPO_PUBLIC_API_URL}/disable-notifications`, { userId: user._id });
        Alert.alert("Success", "Notifications disabled.");
      } catch (error) {
        console.error("Error disabling notifications:", error);
        Alert.alert("Error", "Failed to disable notifications.");
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
      </View>
    );
  }

  const renderFavoriteItem = ({ item }) => {
    if (!item?.restaurantId) return null;
    
    return (
      <TouchableOpacity>
        <View style={styles.favoriteItem}>
          <View style={styles.favoriteContent}>
            <Image
              source={{ 
                uri: item.restaurantId.images?.[0] 
                  ? `${process.env.EXPO_PUBLIC_API_URL}/${item.restaurantId.images[0]}`
                  : `${process.env.EXPO_PUBLIC_API_URL}/default-restaurant.jpg`
              }}
              style={styles.favoriteImage}
            />
            <View style={styles.favoriteTextContent}>
              <Text style={styles.favoriteName}>{item.restaurantId.name}</Text>
              <Text style={styles.favoriteAddress}>{item.restaurantId.address}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleRemoveFromFavorites(item.restaurantId._id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="heart" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderReservationItem = ({ item }) => {
    if (!item?.restaurantId) return null;

    return (
      <View style={styles.reservationItem}>
        <Text style={styles.reservationName}>{item.restaurantId.name}</Text>
        <Text style={styles.reservationDate}>
          Date: {new Date(item.date).toLocaleDateString()}
        </Text>
        <Text style={styles.reservationTime}>Party Size: {item.partySize}</Text>
        <Text style={styles.reservationTime}>Time: {item.time}</Text>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancelReservation(item._id)}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderContent = () => {
    if (!user) {
      return (
        <View style={styles.centered}>
          <Text style={styles.guestText}>You are not signed in!</Text>
          <TouchableOpacity 
            style={styles.signInButton} 
            onPress={() => navigation.navigate("Auth")}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <>
        <View style={styles.profileSection}>
          <View style={styles.profileInitialsContainer}>
            <Text style={styles.profileInitials}>
              {`${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`}
            </Text>
          </View>
          <Text style={styles.profileName}>
            Hello, {user.firstName} {user.lastName}!
          </Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Favorites</Text>
          {favorites.length > 0 ? (
            <FlatList
              data={favorites}
              keyExtractor={(item) => item?.restaurantId?._id || Math.random().toString()}
              renderItem={renderFavoriteItem}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.noDataText}>No favorites yet.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Reservations</Text>
          {reservations.length > 0 ? (
            <FlatList
              data={reservations}
              keyExtractor={(item) => item?._id || Math.random().toString()}
              renderItem={renderReservationItem}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.noDataText}>No reservations yet.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.actionText}>Terms of Use</Text>
          </TouchableOpacity>
          <View style={styles.notificationToggle}>
            <Text style={styles.notificationText}>Enable Notifications</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleToggleNotifications}
              value={notificationsEnabled}
            />
          </View>
        </View>

        <View style={styles.actionSection}>
          <TouchableOpacity
            style={[styles.actionButton, styles.logoutButton]}
            onPress={handleSignOut}
          >
            <Text style={[styles.actionText, styles.logoutText]}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>

        {/* Terms of Use Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Terms of Use</Text>
              <ScrollView style={styles.modalScroll}>
                <Text style={styles.modalText}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Nulla vel urna euismod, tincidunt nisl vel, consectetur 
                  elit. Sed euismod, nisl vel tincidunt consectetur, 
                  nisl nisl tincidunt nisl, vel tincidunt nisl nisl vel 
                  nisl. Nulla vel urna euismod, tincidunt nisl vel, 
                  consectetur elit. Sed euismod, nisl vel tincidunt 
                  consectetur, nisl nisl tincidunt nisl, vel tincidunt 
                  nisl nisl vel nisl.
                </Text>
              </ScrollView>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f5e9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#e9f5e9",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  profileInitialsContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileInitials: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  profileEmail: {
    fontSize: 16,
    color: "gray",
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  favoriteItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  favoriteContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteTextContent: {
    flex: 1,
  },
  favoriteImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  favoriteName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  favoriteAddress: {
    fontSize: 14,
    color: "gray",
  },
  reservationItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  reservationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: 5,
  },
  reservationDate: {
    fontSize: 14,
    color: "gray",
    marginBottom: 3,
  },
  reservationTime: {
    fontSize: 14,
    color: "gray",
    marginBottom: 3,
  },
  noDataText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  actionSection: {
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  actionText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#ffcccc",
  },
  logoutText: {
    color: "#d9534f",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 50,
  },
  guestText: {
    fontSize: 18,
    marginBottom: 20,
    color: "gray",
  },
  signInButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  signInText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
  modalScroll: {
    maxHeight: 200,
  },
  notificationToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  notificationText: {
    fontSize: 16,
    color: "#000",
  },
  modalButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});