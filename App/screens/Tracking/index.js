import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Block from '../../components/Block'
import { dimensions } from '../../Dimensions'
import { color } from '../../utils/colors'
import DistanceView from '../../asset/svgs/distanceView.svg'
import Van from '../../asset/svgs/distanceVan.svg'
import CustomText from '../../components/CustomText'
import TrackIcon from '../../asset/svgIcons/trackingIcon.svg'
const arrDummy = [
    {
        id: '234',
        time: '3 Hour Away',
        points: 'Pick-up Point 1',
        address: 'No75, Grand Lake,HDT45H,  sydney, Australia.'
    },
    {
        id: '234ds',
        time: '5 Hour Away',
        points: 'Pick-up Point 2',
        address: 'No75, Grand Lake,HDT45H,  sydney, Australia.'
    }, {
        id: '234dfs',
        time: '6 Hour Away',
        points: 'Pick-up Point 3',
        address: 'No75, Grand Lake,HDT45H,  sydney, Australia.'
    }, {
        id: '234dfsd',
        time: '2 Hour Away',
        points: 'Pick-up Point 4',
        address: 'No75, Grand Lake,HDT45H,  sydney, Australia.'
    }, {
        id: '234fsd',
        time: '4 Hour Away',
        points: 'Pick-up Point 5',
        address: 'No75, Grand Lake,HDT45H,  sydney, Australia.'
    },
]
const index = () => {
    const DottedLine = ({ height }) => (
        <View style={[styles.dottedLine, { height }]} />
    );
    return (
        <Block>
            <View style={styles.mapContainer}>
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
            </View>
            <View style={{
                height: dimensions / 2, width: '96%', alignSelf: 'center', shadowColor: "#000"}}>
                {/* Distance Circle */}
                <View style={{ backgroundColor: color.white, borderRadius: 100, alignSelf: 'center', position: 'absolute', top: -85 }}>
                    <DistanceView height={200} width={200} />
                    <View style={{ position: 'absolute', alignSelf: 'center', top: 40, alignItems: 'center', }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Van />
                            <CustomText size={15} style={{ fontWeight: '600', color: color.textGrey, marginLeft: 6 }}>Distance</CustomText>
                        </View>
                        <CustomText size={62} style={{ color: color.black, fontWeight: '800' }}>120<CustomText size={18} style={{ color: color.black, fontWeight: 'bold' }}>km</CustomText></CustomText>
                    </View>
                </View>
                <View style={{ marginTop: 50 }} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    {arrDummy?.map((item) => (
                        <View style={styles.cardContainer}>
                            <DottedLine height={50} />
                            <View style={styles.iconContainer}>
                                <TrackIcon />
                            </View>
                            <View style={styles.textContainer}>
                                <CustomText size={18} style={styles.upperText}>{item.points}</CustomText>
                                <CustomText size={12} style={styles.bottomText}>{item.address}</CustomText>
                            </View>
                            <TouchableOpacity style={styles.buttonLikeView}>
                                <CustomText size={12} style={{ fontWeight: '600', color: color.white }} >
                                    {item.time}
                                </CustomText>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <View style={{ marginBottom: 180 }} />
                </ScrollView>
            </View>

        </Block>
    )
}
const styles = StyleSheet.create({
    map: {
        height: dimensions / 2,
        width: '96%',
        alignSelf: 'center',
        borderRadius: 10
    },
    mapContainer: {
        width: '96%',
        height: dimensions / 2,
        borderRadius: 10,
        alignSelf: 'center',
        overflow: 'hidden',

    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: color.white,
        position: 'relative', // Add relative positioning for the dotted line
    },
    iconContainer: {
        marginRight: 16,
        height: 50,
        marginTop: 10
    },
    icon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1,
        marginRight: 16,
        height: 50
    },
    upperText: {
        fontWeight: '600',
        color: color.appBlue
    },
    bottomText: {
        color: color.appBlue,
        fontWeight: '500'
    },
    buttonLikeView: {
        height: 30,
        backgroundColor: color.appBlue,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        marginTop: -10
    },
    dottedLine: {
        borderStyle: 'dashed',
        borderWidth: 1,
        width: 1,
        borderColor: color.appBlue,
        position: 'absolute',
        top: 65, // Adjust the starting position of the line
        left: 25, // Adjust the position to align with the icons
    },
})
export default index