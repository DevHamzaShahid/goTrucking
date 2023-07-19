import { View, Text } from 'react-native'
import React from 'react'
import CustomText from '../CustomText'
import { color } from '../../utils/colors'
const index = ({ heading, description }) => {
    return (
        <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 15, marginBottom: 5 }}>
            <CustomText size={12} style={{ color: color.textGrey, fontWeight: '500', width: '45%', }}>
                {heading}
            </CustomText>
            <CustomText size={12} style={{ color: color.appBlue, fontWeight: '600', width: '55%', }}>
                {description}
            </CustomText>
        </View>
    )
}

export default index