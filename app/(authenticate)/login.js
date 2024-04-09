import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkLoginStatus(); // Check if the user is already logged in
  }, []);

  // Function to check if the user is already logged in
  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) router.replace('/(home)'); // Redirect to home if logged in
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  // Function to handle login
  const handleLogin = async () => {
    const trimmedEmail = email.trim(); // Remove extra spaces from email
    const trimmedPassword = password.trim(); // Remove extra spaces from password

    if (!trimmedEmail || !trimmedPassword) {
      // Check if email or password is empty after trimming
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }

    setIsLoading(true); // Set loading state to true
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail, // Use trimmed email
        password: trimmedPassword, // Use trimmed password
      });
      if (error) throw new Error('Invalid email or password'); // Throw error if authentication fails
      const token = data?.session?.access_token;
      await AsyncStorage.setItem('authToken', token); // Store token in AsyncStorage
      await AsyncStorage.setItem('authData', JSON.stringify(data)); // Store data in AsyncStorage

      router.replace('/(home)'); // Redirect to home after successful login
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Error',
        'Failed to log in. Please check your credentials and try again.'
      );
    } finally {
      setIsLoading(false); // Set loading state to false after login attempt
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Nourish</Text>
        <Text style={[styles.text, styles.highlight]}>Now</Text>
      </View>
      <KeyboardAvoidingView style={styles.body}>
        <Text style={styles.subHeaderText}>Log in to your account</Text>
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
        <View style={styles.optionsContainer}>
          <Text style={styles.optionText}>Keep me logged in</Text>
          <Text style={styles.optionText}>Forgot Password?</Text>
        </View>
        <Pressable onPress={handleLogin} style={styles.loginButton}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => router.replace('/register')}
          style={styles.registerButton}
        >
          <Text style={styles.registerButtonText}>
            Don't have an account? Sign Up
          </Text>
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
  header: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fd5c63',
  },
  highlight: {
    marginLeft: 5,
    color: 'white', // Highlight color
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
  subHeaderText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
    color: 'grey',
  },
  blackText: {
    color: 'black', // Apply black text color
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
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  optionText: {
    fontSize: 16,
    color: 'gray',
  },
  loginButton: {
    width: 200,
    backgroundColor: '#fd5c63',
    borderRadius: 6,
    alignSelf: 'center',
    padding: 15,
    marginTop: 50,
  },
  loginButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  registerButton: {
    marginTop: 15,
  },
  registerButtonText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  },
});

export default Login;
