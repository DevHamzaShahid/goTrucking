import { View, Text } from 'react-native'
import React from 'react'
import styles from './style'

const index = ({ children, style, size }) => {
    return (
        <Text style={[styles.text, style, { fontSize: size }]}>{children}</Text>
    )
}

export default index