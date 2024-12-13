import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import BottomNavigation from "./BottomNavigation";
import HomeScreen from "../screen/HomeScreen";
import MapScreen from "../screen/MapScreen";
import FavouritesScreen from "../screen/FavouritesScreen";
import ProfileScreen from "../screen/ProfileScreen";
import RestaurantScreen from "../screen/RestaurantScreen";
import BookingTableScreen from "../screen/BookingScreen";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Map") {
              iconName = focused ? "map" : "map-outline";
            } else if (route.name === "Favourites") {
              iconName = focused ? "heart" : "heart-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Restaurant") {
              iconName = focused ? "restaurant" : "restaurant-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
          // tabBarBackground: "blue",
          headerShown: false,
          headerBackground: "#40C3DB",
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBar: ({ focused }) => (
              <BottomNavigation navigation={navigation} currentScreen="Home" />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBar: ({ focused }) => (
              <BottomNavigation navigation={navigation} currentScreen="Map" />
            ),
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={FavouritesScreen}
          options={{
            tabBar: ({ focused }) => (
              <BottomNavigation navigation={navigation} currentScreen="Favourites" />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBar: ({ focused }) => (
              <BottomNavigation navigation={navigation} currentScreen="Profile" />
            ),
          }}
        />
        <Tab.Screen
          name="Restaurant"
          component={RestaurantScreen}
          options={{
            tabBar: ({ focused }) => (
              <BottomNavigation navigation={navigation} currentScreen="Restaurant" />
            ),
          }}
        />
        <Tab.Screen
          name="Booking"
          component={BookingTableScreen}
          options={{
            tabBar: ({ focused }) => (
              <BottomNavigation navigation={navigation} currentScreen="Booking" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
