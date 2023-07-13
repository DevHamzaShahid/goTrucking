import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { color } from '../../utils/colors';
import Block from '../../components/Block';
import CustomText from '../../components/CustomText'
import CustomButton from '../../components/CustomButton';
import RoundTop from '../../asset/svgs/Round top.svg'
import styles from './style';
import Profile from '../../asset/svgs/ProfileImagee.svg'
import Carton from '../../asset/svgIcons/carton.svg';
import Building from '../../asset/svgs/Building.svg'
import { route } from '../../Routes';
import { useRoute } from '@react-navigation/native';
import PickupAlert from '../../components/PickupAlert'
const arrDummy = [
    {
        id: '234',
        time: '3:22'
    },
    {
        id: '23c4',
        time: '3:22'
    },
    {
        id: '23cd4',
        time: '3:22'
    },
    {
        id: '233324',
        time: '3:22'
    },
    {
        id: '234324',
        time: '3:22'
    }
]
const index = ({ navigation }) => {
    const [readyForPickup, setReadyForPickup] = useState(false)
    const parameter = useRoute();
    const param = parameter?.params;


    const PickupAlertNext = () => {
        setReadyForPickup(false)
        navigation.navigate(route.ViewDetails, { requireButtonType: 'arrival' })
    }
    const closePickupAlert = () => {
        setReadyForPickup(false)
    }
    useEffect(() => {
        console.log("satrttttt",param?.jobAcceptanceStatus);
        // return () => setReadyForPickup(false)
    }, [])
    return (
        <Block>

            <RoundTop width={'100%'} height={500} style={{ marginTop: -50 }} />
            {readyForPickup&&<PickupAlert PickupAlertNext={PickupAlertNext} closeButton={closePickupAlert} title={`Let's start with pickups`} description={'On next screen, you will see Pickup Navigates. You can start delivering only when you have picked all the orders.'} />}

            {/* Shift Card */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.ScrollView}>
                {arrDummy.map((item) => (
                    <View style={{ marginTop: 20 }}>
                        <View style={styles.BlueBackCard} />
                        <View style={styles.MainCardContainer}>

                            {/* Card Header */}

                            <View style={styles.CardHeader}>
                                <View style={styles.Icon}>
                                    <Carton />
                                </View>
                                <View style={{ flexDirection: 'column', }}>
                                    <CustomText size={14} style={[styles.textSmall, { fontWeight: '700', color: color.appBlue }]}>
                                        Shift ID: 92772888
                                    </CustomText>
                                    <CustomText size={12}>
                                        Estimated per hour rate
                                    </CustomText>
                                    <CustomText size={12}>
                                        Assigned by : Solaris
                                    </CustomText>
                                </View>
                                <View style={styles.PriceView}>
                                    <CustomText size={8} style={styles.price}>
                                        $147.09
                                    </CustomText>
                                </View>
                            </View>

                            {/* Card body */}

                            <View style={styles.containerCard}>
                                <View style={styles.row}>
                                    <View style={styles.box}>
                                        <CustomText size={13} style={styles.text}>EST. Starting{'\n'}Time</CustomText>
                                        <CustomText size={10} style={styles.textSmall}>{item.time} PM</CustomText>
                                    </View>
                                    <View style={styles.separatorVertical} />
                                    <View style={styles.box}>
                                        <CustomText size={13} style={styles.text}>Pick-up{'\n'}Points</CustomText>
                                        <CustomText size={10} style={styles.textSmall}>3 Points</CustomText>
                                    </View>
                                    <View style={styles.separatorVertical} />
                                    <View style={styles.box}>
                                        <CustomText size={13} style={styles.text}>Delivery{'\n'}Navigates</CustomText>
                                        <CustomText size={10} style={styles.textSmall}>3 Navigates</CustomText>
                                    </View>
                                </View>
                                <View style={styles.separatorHorizontal} />
                                <View style={styles.row}>
                                    <View style={styles.box}>
                                        <CustomText size={13} style={styles.text}>EST. Tolls</CustomText>
                                        <CustomText size={10} style={styles.textSmall}>Eur. 40</CustomText>
                                    </View>
                                    <View style={styles.separatorVertical} />
                                    <View style={styles.box}>
                                        <CustomText size={13} style={styles.text}>Total{'\n'}Distance</CustomText>
                                        <CustomText size={10} style={styles.textSmall}>310 KM</CustomText>
                                    </View>
                                    <View style={styles.separatorVertical} />
                                    <View style={styles.box}>
                                        <CustomText size={13} style={styles.text}>Est. Time</CustomText>
                                        <CustomText size={10} style={styles.textSmall}>7 hours</CustomText>
                                    </View>
                                </View>
                            </View>
                            {/* detail floating button */}
                            <CustomButton title={param?.jobAcceptanceStatus ? 'Start Working' : 'View Details'} onPress={() => {
                                if(param?.jobAcceptanceStatus){
                                    setReadyForPickup(true)
                                }
                                else{
                                    navigation.navigate(route.ViewDetails)}
                                }
                                
                                
                                } buttonStyle={styles.ViewDetailsBtn} textStyle={styles.BtnText} />
                        </View>
                    </View>
                ))}
                <View style={{ marginBottom: 100 }} />
            </ScrollView>

            <Image source={require('../../asset/pngs/Hidelayer.png')} style={styles.HideLayer} />

            {/* Main header */}

            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <View style={styles.iconContainer}>
                        <Icon name="bell" size={30} color={color.white} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Text style={styles.buttonText}>
                            0 Jobs Completed
                        </Text>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <View style={styles.profileContainer1}>
                        <View style={styles.profileContainer2}>
                            <Profile height={182} width={182} style={styles.profilePhoto} />
                        </View>
                    </View>
                </View>
            </View>

            {/*User Detail */}

            <View style={styles.UserDetailContainer}>
                <CustomText style={styles.email} size={18}>
                    Fred1@gmail.com
                </CustomText>
                <CustomText size={45} style={styles.name}>
                    Hi, Fred {'\n'}John
                </CustomText>
            </View>

            {/* add background image at the bottom in here */}
            <Building position={'absolute'} marginTop={400} marginLeft={140} zIndex={-2} />
        </Block>
    )
}

export default index