import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Avatar from '../../asset/svgIcons/notificationAvatar.svg'
import AvatarPending from '../../asset/svgIcons/cancel.svg'
import AvatarCancel from '../../asset/svgIcons/pending.svg'

import CustomActivityIndicator from '../../components/CustomLoader'
import { styles } from './style'
const index = ({ navigation }) => {
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
  const reversedNotifications = DummyNotifications?.slice()?.reverse()
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
      {false && <CustomActivityIndicator />}
      {reversedNotifications?.map((item) =>
        <View style={styles.notificationItem}>
          <View style={styles.icon}>
            {
              item.avatar
            }
          </View>
          <View style={styles.content}>
            <Text style={styles.heading}>{item.heading}</Text>
            <Text style={styles.description}>{item.desc}</Text>
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