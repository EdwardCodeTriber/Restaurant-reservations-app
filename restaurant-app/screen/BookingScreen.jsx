import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import { CardField, useStripe } from "@stripe/stripe-react-native";

const BookingTableScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { confirmPayment } = useStripe();

  const { restaurant } = route.params;

  const [partySize, setPartySize] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState(null);
  const [recentDates, setRecentDates] = useState([]);
  const [paymentError, setPaymentError] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Pending"); // Default status

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/me`, {
          withCredentials: true,
        });
        setUser(response.data.user);
        setCustomerName(response.data.user.name); 
        setEmailAddress(response.data.user.email); 
      } catch (error) {
        // handleError(error, "Error fetching user profile");
        navigation.goBack();
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const today = new Date();
    const dates = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date;
    });
    setRecentDates(dates);
  }, []);

  useEffect(() => {
    if (restaurant?.availableTimeSlots) {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const today = days[new Date().getDay()];
      
      const todaySlots = restaurant.availableTimeSlots.find(
        (slot) => slot.day === today
      );

      if (todaySlots) {
        const availableTimeSlots = todaySlots.slots.filter(
          (slot) => slot.currentReservations < slot.maxReservations
        );
        setAvailableSlots(availableTimeSlots);
      }

      setIsLoading(false);
    }
  }, [restaurant]);

  const handleError = (error, title = "Error") => {
    console.error("Error details:", error);
    const message = error.response?.data?.message || error.message || "An unexpected error occurred";
    Alert.alert(title, message);
    setIsProcessing(false);
    setPaymentError(message);
  };

  const handlePayment = async (reservationId) => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/create-payment-intent`,
        {
          amount: restaurant.pricePerReservation * 100,
          currency: 'zar',
        }
      );

      const { clientSecret } = response.data;

      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
      });

      if (error) {
        throw new Error(error.message);
      }

      if (paymentIntent.status === 'Succeeded') {
        setPaymentStatus("Confirmed"); // Update payment status
        Alert.alert(
          "Reservation Confirmed!",
          "Your table has been successfully booked.",
          [{ text: "OK", onPress: () => navigation.navigate("Home", { refresh: true }) }]
        );
      }
    } catch (error) {
      handleError(error, "Payment Failed");
    }
  };

  const handleProceedReservation = async () => {
    try {
      setIsProcessing(true);
      setPaymentError(null);

      if (!user?._id) throw new Error("Please log in to make a reservation");
      if (!selectedDate) throw new Error("Please select a date");
      if (!selectedTimeSlot) throw new Error("Please select a time slot");
      if (!customerName) throw new Error("Please enter your name");
      if (!emailAddress) throw new Error("Please enter your email address");

      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const selectedDay = days[selectedDate.getDay()];
      
      const dayTimeSlots = restaurant.availableTimeSlots.find(
        slot => slot.day === selectedDay
      );

      const matchingSlot = dayTimeSlots?.slots.find(
        slot => 
          slot.time === selectedTimeSlot.time && 
          slot.currentReservations < slot.maxReservations
      );

      if (!matchingSlot) {
        throw new Error("Selected time slot is no longer available");
      }

      const reservationData = {
        userId: user._id,
        restaurantId: restaurant._id,
        partySize,
        date: selectedDate.toISOString(),
        time: selectedTimeSlot.time,
        timeSlotIndex: restaurant.availableTimeSlots.findIndex(
          slot => slot.day === selectedDay
        ),
        notificationsEnabled: user.notificationsEnabled,
        customerName,
        emailAddress,
        paymentStatus, // Include payment status
      };

      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/reservations`,
        reservationData,
        { withCredentials: true }
      );

      await handlePayment(response.data.reservationId);
      navigation.navigate("Home", { refresh: true });
      
    } catch (error) {
      handleError(error, "Reservation Failed");
    } finally {
      setIsProcessing(false);
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

        {/* Customer Name Field */}
        <View style={styles.section}>
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={customerName}
            onChangeText={setCustomerName}
          />
        </View>

        {/* Email Address Field */}
        <View style={styles.section}>
          <Text style={styles.label}>Your Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            value={emailAddress}
            onChangeText={setEmailAddress}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Select Party Size</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                  <Text 
                    style={[
                      styles.partySizeText,
                      partySize === size && styles.selectedPartySizeText
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.calendarContainer}>
              {recentDates.map((date, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateButton,
                    selectedDate?.toDateString() === date.toDateString() && 
                    styles.selectedDate,
                  ]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text style={styles.dateWeekday}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </Text>
                  <Text style={styles.dateText}>
                    {date.getDate()}
                  </Text>
                  <Text style={styles.dateMonth}>
                    {date.toLocaleDateString('en-US', { month: 'short' })}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Available Times</Text>
          <View style={styles.timeSlotsContainer}>
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
                  <Text 
                    style={[
                      styles.timeSlotText,
                      selectedTimeSlot === slot && styles.selectedTimeSlotText
                    ]}
                  >
                    {slot.time}
                  </Text>
                  <Text style={styles.availabilityText}>
                    {slot.maxReservations - slot.currentReservations} available
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noSlotsText}>
                No available time slots for this date
              </Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Payment Details</Text>
          <CardField
            postalCodeEnabled={false}
            placeholder={{
              number: "4242 4242 4242 4242"
            }}
            cardStyle={{
              backgroundColor: "#F5F5F5",
              textColor: "#1a1a1a",
            }}
            style={{
              width: "100%",
              height: 50,
              marginVertical: 8,
            }}
          />
        </View>

        {paymentError && (
          <Text style={styles.errorText}>{paymentError}</Text>
        )}

        <TouchableOpacity
          style={[
            styles.proceedButton,
            (!selectedDate || !selectedTimeSlot || isProcessing || !customerName || !emailAddress) && 
            styles.disabledButton
          ]}
          onPress={handleProceedReservation}
          disabled={!selectedDate || !selectedTimeSlot || isProcessing || !customerName || !emailAddress}
        >
          {isProcessing ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.proceedText}>
              Confirm Reservation (R{restaurant.pricePerReservation})
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 24,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  partySizeContainer: {
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  partySizeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedPartySize: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  partySizeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  selectedPartySizeText: {
    color: "#ffffff",
  },
  calendarContainer: {
    flexDirection: "row",
    paddingHorizontal: 4,
  },
  dateButton: {
    width: 70,
    height: 80,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedDate: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  dateWeekday: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  dateMonth: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
  },
  timeSlotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeSlotButton: {
    width: "48%",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedTimeSlot: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  selectedTimeSlotText: {
    color: "#ffffff",
  },
  availabilityText: {
    fontSize: 12,
    color: "#666666",
  },
  noSlotsText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    width: "100%",
    marginTop: 12,
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
  },
  proceedButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  proceedText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BookingTableScreen;