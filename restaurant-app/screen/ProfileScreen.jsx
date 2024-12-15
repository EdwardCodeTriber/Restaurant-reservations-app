import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://192.168.18.15:3000/me`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
        if (error.response?.data?.message) {
          Alert.alert("Authentication Error", error.response.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle Sign Out
  const handleSignOut = () => {
    axios
      .post(`http://192.168.18.15:3000/signout`, {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        Alert.alert("Success", "Signed out successfully");
        navigation.navigate("SignIn");
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message || "Sign out failed";
        Alert.alert("Sign Out Error", errorMsg);
      });
  };

  // Navigate to Sign In
  const handleSignIn = () => {
    navigation.navigate("SignIn");
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* If user is signed in */}
        {user ? (
          <>
            <View style={styles.profileSection}>
              <Image
                style={styles.profileImage}
                source={{
                  uri: user.avatar || "https://via.placeholder.com/150",
                }}
              />
              <Text style={styles.profileName}>
                Hello, {user.firstName} {user.lastName}!
              </Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
            </View>

            <View style={styles.actionSection}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Update Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.logoutButton]}
                onPress={handleSignOut}
              >
                <Text style={[styles.actionText, styles.logoutText]}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          // If user is not signed in
          <View style={styles.centered}>
            <Text style={styles.guestText}>You are not signed in!</Text>
            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f5e9",
    padding: 20,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
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
  actionSection: {
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2, // Adds a subtle shadow for Android
    shadowColor: "#000", // Adds shadow for iOS
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
  },
  signInText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});
