import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password');
      return;
    }

    axios
      .post(
        'http://192.168.0.104:3000/signin',
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        // Optional: You might want to store user info in context/state
        Alert.alert('Success', 'Logged in successfully');
        navigation.navigate('Home');
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message || 'Sign in failed';
        Alert.alert('Sign In Error', errorMsg);
        console.log(error.response?.data);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
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
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <View style={styles.signUpContainer}>
        <Text>Don't have an account? </Text>
        <Button 
          title="Sign Up" 
          onPress={() => navigation.navigate('SignUp')} 
        />
      </View>
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
  title: { 
    fontSize: 24, 
    marginBottom: 20 
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  }
});

