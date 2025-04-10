// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";
// import BottomNavigation from "./BottomNavigation";
// import HomeScreen from "../screen/HomeScreen";
// import MapScreen from "../screen/MapScreen";
// import FavouritesScreen from "../screen/FavouritesScreen";
// import ProfileScreen from "../screen/ProfileScreen";
// import RestaurantScreen from "../screen/RestaurantScreen";
// import BookingTableScreen from "../screen/BookingScreen";
// import SignInScreen from "../screens/SignInScreen"
// import SignUpScreen from "../screens/SignUpScreen"

// const Tab = createBottomTabNavigator();

// export default function MainNavigator() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === "Home") {
//               iconName = focused ? "home" : "home-outline";
//             } else if (route.name === "Map") {
//               iconName = focused ? "map" : "map-outline";
//             } else if (route.name === "Favourites") {
//               iconName = focused ? "heart" : "heart-outline";
//             } else if (route.name === "Profile") {
//               iconName = focused ? "person" : "person-outline";
//             } else if (route.name === "Restaurant") {
//               iconName = focused ? "restaurant" : "restaurant-outline";
//             }

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: "green",
//           tabBarInactiveTintColor: "gray",
//           // tabBarBackground: "blue",
//           headerShown: false,

//         })}
//       >
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             tabBar: ({ focused }) => (
//               <BottomNavigation navigation={navigation} currentScreen="Home" />
//             ),
//           }}
//         />
//         {/* <Tab.Screen
//           name="Map"
//           component={MapScreen}
//           options={{
//             tabBar: ({ focused }) => (
//               <BottomNavigation navigation={navigation} currentScreen="Map" />
//             ),
//           }}
//         /> */}
//         {/* <Tab.Screen
//           name="Favorite"
//           component={FavouritesScreen}
//           options={{
//             tabBar: ({ focused }) => (
//               <BottomNavigation navigation={navigation} currentScreen="Favourites" />
//             ),
//           }}
//         /> */}
//         <Tab.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={{
//             tabBar: ({ focused }) => (
//               <BottomNavigation navigation={navigation} currentScreen="Profile" />
//             ),
//           }}
//         />
//         {/* <Tab.Screen
//           name="Restaurant"
//           component={RestaurantScreen}
//           options={{
//             tabBar: ({ focused }) => (
//               <BottomNavigation navigation={navigation} currentScreen="Restaurant" />
//             ),
//           }}
//         /> */}
//         <Tab.Screen
//           name="Booking"
//           component={BookingTableScreen}
//           options={{
//             tabBar: ({ focused }) => (
//               <BottomNavigation navigation={navigation} currentScreen="Booking" />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="SignIn"
//           component={SignInScreen}
//           options={{
//             tabBar: ({ focused }) => (
//               <BottomNavigation navigation={navigation} currentScreen="SignInScreen"/>
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="SignUp"
//           component={SignUpScreen}
//           options={{
//             tabBar: ({ focused }) => (
//               <BottomNavigation navigation={navigation} currentScreen="SignUpScreen"/>
//             ),
//           }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";
// import { Ionicons } from "@expo/vector-icons";

// // Import Screens
// import HomeScreen from "../screen/HomeScreen";
// import MapScreen from "../screen/MapScreen";
// import FavouritesScreen from "../screen/FavouritesScreen";
// import ProfileScreen from "../screen/ProfileScreen";
// import RestaurantScreen from "../screen/RestaurantScreen";
// import BookingTableScreen from "../screen/BookingScreen";
// import SignInScreen from "../screens/SignInScreen";
// import SignUpScreen from "../screens/SignUpScreen";

// // Create Bottom Tab Navigator
// const Tab = createBottomTabNavigator();

// // Create Stack Navigator for Screens Not in Bottom Tab
// const Stack = createStackNavigator();

// // Main Stack Navigator for Screens Not in Bottom Tab
// function MainStackNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Map" component={MapScreen} />
//       <Stack.Screen name="Favourites" component={FavouritesScreen} />
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//       <Stack.Screen name="Restaurant" component={RestaurantScreen} />
//       <Stack.Screen name="BookingTable" component={BookingTableScreen} />
//     </Stack.Navigator>
//   );
// }

// // Authentication Stack Navigator for SignIn and SignUp
// function AuthStackNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="SignIn" component={SignInScreen} />
//       <Stack.Screen name="SignUp" component={SignUpScreen} />
//     </Stack.Navigator>
//   );
// }

// // Main Navigator Component
// export default function MainNavigator() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === "Home") {
//               iconName = focused ? "home" : "home-outline";
//             } else if (route.name === "Map") {
//               iconName = focused ? "map" : "map-outline";
//             } else if (route.name === "Favourites") {
//               iconName = focused ? "heart" : "heart-outline";
//             } else if (route.name === "Profile") {
//               iconName = focused ? "person" : "person-outline";
//             } else if (route.name === "Auth") {
//               iconName = focused ? "log-in" : "log-in-outline";
//             }

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: "#4CAF50", // Green for active tab
//           tabBarInactiveTintColor: "gray", // Gray for inactive tab
//           tabBarStyle: {
//             backgroundColor: "#F5F5F5", // Light background for the tab bar
//             borderTopWidth: 0, // Remove top border
//           },
//           headerShown: false,
//         })}
//       >
//         <Tab.Screen name="Home" component={MainStackNavigator} />
//         <Tab.Screen name="Auth" component={AuthStackNavigator} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";
// import { Ionicons } from "@expo/vector-icons";

// // Import Screens
// import HomeScreen from "../screen/HomeScreen";
// import MapScreen from "../screen/MapScreen";
// import FavouritesScreen from "../screen/FavouritesScreen";
// import ProfileScreen from "../screen/ProfileScreen";
// import RestaurantScreen from "../screen/RestaurantScreen";
// import BookingTableScreen from "../screen/BookingScreen";
// import SignInScreen from "../screens/SignInScreen";
// import SignUpScreen from "../screens/SignUpScreen";

// // Create Bottom Tab Navigator
// const Tab = createBottomTabNavigator();

// // Create Stack Navigator for Screens with Top Navigation
// const Stack = createStackNavigator();

// // Main Stack Navigator for Screens Not in Bottom Tab
// function MainStackNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Map" component={MapScreen} />
//       <Stack.Screen name="Favourites" component={FavouritesScreen} />
//       <Stack.Screen name="Restaurant" component={RestaurantScreen} />
//       <Stack.Screen name="BookingTable" component={BookingTableScreen} />
//     </Stack.Navigator>
//   );
// }

// // Authentication Stack Navigator for SignIn and SignUp
// function AuthStackNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="SignIn" component={SignInScreen} />
//       <Stack.Screen name="SignUp" component={SignUpScreen} />
//     </Stack.Navigator>
//   );
// }

// // Profile Stack Navigator with Top Navigation
// function ProfileStackNavigator() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           headerTitle: "Profile",
//           headerStyle: {
//             backgroundColor: "#4CAF50", // Green header background
//           },
//           headerTintColor: "#fff", // White text color
//           headerTitleStyle: {
//             fontWeight: "bold",
//           },
//         }}
//       />
//     </Stack.Navigator>
//   );
// }

// // Main Navigator Component
// export default function MainNavigator() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === "Home") {
//               iconName = focused ? "home" : "home-outline";
//             } else if (route.name === "Map") {
//               iconName = focused ? "map" : "map-outline";
//             } else if (route.name === "Favourites") {
//               iconName = focused ? "heart" : "heart-outline";
//             } else if (route.name === "Profile") {
//               iconName = focused ? "person" : "person-outline";
//             } else if (route.name === "Auth") {
//               iconName = focused ? "log-in" : "log-in-outline";
//             }

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: "#4CAF50", // Green for active tab
//           tabBarInactiveTintColor: "gray", // Gray for inactive tab
//           tabBarStyle: {
//             backgroundColor: "#F5F5F5", // Light background for the tab bar
//             borderTopWidth: 0, // Remove top border
//           },
//           headerShown: false,
//         })}
//       >
//         <Tab.Screen name="Home" component={MainStackNavigator} />
//         <Tab.Screen name="Profile" component={ProfileStackNavigator} />
//         <Tab.Screen name="Auth" component={AuthStackNavigator} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Image, View, StyleSheet } from "react-native";
import HomeScreen from "../screen/HomeScreen";
import MapScreen from "../screen/MapScreen";
import FavouritesScreen from "../screen/FavouritesScreen";
import ProfileScreen from "../screen/ProfileScreen";
import RestaurantScreen from "../screen/RestaurantScreen";
import BookingTableScreen from "../screen/BookingScreen";
import SignInScreen from "../screens/SignInScreen";
import { useEffect } from "react";
import SignUpScreen from "../screens/SignUpScreen";
import { TouchableOpacity, Text } from "react-native";
import SplashScreen from '../Splash/SplashScreen'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom Header Component with Logo and Auth
const CustomHeader = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <View style={styles.logoContainer}>
      <Image
        source={require("../assets/Logo.png")}
        style={styles.logoImage}
        resizeMode="cover"
      />
    </View>
    <TouchableOpacity
      style={styles.authButton}
      onPress={() => navigation.navigate("Auth")}
    >
      <Ionicons name="person-circle-outline" size={24} color="#4CAF50" />
      <Text style={styles.authText}>Sign In</Text>
    </TouchableOpacity>
  </View>
);

