import React from 'react';
import { View, Dimensions } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';

const Carousel = () => {
  const images = [
    'https://img.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5072.jpg?w=996',
    'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg?w=996',
    'https://img.freepik.com/free-photo/side-view-pilaf-with-stewed-beef-meat-plate_141793-5057.jpg?w=996',
    'https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg?w=1060',
    'https://img.freepik.com/free-photo/baked-quails-pan-dark-surface_2829-5596.jpg?w=996',
  ];

  const screenWidth = Dimensions.get('window').width;

  return (
    <SliderBox
      images={images}
      autoPlay
      autoplayInterval={3000}
      circleLoop
      dotColor="white"
      inactiveDotColor="#90A4AE"
      ImageComponentStyle={{
        width: screenWidth * 0.95,
        borderRadius: 6,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    />
  );
};

export default Carousel;
