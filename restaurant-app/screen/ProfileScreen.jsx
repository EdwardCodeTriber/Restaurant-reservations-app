// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import axios from "axios";

// export default function ProfileScreen({ navigation }) {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch user profile
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(`http://192.168.18.15:3000/me`, {
//           withCredentials: true,
//         });
//         setUser(response.data.user);
//       } catch (error) {
//         setUser(null);
//         if (error.response?.data?.message) {
//           Alert.alert("Authentication Error", error.response.data.message);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   // Handle Sign Out
//   const handleSignOut = () => {
//     axios
//       .post(`http://192.168.18.15:3000/signout`, {}, { withCredentials: true })
//       .then(() => {
//         setUser(null);
//         Alert.alert("Success", "Signed out successfully");
//         navigation.navigate("SignIn");
//       })
//       .catch((error) => {
//         const errorMsg = error.response?.data?.message || "Sign out failed";
//         Alert.alert("Sign Out Error", errorMsg);
//       });
//   };

//   // Navigate to Sign In
//   const handleSignIn = () => {
//     navigation.navigate("SignIn");
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         {/* If user is signed in */}
//         {user ? (
//           <>
//             <View style={styles.profileSection}>
//               <Image
//                 style={styles.profileImage}
//                 source={{
//                   uri: user.avatar || "https://via.placeholder.com/150",
//                 }}
//               />
//               <Text style={styles.profileName}>
//                 Hello, {user.firstName} {user.lastName}!
//               </Text>
//               <Text style={styles.profileEmail}>{user.email}</Text>
//             </View>

//             <View style={styles.actionSection}>
//               <TouchableOpacity style={styles.actionButton}>
//                 <Text style={styles.actionText}>Update Profile</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.actionButton}>
//                 <Text style={styles.actionText}>Change Password</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.logoutButton]}
//                 onPress={handleSignOut}
//               >
//                 <Text style={[styles.actionText, styles.logoutText]}>Log Out</Text>
//               </TouchableOpacity>
//             </View>
//           </>
//         ) : (
//           // If user is not signed in
//           <View style={styles.centered}>
//             <Text style={styles.guestText}>You are not signed in!</Text>
//             <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
//               <Text style={styles.signInText}>Sign In</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#e9f5e9",
//     padding: 20,
//   },
//   profileSection: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 15,
//   },
//   profileName: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   profileEmail: {
//     fontSize: 16,
//     color: "gray",
//   },
//   actionSection: {
//     marginTop: 20,
//   },
//   actionButton: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//     alignItems: "center",
//     elevation: 2, // Adds a subtle shadow for Android
//     shadowColor: "#000", // Adds shadow for iOS
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
//   actionText: {
//     fontSize: 16,
//     color: "#000",
//     fontWeight: "600",
//   },
//   logoutButton: {
//     backgroundColor: "#ffcccc",
//   },
//   logoutText: {
//     color: "#d9534f",
//   },
//   centered: {
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//   },
//   guestText: {
//     fontSize: 18,
//     marginBottom: 20,
//     color: "gray",
//   },
//   signInButton: {
//     backgroundColor: "#4caf50",
//     padding: 15,
//     borderRadius: 10,
//   },
//   signInText: {
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "600",
//   },
// });


// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Alert,
//   FlatList,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import axios from "axios";

// export default function ProfileScreen({ navigation }) {
//   const [user, setUser] = useState(null);
//   const [favorites, setFavorites] = useState([]);
//   const [reservations, setReservations] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch user profile
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(`http://192.168.18.15:3000/me`, {
//           withCredentials: true,
//         });
//         setUser(response.data.user);
//       } catch (error) {
//         setUser(null);
//         if (error.response?.data?.message) {
//           Alert.alert("Authentication Error", error.response.data.message);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   // Fetch favorites and reservations when user is available
//   useEffect(() => {
//     if (user) {
//       fetchFavorites();
//       fetchReservations();
//     }
//   }, [user]);

//   // Fetch user's favorites
//   const fetchFavorites = async () => {
//     try {
//       const response = await axios.get(
//         `http://192.168.18.15:3000/favorites/${user._id}`,
//         { withCredentials: true }
//       );
//       setFavorites(response.data.favorites);
//     } catch (error) {
//       console.error("Error fetching favorites:", error);
//       Alert.alert("Error", "Failed to fetch favorites.");
//     }
//   };

//   // Fetch user's reservations
//   const fetchReservations = async () => {
//     try {
//       const response = await axios.get(
//         `http://192.168.18.15:3000/reservations/${user._id}`,
//         { withCredentials: true }
//       );
//       setReservations(response.data.reservations);
//     } catch (error) {
//       console.error("Error fetching reservations:", error);
//       Alert.alert("Error", "Failed to fetch reservations.");
//     }
//   };

//   // Handle Sign Out
//   const handleSignOut = () => {
//     axios
//       .post(`http://192.168.18.15:3000/signout`, {}, { withCredentials: true })
//       .then(() => {
//         setUser(null);
//         setFavorites([]);
//         setReservations([]);
//         Alert.alert("Success", "Signed out successfully");
//         navigation.navigate("SignIn");
//       })
//       .catch((error) => {
//         const errorMsg = error.response?.data?.message || "Sign out failed";
//         Alert.alert("Sign Out Error", errorMsg);
//       });
//   };

//   // Navigate to Sign In
//   const handleSignIn = () => {
//     navigation.navigate("SignIn");
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         {/* If user is signed in */}
//         {user ? (
//           <>
//             <View style={styles.profileSection}>
//               <Image
//                 style={styles.profileImage}
//                 source={{
//                   uri: user.avatar || "https://via.placeholder.com/150",
//                 }}
//               />
//               <Text style={styles.profileName}>
                
//                 Hello, {user.firstName} {user.lastName}!
//               </Text>
//               <Text style={styles.profileEmail}>{user.email}</Text>
//             </View>

//             {/* Favorites Section */}
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Your Favorites</Text>
//               {favorites.length > 0 ? (
//                 <FlatList
//                   data={favorites}
//                   keyExtractor={(item) => item._id}
//                   renderItem={({ item }) => (
//                     <TouchableOpacity
//       onPress={() => {
//         setSelectedRestaurant(item);
//         setModalVisible(true);
//       }}
//     >
//       <View style={styles.card}>
//         <Image
//           source={{
//             uri: `http://192.168.18.15:3000/${item.image[0]}`,
//           }}
//           style={styles.image}
//         />
//         <View style={styles.cardContent}>
//           <Text style={styles.cardTitle}>{item.name}</Text>
//           <Text>⭐ {item.rating}</Text>
//           <Text>🕒 {item.hours || "Hours not specified"}</Text>
//           <Text>📍 {item.address}</Text>
//         </View>
//         <TouchableOpacity
//           onPress={() =>
//             isFavorite(item._id)
//               ? handleRemoveFromFavorites(item._id)
//               : handleAddToFavorites(item._id)
//           }
//         >
//           <Ionicons
//             name={isFavorite(item._id) ? "heart" : "heart-outline"}
//             size={24}
//             color={isFavorite(item._id) ? "red" : "gray"}
//           />
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//                   )}
//                 />
//               ) : (
//                 <Text style={styles.noDataText}>No favorites yet.</Text>
//               )}
//             </View>

//             {/* Reservations Section */}
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Your Reservations</Text>
//               {reservations.length > 0 ? (
//                 <FlatList
//                   data={reservations}
//                   keyExtractor={(item) => item._id}
//                   renderItem={({ item }) => (
//                     <View style={styles.reservationItem}>
//                       <Text style={styles.reservationName}>
//                         {item.restaurantName}
//                       </Text>
//                       <Text style={styles.reservationDate}>
//                         Date: {new Date(item.date).toLocaleDateString()}
//                       </Text>
//                       <Text style={styles.reservationTime}>
//                         Time: {item.time}
//                       </Text>
//                     </View>
//                   )}
//                 />
//               ) : (
//                 <Text style={styles.noDataText}>No reservations yet.</Text>
//               )}
//             </View>

//             <View style={styles.actionSection}>
//               <TouchableOpacity style={styles.actionButton}>
//                 <Text style={styles.actionText}>Update Profile</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.actionButton}>
//                 <Text style={styles.actionText}>Change Password</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.logoutButton]}
//                 onPress={handleSignOut}
//               >
//                 <Text style={[styles.actionText, styles.logoutText]}>Log Out</Text>
//               </TouchableOpacity>
//             </View>
//           </>
//         ) : (
//           // If user is not signed in
//           <View style={styles.centered}>
//             <Text style={styles.guestText}>You are not signed in!</Text>
//             <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
//               <Text style={styles.signInText}>Sign In</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#e9f5e9",
//     padding: 20,
//   },
//   profileSection: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 15,
//   },
//   profileName: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   profileEmail: {
//     fontSize: 16,
//     color: "gray",
//   },
//   section: {
//     marginBottom: 30,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#000",
//   },
//   favoriteItem: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   favoriteName: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   favoriteAddress: {
//     fontSize: 14,
//     color: "gray",
//   },
//   reservationItem: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   reservationName: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   reservationDate: {
//     fontSize: 14,
//     color: "gray",
//   },
//   reservationTime: {
//     fontSize: 14,
//     color: "gray",
//   },
//   noDataText: {
//     fontSize: 16,
//     color: "gray",
//     textAlign: "center",
//   },
//   actionSection: {
//     marginTop: 20,
//   },
//   actionButton: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//     alignItems: "center",
//     elevation: 2, // Adds a subtle shadow for Android
//     shadowColor: "#000", // Adds shadow for iOS
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
//   actionText: {
//     fontSize: 16,
//     color: "#000",
//     fontWeight: "600",
//   },
//   logoutButton: {
//     backgroundColor: "#ffcccc",
//   },
//   logoutText: {
//     color: "#d9534f",
//   },
//   centered: {
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//   },
//   guestText: {
//     fontSize: 18,
//     marginBottom: 20,
//     color: "gray",
//   },
//   signInButton: {
//     backgroundColor: "#4caf50",
//     padding: 15,
//     borderRadius: 10,
//   },
//   signInText: {
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "600",
//   },
// });

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Alert,
//   FlatList,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import axios from "axios";
// import { Ionicons } from "@expo/vector-icons"; // Import Ionicons

// export default function ProfileScreen({ navigation }) {
//   const [user, setUser] = useState(null);
//   const [favorites, setFavorites] = useState([]);
//   const [reservations, setReservations] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch user profile
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(`http://192.168.18.15:3000/me`, {
//           withCredentials: true,
//         });
//         setUser(response.data.user);
//       } catch (error) {
//         setUser(null);
//         if (error.response?.data?.message) {
//           Alert.alert("Authentication Error", error.response.data.message);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   // Fetch favorites and reservations when user is available
//   useEffect(() => {
//     if (user) {
//       fetchFavorites();
//       fetchReservations();
//     }
//   }, [user]);

//   // Fetch user's favorites
//   const fetchFavorites = async () => {
//     try {
//       const response = await axios.get(
//         `http://192.168.18.15:3000/favorites/${user._id}`,
//         { withCredentials: true }
//       );
//       setFavorites(response.data.favorites);
//     } catch (error) {
//       console.error("Error fetching favorites:", error);
//       Alert.alert("Error", "Failed to fetch favorites.");
//     }
//   };

//   // Fetch user's reservations
//   const fetchReservations = async () => {
//     try {
//       const response = await axios.get(
//         `http://192.168.18.15:3000/reservations/${user._id}`,
//         { withCredentials: true }
//       );
//       setReservations(response.data.reservations);
//     } catch (error) {
//       console.error("Error fetching reservations:", error);
//       Alert.alert("Error", "Failed to fetch reservations.");
//     }
//   };

//   // Handle Sign Out
//   const handleSignOut = () => {
//     axios
//       .post(`http://192.168.18.15:3000/signout`, {}, { withCredentials: true })
//       .then(() => {
//         setUser(null);
//         setFavorites([]);
//         setReservations([]);
//         Alert.alert("Success", "Signed out successfully");
//         navigation.navigate("SignIn");
//       })
//       .catch((error) => {
//         const errorMsg = error.response?.data?.message || "Sign out failed";
//         Alert.alert("Sign Out Error", errorMsg);
//       });
//   };

//   // Navigate to Sign In
//   const handleSignIn = () => {
//     navigation.navigate("SignIn");
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         {/* If user is signed in */}
//         {user ? (
//           <>
//             <View style={styles.profileSection}>
//               <Image
//                 style={styles.profileImage}
//                 source={{
//                   uri: user.avatar || "https://via.placeholder.com/150",
//                 }}
//               />
//               <Text style={styles.profileName}>
//                 Hello, {user.firstName} {user.lastName}!
//               </Text>
//               <Text style={styles.profileEmail}>{user.email}</Text>
//             </View>

//             {/* Favorites Section */}
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Your Favorites</Text>
//               {favorites.length > 0 ? (
//                 <FlatList
//                   data={favorites}
//                   keyExtractor={(item) => item.restaurantId._id}
//                   renderItem={({ item }) => (
//                     <TouchableOpacity
                      
//                     >
//                       <View style={styles.favoriteItem}>
//                         <Image
//                           source={{
//                             uri: `http://192.168.18.15:3000/${item.restaurantId.images[0]}`,
//                           }}
//                           style={styles.favoriteImage}
//                         />
//                         <View style={styles.favoriteContent}>
//                           <Text style={styles.favoriteName}>
//                             {item.restaurantId.name}
//                           </Text>
//                           <Text style={styles.favoriteAddress}>
//                             {item.restaurantId.address}
//                           </Text>
//                         </View>
//                         <TouchableOpacity
//                           onPress={() => {
//                             // Remove from favorites
//                             handleRemoveFromFavorites(item.restaurantId._id);
//                           }}
//                         >
//                           <Ionicons name="heart" size={24} color="red" />
//                         </TouchableOpacity>
//                       </View>
//                     </TouchableOpacity>
//                   )}
//                 />
//               ) : (
//                 <Text style={styles.noDataText}>No favorites yet.</Text>
//               )}
//             </View>

//             {/* Reservations Section */}
//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Your Reservations</Text>
//               {reservations.length > 0 ? (
//                 <FlatList
//                   data={reservations}
//                   keyExtractor={(item) => item._id}
//                   renderItem={({ item }) => (
//                     <View style={styles.reservationItem}>
//                       <Text style={styles.reservationName}>
//                         {item.restaurantName}
//                       </Text>
//                       <Text style={styles.reservationDate}>
//                         Date: {new Date(item.date).toLocaleDateString()}
//                       </Text>
//                       <Text style={styles.reservationTime}>
//                         Time: {item.time}
//                       </Text>
//                     </View>
//                   )}
//                 />
//               ) : (
//                 <Text style={styles.noDataText}>No reservations yet.</Text>
//               )}
//             </View>

//             <View style={styles.actionSection}>
//               <TouchableOpacity style={styles.actionButton}>
//                 <Text style={styles.actionText}>Update Profile</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.actionButton}>
//                 <Text style={styles.actionText}>Change Password</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.logoutButton]}
//                 onPress={handleSignOut}
//               >
//                 <Text style={[styles.actionText, styles.logoutText]}>
//                   Log Out
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </>
//         ) : (
//           // If user is not signed in
//           <View style={styles.centered}>
//             <Text style={styles.guestText}>You are not signed in!</Text>
//             <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
//               <Text style={styles.signInText}>Sign In</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#e9f5e9",
//     padding: 20,
//   },
//   profileSection: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 15,
//   },
//   profileName: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   profileEmail: {
//     fontSize: 16,
//     color: "gray",
//   },
//   section: {
//     marginBottom: 30,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#000",
//   },
//   favoriteItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   favoriteImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 10,
//     marginRight: 15,
//   },
//   favoriteContent: {
//     flex: 1,
//   },
//   favoriteName: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   favoriteAddress: {
//     fontSize: 14,
//     color: "gray",
//   },
//   reservationItem: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   reservationName: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   reservationDate: {
//     fontSize: 14,
//     color: "gray",
//   },
//   reservationTime: {
//     fontSize: 14,
//     color: "gray",
//   },
//   noDataText: {
//     fontSize: 16,
//     color: "gray",
//     textAlign: "center",
//   },
//   actionSection: {
//     marginTop: 20,
//   },
//   actionButton: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//     alignItems: "center",
//     elevation: 2, // Adds a subtle shadow for Android
//     shadowColor: "#000", // Adds shadow for iOS
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
//   actionText: {
//     fontSize: 16,
//     color: "#000",
//     fontWeight: "600",
//   },
//   logoutButton: {
//     backgroundColor: "#ffcccc",
//   },
//   logoutText: {
//     color: "#d9534f",
//   },
//   centered: {
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//   },
//   guestText: {
//     fontSize: 18,
//     marginBottom: 20,
//     color: "gray",
//   },
//   signInButton: {
//     backgroundColor: "#4caf50",
//     padding: 15,
//     borderRadius: 10,
//   },
//   signInText: {
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "600",
//   },
// });

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Alert,
//   FlatList,
//   ScrollView
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import axios from "axios";
// import { Ionicons } from "@expo/vector-icons";
// import * as Notifications from 'expo-notifications';

// export default function ProfileScreen({ navigation }) {
//   const [user, setUser] = useState(null);
//   const [favorites, setFavorites] = useState([]);
//   const [reservations, setReservations] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(`http://192.168.18.15:3000/me`, {
//           withCredentials: true,
//         });
//         setUser(response.data.user);
//       } catch (error) {
//         setUser(null);
//         if (error.response?.data?.message) {
//           Alert.alert("Authentication Error", error.response.data.message);
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchFavorites();
//       fetchReservations();
//     }
//   }, [user]);

//   const fetchFavorites = async () => {
//     try {
//       const response = await axios.get(
//         `http://192.168.18.15:3000/favorites/${user._id}`,
//         { withCredentials: true }
//       );
//       setFavorites(response.data.favorites);
//     } catch (error) {
//       console.error("Error fetching favorites:", error);
//       Alert.alert("Error", "Failed to fetch favorites.");
//     }
//   };

//   const fetchReservations = async () => {
//     try {
//       const response = await axios.get(
//         `http://192.168.18.15:3000/reservations/${user._id}`,
//         { withCredentials: true }
//       );
//       setReservations(response.data.reservations);
//     } catch (error) {
//       console.error("Error fetching reservations:", error);
//       Alert.alert("Error", "Failed to fetch reservations.");
//     }
//   };

//   const handleSignOut = () => {
//     axios
//       .post(`http://192.168.18.15:3000/signout`, {}, { withCredentials: true })
//       .then(() => {
//         setUser(null);
//         setFavorites([]);
//         setReservations([]);
//         Alert.alert("Success", "Signed out successfully");
//         navigation.navigate("SignIn");
//       })
//       .catch((error) => {
//         const errorMsg = error.response?.data?.message || "Sign out failed";
//         Alert.alert("Sign Out Error", errorMsg);
//       });
//   };

//   const handleSignIn = () => {
//     navigation.navigate("SignIn");
//   };

//   const handleRemoveFromFavorites = async (restaurantId) => {
//     try {
//       await axios.delete(
//         `http://192.168.18.15:3000/favorites/${user._id}/${restaurantId}`,
//         { withCredentials: true }
//       );
//       setFavorites((prevFavorites) =>
//         prevFavorites.filter((fav) => fav.restaurantId._id !== restaurantId)
//       );
//     } catch (error) {
//       console.error("Error removing from favorites:", error);
//       Alert.alert("Error", "Failed to remove from favorites.");
//     }
//   };

//   useEffect(() => {
//     const requestPermissions = async () => {
//       const { status } = await Notifications.requestPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission', 'You need to enable notifications');
//       }
//     };

//     requestPermissions();
//   }, []);

//   useEffect(() => {
//     const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
//       console.log('Notification received:', response);
//     });

//     return () => subscription.remove();
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.text}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView>
//         {user ? (
//           <>
//             <View style={styles.profileSection}>
//               <Image
//                 style={styles.profileImage}
//                 source={{
//                   uri: user.avatar || "https://via.placeholder.com/150",
//                 }}
//               />
//               <Text style={styles.profileName}>
//                 Hello, {user.firstName} {user.lastName}!
//               </Text>
//               <Text style={styles.profileEmail}>{user.email}</Text>
//             </View>

//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Your Favorites</Text>
//               {favorites.length > 0 ? (
//                 <FlatList
//                   data={favorites}
//                   keyExtractor={(item) => item.restaurantId._id}
//                   renderItem={({ item }) => (
//                     <TouchableOpacity>
//                       <View style={styles.favoriteItem}>
//                         <Image
//                           source={{
//                             uri: `http://192.168.18.15:3000/${item.restaurantId.images[0]}`,
//                           }}
//                           style={styles.favoriteImage}
//                         />
//                         <View style={styles.favoriteContent}>
//                           <Text style={styles.favoriteName}>
//                             {item.restaurantId.name}
//                           </Text>
//                           <Text style={styles.favoriteAddress}>
//                             {item.restaurantId.address}
//                           </Text>
//                         </View>
//                         <TouchableOpacity
//                           onPress={() => {
//                             handleRemoveFromFavorites(item.restaurantId._id);
//                           }}
//                         >
//                           <Ionicons name="heart" size={24} color="red" />
//                         </TouchableOpacity>
//                       </View>
//                     </TouchableOpacity>
//                   )}
//                 />
//               ) : (
//                 <Text style={styles.noDataText}>No favorites yet.</Text>
//               )}
//             </View>

//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Your Reservations</Text>
//               {reservations.length > 0 ? (
//                 <FlatList
//                   data={reservations}
//                   keyExtractor={(item) => item._id}
//                   renderItem={({ item }) => (
//                     <View style={styles.reservationItem}>
//                       <Text style={styles.reservationName}>
//                         {item.restaurantId.name}
//                       </Text>
//                       <Image
//                           source={{
//                             uri: `http://192.168.18.15:3000/${item.restaurantId.images[0]}`,
//                           }}
//                           style={styles.favoriteImage}
//                         />
//                       <Text style={styles.reservationDate}>
//                         Date: {new Date(item.date).toLocaleDateString()}
//                       </Text>
//                       <Text style={styles.reservationTime}>
//                         Party Size: {item.partySize}
//                       </Text>
//                       <Text style={styles.reservationTime}>
//                         Time: {item.time}
//                       </Text>
//                     </View>
//                   )}
//                 />
//               ) : (
//                 <Text style={styles.noDataText}>No reservations yet.</Text>
//               )}
//             </View>

//             <View style={styles.section}>
//               <Text style={styles.sectionTitle}>Settings</Text>
//               <TouchableOpacity style={styles.actionButton}>
//                 <Text style={styles.actionText}>Terms of Use</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.actionButton}>
//                 <Text style={styles.actionText}>Notifications</Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.actionSection}>
              
              
//               <TouchableOpacity
//                 style={[styles.actionButton, styles.logoutButton]}
//                 onPress={handleSignOut}
//               >
//                 <Text style={[styles.actionText, styles.logoutText]}>
//                   Log Out
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </>
//         ) : (
//           <View style={styles.centered}>
//             <Text style={styles.guestText}>You are not signed in!</Text>
//             <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
//               <Text style={styles.signInText}>Sign In</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#e9f5e9",
//     padding: 20,
//   },
//   profileSection: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 15,
//   },
//   profileName: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   profileEmail: {
//     fontSize: 16,
//     color: "gray",
//   },
//   section: {
//     marginBottom: 30,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#000",
//   },
//   favoriteItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   favoriteImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 10,
//     marginRight: 15,
//   },
//   favoriteContent: {
//     flex: 1,
//   },
//   favoriteName: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   favoriteAddress: {
//     fontSize: 14,
//     color: "gray",
//   },
//   reservationItem: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   reservationName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color:'green'
//   },
//   reservationDate: {
//     fontSize: 14,
//     color: "gray",
//   },
//   reservationTime: {
//     fontSize: 14,
//     color: "gray",
//   },
//   noDataText: {
//     fontSize: 16,
//     color: "gray",
//     textAlign: "center",
//   },
//   actionSection: {
//     marginTop: 20,
//   },
//   actionButton: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//     alignItems: "center",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
//   actionText: {
//     fontSize: 16,
//     color: "#000",
//     fontWeight: "600",
//   },
//   logoutButton: {
//     backgroundColor: "#ffcccc",
//   },
//   logoutText: {
//     color: "#d9534f",
//   },
//   centered: {
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//   },
//   guestText: {
//     fontSize: 18,
//     marginBottom: 20,
//     color: "gray",
//   },
//   signInButton: {
//     backgroundColor: "#4caf50",
//     padding: 15,
//     borderRadius: 10,
//   },
//   signInText: {
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "600",
//   },
// });

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
  Image
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

  useEffect(() => {
    if (user) {
      fetchFavorites();
      fetchReservations();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        `http://192.168.18.15:3000/favorites/${user._id}`,
        { withCredentials: true }
      );
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      Alert.alert("Error", "Failed to fetch favorites.");
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        `http://192.168.18.15:3000/reservations/${user._id}`,
        { withCredentials: true }
      );
      setReservations(response.data.reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      Alert.alert("Error", "Failed to fetch reservations.");
    }
  };

  const handleSignOut = () => {
    axios
      .post(`http://192.168.18.15:3000/signout`, {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        setFavorites([]);
        setReservations([]);
        Alert.alert("Success", "Signed out successfully");
        navigation.navigate("SignIn");
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message || "Sign out failed";
        Alert.alert("Sign Out Error", errorMsg);
      });
  };

  const handleSignIn = () => {
    navigation.navigate("SignIn");
  };

  const handleRemoveFromFavorites = async (restaurantId) => {
    try {
      await axios.delete(
        `http://192.168.18.15:3000/favorites/${user._id}/${restaurantId}`,
        { withCredentials: true }
      );
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.restaurantId._id !== restaurantId)
      );
    } catch (error) {
      console.error("Error removing from favorites:", error);
      Alert.alert("Error", "Failed to remove from favorites.");
    }
  };

  const handleCancelReservation = async (reservationId) => {
    // Create a custom alert with two options
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
              const response = await axios.delete(
                `http://192.168.18.15:3000/reservations/${user._id}/${reservationId}`,
                { withCredentials: true }
              );
  
              setReservations((prevReservations) =>
                prevReservations.filter((res) => res._id !== reservationId)
              );
              
              // Show a confirmation alert after successful cancellation
              Alert.alert(
                "Reservation Canceled", 
                "Your reservation has been canceled. Please note that the reservation fee is non-refundable.",
                [{ text: "OK" }]
              );
            } catch (error) {
              console.error("Error canceling reservation:", error);
              
              const errorMsg = error.response?.data?.error || 
                               "Failed to cancel reservation. Please try again.";
              
              Alert.alert(
                "Cancellation Error", 
                errorMsg, 
                [{ text: "OK", style: "cancel" }]
              );
            }
          }
        }
      ]
    );
  };
 


  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission', 'You need to enable notifications');
      }
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification received:', response);
    });

    return () => subscription.remove();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {user ? (
          <>
            <View style={styles.profileSection}>
              {/* Display user initials instead of profile image */}
              <View style={styles.profileInitialsContainer}>
                <Text style={styles.profileInitials}>
                  {`${user.firstName[0]}${user.lastName[0]}`}
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
                  keyExtractor={(item) => item.restaurantId._id}
                  renderItem={({ item }) => (
                    <TouchableOpacity>
                      <View style={styles.favoriteItem}>
                        <View style={styles.favoriteContent}>
                          
                          <Image
                          source={{
                            uri: `http://192.168.18.15:3000/${item.restaurantId.images[0]}`,
                          }}
                          style={styles.favoriteImage}
                        />
                        <Text style={styles.favoriteName}>
                            {item.restaurantId.name}
                          </Text>
                          <Text style={styles.favoriteAddress}>
                            {item.restaurantId.address}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            handleRemoveFromFavorites(item.restaurantId._id);
                          }}
                        >
                          <Ionicons name="heart" size={24} color="red" />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  )}
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
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <View style={styles.reservationItem}>
                      <Text style={styles.reservationName}>
                        {item.restaurantId.name}
                      </Text>
                      <Text style={styles.reservationDate}>
                        Date: {new Date(item.date).toLocaleDateString()}
                      </Text>
                      <Text style={styles.reservationTime}>
                        Party Size: {item.partySize}
                      </Text>
                      <Text style={styles.reservationTime}>
                        Time: {item.time}
                      </Text>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => handleCancelReservation(item._id)}
                      >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
              ) : (
                <Text style={styles.noDataText}>No reservations yet.</Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Settings</Text>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Terms of Use</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Notifications</Text>
              </TouchableOpacity>
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
          </>
        ) : (
          <View style={styles.centered}>
            <Text style={styles.guestText}>You are not signed in!</Text>
            <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
  profileInitialsContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
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
  },
  favoriteContent: {
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
  },
  reservationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4caf50",
  },
  reservationDate: {
    fontSize: 14,
    color: "gray",
  },
  reservationTime: {
    fontSize: 14,
    color: "gray",
  },
  noDataText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
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