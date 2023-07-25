import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {color} from '../../utils/colors';
// import Clock from '../../asset/svgIcons/clockConfirmArrival.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const NotificationAlert = ({iconSource, title, description, onClose}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Icon name="sticker-check" color={color.successGreen} size={40} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Icon name="close" color={color.successGreen} size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    position: 'absolute',
    width: '90%',
    zIndex: 2,
    borderWidth: 2,
    alignSelf: 'center',
    borderColor: color.successGreen,
  },
  content: {
    flexDirection: 'row',
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.successGreen,
  },
  description: {
    fontSize: 14,
    color: '#888888',
  },
  closeButton: {
    marginLeft: 10,
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
});

export default NotificationAlert;
