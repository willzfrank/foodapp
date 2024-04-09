import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '../../supabase';

const Register = () => {
  // State variables to store user input and loading state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Function to sign up a new user
  async function signUpNewUser() {
    // Trim input values to remove extra spaces
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Check if name, email, and password are provided
    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      Alert.alert('Error', 'Please enter your name, email, and password');
      return;
    }

    setIsLoading(true); // Set loading state to true
    try {
      // Sign up user with Supabase auth
      const { data, error } = await supabase.auth.signUp({
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      });

      // Show success message if user is registered
      if (data?.user?.role === 'authenticated') {
        Alert.alert(
          'Registration Successful',
          'Please check your email for confirmation'
        );
      }

      // Show error message if registration fails
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Nourish</Text>
        <Text style={[styles.logoText, styles.highlight]}>Now</Text>
      </View>

      {/* Registration Form */}
      <KeyboardAvoidingView style={styles.body}>
        {/* Header */}
        <Text style={styles.headerText}>Register an Account</Text>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={24} color="gray" style={styles.icon} />
          <TextInput
            value={name}
            onChangeText={setName}
            style={[styles.input, styles.blackText]}
            placeholder="Enter your Name"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="email"
            size={24}
            color="gray"
            style={styles.icon}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={[styles.input, styles.blackText]}
            placeholder="Enter your Email"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <AntDesign name="lock1" size={24} color="black" style={styles.icon} />
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={[styles.input, styles.blackText]}
            placeholder="Enter your Password"
            secureTextEntry={true}
          />
        </View>

        {/* Register Button */}
        <Pressable onPress={signUpNewUser} style={styles.button}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </Pressable>

        {/* Link to Login */}
        <Pressable
          onPress={() => router.replace('/login')}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>Already have an Account? Sign In</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fd5c63',
  },
  highlight: {
    marginLeft: 5,
    color: 'white',
    textShadowColor: '#fd5c63',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  body: {
    flex: 1,
    marginTop: 30,
    width: '100%',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 12,
    color: 'grey',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },
  icon: {
    marginLeft: 8,
  },
  input: {
    color: 'gray',
    marginVertical: 10,
    width: 300,
  },
  loader: {
    marginTop: 20,
  },
  blackText: {
    color: 'black',
  },
  button: {
    width: 200,
    backgroundColor: '#fd5c63',
    borderRadius: 6,
    alignSelf: 'center',
    padding: 15,
    marginTop: 50,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  },
});

export default Register;
