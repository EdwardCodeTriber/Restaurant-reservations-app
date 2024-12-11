// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import axios from 'axios';

// export default function SignUpScreen({ navigation }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignUp = () => {
//     axios
//       .post('http://192.168.18.15:3000/signup', { username, password }, { withCredentials: true })
//       .then(() => navigation.navigate('SignIn'))
//       .catch((error) => console.log(error.response.data));
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign Up</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <Button title="Sign Up" onPress={handleSignUp} />
//       <Button title="Sign In" onPress={() => navigation.navigate('SignIn')} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontSize: 24, marginBottom: 20 },
//   input: {
//     width: '80%',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
// });

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSignUp = () => {
    // Basic validation
    if (!email || !password || !firstName || !lastName) {
      Alert.alert('Validation Error', 'Please fill in all fields');
      return;
    }

    axios
      .post('http://192.168.18.15:3000/signup', { 
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
      <Button title="Sign Up" onPress={handleSignUp} />
      <View style={styles.signInContainer}>
        <Text>Already have an account? </Text>
        <Button 
          title="Sign In" 
          onPress={() => navigation.navigate('SignIn')} 
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
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  }
});