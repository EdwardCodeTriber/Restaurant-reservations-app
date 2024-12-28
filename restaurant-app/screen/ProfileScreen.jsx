import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
  Modal,
  Switch,
  StyleSheet
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from 'expo-notifications';

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

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/me');
      if (response.data?.user) {
        setUser(response.data.user);
        setNotificationsEnabled(response.data.user.notificationsEnabled || false);
        return response.data.user;
      }
      return null;
    } catch (error) {
      // console.error("Error fetching user profile:", error);
      setUser(null);
      if (error.response?.data?.message) {
        Alert.alert("Authentication Error", error.response.data.message);
      }
      return null;
    }
  };

  // Fetch user favorites
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

  // Fetch user reservations
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

  // Load user data
  const loadUserData = useCallback(async () => {
    try {
      const userData = await fetchUserProfile();
      if (userData?._id) {
        await Promise.all([
          fetchFavorites(userData._id),
          fetchReservations(userData._id)
        ]);
  
        if (notificationsEnabled) {
          await scheduleReservationNotifications(reservations);
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [notificationsEnabled]);

  useEffect(() => {
    loadUserData();
  }, []);

  // Refresh data
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadUserData();
  }, []);

  // Sign out
  const handleSignOut = async () => {
    try {
      await api.post('/signout');
      setUser(null);
      setFavorites([]);
      setReservations([]);
      Alert.alert("Success", "Signed out successfully");
      navigation.navigate("Auth");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Sign out failed";
      Alert.alert("Sign Out Error", errorMsg);
    }
  };

  // Remove from favorites
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

  // Cancel reservation
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

  const configureNotifications = async () => {
    try {
      // Set notification handler
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
  
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.error('Failed to get notification permission');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error configuring notifications:', error);
      return false;
    }
  };

  // Schedule notifications for reservations
  
  const scheduleReservationNotifications = async (reservations) => {
    try {
      // First ensures notifications are configured
      const notificationsConfigured = await configureNotifications();
      if (!notificationsConfigured) {
        console.error('Notifications not properly configured');
        return;
      }
  
      // Cancel existing notifications
      await Notifications.cancelAllScheduledNotificationsAsync();
      
      // Schedule an immediate test notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'ThaZulu',
          body: 'This is a reservation reminder',
          sound: 'default',
        },
        trigger: null, 
      });
      
      for (const reservation of reservations) {
        const reservationDate = new Date(reservation.date);
        const now = new Date();
        
        console.log('Processing reservation:', {
          restaurantName: reservation.restaurantId.name,
          date: reservationDate,
          time: reservation.time,
          currentTime: now
        });
        
        if (reservationDate > now) {
          const [hours, minutes] = reservation.time.split(':').map(num => parseInt(num, 10));
          
          // Create notification time (1 hour before reservation)
          const notificationTime = new Date(reservationDate);
          notificationTime.setHours(hours - 1);
          notificationTime.setMinutes(minutes);
          notificationTime.setSeconds(0);
          
          console.log('Attempting to schedule notification for:', {
            restaurant: reservation.restaurantId.name,
            notificationTime: notificationTime.toISOString(),
            timeUntilNotification: (notificationTime - now) / 1000 / 60, // minutes
            currentTime: now.toISOString()
          });
  
          if (notificationTime > now) {
            const identifier = await Notifications.scheduleNotificationAsync({
              content: {
                title: `Upcoming: ${reservation.restaurantId.name}`,
                body: `Your reservation is in 1 hour (${reservation.time})`,
                sound: 'default',
                data: { reservationId: reservation._id },
              },
              trigger: {
                date: notificationTime,
              },
            });
            
            console.log('Scheduled notification:', identifier);
          } else {
            console.log('Notification time is in the past:', notificationTime);
          }
        }
      }
      
      // Verify scheduled notifications
      const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
      console.log('Verified scheduled notifications:', scheduledNotifications);
      
    } catch (error) {
      console.error('Error in scheduleReservationNotifications:', error);
    }
  };
  // Cancel all scheduled notifications
  const cancelAllNotifications = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  // Handle toggle change
  const handleToggleNotifications = async (value) => {
    try {
      // Make API call first
      await api.post(value ? '/enable-notifications' : '/disable-notifications', { userId: user._id });
      
      if (value) {
        // Schedule notifications before updating state
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Notifications Enabled",
            body: "You will now receive reminders for your reservations.",
          },
          trigger: null,
        });
        
        // Schedule for existing reservations
        await scheduleReservationNotifications(reservations);
      } else {
        await cancelAllNotifications();
      }
      
      // Update state after everything is successful
      setNotificationsEnabled(value);
      Alert.alert("Success", `Notifications ${value ? "enabled" : "disabled"}.`);
    } catch (error) {
      console.error(`Error ${value ? "enabling" : "disabling"} notifications:`, error);
      Alert.alert("Error", `Failed to ${value ? "enable" : "disable"} notifications.`);
    }
  };
  // Ensure notification permissions
  useEffect(() => {
    const setupNotifications = async () => {
      const notificationsConfigured = await configureNotifications();
      if (notificationsConfigured) {
        // Set up notification received handler
        const receivedSubscription = Notifications.addNotificationReceivedListener(notification => {
          console.log('Notification received:', notification);
        });
  
        // Set up notification response handler
        const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
          console.log('Notification response:', response);
        });
  
        return () => {
          receivedSubscription.remove();
          responseSubscription.remove();
        };
      }
    };
  
    setupNotifications();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });
  
    return () => subscription.remove();
  }, []);
  

  // Render favorite item
  const renderFavoriteItem = ({ item }) => {
    if (!item?.restaurantId) return null;

    return (
      <TouchableOpacity>
        <View style={styles.favoriteItem}>
          <View style={styles.favoriteContent}>
            <Image
              source={{ 
                uri: item.restaurantId.photos?.[0] 
                  
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

  // Render reservation item
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
        <Text style={styles.reservationTime}>Email: {item.emailAddress}</Text>
        <Text style={styles.reservationTime}>Status: {item.paymentStatus}</Text>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancelReservation(item._id)}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Render content
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
                Terms of Use for ThaZulu reservation app

1. Acceptance of Terms
By accessing and using the ThaZulu app, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the app.

2. User Accounts
- You must provide accurate and complete information when creating an account
- You are responsible for maintaining the confidentiality of your account credentials
- You must be at least 18 years old to create an account
- You agree to notify us immediately of any unauthorized use of your account

3. Reservation Policies
- Reservations are subject to restaurant availability
- A valid credit card may be required to secure certain reservations
- You agree to honor your reservations or cancel them at least 24 hours in advance
- Repeated no-shows may result in account suspension
- Restaurants reserve the right to enforce their own cancellation policies

4. User Conduct
- You agree to provide honest and accurate reviews
- You will not engage in fraudulent booking practices
- You will treat restaurant staff and other users with respect
- You will not use the app for any unlawful purpose
- You will not attempt to manipulate ratings or reviews

5. Privacy and Data Usage
- We collect and use your data as described in our Privacy Policy
- Your personal information will be protected according to applicable laws
- We use cookies and similar technologies to improve user experience
- You control what information is shared with restaurants

6. Restaurant Information
- While we strive for accuracy, menu items and prices may vary
- Restaurant hours and availability are subject to change
- Photos and descriptions are for reference only
- We are not responsible for restaurant service quality

7. Modifications and Cancellations
- You may modify or cancel reservations according to restaurant policies
- Restaurants may need to cancel reservations in extraordinary circumstances
- We will notify you of any changes to your reservation

8. Liability Limitations
- We are not responsible for restaurant service or food quality
- We do not guarantee restaurant availability
- Our liability is limited to the amount paid for the booking service

9. Account Termination
- We reserve the right to suspend or terminate accounts for violations
- You may delete your account at any time
- We may retain certain data as required by law

10. Changes to Terms
- We may update these terms at any time
- Continued use of the app constitutes acceptance of new terms
- Users will be notified of significant changes

Last updated: December 20, 2024

By using ThaZulu, you acknowledge that you have read, understood, and agree to these Terms of Use.
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