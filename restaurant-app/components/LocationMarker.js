import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function LocationMap({ 
  latitude = 40.7128, 
  longitude = -74.0060 
}) {
  const initialRegion = {
    latitude,
    longitude,
    latitudeDelta: 0.01,  
    longitudeDelta: 0.01
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title="Current Location"
          description={`Lat: ${latitude}, Lon: ${longitude}`}
        >
          <View style={styles.markerContainer}>
            <View style={styles.markerDot} />
          </View>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    height: 200,   
    borderRadius: 8,
    overflow: 'hidden', 
    marginTop: 16, 
  },
  map: {
    flex: 1, 
  },
  markerContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  markerDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
    borderWidth: 3,
    borderColor: 'white'
  }
});