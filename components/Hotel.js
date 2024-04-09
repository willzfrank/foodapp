import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Hotel = ({ item }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/hotel',
      params: {
        id: item.id,
      },
    });
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <Image style={styles.image} source={{ uri: item?.featured_image }} />
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item?.name}</Text>
          <Text style={styles.description}>{item?.description}</Text>
          <Text style={styles.time}>{item?.time}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>{item?.aggregate_rating}</Text>
            <Ionicons name="ios-star" size={15} color="white" />
          </View>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.discountContainer}>
        <MaterialCommunityIcons
          name="brightness-percent"
          size={24}
          color="#1F75FE"
        />
        <Text style={styles.discountText}>20% OFF up to NGN 100</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
    marginVertical: 12,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    aspectRatio: 6 / 4,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    marginTop: 3,
    fontSize: 15,
    fontWeight: '500',
    color: 'gray',
  },
  time: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: '500',
    color: '#505050',
  },
  ratingContainer: {
    backgroundColor: '#006A4E',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 5,
    marginRight: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    textAlign: 'center',
    color: 'white',
  },
  separator: {
    borderWidth: 0.5,
    borderColor: '#C8C8C8',
    marginHorizontal: 10,
    marginVertical: 4,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 5,
  },
  discountText: {
    marginLeft: 2,
    color: '#1F75FE',
    fontWeight: '500',
  },
});

export default Hotel;
