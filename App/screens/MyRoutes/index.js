import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, } from 'react-native'
import React, { useState } from 'react'
import Block from '../../components/Block'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { color } from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import MapBackBtn from '../../asset/svgIcons/mapBackBtn.svg'
import CustomButton from '../../components/CustomButton';
import CustomText from '../../components/CustomText';
import * as Progress from 'react-native-progress';
import SquarePrev from '../../asset/svgIcons/squarePrevious.svg'
import SquareNext from '../../asset/svgIcons/squareNext.svg'
import Location from '../../asset/svgIcons/Location.svg'
import MapEye from '../../asset/svgIcons/MapEye.svg'
import MapNavigate from '../../asset/svgIcons/mapNavigate.svg'
import FormText from '../../components/FormText'
import { route } from '../../Routes';

const arrDummy = [
    {
        id: '234',
        item: 'Gloves Box',
        description: 'cvdscdscdscds'
    },
    {
        id: '23c4',
        item: 'Grocery',
        description: 'cdscdscdscdsgvfsrs'
    },
    {
        id: '23cd4',
        item: 'Leather Jackets',
        description: 'fretdfg'
    },
    {
        id: '233324',
        item: 'Footballs',
        description: 'cdscdscdscdscdscs'
    },
    {
        id: '234324',
        item: 'Leather Jackets box',
        description: 'cccccccccccc'
    }
]
const index = ({ navigation }) => {
    const [showOrderDetail, setShowOrderDetail] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);

    // calculate the progress
    const progressValue = currentIndex / (arrDummy?.length - 1);
    // back for the map screen
    const handleBackPress = () => {
        navigation.goBack();
    };
    // card next button
    const handleNextPress = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % arrDummy.length);
    };
    //   card Back Button
    const handlePreviousPress = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + arrDummy.length) % arrDummy.length);
    };

    return (
        <SafeAreaView flex={1} >
            <Block>
                {/* Custom Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBackPress}>
                        <MapBackBtn height={45} width={45} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 22, backgroundColor: color.white, height: 35, width: '60%', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 32, width: '98%', borderRadius: 9, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: color.appBlue }}>
                            <CustomText size={18} style={{ fontWeight: '500', color: color.appBlue }} >In-Transit</CustomText>
                        </View>
                    </View>
                </View>

                {/* Map */}
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

                {/* Map Card at the Bottom */}
                <View style={styles.card}>
                    {/*card progress header */}
                    <View style={{ alignSelf: 'center', width: '100%', }}>
                        {currentIndex != 0 && <TouchableOpacity style={{ position: 'absolute', left: 10 }}><SquarePrev onPress={handlePreviousPress} /></TouchableOpacity>}
                        <Progress.Bar progress={currentIndex == 0 ? 0.1 : progressValue} style={{ alignSelf: 'center', height: 10, borderRadius: 20 }} height={10} color={color.appLightBlue} width={200} />
                        {currentIndex != arrDummy.length - 1 && <TouchableOpacity style={{ position: 'absolute', right: 10 }}><SquareNext onPress={handleNextPress} /></TouchableOpacity>}
                    </View>
                    {/* card main header */}
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 40 }}>
                        <View style={{ width: '15%', }}>
                            <View style={{ height: 45, width: 45, borderRadius: 25, backgroundColor: color.appLightBlue, alignItems: 'center', justifyContent: 'center' }}>
                                <Location />
                            </View>
                        </View>
                        <View style={{ width: '55%', paddingLeft: 7 }}>
                            <CustomText size={16} style={{ fontWeight: '600', color: color.appBlue }}>{arrDummy[currentIndex].item}</CustomText>
                            <CustomText size={12} style={{ fontWeight: '500', color: color.appBlue }}>No75, Grand Lake,HDT45H,  sydney, Australia.</CustomText>
                        </View>
                        <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.navigate(route.Receipt)} style={{ paddingHorizontal: 4, alignItems: 'center', justifyContent: 'center', height: 30, borderBottomLeftRadius: 12, borderTopRightRadius: 12, borderBottomRightRadius: 12, borderWidth: 1.2, borderColor: color.appBlue }}>
                                <CustomText size={10} style={{ fontWeight: '600' }}>Confirm Delivery</CustomText>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                <TouchableOpacity onPress={() => setShowOrderDetail(!showOrderDetail)}>
                                    <MapEye />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => alert("navigation in progress")}>
                                    <MapNavigate />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                    {/* card description onClick eyeIcon*/}
                    {showOrderDetail && <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-around' }}>
                        <FormText heading={'Article no. :'} description={'20'} />
                        <FormText heading={'Package Content :'} description={arrDummy[currentIndex].description} />
                        <FormText heading={'Package Dimensions :'} description={'14 L x 2 H x 20W'} />
                        <FormText heading={'Receiver Name :'} description={'Abc Name'} />
                        <FormText heading={'Delivery Navigate :'} description={'No75, Grand Lake,HDT45H,  sydney, Australia.'} />
                    </View>}

                </View>
            </Block>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 2,
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    map: {
        flex: 1,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopRightRadius: 20,
        borderTopStartRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    },
});
export default index