import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { color } from '../../utils/colors';

const CustomActivityIndicator = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
      }}>
      <ActivityIndicator size="large" color={color.appBlue} />
    </View>
  );
};

export default CustomActivityIndicator;