// Main Stack Navigator
function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitle: () => <CustomHeader navigation={navigation} />,
        headerStyle: {
          backgroundColor: "lightgrey",
          height: 110,
        },
        headerTitleAlign: "center",
        headerTitleContainerStyle: {
          width: "100%",
        },
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Favourites" component={FavouritesScreen} />
      <Stack.Screen name="Restaurant" component={RestaurantScreen} />
      <Stack.Screen name="BookingTable" component={BookingTableScreen} />
    </Stack.Navigator>
  );
}

// Authentication Stack Navigator
function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

// Profile Stack Navigator
function ProfileStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: () => <CustomHeader navigation={navigation} />,
          headerStyle: {
            backgroundColor: "#4CAF50",
            height: 110,
          },
          headerTitleAlign: "center",
          headerTitleContainerStyle: {
            width: "100%",
          },
        })}
      />
    </Stack.Navigator>
  );
}

// Main Navigator Component
export default function MainNavigator() {
  const Stack = createStackNavigator();

  useEffect(() => {
    // Simulate a delay for the splash screen
    const timer = setTimeout(() => {
      // Navigate to the main app after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainApp" component={TabNavigator} />
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Tab Navigator Component
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "restaurant" : "restaurant-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Favourites") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#F5F5F5",
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={MainStackNavigator} />

      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  authButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  authText: {
    marginLeft: 5,
    color: "#4CAF50",
    fontWeight: "600",
  },
});
