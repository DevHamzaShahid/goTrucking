import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { color } from '../../utils/colors';

const RatingStars = ({ rating }) => {
  const totalStars = 5;
  const fullStarColor = color.white; // Color for filled stars
  const emptyStarColor = '#ccc'; // Color for empty stars

  const stars = Array.from({ length: totalStars }, (_, index) => {
    const starValue = index + 1;
    const isFull = starValue <= rating;
    const isHalf = starValue === Math.ceil(rating) && rating % 1 !== 0;
    const starColor = isFull || isHalf ? fullStarColor : emptyStarColor;

    return (
      <Icon
        key={index}
        name={isFull ? 'star' : isHalf ? 'star-half-full' : 'star-outline'}
        size={24}
        color={starColor}
      />
    );
  });

  return <View style={styles.starContainer}>{stars}</View>;
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RatingStars;
