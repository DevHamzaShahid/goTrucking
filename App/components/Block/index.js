import { View, Text } from 'react-native'
import React from 'react'
import { color } from '../../utils/colors'

const index = ({ children }) => {
    return (
        <View style={{ flex: 1, backgroundColor: color.white }}>
            {children}
        </View>
    )
}

export default index