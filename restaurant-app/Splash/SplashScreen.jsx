import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import SplashGif from '../assets/splash.gif';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={SplashGif}
    //    style={styles.gif} 
       />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: "auto",
    height: "auto",
  },
});

export default SplashScreen;