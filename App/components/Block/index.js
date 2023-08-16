import { View, Text } from 'react-native'
import React from 'react'
import { color } from '../../utils/colors'

const index = ({ children ,style}) => {
    return (
        <View style={[{ flex: 1, backgroundColor: color.white },style]}>
            {children}
        </View>
    )
}

export default index