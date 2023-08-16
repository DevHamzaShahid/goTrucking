import { View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import Block from '../../components/Block'
import { dimensions } from '../../Dimensions'
import { color } from '../../utils/colors'
import DistanceView from '../../asset/svgs/distanceView.svg'
import Van from '../../asset/svgs/distanceVan.svg'
import CustomText from '../../components/CustomText'
import TrackIcon from '../../asset/svgIcons/trackingIcon.svg'
import polyline from '@mapbox/polyline';
import MapViewDirections from 'react-native-maps-directions'
import { GoogleMapKey } from '../../utils/keys'
import { route } from '../../Routes'
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
const index = ({ navigation }) => {
    const DottedLine = ({ height }) => (
        <View style={[styles.dottedLine, { height }]} />
    );

    const chicago = [41.8781, -87.6298];
    const waypoint1 = [41.1400, -73.2613]; // White Plains, New York
    //  const waypoint1 = [41.8781, -86.2481]; // South Bend, Indiana
    // const waypoint1 = [39.9526, -75.1652]; // Philadelphia, Pennsylvania
    // const waypoint1 = [38.8951, -77.0364]; // Washington, D.C.
    // const waypoint1 = [39.9526, -75.1652]
    // const waypoint1 = [41.4034, -82.7117]
    const washington = [38.9072, -77.0379];

    const coordinates = [chicago, waypoint1, washington];
    const encodedPolyline = polyline.encode(coordinates);

    const decodedCoordinates = polyline.decode(encodedPolyline);


    return (
        // <Block>
        //     <View style={styles.mapContainer}>
        //         <MapView
        //             style={styles.map}
        //             provider={PROVIDER_GOOGLE}
        //             zoomEnabled={true}
        //             showsScale={true}
        //             showsBuildings={true}
        //             initialRegion={{
        //                 latitude: 37.78825,
        //                 longitude: -122.4324,
        //                 latitudeDelta: 0.0922,
        //                 longitudeDelta: 0.0421,
        //             }}
        //         />
        //     </View>
        //     <View style={{
        //         height: dimensions / 2, width: '96%', alignSelf: 'center', shadowColor: "#000"}}>
        //         {/* Distance Circle */}
        //         <View style={{ backgroundColor: color.white, borderRadius: 100, alignSelf: 'center', position: 'absolute', top: -85 }}>
        //             <DistanceView height={200} width={200} />
        //             <View style={{ position: 'absolute', alignSelf: 'center', top: 40, alignItems: 'center', }}>
        //                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //                     <Van />
        //                     <CustomText size={15} style={{ fontWeight: '600', color: color.textGrey, marginLeft: 6 }}>Distance</CustomText>
        //                 </View>
        //                 <CustomText size={62} style={{ color: color.black, fontWeight: '800' }}>120<CustomText size={18} style={{ color: color.black, fontWeight: 'bold' }}>km</CustomText></CustomText>
        //             </View>
        //         </View>
        //         <View style={{ marginTop: 50 }} />
        //         <ScrollView showsVerticalScrollIndicator={false}>
        //             {arrDummy?.map((item) => (
        //                 <View style={styles.cardContainer}>
        //                     <DottedLine height={50} />
        //                     <View style={styles.iconContainer}>
        //                         <TrackIcon />
        //                     </View>
        //                     <View style={styles.textContainer}>
        //                         <CustomText size={18} style={styles.upperText}>{item.points}</CustomText>
        //                         <CustomText size={12} style={styles.bottomText}>{item.address}</CustomText>
        //                     </View>
        //                     <TouchableOpacity style={styles.buttonLikeView}>
        //                         <CustomText size={12} style={{ fontWeight: '600', color: color.white }} >
        //                             {item.time}
        //                         </CustomText>
        //                     </TouchableOpacity>
        //                 </View>
        //             ))}
        //             <View style={{ marginBottom: 180 }} />
        //         </ScrollView>
        //     </View>

        // </Block>
        // <MapView
        //     style={{ flex: 1 }}
        //     // provider={PROVIDER_GOOGLE}
        //     initialRegion={{
        //         latitude: chicago[0],
        //         longitude: chicago[1],
        //         latitudeDelta: 10,
        //         longitudeDelta: 10,
        //     }}
        // >
        //     <Marker coordinate={{ latitude: chicago[0], longitude: chicago[1] }} title="Chicago" />
        //     <Marker coordinate={{ latitude: washington[0], longitude: washington[1] }} title="Washington" />
        //     <Polyline
        //         coordinates={decodedCoordinates}
        //         strokeWidth={4}
        //         strokeColor="#FF0000"
        //     />

        //     <MapViewDirections
        //         origin={{
        //             latitude: decodedCoordinates[0][0],
        //             longitude: decodedCoordinates[0][1],
        //         }}
        //         destination={{
        //             latitude: decodedCoordinates[2][0],
        //             longitude: decodedCoordinates[2][1],
        //         }}
        //         waypoints={[{
        //             latitude: decodedCoordinates[1][0],
        //             longitude: decodedCoordinates[1][1],
        //         }]}
        //         apikey={GoogleMapKey}
        //         mode="driving"
        //         alternatives // Request multiple alternative routes
        //         strokeWidth={6}
        //         strokeColor="green"
        //     />
        // </MapView>
        // <TouchableOpacity onPress={()=>navigation.navigate(route.Register)} style={{ backgroundColor: 'yellow', height: 50, width: '80%' }}>

        // </TouchableOpacity>
null
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