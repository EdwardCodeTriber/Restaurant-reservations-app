// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const BookingTableScreen = () => {
//   const [partySize, setPartySize] = useState(1);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [hour, setHour] = useState("11");
//   const [minute, setMinute] = useState("00");
//   const [meridian, setMeridian] = useState("AM");

//   const renderCalendar = () => {
//     const days = Array.from({ length: 31 }, (_, i) => i + 1); 
//     return (
//       <View style={styles.calendarContainer}>
//         {days.map((day) => (
//           <TouchableOpacity
//             key={day}
//             style={[
//               styles.date,
//               selectedDate === day && styles.selectedDate,
//             ]}
//             onPress={() => setSelectedDate(day)}
//           >
//             <Text style={styles.dateText}>{day}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView contentContainerStyle={styles.container}>
//         <ScrollView >
//       <Text style={styles.title}>Booking Table</Text>

//       <Text style={styles.label}>Party size</Text>
//       <View style={styles.partySizeContainer}>
//         {[1, 2, 4, 5, 6, 7, 8, 9].map((size) => (
//           <TouchableOpacity
//             key={size}
//             style={[
//               styles.partySizeButton,
//               partySize === size && styles.selectedPartySize,
//             ]}
//             onPress={() => setPartySize(size)}
//           >
//             <Text style={styles.partySizeText}>{size}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <Text style={styles.label}>Date</Text>
//       <View style={styles.dateHeaderContainer}>
//         <Text style={styles.dateHeader}>Jan</Text>
//         <Text style={styles.dateHeader}>2024</Text>
//       </View>
//       {renderCalendar()}

//       <Text style={styles.label}>Enter Time</Text>
//       <View style={styles.timeContainer}>
//         <TextInput
//           style={styles.timeInput}
//           value={hour}
//           keyboardType="numeric"
//           onChangeText={setHour}
//           maxLength={2}
//         />
//         <Text style={styles.colon}>:</Text>
//         <TextInput
//           style={styles.timeInput}
//           value={minute}
//           keyboardType="numeric"
//           onChangeText={setMinute}
//           maxLength={2}
//         />
//         <TouchableOpacity
//           style={styles.meridianButton}
//           onPress={() => setMeridian(meridian === "AM" ? "PM" : "AM")}
//         >
//           <Text style={styles.meridianText}>{meridian}</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.proceedButton}>
//         <Text style={styles.proceedText}>Proceed next</Text>
//       </TouchableOpacity>
//     </ScrollView>
//     </SafeAreaView>
    
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: "#8cff8c",
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginVertical: 8,
//   },
//   partySizeContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 16,
//   },
//   partySizeButton: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 20,
//     width: 50,
//     alignItems: "center",
//   },
//   selectedPartySize: {
//     backgroundColor: "#d9ffd9",
//   },
//   partySizeText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   dateHeaderContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   dateHeader: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   calendarContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   date: {
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     margin: 4,
//     backgroundColor: "#fff",
//     borderRadius: 20,
//   },
//   selectedDate: {
//     backgroundColor: "#d9ffd9",
//   },
//   dateText: {
//     fontSize: 14,
//   },
//   timeContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   timeInput: {
//     backgroundColor: "#fff",
//     width: 50,
//     height: 50,
//     textAlign: "center",
//     fontSize: 18,
//     borderRadius: 10,
//     marginHorizontal: 4,
//   },
//   colon: {
//     fontSize: 24,
//   },
//   meridianButton: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 10,
//   },
//   meridianText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   proceedButton: {
//     backgroundColor: "#4caf50",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   proceedText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default BookingTableScreen;


// import React, { useState, useEffect } from "react";
// import { 
//   View, 
//   Text, 
//   TouchableOpacity, 
//   TextInput, 
//   StyleSheet, 
//   ScrollView, 
//   Alert,
//   ActivityIndicator
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import axios from "axios";
// import { useRoute, useNavigation } from "@react-navigation/native";

// const BookingTableScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
  
//   // Extract restaurant from navigation params
//   const { restaurant } = route.params;

