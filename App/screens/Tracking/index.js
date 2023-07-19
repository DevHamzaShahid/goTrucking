import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Block from '../../components/Block'
import { dimensions } from '../../Dimensions'
const index = () => {
    return (
        <Block>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                zoomEnabled={true}
                showsScale={true}
                showsBuildings={true}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </Block>
    )
}
const styles = StyleSheet.create({
    map: {
        height: dimensions / 2,
        width: '96%',
        alignSelf:'center',
        borderRadius:10
    },
})
export default index