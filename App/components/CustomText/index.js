import { View, Text } from 'react-native'
import React from 'react'
import styles from './style'

const index = ({ children, style, size,numberOfLines }) => {
    return (
        <Text numberOfLines={numberOfLines} style={[styles.text, style, { fontSize: size }]}>{children}</Text>
    )
}

export default index