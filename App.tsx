import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'

const App = () => {
  return (
    <SafeAreaView style={{ position: 'absolute' ,width: '100%', bottom:50}}>
      <TouchableOpacity onPress={()=>alert("pressed")} style={{ backgroundColor: 'aqua', padding :5,justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 10, alignSelf: 'center' }}>
        <Text>Go Trucking</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}


export default App