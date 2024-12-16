// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Modal,
//   Button,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function HomeScreen({ navigation }) {
//   const [user, setUser] = useState(null);
//   const [restaurants, setRestaurants] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedRestaurant, setSelectedRestaurant] = useState(null);
//   const [partySize, setPartySize] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");

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
//         console.error("Error fetching user profile:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   // Fetch restaurants
//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const response = await axios.get("http://192.168.18.15:3000/restaurants");
//         setRestaurants(response.data);
//       } catch (error) {
//         console.error("Error fetching restaurants:", error);
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   const filteredRestaurants = restaurants.filter((restaurant) =>
//     restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleReservation = async () => {
//     if (!user) {
//       Alert.alert("Authentication Required", "Please log in to make a reservation.");
//       return;
//     }

//     const reservationData = {
//       userId: user._id,
//       restaurantId: selectedRestaurant._id,
//       partySize,
//       date,
//       time,
//     };

//     try {
//       await axios.post("http://192.168.18.15:3000/reservations", reservationData, {
//         withCredentials: true,
//       });
//       Alert.alert("Success", "Reservation made successfully!");
//       setModalVisible(false);
//     } catch (error) {
//       console.error("Error making reservation:", error);
//       Alert.alert("Error", "Failed to make reservation.");
//     }
//   };

//   if (isLoading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <Text style={styles.greeting}>
//           Hi, {user ? `${user.firstName} ${user.lastName}` : "Guest"}
//         </Text>
//         <Text style={styles.date}>Thursday, Jan 22 - today</Text>

//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search your location here"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />

//         <Text style={styles.heading}>Restaurants nearby</Text>

//         <FlatList
//           data={filteredRestaurants}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() => {
//                 setSelectedRestaurant(item);
//                 setModalVisible(true);
//               }}
//             >
//               <View style={styles.card}>
//                 <Image
//                   source={{ uri: `http://192.168.18.15:3000/${item.images[0]}` }}
//                   style={styles.image}
//                 />
//                 <View style={styles.cardContent}>
//                   <Text style={styles.cardTitle}>{item.name}</Text>
//                   <Text>⭐ {item.rating}</Text>
//                   <Text>🕒 {item.hours || "Hours not specified"}</Text>
//                   <Text>📍 {item.address}</Text>
//                 </View>
//                 <TouchableOpacity>
//                   <Ionicons name="heart-outline" size={24} color="gray" />
//                 </TouchableOpacity>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       </View>

//       {/* Modal for Restaurant Details */}
//       {selectedRestaurant && (
//         <Modal
//           visible={modalVisible}
//           animationType="slide"
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <SafeAreaView style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>{selectedRestaurant.name}</Text>
//             <Image
//               source={{ uri: `http://192.168.18.15:3000/${selectedRestaurant.images[0]}` }}
//               style={styles.modalImage}
//             />
//             <Text>📍 {selectedRestaurant.address}</Text>
//             <Text>⭐ {selectedRestaurant.rating}</Text>

//             {/* Reservation Form */}
//             <TextInput
//               style={styles.input}
//               placeholder="Party Size"
//               keyboardType="numeric"
//               value={partySize}
//               onChangeText={setPartySize}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Date (YYYY-MM-DD)"
//               value={date}
//               onChangeText={setDate}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Time (HH:MM)"
//               value={time}
//               onChangeText={setTime}
//             />

//             <Button
//               title="Make Reservation"
//               onPress={handleReservation}
//               disabled={!user}
//             />
//             <Button
//               title="Close"
//               color="red"
//               onPress={() => setModalVisible(false)}
//             />
//           </SafeAreaView>
//         </Modal>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#e9f5e9", padding: 20 },
//   greeting: { fontSize: 24, fontWeight: "bold", color: "#000" },
//   date: { fontSize: 14, color: "gray", marginVertical: 5 },
//   searchInput: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   heading: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
//   cardContent: { flex: 1 },
//   cardTitle: { fontSize: 16, fontWeight: "bold" },
//   loadingText: { fontSize: 18, color: "gray", textAlign: "center", marginTop: 20 },
//   modalContainer: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   modalTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
//   modalImage: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginVertical: 10,
//   },
// });

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Modal,
//   Button,
//   Alert,
//   ScrollView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";
// import { SafeAreaView } from "react-native-safe-area-context";
// import LocationMap from "../components/LocationMarker";

// export default function HomeScreen({ navigation }) {
//   const [user, setUser] = useState(null);
//   const [restaurants, setRestaurants] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedRestaurant, setSelectedRestaurant] = useState(null);
//   const [partySize, setPartySize] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [activeTab, setActiveTab] = useState("Menu");
//   const [newReviewRating, setNewReviewRating] = useState(0);
// const [newReviewComment, setNewReviewComment] = useState('');

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
//         console.error("Error fetching user profile:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   // Fetch restaurants
//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const response = await axios.get(
//           "http://192.168.18.15:3000/restaurants"
//         );
//         setRestaurants(response.data);
//       } catch (error) {
//         console.error("Error fetching restaurants:", error);
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   const filteredRestaurants = restaurants.filter(
//     (restaurant) =>
//       restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleReservation = async () => {
//     if (!user) {
//       Alert.alert(
//         "Authentication Required",
//         "Please log in to make a reservation."
//       );
//       return;
//     }

//     const reservationData = {
//       userId: user._id,
//       restaurantId: selectedRestaurant._id,
//       partySize,
//       date,
//       time,
//     };

//     try {
//       await axios.post(
//         "http://192.168.18.15:3000/reservations",
//         reservationData,
//         {
//           withCredentials: true,
//         }
//       );
//       Alert.alert("Success", "Reservation made successfully!");
//       setModalVisible(false);
//     } catch (error) {
//       console.error("Error making reservation:", error);
//       Alert.alert("Error", "Failed to make reservation.");
//     }
//   };

//   if (isLoading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </SafeAreaView>
//     );
//   }
//   // const StarRating = ({ rating }) => {
//   //   return (
//   //     <View style={styles.starContainer}>
//   //       {[1, 2, 3, 4, 5].map((star) => (
//   //         <Ionicons
//   //           key={star}
//   //           name={star <= rating ? 'star' : 'star-outline'}
//   //           size={20}
//   //           color={star <= rating ? '#FFD700' : '#CCCCCC'}
//   //         />
//   //       ))}
//   //     </View>
//   //   );
//   // };

//   const StarRating = ({ rating, onRatingChange }) => {
//     const handleStarPress = (selectedRating) => {
//       onRatingChange(selectedRating);
//     };

//     return (
//       <View style={styles.starContainer}>
//         {[1, 2, 3, 4, 5].map((star) => (
//           <TouchableOpacity
//             key={star}
//             onPress={() => handleStarPress(star)}
//           >
//             <Ionicons
//               name={star <= rating ? 'star' : 'star-outline'}
//               size={20}
//               color={star <= rating ? '#FFD700' : '#CCCCCC'}
//             />
//           </TouchableOpacity>
//         ))}
//       </View>
//     );
//   };

//   const handleSubmitReview = async () => {
//     // Validate review
//     if (newReviewRating === 0) {
//       Alert.alert('Validation Error', 'Please select a rating');
//       return;
//     }

//     if (!newReviewComment.trim()) {
//       Alert.alert('Validation Error', 'Please write a review comment');
//       return;
//     }

//     // Ensure user is logged in
//     if (!user) {
//       Alert.alert('Authentication Required', 'Please log in to submit a review');
//       return;
//     }

//     try {
//       // Prepare review data
//       const reviewData = {
//         restaurantId: selectedRestaurant._id,
//         review: {
//           user: `${user.firstName} ${user.lastName}`,
//           rating: newReviewRating,
//           comment: newReviewComment
//         }
//       };

//       // Send review to backend
//       const response = await axios.post(
//         'http://192.168.18.15:3000/restaurants/review',
//         reviewData,
//         { withCredentials: true }
//       );

//       // Reset review form
//       setNewReviewRating(0);
//       setNewReviewComment('');

//       // Update local state or refetch restaurant
//       Alert.alert('Success', 'Review submitted successfully!');

//       // Optionally, you might want to refetch the restaurant to get the updated reviews
//       // You can call your existing fetchRestaurants function or add a specific endpoint
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       Alert.alert('Error', 'Failed to submit review. Please try again.');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <Text style={styles.greeting}>
//           Hi, {user ? `${user.firstName} ${user.lastName}` : "Guest"}
//         </Text>
//         <Text style={styles.date}>Thursday, Jan 22 - today</Text>

//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search your location here"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />

//         <Text style={styles.heading}>Restaurants nearby</Text>

//         <FlatList
//           data={filteredRestaurants}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() => {
//                 setSelectedRestaurant(item);
//                 setModalVisible(true);
//               }}
//             >
//               <View style={styles.card}>
//                 <Image
//                   source={{
//                     uri: `http://192.168.18.15:3000/${item.images[0]}`,
//                   }}
//                   style={styles.image}
//                 />
//                 <View style={styles.cardContent}>
//                   <Text style={styles.cardTitle}>{item.name}</Text>
//                   <Text>⭐ {item.rating}</Text>
//                   <Text>🕒 {item.hours || "Hours not specified"}</Text>
//                   <Text>📍 {item.address}</Text>
//                 </View>
//                 <TouchableOpacity>
//                   <Ionicons name="heart-outline" size={24} color="gray" />
//                 </TouchableOpacity>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       </View>

//       {/* Modal for Restaurant Details */}
//       {selectedRestaurant && (
//         <Modal
//           visible={modalVisible}
//           animationType="slide"
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <SafeAreaView style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <TouchableOpacity
//                 style={styles.closeButton}
//                 onPress={() => setModalVisible(false)}
//               >
//                 <Ionicons name="close" size={24} color="black" />
//               </TouchableOpacity>

//               <Text style={styles.modalTitle}>{selectedRestaurant.name}</Text>

//               {selectedRestaurant.images &&
//                 selectedRestaurant.images.length > 0 && (
//                   <FlatList
//                     horizontal
//                     data={selectedRestaurant.images}
//                     renderItem={({ item }) => (
//                       <Image
//                         source={{ uri: `http://192.168.18.15:3000/${item}` }}
//                         style={styles.modalImage}
//                       />
//                     )}
//                     keyExtractor={(item, index) => index.toString()}
//                   />
//                 )}

//               <View style={styles.tabContainer}>
//                 <TouchableOpacity
//                   style={[
//                     styles.tabButton,
//                     activeTab === "Menu" && styles.activeTab,
//                   ]}
//                   onPress={() => setActiveTab("Menu")}
//                 >
//                   <Text
//                     style={[
//                       styles.tabButtonText,
//                       activeTab === "Menu" && styles.activeTabText,
//                     ]}
//                   >
//                     Menu
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[
//                     styles.tabButton,
//                     activeTab === "Details" && styles.activeTab,
//                   ]}
//                   onPress={() => setActiveTab("Details")}
//                 >
//                   <Text
//                     style={[
//                       styles.tabButtonText,
//                       activeTab === "Details" && styles.activeTabText,
//                     ]}
//                   >
//                     Details
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[
//                     styles.tabButton,
//                     activeTab === "Reviews" && styles.activeTab,
//                   ]}
//                   onPress={() => setActiveTab("Reviews")}
//                 >
//                   <Text
//                     style={[
//                       styles.tabButtonText,
//                       activeTab === "Reviews" && styles.activeTabText,
//                     ]}
//                   >
//                     Reviews
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               {activeTab === "Menu" && (
//                 <View>
//                   <Text style={styles.menuTitle}>Menu:</Text>
//                   <FlatList
//                     data={selectedRestaurant.menu || []}
//                     renderItem={({ item }) => (
//                       <View style={styles.menuItemContainer}>
//                         <Text style={styles.menuItemName}>{item.name}</Text>
//                         {item.image && (
//                           <Image
//                             source={{ uri:item.image }}
//                             style={styles.menuItemImage}
//                           />
//                         )}
//                       </View>
//                     )}
//                     keyExtractor={(item, index) => index.toString()}
//                   />
//                 </View>
//               )}

//               {activeTab === "Details" && (
//                 <ScrollView>
//                   <View>
//                     <View style={styles.detailRow}>
//                       <Text style={styles.detailLabel}>Address:</Text>
//                       <Text>{selectedRestaurant.address}</Text>
//                     </View>

//                     <View style={styles.detailRow}>
//                       <Text style={styles.detailLabel}>Phone:</Text>
//                       <Text>{selectedRestaurant.phone}</Text>
//                     </View>
//                     <View>

//                 <View style={styles.detailRow}>
//                   <Text style={styles.detailLabel}>Phone:</Text>
//                   <Text>{selectedRestaurant.phone}</Text>
//                 </View>

//                 <View style={styles.detailRow}>
//                   <Text style={styles.detailLabel}>Cuisine:</Text>
//                   <Text>{selectedRestaurant.cuisine}</Text>
//                 </View>

//                 <View style={styles.detailRow}>
//                   <Text style={styles.detailLabel}>Rating:</Text>
//                   <StarRating rating={selectedRestaurant.rating} />
//                 </View>

//                 <View style={styles.detailRow}>
//                   <Text style={styles.detailLabel}>Price:</Text>
//                   <Text>R{selectedRestaurant.pricePerReservation}</Text>
//                 </View>

//                 <View style={styles.detailRow}>
//                   <Text style={styles.detailLabel}>Dress Code:</Text>
//                   <Text>{selectedRestaurant.dressCode}</Text>
//                 </View>

//                 <Text style={styles.descriptionTitle}>Description:</Text>
//                 <Text style={styles.description}>{selectedRestaurant.description}</Text>

//                 <Text style={styles.descriptionTitle}>Available Time Slots:</Text>
//                 {selectedRestaurant.availableTimeSlots && selectedRestaurant.availableTimeSlots.map((daySlot, index) => (
//                   <View key={index} style={styles.timeSlotContainer}>
//                     {daySlot.slots.map((slot, slotIndex) => (
//                       <View key={slotIndex} style={styles.timeSlotDetails}>
//                         <Text>Time: {slot.time}</Text>
//                         <Text>Max Reservations: {slot.maxReservations}</Text>
//                       </View>
//                     ))}
//                   </View>
//                 ))}
//                 <LocationMap
//                   latitude={selectedRestaurant.latitude}
//                   longitude={selectedRestaurant.longitude}
//                   style={styles.modalMap}
//                 />
//               </View>
//                     {/* Similar updates for other details */}
//                   </View>
//                 </ScrollView>
//               )}

// {activeTab === "Reviews" && (
//   <FlatList
//     data={selectedRestaurant.reviews || []}
//     keyExtractor={(item, index) => index.toString()}
//     ListHeaderComponent={() => (
//       <>
//         {/* Existing Reviews Section */}
//         <View style={styles.existingReviewsSection}>
//           <Text style={styles.sectionTitle}>Previous Reviews</Text>
//           {selectedRestaurant.reviews && selectedRestaurant.reviews.length > 0 ? (
//             <FlatList
//               data={selectedRestaurant.reviews}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={({ item }) => (
//                 <View style={styles.reviewItem}>
//                   <View style={styles.reviewHeader}>
//                     <Text style={styles.reviewUser}>{item.user}</Text>
//                     <View style={styles.reviewStars}>
//                       {[...Array(item.rating)].map((_, i) => (
//                         <Ionicons key={i} name="star" size={16} color="#FFD700" />
//                       ))}
//                     </View>
//                   </View>
//                   <Text style={styles.reviewDate}>
//                     {new Date(item.date).toLocaleDateString()}
//                   </Text>
//                   <Text style={styles.reviewComment}>{item.comment}</Text>
//                 </View>
//               )}
//               ListEmptyComponent={
//                 <Text style={styles.noReviewsText}>No reviews yet</Text>
//               }
//             />
//           ) : (
//             <Text style={styles.noReviewsText}>No reviews yet</Text>
//           )}
//         </View>

//         {/* Add Review Section */}
//         <View style={styles.addReviewContainer}>
//           <Text style={styles.addReviewTitle}>Add a Review</Text>

//           <Text style={styles.labelText}>Rating:</Text>
//           <View style={styles.starRatingContainer}>
//             <StarRating
//               rating={newReviewRating}
//               onRatingChange={setNewReviewRating}
//             />
//           </View>

//           <Text style={styles.labelText}>Comment:</Text>
//           <TextInput
//             style={styles.reviewInput}
//             placeholder="Write your review here"
//             multiline
//             numberOfLines={4}
//             value={newReviewComment}
//             onChangeText={setNewReviewComment}
//           />

//           <TouchableOpacity
//             style={styles.submitReviewButton}
//             onPress={handleSubmitReview}
//           >
//             <Text style={styles.submitReviewButtonText}>Submit Review</Text>
//           </TouchableOpacity>
//         </View>
//       </>
//     )}
//     renderItem={() => null} // No need to render items here since they are in the ListHeaderComponent
//   />
// )}

//               <View style={styles.modalButtonContainer}>
//                 <TouchableOpacity
//                   style={styles.reserveButton}
//                   onPress={() => {
//                     // Close the modal
//                     setModalVisible(false);

//                     // Navigate to Reservation Screen and pass the selected restaurant
//                     navigation.navigate("Booking", {
//                       restaurant: selectedRestaurant,
//                     });
//                   }}
//                 >
//                   <Text style={styles.reserveButtonText}>Reserve a Table</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </SafeAreaView>
//         </Modal>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#e9f5e9", padding: 20 },
//   greeting: { fontSize: 24, fontWeight: "bold", color: "#000" },
//   date: { fontSize: 14, color: "gray", marginVertical: 5 },
//   searchInput: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   heading: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
//   cardContent: { flex: 1 },
//   cardTitle: { fontSize: 16, fontWeight: "bold" },
//   loadingText: {
//     fontSize: 18,
//     color: "gray",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   modalContainer: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   modalTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
//   modalImage: {
//     width: "100%",
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginVertical: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: {
//     width: "90%",
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 20,
//     maxHeight: "90%",
//   },
//   modalImage: {
//     width: 400,
//     height: 150,
//     borderRadius: 10,
//     marginRight: 10,
//     marginBottom: 16,
//   },
//   closeButton: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//     zIndex: 1,
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   detailRow: {
//     flexDirection: "row",
//     marginBottom: 8,
//     alignItems: "center",
//   },
//   detailLabel: {
//     fontWeight: "bold",
//     marginRight: 8,
//     width: 120,
//   },
//   description: {
//     marginBottom: 16,
//     textAlign: "justify",
//   },
//   descriptionTitle: {
//     fontWeight: "bold",
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   menuTitle: {
//     fontWeight: "bold",
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   menuItemContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//     padding: 8,
//     backgroundColor: "#F9F9F9",
//     borderRadius: 8,
//   },
//   menuItemName: {
//     flex: 1,
//     marginRight: 8,
//   },
//   menuItemImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 8,
//   },
//   modalButtonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 16,
//   },
//   modalButton: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 12,
//     borderRadius: 8,
//     marginHorizontal: 8,
//   },
//   editButton: {
//     backgroundColor: "#2980B9",
//   },
//   deleteButton: {
//     backgroundColor: "#E74C3C",
//   },
//   modalButtonText: {
//     color: "white",
//     marginLeft: 8,
//     fontWeight: "bold",
//   },
//   starContainer: {
//     flexDirection: 'row',
//     marginTop: 8,
//   },
//   tabContainer: {
//     flexDirection: "row",
//     marginVertical: 16,
//   },
//   tabButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 4,
//     marginHorizontal: 4,
//   },
//   activeTab: {
//     backgroundColor: "#2C3E50",
//     borderColor: "#2C3E50",
//   },
//   tabButtonText: {
//     color: "#2C3E50",
//   },
//   activeTabText: {
//     color: "white",
//   },
//   timeSlotContainer: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: "#F9F9F9",
//     borderRadius: 8,
//   },
//   timeSlotDay: {
//     fontWeight: "bold",
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   timeSlotDetails: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 5,
//     paddingHorizontal: 10,
//   },
//   modalMap: {
//     marginTop: 16,
//     borderRadius: 8,
//     overflow: "hidden",
//   },
//   reserveButton: {
//     backgroundColor: "#4CAF50", // A nice green color
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   reserveButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   reviewsContainer: {
//     flex: 1,
//   },
//   reviewItem: {
//     backgroundColor: '#f9f9f9',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   reviewHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   reviewUser: {
//     fontWeight: 'bold',
//   },
//   reviewStars: {
//     flexDirection: 'row',
//   },
//   reviewDate: {
//     color: 'gray',
//     marginVertical: 5,
//   },
//   reviewComment: {
//     marginTop: 5,
//   },
//   noReviewsText: {
//     textAlign: 'center',
//     color: 'gray',
//     marginVertical: 20,
//   },
//   addReviewContainer: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//   },
//   addReviewTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   labelText: {
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   reviewInput: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 10,
//     minHeight: 100,
//     textAlignVertical: 'top',
//   },
//   submitReviewButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 15,
//   },
//   submitReviewButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   starContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
// });

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Modal,
//   Button,
//   Alert,
//   ScrollView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";
// import { SafeAreaView } from "react-native-safe-area-context";
// import LocationMap from "../components/LocationMarker";

// export default function HomeScreen({ navigation }) {
//   const [user, setUser] = useState(null);
//   const [restaurants, setRestaurants] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedRestaurant, setSelectedRestaurant] = useState(null);
//   const [partySize, setPartySize] = useState("");
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [activeTab, setActiveTab] = useState("Menu");
//   const [newReviewRating, setNewReviewRating] = useState(0);
//   const [newReviewComment, setNewReviewComment] = useState("");
//   const [favorites, setFavorites] = useState([]);
//   const [restaurantReviews, setRestaurantReviews] = useState({});

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
//         console.error("Error fetching user profile:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   // Fetch restaurants
//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const response = await axios.get(
//           "http://192.168.18.15:3000/restaurants"
//         );
//         setRestaurants(response.data);
//       } catch (error) {
//         console.error("Error fetching restaurants:", error);
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   // Fetch user's favorites
//   useEffect(() => {
//     if (user) {
//       fetchFavorites();
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
//     }
//   };

//   const filteredRestaurants = restaurants.filter(
//     (restaurant) =>
//       restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       restaurant.address.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleReservation = async () => {
//     if (!user) {
//       Alert.alert(
//         "Authentication Required",
//         "Please log in to make a reservation."
//       );
//       return;
//     }

//     const reservationData = {
//       userId: user._id,
//       restaurantId: selectedRestaurant._id,
//       partySize,
//       date,
//       time,
//     };

//     try {
//       await axios.post(
//         "http://192.168.18.15:3000/reservations",
//         reservationData,
//         {
//           withCredentials: true,
//         }
//       );
//       Alert.alert("Success", "Reservation made successfully!");
//       setModalVisible(false);
//     } catch (error) {
//       console.error("Error making reservation:", error);
//       Alert.alert("Error", "Failed to make reservation.");
//     }
//   };

//   const StarRating = ({ rating, onRatingChange }) => {
//     const handleStarPress = (selectedRating) => {
//       onRatingChange(selectedRating);
//     };

//     return (
//       <View style={styles.starContainer}>
//         {[1, 2, 3, 4, 5].map((star) => (
//           <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
//             <Ionicons
//               name={star <= rating ? "star" : "star-outline"}
//               size={20}
//               color={star <= rating ? "#FFD700" : "#CCCCCC"}
//             />
//           </TouchableOpacity>
//         ))}
//       </View>
//     );
//   };

//   const handleSubmitReview = async () => {
//     // Get the review data for the current restaurant
//     const currentRestaurantReview = restaurantReviews[
//       selectedRestaurant._id
//     ] || { rating: 0, comment: "" };

//     // Validate review
//     if (currentRestaurantReview.rating === 0) {
//       Alert.alert("Validation Error", "Please select a rating");
//       return;
//     }

//     if (!currentRestaurantReview.comment.trim()) {
//       Alert.alert("Validation Error", "Please write a review comment");
//       return;
//     }

//     // Ensure user is logged in
//     if (!user) {
//       Alert.alert(
//         "Authentication Required",
//         "Please log in to submit a review"
//       );
//       return;
//     }

//     try {
//       // Prepare review data
//       const reviewData = {
//         restaurantId: selectedRestaurant._id,
//         review: {
//           user: `${user.firstName} ${user.lastName}`,
//           rating: currentRestaurantReview.rating,
//           comment: currentRestaurantReview.comment,
//         },
//       };

//       // Send review to backend
//       await axios.post(
//         "http://192.168.18.15:3000/restaurants/review",
//         reviewData,
//         { withCredentials: true }
//       );

//       // Create a copy of restaurantReviews and reset the specific restaurant's review
//       const updatedReviews = { ...restaurantReviews };
//       updatedReviews[selectedRestaurant._id] = { rating: 0, comment: "" };
//       setRestaurantReviews(updatedReviews);

//       Alert.alert("Success", "Review submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       Alert.alert("Error", "Failed to submit review. Please try again.");
//     }
//   };

//   const handleAddToFavorites = async (restaurantId) => {
//     if (!user) {
//       Alert.alert("Authentication Required", "Please log in to add favorites.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://192.168.18.15:3000/favorites",
//         {
//           userId: user._id,
//           restaurantId,
//         },
//         { withCredentials: true }
//       );

//       setFavorites(response.data.favorites);
//       Alert.alert("Success", "Added to favorites!");
//     } catch (error) {
//       console.error("Error adding to favorites:", error);
//       Alert.alert("Error", "Failed to add to favorites.");
//     }
//   };

//   const handleRemoveFromFavorites = async (restaurantId) => {
//     if (!user) {
//       Alert.alert(
//         "Authentication Required",
//         "Please log in to remove favorites."
//       );
//       return;
//     }

//     try {
//       const response = await axios.delete(
//         `http://192.168.18.15:3000/favorites/${user._id}/${restaurantId}`,
//         { withCredentials: true }
//       );

//       setFavorites(response.data.favorites);
//       Alert.alert("Success", "Removed from favorites!");
//     } catch (error) {
//       console.error("Error removing from favorites:", error);
//       Alert.alert("Error", "Failed to remove from favorites.");
//     }
//   };

//   const isFavorite = (restaurantId) => {
//     return favorites.some((fav) => fav.restaurantId === restaurantId);
//   };

//   if (isLoading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <Text style={styles.greeting}>
//           Hi, {user ? `${user.firstName} ${user.lastName}` : "Guest"}
//         </Text>
//         <Text style={styles.date}>Thursday, Jan 22 - today</Text>

//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search your location here"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />

//         <Text style={styles.heading}>Restaurants nearby</Text>

//         <FlatList
//           data={filteredRestaurants}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               onPress={() => {
//                 setSelectedRestaurant(item);
//                 setModalVisible(true);
//               }}
//             >
//               <View style={styles.card}>
//                 <Image
//                   source={{
//                     uri: `http://192.168.18.15:3000/${item.images[0]}`,
//                   }}
//                   style={styles.image}
//                 />
//                 <View style={styles.cardContent}>
//                   <Text style={styles.cardTitle}>{item.name}</Text>
//                   <Text>⭐ {item.rating}</Text>
//                   <Text>🕒 {item.hours || "Hours not specified"}</Text>
//                   <Text>📍 {item.address}</Text>
//                 </View>
//                 <TouchableOpacity
//                   onPress={() =>
//                     isFavorite(item._id)
//                       ? handleRemoveFromFavorites(item._id)
//                       : handleAddToFavorites(item._id)
//                   }
//                 >
//                   <Ionicons
//                     name={isFavorite(item._id) ? "heart" : "heart-outline"}
//                     size={24}
//                     color={isFavorite(item._id) ? "red" : "gray"}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       </View>

//       {/* Modal for Restaurant Details */}
//       {selectedRestaurant && (
//         <Modal
//           visible={modalVisible}
//           animationType="slide"
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <SafeAreaView style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <TouchableOpacity
//                 style={styles.closeButton}
//                 onPress={() => setModalVisible(false)}
//               >
//                 <Ionicons name="close" size={24} color="black" />
//               </TouchableOpacity>

//               <Text style={styles.modalTitle}>{selectedRestaurant.name}</Text>

//               {selectedRestaurant.images &&
//                 selectedRestaurant.images.length > 0 && (
//                   <FlatList
//                     horizontal
//                     data={selectedRestaurant.images}
//                     renderItem={({ item }) => (
//                       <Image
//                         source={{ uri: `http://192.168.18.15:3000/${item}` }}
//                         style={styles.modalImage}
//                       />
//                     )}
//                     keyExtractor={(item, index) => index.toString()}
//                   />
//                 )}

//               <View style={styles.tabContainer}>
//                 <TouchableOpacity
//                   style={[
//                     styles.tabButton,
//                     activeTab === "Menu" && styles.activeTab,
//                   ]}
//                   onPress={() => setActiveTab("Menu")}
//                 >
//                   <Text
//                     style={[
//                       styles.tabButtonText,
//                       activeTab === "Menu" && styles.activeTabText,
//                     ]}
//                   >
//                     Menu
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[
//                     styles.tabButton,
//                     activeTab === "Details" && styles.activeTab,
//                   ]}
//                   onPress={() => setActiveTab("Details")}
//                 >
//                   <Text
//                     style={[
//                       styles.tabButtonText,
//                       activeTab === "Details" && styles.activeTabText,
//                     ]}
//                   >
//                     Details
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[
//                     styles.tabButton,
//                     activeTab === "Reviews" && styles.activeTab,
//                   ]}
//                   onPress={() => setActiveTab("Reviews")}
//                 >
//                   <Text
//                     style={[
//                       styles.tabButtonText,
//                       activeTab === "Reviews" && styles.activeTabText,
//                     ]}
//                   >
//                     Reviews
//                   </Text>
//                 </TouchableOpacity>
//               </View>

//               {activeTab === "Menu" && (
//                 <View>
//                   <Text style={styles.menuTitle}>Menu:</Text>
//                   <FlatList
//                     data={selectedRestaurant.menu || []}
//                     renderItem={({ item }) => (
//                       <View style={styles.menuItemContainer}>
//                         <Text style={styles.menuItemName}>{item.name}</Text>
//                         {item.image && (
//                           <Image
//                             source={{ uri: item.image }}
//                             style={styles.menuItemImage}
//                           />
//                         )}
//                       </View>
//                     )}
//                     keyExtractor={(item, index) => index.toString()}
//                   />
//                 </View>
//               )}

//               {activeTab === "Details" && (
//                 <ScrollView>
//                   <View>
//                     <View style={styles.detailRow}>
//                       <Text style={styles.detailLabel}>Address:</Text>
//                       <Text>{selectedRestaurant.address}</Text>
//                     </View>

//                     <View style={styles.detailRow}>
//                       <Text style={styles.detailLabel}>Phone:</Text>
//                       <Text>{selectedRestaurant.phone}</Text>
//                     </View>

//                     <View style={styles.detailRow}>
//                       <Text style={styles.detailLabel}>Cuisine:</Text>
//                       <Text>{selectedRestaurant.cuisine}</Text>
//                     </View>

//                     <View style={styles.detailRow}>
//                       <Text style={styles.detailLabel}>Rating:</Text>
//                       <StarRating rating={selectedRestaurant.rating} />
//                     </View>

//                     <View style={styles.detailRow}>
//                       <Text style={styles.detailLabel}>Price:</Text>
//                       <Text>R{selectedRestaurant.pricePerReservation}</Text>
//                     </View>

//                     <View style={styles.detailRow}>
//                       <Text style={styles.detailLabel}>Dress Code:</Text>
//                       <Text>{selectedRestaurant.dressCode}</Text>
//                     </View>

//                     <Text style={styles.descriptionTitle}>Description:</Text>
//                     <Text style={styles.description}>
//                       {selectedRestaurant.description}
//                     </Text>

//                     <Text style={styles.descriptionTitle}>
//                       Available Time Slots:
//                     </Text>
//                     {selectedRestaurant.availableTimeSlots &&
//                       selectedRestaurant.availableTimeSlots.map(
//                         (daySlot, index) => (
//                           <View key={index} style={styles.timeSlotContainer}>
//                             {daySlot.slots.map((slot, slotIndex) => (
//                               <View
//                                 key={slotIndex}
//                                 style={styles.timeSlotDetails}
//                               >
//                                 <Text>Time: {slot.time}</Text>
//                                 <Text>
//                                   Max Reservations: {slot.maxReservations}
//                                 </Text>
//                               </View>
//                             ))}
//                           </View>
//                         )
//                       )}
//                     <LocationMap
//                       latitude={selectedRestaurant.latitude}
//                       longitude={selectedRestaurant.longitude}
//                       style={styles.modalMap}
//                     />
//                   </View>
//                 </ScrollView>
//               )}

//               {activeTab === "Reviews" && (
//                 <FlatList
//                   data={selectedRestaurant.reviews || []}
//                   keyExtractor={(item, index) => index.toString()}
//                   ListHeaderComponent={() => (
//                     <>
//                       {/* Existing Reviews Section */}
//                       <View style={styles.existingReviewsSection}>
//                         <Text style={styles.sectionTitle}>
//                           Previous Reviews
//                         </Text>
//                         {selectedRestaurant.reviews &&
//                         selectedRestaurant.reviews.length > 0 ? (
//                           <FlatList
//                             data={selectedRestaurant.reviews}
//                             keyExtractor={(item, index) => index.toString()}
//                             renderItem={({ item }) => (
//                               <View style={styles.reviewItem}>
//                                 <View style={styles.reviewHeader}>
//                                   <Text style={styles.reviewUser}>
//                                     {item.user}
//                                   </Text>
//                                   <View style={styles.reviewStars}>
//                                     {[...Array(item.rating)].map((_, i) => (
//                                       <Ionicons
//                                         key={i}
//                                         name="star"
//                                         size={16}
//                                         color="#FFD700"
//                                       />
//                                     ))}
//                                   </View>
//                                 </View>
//                                 <Text style={styles.reviewDate}>
//                                   {new Date(item.date).toLocaleDateString()}
//                                 </Text>
//                                 <Text style={styles.reviewComment}>
//                                   {item.comment}
//                                 </Text>
//                               </View>
//                             )}
//                             ListEmptyComponent={
//                               <Text style={styles.noReviewsText}>
//                                 No reviews yet
//                               </Text>
//                             }
//                           />
//                         ) : (
//                           <Text style={styles.noReviewsText}>
//                             No reviews yet
//                           </Text>
//                         )}
//                       </View>

//                       {/* Add Review Section */}
//                       <View style={styles.addReviewContainer}>
//                         <Text style={styles.addReviewTitle}>Add a Review</Text>

//                         <Text style={styles.labelText}>Rating:</Text>
//                         <View style={styles.starRatingContainer}>
//                           <StarRating
//                             rating={
//                               restaurantReviews[selectedRestaurant._id]
//                                 ?.rating || 0
//                             }
//                             onRatingChange={(rating) => {
//                               setRestaurantReviews((prev) => ({
//                                 ...prev,
//                                 [selectedRestaurant._id]: {
//                                   ...prev[selectedRestaurant._id],
//                                   rating,
//                                 },
//                               }));
//                             }}
//                           />
//                         </View>

//                         <Text style={styles.labelText}>Comment:</Text>
//                         <TextInput
//                           style={styles.reviewInput}
//                           placeholder="Write your review here"
//                           multiline
//                           numberOfLines={4}
//                           value={
//                             restaurantReviews[selectedRestaurant._id]
//                               ?.comment || ""
//                           }
//                           onChangeText={(text) => {
//                             setRestaurantReviews((prev) => ({
//                               ...prev,
//                               [selectedRestaurant._id]: {
//                                 ...prev[selectedRestaurant._id],
//                                 comment: text,
//                               },
//                             }));
//                           }}
//                         />

//                         <TouchableOpacity
//                           style={styles.submitReviewButton}
//                           onPress={handleSubmitReview}
//                         >
//                           <Text style={styles.submitReviewButtonText}>
//                             Submit Review
//                           </Text>
//                         </TouchableOpacity>
//                       </View>
//                     </>
//                   )}
//                   renderItem={() => null}
//                 />
//               )}

//               <View style={styles.modalButtonContainer}>
//                 <TouchableOpacity
//                   style={styles.reserveButton}
//                   onPress={() => {
//                     setModalVisible(false);
//                     navigation.navigate("Booking", {
//                       restaurant: selectedRestaurant,
//                     });
//                   }}
//                 >
//                   <Text style={styles.reserveButtonText}>Reserve a Table</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </SafeAreaView>
//         </Modal>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#e9f5e9", padding: 20 },
//   greeting: { fontSize: 24, fontWeight: "bold", color: "#000" },
//   date: { fontSize: 14, color: "gray", marginVertical: 5 },
//   searchInput: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   heading: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
//   cardContent: { flex: 1 },
//   cardTitle: { fontSize: 16, fontWeight: "bold" },
//   loadingText: {
//     fontSize: 18,
//     color: "gray",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   modalContainer: { flex: 1, padding: 20, backgroundColor: "#fff" },
//   modalTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
//   modalImage: {
//     width: "100%",
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginVertical: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContent: {
//     width: "90%",
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 20,
//     maxHeight: "90%",
//   },
//   modalImage: {
//     width: 400,
//     height: 150,
//     borderRadius: 10,
//     marginRight: 10,
//     marginBottom: 16,
//   },
//   closeButton: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//     zIndex: 1,
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   detailRow: {
//     flexDirection: "row",
//     marginBottom: 8,
//     alignItems: "center",
//   },
//   detailLabel: {
//     fontWeight: "bold",
//     marginRight: 8,
//     width: 120,
//   },
//   description: {
//     marginBottom: 16,
//     textAlign: "justify",
//   },
//   descriptionTitle: {
//     fontWeight: "bold",
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   menuTitle: {
//     fontWeight: "bold",
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   menuItemContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//     padding: 8,
//     backgroundColor: "#F9F9F9",
//     borderRadius: 8,
//   },
//   menuItemName: {
//     flex: 1,
//     marginRight: 8,
//   },
//   menuItemImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 8,
//   },
//   modalButtonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 16,
//   },
//   modalButton: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 12,
//     borderRadius: 8,
//     marginHorizontal: 8,
//   },
//   editButton: {
//     backgroundColor: "#2980B9",
//   },
//   deleteButton: {
//     backgroundColor: "#E74C3C",
//   },
//   modalButtonText: {
//     color: "white",
//     marginLeft: 8,
//     fontWeight: "bold",
//   },
//   starContainer: {
//     flexDirection: "row",
//     marginTop: 8,
//   },
//   tabContainer: {
//     flexDirection: "row",
//     marginVertical: 16,
//   },
//   tabButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 4,
//     marginHorizontal: 4,
//   },
//   activeTab: {
//     backgroundColor: "#2C3E50",
//     borderColor: "#2C3E50",
//   },
//   tabButtonText: {
//     color: "#2C3E50",
//   },
//   activeTabText: {
//     color: "white",
//   },
//   timeSlotContainer: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: "#F9F9F9",
//     borderRadius: 8,
//   },
//   timeSlotDay: {
//     fontWeight: "bold",
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   timeSlotDetails: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 5,
//     paddingHorizontal: 10,
//   },
//   modalMap: {
//     marginTop: 16,
//     borderRadius: 8,
//     overflow: "hidden",
//   },
//   reserveButton: {
//     backgroundColor: "#4CAF50", // A nice green color
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   reserveButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   reviewsContainer: {
//     flex: 1,
//   },
//   reviewItem: {
//     backgroundColor: "#f9f9f9",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   reviewHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   reviewUser: {
//     fontWeight: "bold",
//   },
//   reviewStars: {
//     flexDirection: "row",
//   },
//   reviewDate: {
//     color: "gray",
//     marginVertical: 5,
//   },
//   reviewComment: {
//     marginTop: 5,
//   },
//   noReviewsText: {
//     textAlign: "center",
//     color: "gray",
//     marginVertical: 20,
//   },
//   addReviewContainer: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 10,
//   },
//   addReviewTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   labelText: {
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   reviewInput: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 10,
//     minHeight: 100,
//     textAlignVertical: "top",
//   },
//   submitReviewButton: {
//     backgroundColor: "#4CAF50",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 15,
//   },
//   submitReviewButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   starContainer: {
//     flexDirection: "row",
//     marginBottom: 10,
//   },
// });


import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import LocationMap from "../components/LocationMarker";

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
  const [activeTab, setActiveTab] = useState("Menu");
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [restaurantReviews, setRestaurantReviews] = useState({});

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
        const response = await axios.get(
          "http://192.168.18.15:3000/restaurants"
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  // Fetch user's favorites
  useEffect(() => {
    if (user) {
      fetchFavorites();
      console.log("Fetched favorites:", favorites);
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
    }
  };

  // Debounce search input
  const debouncedSearchQuery = useMemo(() => {
    return searchQuery;
  }, [searchQuery]);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [restaurants, debouncedSearchQuery]);

  const handleReservation = async () => {
    if (!user) {
      Alert.alert(
        "Authentication Required",
        "Please log in to make a reservation."
      );
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
      await axios.post(
        "http://192.168.18.15:3000/reservations",
        reservationData,
        {
          withCredentials: true,
        }
      );
      Alert.alert("Success", "Reservation made successfully!");
      setModalVisible(false);
    } catch (error) {
      console.error("Error making reservation:", error);
      Alert.alert("Error", "Failed to make reservation.");
    }
  };

  const StarRating = React.memo(({ rating, onRatingChange }) => {
    const handleStarPress = (selectedRating) => {
      onRatingChange(selectedRating);
    };

    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={20}
              color={star <= rating ? "#FFD700" : "#CCCCCC"}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  });

  const handleSubmitReview = async () => {
    // Get the review data for the current restaurant
    const currentRestaurantReview = restaurantReviews[
      selectedRestaurant._id
    ] || { rating: 0, comment: "" };

    // Validate review
    if (currentRestaurantReview.rating === 0) {
      Alert.alert("Validation Error", "Please select a rating");
      return;
    }

    if (!currentRestaurantReview.comment.trim()) {
      Alert.alert("Validation Error", "Please write a review comment");
      return;
    }

    // Ensure user is logged in
    if (!user) {
      Alert.alert(
        "Authentication Required",
        "Please log in to submit a review"
      );
      return;
    }

    try {
      // Prepare review data
      const reviewData = {
        restaurantId: selectedRestaurant._id,
        review: {
          user: `${user.firstName} ${user.lastName}`,
          rating: currentRestaurantReview.rating,
          comment: currentRestaurantReview.comment,
        },
      };

      // Send review to backend
      await axios.post(
        "http://192.168.18.15:3000/restaurants/review",
        reviewData,
        { withCredentials: true }
      );

      // Create a copy of restaurantReviews and reset the specific restaurant's review
      const updatedReviews = { ...restaurantReviews };
      updatedReviews[selectedRestaurant._id] = { rating: 0, comment: "" };
      setRestaurantReviews(updatedReviews);

      Alert.alert("Success", "Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      Alert.alert("Error", "Failed to submit review. Please try again.");
    }
  };

  const handleAddToFavorites = async (restaurantId) => {
    if (!user) {
      Alert.alert("Authentication Required", "Please log in to add favorites.");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.18.15:3000/favorites",
        {
          userId: user._id,
          restaurantId,
        },
        { withCredentials: true }
      );

      setFavorites(response.data.favorites);
      Alert.alert("Success", "Added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
      Alert.alert("Error", "Failed to add to favorites.");
    }
  };

  const handleRemoveFromFavorites = async (restaurantId) => {
    if (!user) {
      Alert.alert(
        "Authentication Required",
        "Please log in to remove favorites."
      );
      return;
    }

    try {
      const response = await axios.delete(
        `http://192.168.18.15:3000/favorites/${user._id}/${restaurantId}`,
        { withCredentials: true }
      );

      setFavorites(response.data.favorites);
      Alert.alert("Success", "Removed from favorites!");
    } catch (error) {
      console.error("Error removing from favorites:", error);
      Alert.alert("Error", "Failed to remove from favorites.");
    }
  };

  const isFavorite = useCallback(
    (restaurantId) => {
      return favorites.some((fav) => fav.restaurantId === restaurantId);
    },
    [favorites]
  );

  const RestaurantCard = React.memo(({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedRestaurant(item);
        setModalVisible(true);
      }}
    >
      <View style={styles.card}>
        <Image
          source={{
            uri: `http://192.168.18.15:3000/${item.images[0]}`,
          }}
          style={styles.image}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text>⭐ {item.rating}</Text>
          <Text>🕒 {item.hours || "Hours not specified"}</Text>
          <Text>📍 {item.address}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            isFavorite(item._id)
              ? handleRemoveFromFavorites(item._id)
              : handleAddToFavorites(item._id)
          }
        >
          <Ionicons
            name={isFavorite(item._id) ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite(item._id) ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ));

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
          renderItem={({ item }) => <RestaurantCard item={item} />}
          getItemLayout={(data, index) => ({
            length: 100, // Height of each item
            offset: 100 * index, // Offset of each item
            index,
          })}
          initialNumToRender={10} // Render only 10 items initially
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
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>{selectedRestaurant.name}</Text>

              {selectedRestaurant.images &&
                selectedRestaurant.images.length > 0 && (
                  <FlatList
                    horizontal
                    data={selectedRestaurant.images}
                    renderItem={({ item }) => (
                      <Image
                        source={{ uri: `http://192.168.18.15:3000/${item}` }}
                        style={styles.modalImage}
                      />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                )}

              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    activeTab === "Menu" && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab("Menu")}
                >
                  <Text
                    style={[
                      styles.tabButtonText,
                      activeTab === "Menu" && styles.activeTabText,
                    ]}
                  >
                    Menu
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    activeTab === "Details" && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab("Details")}
                >
                  <Text
                    style={[
                      styles.tabButtonText,
                      activeTab === "Details" && styles.activeTabText,
                    ]}
                  >
                    Details
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tabButton,
                    activeTab === "Reviews" && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab("Reviews")}
                >
                  <Text
                    style={[
                      styles.tabButtonText,
                      activeTab === "Reviews" && styles.activeTabText,
                    ]}
                  >
                    Reviews
                  </Text>
                </TouchableOpacity>
              </View>

              {activeTab === "Menu" && (
                <View>
                  <Text style={styles.menuTitle}>Menu:</Text>
                  <FlatList
                    data={selectedRestaurant.menu || []}
                    renderItem={({ item }) => (
                      <View style={styles.menuItemContainer}>
                        <Text style={styles.menuItemName}>{item.name}</Text>
                        {item.image && (
                          <Image
                            source={{ uri: item.image }}
                            style={styles.menuItemImage}
                          />
                        )}
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              )}

              {activeTab === "Details" && (
                <ScrollView>
                  <View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Address:</Text>
                      <Text>{selectedRestaurant.address}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Phone:</Text>
                      <Text>{selectedRestaurant.phone}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Cuisine:</Text>
                      <Text>{selectedRestaurant.cuisine}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Rating:</Text>
                      <StarRating rating={selectedRestaurant.rating} />
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Price:</Text>
                      <Text>R{selectedRestaurant.pricePerReservation}</Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Dress Code:</Text>
                      <Text>{selectedRestaurant.dressCode}</Text>
                    </View>

                    <Text style={styles.descriptionTitle}>Description:</Text>
                    <Text style={styles.description}>
                      {selectedRestaurant.description}
                    </Text>

                    <Text style={styles.descriptionTitle}>
                      Available Time Slots:
                    </Text>
                    {selectedRestaurant.availableTimeSlots &&
                      selectedRestaurant.availableTimeSlots.map(
                        (daySlot, index) => (
                          <View key={index} style={styles.timeSlotContainer}>
                            {daySlot.slots.map((slot, slotIndex) => (
                              <View
                                key={slotIndex}
                                style={styles.timeSlotDetails}
                              >
                                <Text>Time: {slot.time}</Text>
                                <Text>
                                  Max Reservations: {slot.maxReservations}
                                </Text>
                              </View>
                            ))}
                          </View>
                        )
                      )}
                    <LocationMap
                      latitude={selectedRestaurant.latitude}
                      longitude={selectedRestaurant.longitude}
                      style={styles.modalMap}
                    />
                  </View>
                </ScrollView>
              )}

              {activeTab === "Reviews" && (
                <FlatList
                  data={selectedRestaurant.reviews || []}
                  keyExtractor={(item, index) => index.toString()}
                  ListHeaderComponent={() => (
                    <>
                      {/* Existing Reviews Section */}
                      <View style={styles.existingReviewsSection}>
                        <Text style={styles.sectionTitle}>
                          Previous Reviews
                        </Text>
                        {selectedRestaurant.reviews &&
                        selectedRestaurant.reviews.length > 0 ? (
                          <FlatList
                            data={selectedRestaurant.reviews}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                              <View style={styles.reviewItem}>
                                <View style={styles.reviewHeader}>
                                  <Text style={styles.reviewUser}>
                                    {item.user}
                                  </Text>
                                  <View style={styles.reviewStars}>
                                    {[...Array(item.rating)].map((_, i) => (
                                      <Ionicons
                                        key={i}
                                        name="star"
                                        size={16}
                                        color="#FFD700"
                                      />
                                    ))}
                                  </View>
                                </View>
                                <Text style={styles.reviewDate}>
                                  {new Date(item.date).toLocaleDateString()}
                                </Text>
                                <Text style={styles.reviewComment}>
                                  {item.comment}
                                </Text>
                              </View>
                            )}
                            ListEmptyComponent={
                              <Text style={styles.noReviewsText}>
                                No reviews yet
                              </Text>
                            }
                          />
                        ) : (
                          <Text style={styles.noReviewsText}>
                            No reviews yet
                          </Text>
                        )}
                      </View>

                      {/* Add Review Section */}
                      <View style={styles.addReviewContainer}>
                        <Text style={styles.addReviewTitle}>Add a Review</Text>

                        <Text style={styles.labelText}>Rating:</Text>
                        <View style={styles.starRatingContainer}>
                          <StarRating
                            rating={
                              restaurantReviews[selectedRestaurant._id]
                                ?.rating || 0
                            }
                            onRatingChange={(rating) => {
                              setRestaurantReviews((prev) => ({
                                ...prev,
                                [selectedRestaurant._id]: {
                                  ...prev[selectedRestaurant._id],
                                  rating,
                                },
                              }));
                            }}
                          />
                        </View>

                        <Text style={styles.labelText}>Comment:</Text>
                        <TextInput
                          style={styles.reviewInput}
                          placeholder="Write your review here"
                          multiline
                          numberOfLines={4}
                          value={
                            restaurantReviews[selectedRestaurant._id]
                              ?.comment || ""
                          }
                          onChangeText={(text) => {
                            setRestaurantReviews((prev) => ({
                              ...prev,
                              [selectedRestaurant._id]: {
                                ...prev[selectedRestaurant._id],
                                comment: text,
                              },
                            }));
                          }}
                        />

                        <TouchableOpacity
                          style={styles.submitReviewButton}
                          onPress={handleSubmitReview}
                        >
                          <Text style={styles.submitReviewButtonText}>
                            Submit Review
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                  renderItem={() => null}
                />
              )}

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.reserveButton}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("Booking", {
                      restaurant: selectedRestaurant,
                    });
                  }}
                >
                  <Text style={styles.reserveButtonText}>Reserve a Table</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  loadingText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: { flex: 1, padding: 20, backgroundColor: "#fff" },
  modalTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    maxHeight: "90%",
  },
  modalImage: {
    width: 400,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 16,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 8,
    width: 120,
  },
  description: {
    marginBottom: 16,
    textAlign: "justify",
  },
  descriptionTitle: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  menuTitle: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  menuItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
  },
  menuItemName: {
    flex: 1,
    marginRight: 8,
  },
  menuItemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  editButton: {
    backgroundColor: "#2980B9",
  },
  deleteButton: {
    backgroundColor: "#E74C3C",
  },
  modalButtonText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "bold",
  },
  starContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  tabContainer: {
    flexDirection: "row",
    marginVertical: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: "#2C3E50",
    borderColor: "#2C3E50",
  },
  tabButtonText: {
    color: "#2C3E50",
  },
  activeTabText: {
    color: "white",
  },
  timeSlotContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
  },
  timeSlotDay: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  timeSlotDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  modalMap: {
    marginTop: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  reserveButton: {
    backgroundColor: "#4CAF50", // A nice green color
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  reserveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  reviewsContainer: {
    flex: 1,
  },
  reviewItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewUser: {
    fontWeight: "bold",
  },
  reviewStars: {
    flexDirection: "row",
  },
  reviewDate: {
    color: "gray",
    marginVertical: 5,
  },
  reviewComment: {
    marginTop: 5,
  },
  noReviewsText: {
    textAlign: "center",
    color: "gray",
    marginVertical: 20,
  },
  addReviewContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  addReviewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  labelText: {
    marginTop: 10,
    marginBottom: 5,
  },
  reviewInput: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
    textAlignVertical: "top",
  },
  submitReviewButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  submitReviewButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
});