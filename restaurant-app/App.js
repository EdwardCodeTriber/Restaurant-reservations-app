import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Prevent the splash screen from auto-hiding
        await SplashScreen.preventAutoHideAsync();
        
        // Perform any loading or initialization here
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Set ready and hide splash screen
        setIsReady(true);
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        // Always hide splash screen, even if there's an error
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    // Return a view to keep splash screen visible
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <AppNavigator />;
}

