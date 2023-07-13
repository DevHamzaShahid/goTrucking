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
    const parameter = useRoute();
    const param = parameter?.params;

    const closePickupAlert = () => {
        setReadyForPickup(false)
    }

    const closeOrUpdateSuccessErrorAlert = () => {
        setSuccessErrorAlert(false)
    }
    useEffect(() => {
        // setSuccessErrorAlert(true)

    }, [])
    return (
        <Block>
            <View style={{ backgroundColor: color.appYellow, alignSelf: 'center', width: '95%', height: dimensions / 2 * 1.45, borderRadius: 15, }}>
                {/* Main Card */}
                <Card data={arrDummy} requireButtonType={param?.requireButtonType ? param?.requireButtonType : 'none'} />
                {readyForPickup && <PickupAlert closeButton={closePickupAlert} title={`Let's start with pickups`} description={'On next screen, you will see Pickup Navigates. You can start delivering only when you have picked all the orders.'} />}
                {successErrorAlert && <CustomAlert closeSuccessErrorAlert={closeOrUpdateSuccessErrorAlert} alertType={'error'} Title={'SORRY! IT’S 5AM'} description={'You cannot start working until 7am.'} buttonText={'OK'} />}
            </View>

            {/* bottom buttons */}

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                <CustomButton onPress={() => navigation.navigate('Home', { jobAcceptanceStatus: true })} title={'Accept All'} buttonStyle={{ backgroundColor: color.appBlue, height: 40, borderRadius: 50 }} textStyle={{ color: color.white, marginHorizontal: 12, fontWeight: '600' }} />
                <CustomButton onPress={() => navigation.navigate('Home', { jobAcceptanceStatus: false })} title={"Reject Job"} buttonStyle={{ backgroundColor: color.white, borderWidth: 1.5, borderColor: color.appBlue, height: 40, borderRadius: 50 }} textStyle={{ color: color.appBlue, marginHorizontal: 12, fontWeight: '600' }} />
            </View>
        </Block>
    )
}

export default index