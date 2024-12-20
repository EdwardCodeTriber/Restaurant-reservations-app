
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StripeProvider } from '@stripe/stripe-react-native';
import MainNavigator from "./Navigation/MainNavigator";



export default function App() {
  

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PK}
      merchantIdentifier="merchant.com.{{ThaLele}}"
    >
      <MainNavigator />
    </StripeProvider>
  );
}