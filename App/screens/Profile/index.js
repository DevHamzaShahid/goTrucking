import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const index = ({navigation}) => {
  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{ backgroundColor: 'red', height: 50, width: 200, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          go
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default index