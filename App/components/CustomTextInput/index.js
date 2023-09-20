import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../utils/colors';
const CustomTextInput = ({leftIcon, rightIcon, ContainerStyle, ...props}) => {
  return (
    <View style={[styles.container,ContainerStyle]}>
      {leftIcon && (
        <Icon name={leftIcon} size={18} color={color.textGrey} style={styles.icon} />
      )}
      <TextInput {...props} placeholderTextColor={color.textGrey} style={styles.input} />
      {rightIcon && (
        <Icon name={rightIcon} size={18} color={color.textGrey} style={styles.icon} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical:8
  },
  icon: {
    marginHorizontal: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    width:300
  },
});

export default CustomTextInput;
