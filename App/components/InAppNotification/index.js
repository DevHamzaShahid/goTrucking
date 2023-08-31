import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from '../../asset/svgIcons/notificationAvatar.svg';
import { route } from '../../Routes';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const index = ({ isVisible, notification, onClose }) => {
    const [show, setShow] = useState(isVisible);
    const navigation = useNavigation()

    useEffect(() => {
        setShow(isVisible);

        const timer = setTimeout(() => {
            setShow(false);
        }, 3000);


        return () => clearTimeout(timer); // Clear the timer if the component unmounts or if isVisible changes
    }, [isVisible]);


    if (!show) {
        return null;
    }

    return (
        <View style={styles.notificationContainer}>
            <Avatar />

            <TouchableOpacity onPress={() => { navigation.navigate(route.Notifications), onClose() }} style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationBody}>{notification.body}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Icon name="close" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    notificationContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        backgroundColor: '#0a4f9a', // Your blue theme color
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        elevation: 5,
    },
    icon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginRight: 10,
    },
    notificationContent: {
        flex: 1,
        paddingHorizontal: 15,
    },
    notificationTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    notificationBody: {
        color: 'white',
        fontSize: 14,
    },
    closeButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#084d8d', // Slightly darker shade
    },
});

export default index;
