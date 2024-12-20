
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignUp = () => {
   
    if (!email || !password || !firstName || !lastName) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    axios
      .post(`${process.env.EXPO_PUBLIC_API_URL}/signup`, { 
        email, 
        password, 
        firstName, 
        lastName 
      }, { withCredentials: true })
      .then((response) => {
        Alert.alert('Success', 'Account created successfully');
        navigation.navigate('SignIn');
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message || 'Sign up failed';
        Alert.alert('Sign Up Error', errorMsg);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.signInContainer}>
        <Text style={styles.signInText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5', // Light background color
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333', // Dark text color
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd', // Light border color
    borderWidth: 1,
    borderRadius: 8, // Rounded corners
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff', // White background for input fields
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4CAF50', // Green button color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 16,
    color: '#555', // Neutral text color
  },
  signInLink: {
    color: '#4CAF50', // Green link color
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline', // Underline for the link
  },
});