//   const [partySize, setPartySize] = useState(1);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [hour, setHour] = useState("11");
//   const [minute, setMinute] = useState("00");
//   const [meridian, setMeridian] = useState("AM");
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   // Fetch user profile
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(`http://192.168.18.15:3000/me`, {
//           withCredentials: true,
//         });
//         setUser(response.data.user);
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         Alert.alert("Authentication Error", "Please log in to make a reservation");
//         navigation.goBack();
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   // Process available time slots when restaurant is loaded
//   useEffect(() => {
//     if (restaurant && restaurant.availableTimeSlots) {
//       // Get current day of the week
//       const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//       const today = days[new Date().getDay()];

//       // Find time slots for today
//       const todaySlots = restaurant.availableTimeSlots.find(slot => slot.day === today);
      
//       if (todaySlots) {
//         // Filter slots that haven't reached max reservations
//         const availableTimeSlots = todaySlots.slots.filter(
//           slot => slot.currentReservations < slot.maxReservations
//         );
//         setAvailableSlots(availableTimeSlots);
//       }
      
//       setIsLoading(false);
//     }
//   }, [restaurant]);

//   // Validate time input
//   const validateTimeInput = () => {
//     // Convert hour and minute to 24-hour format
//     let convertedHour = parseInt(hour);
//     if (meridian === "PM" && convertedHour !== 12) {
//       convertedHour += 12;
//     } else if (meridian === "AM" && convertedHour === 12) {
//       convertedHour = 0;
//     }

//     // Format time as HH:MM
//     const formattedTime = `${convertedHour.toString().padStart(2, '0')}:${minute}`;

//     // Check if the time is in available slots
//     const isTimeAvailable = availableSlots.some(
//       slot => slot.time === formattedTime
//     );

//     return {
//       isValid: isTimeAvailable,
//       formattedTime
//     };
//   };

//   const handleProceedReservation = async () => {
//     // Validate inputs
//     if (!selectedDate) {
//       Alert.alert("Validation Error", "Please select a date");
//       return;
//     }

//     const { isValid, formattedTime } = validateTimeInput();
//     if (!isValid) {
//       Alert.alert("Invalid Time", "The selected time is not available. Please choose another time.");
//       return;
//     }

//     // Prepare reservation data
//     const reservationData = {
//       userId: user._id,
//       restaurantId: restaurant._id,
//       partySize,
//       date: new Date(new Date().getFullYear(), 0, selectedDate), // January date
//       time: formattedTime,
//     };

//     try {
//       // Send reservation request
//       const response = await axios.post(
//         'http://192.168.18.15:3000/reservations', 
//         reservationData, 
//         { withCredentials: true }
//       );

//       // Show success message
//       Alert.alert(
//         "Reservation Confirmed", 
//         `Your table for ${partySize} people at ${restaurant.name} is booked!`,
//         [{ 
//           text: "OK", 
//           onPress: () => navigation.navigate('Home') 
//         }]
//       );
//     } catch (error) {
//       console.error("Reservation Error:", error);
//       Alert.alert(
//         "Reservation Failed", 
//         "Unable to complete reservation. Please try again."
//       );
//     }
//   };

//   if (isLoading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.title}>Book a Table at {restaurant.name}</Text>

//         <Text style={styles.label}>Party size</Text>
//         <View style={styles.partySizeContainer}>
//           {[1, 2, 4, 5, 6, 7, 8, 9].map((size) => (
//             <TouchableOpacity
//               key={size}
//               style={[
//                 styles.partySizeButton,
//                 partySize === size && styles.selectedPartySize,
//               ]}
//               onPress={() => setPartySize(size)}
//             >
//               <Text style={styles.partySizeText}>{size}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Text style={styles.label}>Date</Text>
//         <View style={styles.dateHeaderContainer}>
//           <Text style={styles.dateHeader}>Jan</Text>
//           <Text style={styles.dateHeader}>2024</Text>
//         </View>
//         <View style={styles.calendarContainer}>
//           {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
//             <TouchableOpacity
//               key={day}
//               style={[
//                 styles.date,
//                 selectedDate === day && styles.selectedDate,
//               ]}
//               onPress={() => setSelectedDate(day)}
//             >
//               <Text style={styles.dateText}>{day}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Text style={styles.label}>Available Time Slots</Text>
//         <View style={styles.availableSlotsContainer}>
//           {availableSlots.length > 0 ? (
//             availableSlots.map((slot, index) => (
//               <TouchableOpacity 
//                 key={index}
//                 style={styles.timeSlotButton}
//                 onPress={() => {
//                   // Parse the time slot
//                   const [slotHour, slotMinute] = slot.time.split(':');
//                   let meridian = 'AM';
//                   let displayHour = parseInt(slotHour);
                  
//                   if (displayHour >= 12) {
//                     meridian = 'PM';
//                     if (displayHour > 12) {
//                       displayHour -= 12;
//                     }
//                   }
                  
//                   setHour(displayHour.toString());
//                   setMinute(slotMinute);
//                   setMeridian(meridian);
//                 }}
//               >
//                 <Text style={styles.timeSlotText}>{slot.time}</Text>
//                 <Text style={styles.timeSlotAvailable}>
//                   {slot.maxReservations - slot.currentReservations} slots available
//                 </Text>
//               </TouchableOpacity>
//             ))
//           ) : (
//             <Text style={styles.noSlotsText}>No available time slots</Text>
//           )}
//         </View>

//         <Text style={styles.label}>Enter Time</Text>
//         <View style={styles.timeContainer}>
//           <TextInput
//             style={styles.timeInput}
//             value={hour}
//             keyboardType="numeric"
//             onChangeText={(text) => {
//               // Limit hour to 1-12
//               const numText = text.replace(/[^0-9]/g, '');
//               const limitedText = Math.min(Math.max(parseInt(numText) || 1, 1), 12).toString();
//               setHour(limitedText);
//             }}
//             maxLength={2}
//           />
//           <Text style={styles.colon}>:</Text>
//           <TextInput
//             style={styles.timeInput}
//             value={minute}
//             keyboardType="numeric"
//             onChangeText={(text) => {
//               // Limit minute to 0-59
//               const numText = text.replace(/[^0-9]/g, '');
//               const limitedText = Math.min(Math.max(parseInt(numText) || 0, 0), 59)
//                 .toString()
//                 .padStart(2, '0');
//               setMinute(limitedText);
//             }}
//             maxLength={2}
//           />
//           <TouchableOpacity
//             style={styles.meridianButton}
//             onPress={() => setMeridian(meridian === "AM" ? "PM" : "AM")}
//           >
//             <Text style={styles.meridianText}>{meridian}</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity 
//           style={styles.proceedButton}
//           onPress={handleProceedReservation}
//         >
//           <Text style={styles.proceedText}>Confirm Reservation</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#8cff8c",
//   },
//   scrollContainer: {
//     padding: 16,
//     paddingBottom: 100,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginVertical: 8,
//   },
//   partySizeContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 16,
//   },
//   partySizeButton: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 20,
//     width: 50,
//     alignItems: "center",
//   },
//   selectedPartySize: {
//     backgroundColor: "#d9ffd9",
//   },
//   partySizeText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   dateHeaderContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   dateHeader: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   calendarContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   date: {
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     margin: 4,
//     backgroundColor: "#fff",
//     borderRadius: 20,
//   },
//   selectedDate: {
//     backgroundColor: "#d9ffd9",
//   },
//   dateText: {
//     fontSize: 14,
//   },
//   timeContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   timeInput: {
//     backgroundColor: "#fff",
//     width: 50,
//     height: 50,
//     textAlign: "center",
//     fontSize: 18,
//     borderRadius: 10,
//     marginHorizontal: 4,
//   },
//   colon: {
//     fontSize: 24,
//   },
//   meridianButton: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 10,
//   },
//   meridianText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   proceedButton: {
//     backgroundColor: "#4caf50",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   proceedText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   availableSlotsContainer: {
//     marginBottom: 16,
//   },
//   timeSlotButton: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   timeSlotText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   timeSlotAvailable: {
//     color: 'green',
//     fontSize: 14,
//   },
//   noSlotsText: {
//     color: 'red',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });

// export default BookingTableScreen;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import axios from "axios";
// import { useRoute, useNavigation } from "@react-navigation/native";

// const BookingTableScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation();

//   // Extract restaurant from navigation params
//   const { restaurant } = route.params;

//   const [partySize, setPartySize] = useState(1);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [hour, setHour] = useState("11");
//   const [minute, setMinute] = useState("00");
//   const [meridian, setMeridian] = useState("AM");
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   // Fetch user profile
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(`http://192.168.18.15:3000/me`, {
//           withCredentials: true,
//         });
//         setUser(response.data.user);
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         Alert.alert("Authentication Error", "Please log in to make a reservation");
//         navigation.goBack();
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   // Process available time slots when restaurant is loaded
//   useEffect(() => {
//     if (restaurant && restaurant.availableTimeSlots) {
//       // Get current day of the week
//       const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//       const today = days[new Date().getDay()];

//       // Find time slots for today
//       const todaySlots = restaurant.availableTimeSlots.find((slot) => slot.day === today);

//       if (todaySlots) {
//         // Filter slots that haven't reached max reservations
//         const availableTimeSlots = todaySlots.slots.filter(
//           (slot) => slot.currentReservations < slot.maxReservations
//         );
//         setAvailableSlots(availableTimeSlots);
//       }

//       setIsLoading(false);
//     }
//   }, [restaurant]);

//   // Validate time input
//   const validateTimeInput = () => {
//     // Convert hour and minute to 24-hour format
//     let convertedHour = parseInt(hour);
//     if (meridian === "PM" && convertedHour !== 12) {
//       convertedHour += 12;
//     } else if (meridian === "AM" && convertedHour === 12) {
//       convertedHour = 0;
//     }

//     // Format time as HH:MM
//     const formattedTime = `${convertedHour.toString().padStart(2, "0")}:${minute}`;

//     // Check if the time is in available slots
//     const isTimeAvailable = availableSlots.some((slot) => slot.time === formattedTime);

//     return {
//       isValid: isTimeAvailable,
//       formattedTime,
//     };
//   };

//   const handleProceedReservation = async () => {
//     // Validate inputs
//     if (!selectedDate) {
//       Alert.alert("Validation Error", "Please select a date");
//       return;
//     }

//     const { isValid, formattedTime } = validateTimeInput();
//     if (!isValid) {
//       Alert.alert("Invalid Time", "The selected time is not available. Please choose another time.");
//       return;
//     }

//     // Prepare reservation data
//     const reservationData = {
//       userId: user._id,
//       restaurantId: restaurant._id,
//       partySize,
//       date: new Date(new Date().getFullYear(), 0, selectedDate), 
//       time: formattedTime,
//     };

//     try {
//       // Send reservation request
//       const response = await axios.post(
//         "http://192.168.18.15:3000/reservations",
//         reservationData,
//         { withCredentials: true }
//       );

//       // Show success message
//       Alert.alert(
//         "Reservation Confirmed",
//         `Your table for ${partySize} people at ${restaurant.name} is booked!`,
//         [
//           {
//             text: "OK",
//             onPress: () => navigation.navigate("Home"),
//           },
//         ]
//       );
//     } catch (error) {
//       console.error("Reservation Error:", error);
//       Alert.alert("Reservation Failed", "Unable to complete reservation. Please try again.");
//     }
//   };

//   if (isLoading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.title}>Book a Table at {restaurant.name}</Text>

//         <Text style={styles.label}>Party size</Text>
//         <View style={styles.partySizeContainer}>
//           {[1, 2, 4, 5, 6, 7, 8, 9].map((size) => (
//             <TouchableOpacity
//               key={size}
//               style={[
//                 styles.partySizeButton,
//                 partySize === size && styles.selectedPartySize,
//               ]}
//               onPress={() => setPartySize(size)}
//             >
//               <Text style={styles.partySizeText}>{size}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Text style={styles.label}>Date</Text>
//         <View style={styles.dateHeaderContainer}>
//           <Text style={styles.dateHeader}>Jan</Text>
//           <Text style={styles.dateHeader}>2024</Text>
//         </View>
//         <View style={styles.calendarContainer}>
//           {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
//             <TouchableOpacity
//               key={day}
//               style={[
//                 styles.date,
//                 selectedDate === day && styles.selectedDate,
//               ]}
//               onPress={() => setSelectedDate(day)}
//             >
//               <Text style={styles.dateText}>{day}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Text style={styles.label}>Available Time Slots</Text>
//         <View style={styles.availableSlotsContainer}>
//           {availableSlots.length > 0 ? (
//             availableSlots.map((slot, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.timeSlotButton}
//                 onPress={() => {
//                   // Parse the time slot
//                   const [slotHour, slotMinute] = slot.time.split(":");
//                   let meridian = "AM";
//                   let displayHour = parseInt(slotHour);

//                   if (displayHour >= 12) {
//                     meridian = "PM";
//                     if (displayHour > 12) {
//                       displayHour -= 12;
//                     }
//                   }

//                   setHour(displayHour.toString());
//                   setMinute(slotMinute);
//                   setMeridian(meridian);
//                 }}
//               >
//                 <Text style={styles.timeSlotText}>{slot.time}</Text>
//                 <Text style={styles.timeSlotAvailable}>
//                   {slot.maxReservations - slot.currentReservations} slots available
//                 </Text>
//               </TouchableOpacity>
//             ))
//           ) : (
//             <Text style={styles.noSlotsText}>No available time slots</Text>
//           )}
//         </View>

//         <Text style={styles.label}>Enter Time</Text>
//         <View style={styles.timeContainer}>
//           <TextInput
//             style={styles.timeInput}
//             value={hour}
//             keyboardType="numeric"
//             onChangeText={(text) => {
//               // Limit hour to 1-12
//               const numText = text.replace(/[^0-9]/g, "");
//               const limitedText = Math.min(Math.max(parseInt(numText) || 1, 1), 12).toString();
//               setHour(limitedText);
//             }}
//             maxLength={2}
//           />
//           <Text style={styles.colon}>:</Text>
//           <TextInput
//             style={styles.timeInput}
//             value={minute}
//             keyboardType="numeric"
//             onChangeText={(text) => {
//               // Limit minute to 0-59
//               const numText = text.replace(/[^0-9]/g, "");
//               const limitedText = Math.min(Math.max(parseInt(numText) || 0, 0), 59)
//                 .toString()
//                 .padStart(2, "0");
//               setMinute(limitedText);
//             }}
//             maxLength={2}
//           />
//           <TouchableOpacity
//             style={styles.meridianButton}
//             onPress={() => setMeridian(meridian === "AM" ? "PM" : "AM")}
//           >
//             <Text style={styles.meridianText}>{meridian}</Text>
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity
//           style={styles.proceedButton}
//           onPress={handleProceedReservation}
//         >
//           <Text style={styles.proceedText}>Confirm Reservation</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#8cff8c",
//   },
//   scrollContainer: {
//     padding: 16,
//     paddingBottom: 100,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginVertical: 8,
//   },
//   partySizeContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 16,
//   },
//   partySizeButton: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 20,
//     width: 50,
//     alignItems: "center",
//   },
//   selectedPartySize: {
//     backgroundColor: "#d9ffd9",
//   },
//   partySizeText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   dateHeaderContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   dateHeader: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   calendarContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   date: {
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     margin: 4,
//     backgroundColor: "#fff",
//     borderRadius: 20,
//   },
//   selectedDate: {
//     backgroundColor: "#d9ffd9",
//   },
//   dateText: {
//     fontSize: 14,
//   },
//   timeContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   timeInput: {
//     backgroundColor: "#fff",
//     width: 50,
//     height: 50,
//     textAlign: "center",
//     fontSize: 18,
//     borderRadius: 10,
//     marginHorizontal: 4,
//   },
//   colon: {
//     fontSize: 24,
//   },
//   meridianButton: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 10,
//   },
//   meridianText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   proceedButton: {
//     backgroundColor: "#4caf50",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   proceedText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   availableSlotsContainer: {
//     marginBottom: 16,
//   },
//   timeSlotButton: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   timeSlotText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   timeSlotAvailable: {
//     color: "green",
//     fontSize: 14,
//   },
//   noSlotsText: {
//     color: "red",
//     textAlign: "center",
//     fontSize: 16,
//   },
// });

// export default BookingTableScreen;


// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import axios from "axios";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import PaystackWebView from "react-native-paystack-webview"; 

// const BookingTableScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation();

//   // Extract restaurant from navigation params
//   const { restaurant } = route.params;

//   const [partySize, setPartySize] = useState(1);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [recentDates, setRecentDates] = useState([]);
//   const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);

//   // Fetch user profile
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(`http://192.168.18.15:3000/me`, {
//           withCredentials: true,
//         });
//         setUser(response.data.user);
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         Alert.alert("Authentication Error", "Please log in to make a reservation");
//         navigation.goBack();
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   // Generate recent dates (next 30 days)
//   useEffect(() => {
//     const today = new Date();
//     const dates = [];
//     for (let i = 0; i < 30; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);
//       dates.push(date);
//     }
//     setRecentDates(dates);
//   }, []);

//   // Process available time slots when restaurant is loaded
//   useEffect(() => {
//     if (restaurant && restaurant.availableTimeSlots) {
//       // Get current day of the week
//       const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//       const today = days[new Date().getDay()];

//       // Find time slots for today
//       const todaySlots = restaurant.availableTimeSlots.find((slot) => slot.day === today);

//       if (todaySlots) {
//         // Filter slots that haven't reached max reservations
//         const availableTimeSlots = todaySlots.slots.filter(
//           (slot) => slot.currentReservations < slot.maxReservations
//         );
//         setAvailableSlots(availableTimeSlots);
//       }

//       setIsLoading(false);
//     }
//   }, [restaurant]);



//   const handleProceedReservation = async () => {
//     // Validate inputs
//     if (!user) {
//       Alert.alert("Authentication Error", "User information is missing");
//       return;
//     }
  
//     if (!restaurant) {
//       Alert.alert("Error", "Restaurant information is missing");
//       return;
//     }
  
//     if (!selectedDate) {
//       Alert.alert("Validation Error", "Please select a date");
//       return;
//     }
  
//     if (!selectedTimeSlot) {
//       Alert.alert("Validation Error", "Please select a time slot");
//       return;
//     }
  
//     // Log the user object for debugging
//     console.log("User Object:", user);
  
//     // Ensure userId is present
//     if (!user._id) {
//       Alert.alert("Authentication Error", "User ID is missing");
//       return;
//     }
  
//     // Get day of the week for the selected date
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const selectedDay = days[selectedDate.getDay()];
  
//     // Find the matching day in restaurant's available time slots
//     const dayTimeSlots = restaurant.availableTimeSlots.find(slot => slot.day === selectedDay);
  
//     // Validate time slot against restaurant's available slots
//     const matchingSlot = dayTimeSlots?.slots.find(
//       slot => 
//         slot.time === selectedTimeSlot.time && 
//         slot.currentReservations < slot.maxReservations
//     );
  
//     if (!matchingSlot) {
//       Alert.alert("Validation Error", "Selected time slot is no longer available");
//       return;
//     }
  
//     // Prepare reservation data
//     const reservationData = {
//       userId: user._id, // Ensure userId is included
//       restaurantId: restaurant._id,
//       partySize,
//       date: selectedDate.toISOString(), // Convert to ISO string for consistency
//       time: selectedTimeSlot.time,
//       timeSlotIndex: restaurant.availableTimeSlots
//         .findIndex(slot => slot.day === selectedDay) // Track which time slot was used
//     };
  
//     // Log the exact data being sent for debugging
//     console.log("Reservation Data:", JSON.stringify(reservationData, null, 2));
  
//     try {
//       const response = await axios.post(
//         "http://192.168.18.15:3000/reservations",
//         reservationData,
//         { 
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );
  
//       // Show Paystack payment modal
//       Alert.alert(
//         "Payment Required",
//         `Please pay the reservation fee of R${restaurant.pricePerReservation} to confirm your reservation.`,
//         [
//           {
//             text: "Pay Now",
//             onPress: () => {
//               // Open Paystack WebView
//               setIsLoading(true);
//             },
//           },
//           {
//             text: "Cancel",
//             style: "cancel",
//           },
//         ]
//       );
//     } catch (error) {
//       // More detailed error logging
//       console.error("Full Error Object:", error);
//       console.error("Error Response:", error.response?.data);
//       console.error("Error Status:", error.response?.status);
  
//       // More informative error message
//       Alert.alert(
//         "Reservation Failed", 
//         error.response?.data?.message || 
//         "Unable to complete reservation. Please check your information and try again."
//       );
//     }
//   };
//    if (isLoading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.title}>Book a Table at {restaurant.name}</Text>

//         <Text style={styles.label}>Party size</Text>
//         <View style={styles.partySizeContainer}>
//           {[1, 2, 4, 5, 6, 7, 8, 9].map((size) => (
//             <TouchableOpacity
//               key={size}
//               style={[
//                 styles.partySizeButton,
//                 partySize === size && styles.selectedPartySize,
//               ]}
//               onPress={() => setPartySize(size)}
//             >
//               <Text style={styles.partySizeText}>{size}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Text style={styles.label}>Date</Text>
//         <View style={styles.calendarContainer}>
//           {recentDates.map((date, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.date,
//                 selectedDate && selectedDate.toDateString() === date.toDateString() && styles.selectedDate,
//               ]}
//               onPress={() => setSelectedDate(date)}
//             >
//               <Text style={styles.dateText}>{date.getDate()}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Text style={styles.label}>Available Time Slots</Text>
//         <View style={styles.availableSlotsContainer}>
//           {availableSlots.length > 0 ? (
//             availableSlots.map((slot, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.timeSlotButton,
//                   selectedTimeSlot === slot && styles.selectedTimeSlot,
//                 ]}
//                 onPress={() => setSelectedTimeSlot(slot)}
//               >
//                 <Text style={styles.timeSlotText}>{slot.time}</Text>
//                 <Text style={styles.timeSlotAvailable}>
//                   {slot.maxReservations - slot.currentReservations} slots available
//                 </Text>
//               </TouchableOpacity>
//             ))
//           ) : (
//             <Text style={styles.noSlotsText}>No available time slots</Text>
//           )}
//         </View>

//         <TouchableOpacity
//           style={styles.proceedButton}
//           onPress={handleProceedReservation}
//         >
//           <Text style={styles.proceedText}>Confirm Reservation</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Paystack WebView */}
//       {isLoading && (
//         <PaystackWebView
//           paystackKey="pk_test_5f35a180bfaa14a47164a37e623cbde8520df5fd"
//           amount={restaurant.pricePerReservation *100} 
//           currency='ZAR'
//           billingEmail="sphllzulu@gmail.com"
//           billingName={`${user.firstName} ${user.lastName}`}
//           activityIndicatorColor="blue"
//           onCancel={(e) => {
//             setIsLoading(false);
//             Alert.alert("Payment Cancelled", "Your reservation was not confirmed.");
//           }}
//           onSuccess={(res) => {
//             setIsLoading(false);
//             Alert.alert("Payment Successful", "Your reservation is confirmed!", [
//               { text: "OK", onPress: () => navigation.navigate("Home") },
//             ]);
//           }}
//           autoStart={true}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#8cff8c",
//   },
//   scrollContainer: {
//     padding: 16,
//     paddingBottom: 100,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginVertical: 8,
//   },
//   partySizeContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 16,
//   },
//   partySizeButton: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 20,
//     width: 50,
//     alignItems: "center",
//   },
//   selectedPartySize: {
//     backgroundColor: "#d9ffd9",
//   },
//   partySizeText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   calendarContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   date: {
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     margin: 4,
//     backgroundColor: "#fff",
//     borderRadius: 20,
//   },
//   selectedDate: {
//     backgroundColor: "#d9ffd9",
//   },
//   dateText: {
//     fontSize: 14,
//   },
//   availableSlotsContainer: {
//     marginBottom: 16,
//   },
//   timeSlotButton: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   selectedTimeSlot: {
//     backgroundColor: "#d9ffd9",
//   },
//   timeSlotText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   timeSlotAvailable: {
//     color: "green",
//     fontSize: 14,
//   },
//   noSlotsText: {
//     color: "red",
//     textAlign: "center",
//     fontSize: 16,
//   },
//   proceedButton: {
//     backgroundColor: "#4caf50",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   proceedText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default BookingTableScreen;


// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import axios from "axios";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import { CardField, useStripe } from "@stripe/stripe-react-native";

// const BookingTableScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { restaurant } = route.params;
//   const { confirmPayment } = useStripe();

//   const [partySize, setPartySize] = useState(1);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [recentDates, setRecentDates] = useState([]);
//   const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState(null);

//   // Fetch user profile
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(`http://192.168.18.15:3000/me`, {
//           withCredentials: true,
//         });
//         setUser(response.data.user);
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         Alert.alert("Authentication Error", "Please log in to make a reservation");
//         navigation.goBack();
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   // Generate recent dates (next 30 days)
//   useEffect(() => {
//     const today = new Date();
//     const dates = [];
//     for (let i = 0; i < 30; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);
//       dates.push(date);
//     }
//     setRecentDates(dates);
//   }, []);

//   // Process available time slots when restaurant is loaded
//   useEffect(() => {
//     if (restaurant && restaurant.availableTimeSlots) {
//       const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//       const today = days[new Date().getDay()];
//       const todaySlots = restaurant.availableTimeSlots.find((slot) => slot.day === today);

//       if (todaySlots) {
//         const availableTimeSlots = todaySlots.slots.filter(
//           (slot) => slot.currentReservations < slot.maxReservations
//         );
//         setAvailableSlots(availableTimeSlots);
//       }

//       setIsLoading(false);
//     }
//   }, [restaurant]);

//   const handleProceedReservation = async () => {
//     if (!user || !restaurant || !selectedDate || !selectedTimeSlot) {
//       Alert.alert("Validation Error", "Please fill in all required fields.");
//       return;
//     }

//     try {
//       // Create a payment intent on your server
//       const response = await axios.post("http://192.168.18.15:3000/create-payment-intent", {
//         amount: restaurant.pricePerReservation * 100, 
//         currency: "zar",
//       });

//       const { clientSecret } = response.data;
//       setPaymentIntentClientSecret(clientSecret);

//       // Show payment modal
//       Alert.alert(
//         "Payment Required",
//         `Please pay the reservation fee of R${restaurant.pricePerReservation} to confirm your reservation.`,
//         [
//           {
//             text: "Pay Now",
//             onPress: handlePayment,
//           },
//           {
//             text: "Cancel",
//             style: "cancel",
//           },
//         ]
//       );
//     } catch (error) {
//       console.error("Error creating payment intent:", error);
//       Alert.alert("Payment Error", "Unable to process payment. Please try again.");
//     }
//   };

//   const handlePayment = async () => {
//     if (!paymentIntentClientSecret) {
//       Alert.alert("Payment Error", "Payment intent is missing.");
//       return;
//     }

//     try {
//       const { paymentIntent, error } = await confirmPayment(paymentIntentClientSecret, {
//         paymentMethodType: "Card",
//       });

//       if (error) {
//         Alert.alert("Payment Failed", error.message);
//       } else {
//         Alert.alert("Payment Successful", "Your reservation is confirmed!", [
//           { text: "OK", onPress: () => navigation.navigate("Home") },
//         ]);
//       }
//     } catch (error) {
//       console.error("Error confirming payment:", error);
//       Alert.alert("Payment Error", "Unable to confirm payment. Please try again.");
//     }
//   };

//   if (isLoading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.title}>Book a Table at {restaurant.name}</Text>

//         <Text style={styles.label}>Party size</Text>
//         <View style={styles.partySizeContainer}>
//           {[1, 2, 4, 5, 6, 7, 8, 9].map((size) => (
//             <TouchableOpacity
//               key={size}
//               style={[
//                 styles.partySizeButton,
//                 partySize === size && styles.selectedPartySize,
//               ]}
//               onPress={() => setPartySize(size)}
//             >
//               <Text style={styles.partySizeText}>{size}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Text style={styles.label}>Date</Text>
//         <View style={styles.calendarContainer}>
//           {recentDates.map((date, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.date,
//                 selectedDate && selectedDate.toDateString() === date.toDateString() && styles.selectedDate,
//               ]}
//               onPress={() => setSelectedDate(date)}
//             >
//               <Text style={styles.dateText}>{date.getDate()}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Text style={styles.label}>Available Time Slots</Text>
//         <View style={styles.availableSlotsContainer}>
//           {availableSlots.length > 0 ? (
//             availableSlots.map((slot, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.timeSlotButton,
//                   selectedTimeSlot === slot && styles.selectedTimeSlot,
//                 ]}
//                 onPress={() => setSelectedTimeSlot(slot)}
//               >
//                 <Text style={styles.timeSlotText}>{slot.time}</Text>
//                 <Text style={styles.timeSlotAvailable}>
//                   {slot.maxReservations - slot.currentReservations} slots available
//                 </Text>
//               </TouchableOpacity>
//             ))
//           ) : (
//             <Text style={styles.noSlotsText}>No available time slots</Text>
//           )}
//         </View>

//         <TouchableOpacity
//           style={styles.proceedButton}
//           onPress={handleProceedReservation}
//         >
//           <Text style={styles.proceedText}>Confirm Reservation</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Stripe Card Input */}
//       {paymentIntentClientSecret && (
//         <CardField
//           postalCodeEnabled={false}
//           placeholder={{
//             number: "4242 4242 4242 4242",
//           }}
//           cardStyle={{
//             backgroundColor: "#FFFFFF",
//             textColor: "#000000",
//           }}
//           style={{
//             width: "100%",
//             height: 50,
//             marginVertical: 30,
//           }}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#8cff8c",
//   },
//   scrollContainer: {
//     padding: 16,
//     paddingBottom: 100,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginVertical: 8,
//   },
//   partySizeContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 16,
//   },
//   partySizeButton: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 20,
//     width: 50,
//     alignItems: "center",
//   },
//   selectedPartySize: {
//     backgroundColor: "#d9ffd9",
//   },
//   partySizeText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   calendarContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   date: {
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     margin: 4,
//     backgroundColor: "#fff",
//     borderRadius: 20,
//   },
//   selectedDate: {
//     backgroundColor: "#d9ffd9",
//   },
//   dateText: {
//     fontSize: 14,
//   },
//   availableSlotsContainer: {
//     marginBottom: 16,
//   },
//   timeSlotButton: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   selectedTimeSlot: {
//     backgroundColor: "#d9ffd9",
//   },
//   timeSlotText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   timeSlotAvailable: {
//     color: "green",
//     fontSize: 14,
//   },
//   noSlotsText: {
//     color: "red",
//     textAlign: "center",
//     fontSize: 16,
//   },
//   proceedButton: {
//     backgroundColor: "#4caf50",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   proceedText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default BookingTableScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import { CardField, useStripe } from "@stripe/stripe-react-native";

const BookingTableScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { restaurant } = route.params;
  const { confirmPayment } = useStripe();

  const [partySize, setPartySize] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [recentDates, setRecentDates] = useState([]);
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState(null);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://192.168.18.15:3000/me`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        Alert.alert("Authentication Error", "Please log in to make a reservation");
        navigation.goBack();
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Generate recent dates (next 30 days)
  useEffect(() => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    setRecentDates(dates);
  }, []);

  // Process available time slots when restaurant is loaded
  useEffect(() => {
    if (restaurant && restaurant.availableTimeSlots) {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const today = days[new Date().getDay()];
      const todaySlots = restaurant.availableTimeSlots.find((slot) => slot.day === today);

      if (todaySlots) {
        const availableTimeSlots = todaySlots.slots.filter(
          (slot) => slot.currentReservations < slot.maxReservations
        );
        setAvailableSlots(availableTimeSlots);
      }

      setIsLoading(false);
    }
  }, [restaurant]);

  const handleProceedReservation = async () => {
    if (!user) {
      Alert.alert("Authentication Error", "User information is missing");
      return;
    }

    if (!restaurant) {
      Alert.alert("Error", "Restaurant information is missing");
      return;
    }

    if (!selectedDate) {
      Alert.alert("Validation Error", "Please select a date");
      return;
    }

    if (!selectedTimeSlot) {
      Alert.alert("Validation Error", "Please select a time slot");
      return;
    }

    try {
      // Create a payment intent on your server
      const response = await axios.post("http://192.168.18.15:3000/create-payment-intent", {
        amount: restaurant.pricePerReservation * 100, // Convert to cents
        currency: "zar",
      });

      const { clientSecret } = response.data;
      setPaymentIntentClientSecret(clientSecret);

      // Show payment modal
      Alert.alert(
        "Payment Required",
        `Please pay the reservation fee of R${restaurant.pricePerReservation} to confirm your reservation.`,
        [
          {
            text: "Pay Now",
            onPress: handlePayment,
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    } catch (error) {
      console.error("Error creating payment intent:", error);
      Alert.alert("Payment Error", "Unable to process payment. Please try again.");
    }
  };

  const handlePayment = async () => {
    if (!paymentIntentClientSecret) {
      Alert.alert("Payment Error", "Payment intent is missing.");
      return;
    }

    setIsPaymentProcessing(true);

    try {
      const { paymentIntent, error } = await confirmPayment(paymentIntentClientSecret, {
        paymentMethodType: "Card",
      });

      if (error) {
        Alert.alert("Payment Failed", error.message);
      } else {
        Alert.alert("Payment Successful", "Your reservation is confirmed!", [
          { text: "OK", onPress: () => navigation.navigate("Home") },
        ]);
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      Alert.alert("Payment Error", "Unable to confirm payment. Please try again.");
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Book a Table at {restaurant.name}</Text>

        <Text style={styles.label}>Party size</Text>
        <View style={styles.partySizeContainer}>
          {[1, 2, 4, 5, 6, 7, 8, 9].map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.partySizeButton,
                partySize === size && styles.selectedPartySize,
              ]}
              onPress={() => setPartySize(size)}
            >
              <Text style={styles.partySizeText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Date</Text>
        <View style={styles.calendarContainer}>
          {recentDates.map((date, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.date,
                selectedDate && selectedDate.toDateString() === date.toDateString() && styles.selectedDate,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text style={styles.dateText}>{date.getDate()}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Available Time Slots</Text>
        <View style={styles.availableSlotsContainer}>
          {availableSlots.length > 0 ? (
            availableSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeSlotButton,
                  selectedTimeSlot === slot && styles.selectedTimeSlot,
                ]}
                onPress={() => setSelectedTimeSlot(slot)}
              >
                <Text style={styles.timeSlotText}>{slot.time}</Text>
                <Text style={styles.timeSlotAvailable}>
                  {slot.maxReservations - slot.currentReservations} slots available
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noSlotsText}>No available time slots</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.proceedButton}
          onPress={handleProceedReservation}
          disabled={isPaymentProcessing}
        >
          <Text style={styles.proceedText}>Confirm Reservation</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Stripe Card Input */}
      {paymentIntentClientSecret && (
        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={{
            backgroundColor: "#FFFFFF",
            textColor: "#000000",
          }}
          style={{
            width: "100%",
            height: 50,
            marginVertical: 30,
          }}
        />
      )}

      {isPaymentProcessing && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#555",
  },
  partySizeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  partySizeButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 25,
    width: 60,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  selectedPartySize: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  partySizeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  date: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  selectedDate: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  availableSlotsContainer: {
    marginBottom: 20,
  },
  timeSlotButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ddd",
  },
  selectedTimeSlot: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  timeSlotText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  timeSlotAvailable: {
    color: "green",
    fontSize: 16,
  },
  noSlotsText: {
    color: "red",
    textAlign: "center",
    fontSize: 18,
  },
  proceedButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  proceedText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookingTableScreen;