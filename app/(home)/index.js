import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import * as LocationGeocoding from 'expo-location';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Carousel from '../../components/Carousel';
import Categories from '../../components/Categories';
import Hotel from '../../components/Hotel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { items } from '../../utils/data';
import RecommendedItemList from '../../components/RecommendList';

const index = () => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'fetching your location ...'
  );
  const [emailInitials, setEmailInitials] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const assets = useSelector((state) => state.cart.assets);

  useEffect(() => {
    // Function to get data from AsyncStorage
    const getData = async () => {
      const value = await AsyncStorage.getItem('authData');
      const emailValue = JSON.parse(value);
      setUserEmail(emailValue?.user?.email);
    };

    getData();
  }, []);

  // Function to extract initials from email
  const getEmailInitials = (email) => {
    const initials = email
      .split('@')[0] // Split email at '@' and take the first part
      .split('.') // Split the first part at '.' to get initials
      .map((part) => part.charAt(0)) // Take the first character of each part
      .join('') // Join the characters to form initials
      .toUpperCase(); // Convert to uppercase
    return initials;
  };

  useEffect(() => {
    // Call the function to extract initials when userEmail changes
    if (userEmail) {
      const initials = getEmailInitials(userEmail);
      setEmailInitials(initials);
    }
  }, [userEmail]);

  useEffect(() => {
    GetCurrentLocation();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission not granted',
          'Allow nourshnow to use the location service',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }
    })();
  }, []);

  const GetCurrentLocation = async () => {
    let { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.name}, ${item?.postalCode}, ${item?.city}`;

        setDisplayCurrentAddress(address);
      }
    }
  };

  const handleLogout = async () => {
    // Clear authentication token from AsyncStorage or wherever it's stored
    await AsyncStorage.removeItem('authToken');
    // Redirect user to login page
    router.replace('/(authenticate)/login');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          padding: 10,
        }}
      >
        <Octicons name="location" size={24} color="#E52850" />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: '500' }}>Deliver To</Text>
          <Text style={{ color: 'gray', fontSize: 13, marginTop: 3 }}>
            {displayCurrentAddress}
          </Text>
        </View>
        <Pressable
          style={{
            backgroundColor: '#6CB4EE',
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setShowDropdown(true)}
        >
          <Text style={{ color: 'white' }}>{emailInitials}</Text>
        </Pressable>
      </View>

      {/* DROP DOWN */}
      <View style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDropdown}
          onRequestClose={() => setShowDropdown(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable onPress={handleLogout}>
                <Text style={styles.modalText}>Logout</Text>
              </Pressable>
              <Pressable onPress={() => setShowDropdown(false)}>
                <Text style={styles.modalText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: '#C0C0C0',
          paddingVertical: 8,
          paddingHorizontal: 10,
          borderRadius: 11,
          marginTop: 10,
          marginHorizontal: 10,
        }}
      >
        <TextInput placeholder="Search for food, hotels" />
        <AntDesign name="search1" size={24} color="#E52B50" />
      </View>

      <Carousel />

      <Categories />

      <Text
        style={{
          textAlign: 'center',
          marginTop: 7,
          letterSpacing: 4,
          marginBottom: 5,
          color: 'gray',
        }}
      >
        RECOMMEND
      </Text>

      <RecommendedItemList />

      <Text
        style={{
          textAlign: 'center',
          marginTop: 7,
          letterSpacing: 4,
          marginBottom: 5,
          color: 'gray',
        }}
      >
        EXPLORE
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items?.map((item, index) => (
          <View
            key={index}
            style={{
              width: 90,
              borderColor: '#E0E0E0',
              borderWidth: 1,
              paddingVertical: 5,
              paddingHorizontal: 1,
              borderRadius: 5,
              marginLeft: 10,
              marginVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: item?.image }}
            />

            <Text style={{ fontSize: 13, fontWeight: '500', marginTop: 6 }}>
              {item?.name}
            </Text>

            <Text style={{ fontSize: 12, color: 'gray', marginTop: 3 }}>
              {item?.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      <Text
        style={{
          textAlign: 'center',
          marginTop: 7,
          letterSpacing: 4,
          marginBottom: 5,
          color: 'gray',
        }}
      >
        ALL RESTAURANTS
      </Text>

      <View style={{ marginHorizontal: 8 }}>
        {assets?.map((item, index) => {
          return <Hotel key={index} item={item} menu={item?.menu} />;
        })}
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
