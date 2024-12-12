// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import axios from 'axios';

// export default function LandingScreen({ navigation }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check if user is authenticated
//     axios
//       .get('http://192.168.18.15:3000/me', { withCredentials: true })
//       .then((response) => setUser(response.data.user))
//       .catch(() => setUser(null));
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>
//         {user ? `Hello, ${user.username}!` : 'Hello Guest!'}
//       </Text>
//       <Button
//         title="Profile"
//         onPress={() => navigation.navigate(user ? 'Landing' : 'SignIn')}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   text: { fontSize: 20, marginBottom: 20 },
// });


import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function LandingScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://192.168.18.15:3000/me`, 
          { withCredentials: true }
        );
        setUser(response.data.user);
        setIsLoading(false);
      } catch (error) {
        setUser(null);
        setIsLoading(false);
        
        // Only show alert if there's a specific error message
        if (error.response?.data?.message) {
          Alert.alert('Authentication Error', error.response.data.message);
        }
      }
    };

    fetchUserProfile();
  }, []);

  // Handle Sign Out
  const handleSignOut = () => {
    axios
      .post(`http://192.168.18.15:3000/signout`, {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        Alert.alert('Success', 'Signed out successfully');
        navigation.navigate('SignIn');
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message || 'Sign out failed';
        Alert.alert('Sign Out Error', errorMsg);
      });
  };

  // Render loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {user 
          ? `Hello, ${user.firstName} ${user.lastName}!` 
          : 'Hello Guest!'
        }
      </Text>
      
      {user ? (
        <View style={styles.buttonContainer}>
          <Text style={styles.emailText}>Email: {user.email}</Text>
          <Button title="Sign Out" onPress={handleSignOut} />
        </View>
      ) : (
        <Button
          title="Sign In"
          onPress={() => navigation.navigate('SignIn')}
        />
      )}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20 
  },
  text: { 
    fontSize: 20, 
    marginBottom: 20,
    textAlign: 'center'
  },
  emailText: {
    marginBottom: 10,
    fontSize: 16,
    color: 'gray'
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%'
  }
});