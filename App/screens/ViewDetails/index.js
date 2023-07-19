import { View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Block from '.././../components/Block'
import CustomButton from '../../components/CustomButton'
import { color } from '../../utils/colors'
import { dimensions } from '../../Dimensions'
import Location from '../../asset/svgIcons/Location.svg'
import CustomAlert from '../../components/CustomAlert'
import PickupAlert from '../../components/PickupAlert'
import Card from '../../components/Card'
import { useRoute } from '@react-navigation/native'
import ClockReport from '../../asset/svgIcons/clockReport.svg'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomText from '../../components/CustomText'
import DropDownPicker from 'react-native-dropdown-picker'
import CustomDropDown from '../../components/CustomDropDown'
import { route } from '../../Routes'

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
    const [successErrorAlert, setSuccessErrorAlert] = useState(false)
    const [readyForPickup, setReadyForPickup] = useState(false)
    const [chooseDelayTime, setChooseDelayTime] = useState(false)
    const [delayHours, setDelayHours] = useState(null)
    const [delayMins, setDelayMins] = useState(null)
    const [closeBtn, setClosBtn] = useState(false)


    const parameter = useRoute();
    const param = parameter?.params;

    const closePickupAlert = () => {
        setReadyForPickup(false)
    }

    const closeOrUpdateSuccessErrorAlert = () => {
        setSuccessErrorAlert(false)
    }
    const closeButton = () => {
        setClosBtn(false)
        setChooseDelayTime(false)
    }
    const handleHourChange = (value) => {
        setDelayHours(value)
    }
    const handleMinsChange = (value) => {
        setDelayMins(value)
    }
    const confirmDeparture = () => {
        navigation.navigate(route.MyRoutes)
    }
    useEffect(() => {
        console.log(delayHours, " ", delayMins);
    }, [delayHours, delayMins])
    return (
        <Block>
            {/* delay card */}
            {chooseDelayTime && <View style={{ position: 'absolute', zIndex: 999, backgroundColor: color.white, height: 300, width: "90%", alignSelf: 'center', marginTop: dimensions / 2 * 0.3, borderRadius: 12, borderWidth: 2, borderColor: color.appBlue }}>
                {/* close icon */}
                <TouchableOpacity onPress={() => closeButton()} style={{ position: 'absolute', top: 25, right: 25, height: 25, width: 25, borderRadius: 4, borderColor: color.appBlue, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="close" color={"#1E3A52"} size={22} />
                </TouchableOpacity>

                {/* delay setclock logo */}
                <View style={{ backgroundColor: color.appBlue, height: 100, width: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', position: 'absolute', top: -25 }}>
                    <View style={{ borderWidth: 1.3, borderColor: color.white, height: 95, width: 95, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <ClockReport height={60} width={60} />
                    </View>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                    {/* Dropdown pickers */}
                    <CustomText size={18} style={{ color: color.appBlue, fontWeight: '500', }}>
                        Please Choose your current time
                    </CustomText>
                    <View style={{ width: 120, position: 'absolute', left: 30, top: 40 }}>
                        <CustomDropDown placeholder={"Hours"}
                            objects={
                                [
                                    { label: '1 hour', value: '1 hour' },
                                    { label: '2 Hours', value: '2 hours' },
                                    { label: '3 Hours', value: '3 hours' }
                                ]
                            }
                            onChange={handleHourChange}
                        />
                    </View>
                    <View style={{ width: 120, position: 'absolute', right: 30, top: 40 }}>
                        <CustomDropDown placeholder={"Mins"}
                            objects={
                                [
                                    { label: '10 mins', value: '10 mins' },
                                    { label: '15 mins', value: '15 mins' },
                                    { label: '30 mins', value: '30 mins' }
                                ]
                            }
                            onChange={handleMinsChange}
                        />
                    </View>

                </View>
                <CustomButton onPress={() => closeButton()} title={'Continue'} buttonStyle={{ zIndex: -2, position: 'absolute', bottom: 20, alignSelf: 'center', height: 40, width: '60%', backgroundColor: color.appBlue }} textStyle={{ color: color.white, fontWeight: '500' }} />
            </View>}

            <View style={{ backgroundColor: color.appYellow, alignSelf: 'center', width: '95%', height: ((param?.requireButtonType == 'arrival' || param?.requireButtonType == 'departure') ? dimensions / 2 * 1.6 : dimensions / 2 * 1.45), borderRadius: 15, }}>
                {/* Main Card */}
                <Card data={arrDummy} hours={delayHours} mins={delayMins} openDelayModal={setChooseDelayTime} requireButtonType={param?.requireButtonType ? param?.requireButtonType : 'none'} confirmDeparture={confirmDeparture} />
                {readyForPickup && <PickupAlert closeButton={closePickupAlert} title={`Let's start with pickups`} description={'On next screen, you will see Pickup Navigates. You can start delivering only when you have picked all the orders.'} />}
                {successErrorAlert && <CustomAlert closeSuccessErrorAlert={closeOrUpdateSuccessErrorAlert} alertType={'error'} Title={'SORRY! IT’S 5AM'} description={'You cannot start working until 7am.'} buttonText={'OK'} />}
            </View>

            {/* bottom buttons */}
            {(param?.requireButtonType == 'arrival' || param?.requireButtonType == 'departure') ||
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                    <CustomButton onPress={() => navigation.navigate('Home', { jobAcceptanceStatus: true })} title={'Accept All'} buttonStyle={{ backgroundColor: color.appBlue, height: 40, borderRadius: 50 }} textStyle={{ color: color.white, marginHorizontal: 12, fontWeight: '600' }} />
                    <CustomButton onPress={() => navigation.navigate('Home', { jobAcceptanceStatus: false })} title={"Reject Job"} buttonStyle={{ backgroundColor: color.white, borderWidth: 1.5, borderColor: color.appBlue, height: 40, borderRadius: 50 }} textStyle={{ color: color.appBlue, marginHorizontal: 12, fontWeight: '600' }} />
                </View>}
        </Block>
    )
}

export default index