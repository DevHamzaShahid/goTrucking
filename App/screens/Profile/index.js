import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'

const index = ({ navigation }) => {
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ backgroundColor: 'red', height: 50, width: 200, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                <Text>
                    INPROGRESS, Click to go Home
                </Text>
            </TouchableOpacity>
        </SafeAreaView>

    )
}

export default index