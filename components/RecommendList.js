import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { recommended } from '../utils/data';

const RecommendedItems = ({ item }) => {
  const { name, type, time, image } = item;

  return (
    <View style={styles.itemContainer}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.type}>{type}</Text>
        <View style={styles.timeContainer}>
          <Ionicons name="ios-time" size={24} color="green" />
          <Text style={styles.time}>{time} mins</Text>
        </View>
      </View>
    </View>
  );
};

const RecommendedItemList = () => {
  return (
    <FlatList
      data={recommended}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <RecommendedItems item={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 10,
    borderRadius: 8,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 7,
  },
  detailsContainer: {
    padding: 10,
    flexDirection: 'column',
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
  },
  type: {
    marginTop: 3,
    color: 'gray',
    fontWeight: '500',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  time: {
    marginLeft: 5,
  },
});

export default RecommendedItemList;
