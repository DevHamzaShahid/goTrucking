import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Avatar from '../../asset/svgIcons/notificationAvatar.svg'
import AvatarPending from '../../asset/svgIcons/cancel.svg'
import AvatarCancel from '../../asset/svgIcons/pending.svg'
import database from '@react-native-firebase/database'
import CustomActivityIndicator from '../../components/CustomLoader'
import { styles } from './style'
const index = ({ navigation }) => {

  const [notifications, setNotifications] = useState([])
  const DummyNotifications = [
    {
      heading: "Delivered",
      desc: "All packages has been delivered",
      avatar: <Avatar />
    },
    {
      heading: "Pending",
      desc: "All packages has been delivered",
      avatar: <AvatarPending />
    },
    {
      heading: "Cancelled",
      desc: "All packages has been delivered",
      avatar: <AvatarCancel />
    },
  ]
  const reversedNotifications = notifications?.slice()?.reverse()

  //get profile
  const truckingState = useSelector(state => state);

  const { data: userData } =
    truckingState?.getProfile || [];

  useEffect(() => {
    // Your specific ID
    var specificId = userData?._id; // Replace with the ID you want to match


    // Reference to the specific ID
    var specificIdRef = database().ref(specificId);

    // Retrieve the data for the specific ID
    specificIdRef.once('value')
      .then(function (snapshot) {
        let notiArray = []
        if (snapshot.exists()) {
          // Loop through the child nodes (random keys)
          snapshot.forEach(function (childSnapshot) {
            // Get the data associated with the random key
            var data = childSnapshot.val();
            // console.log("data", data);
            notiArray.push(data)
          });
          setNotifications(notiArray)
        } else {
          console.log("Data not found for specific ID: " + specificId);
        }
      })
      .catch(function (error) {
        console.error("Error getting data: " + error);
      });
  }, [])


  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ zIndex: 999, position: 'absolute', alignSelf: 'center', top: 300 }}>
          {!notifications && <CustomActivityIndicator />}
        </View>
        <View style={{ marginTop: 10 }} />
        {reversedNotifications?.map((item) =>
          <View style={styles.notificationItem}>
            <View style={styles.icon}>
              <Avatar />
            </View>
            <View style={styles.content}>
              <Text style={styles.heading}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <TouchableOpacity style={styles.closeIcon}>
              <Icon name='close' color={'red'} size={20} />
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </View>
  )
}

export default index