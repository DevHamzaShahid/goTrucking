import { View, Text } from 'react-native'
import React from 'react'
import CustomText from '../../components/CustomText'
// svg
import ReceiptBlock from '../../asset/svgs/receiptBlock.svg'
import ReceiptImage from '../../asset/svgs/receiptImage.svg'
import { color } from '../../utils/colors'
import CustomButton from '../CustomButton'
import { dimensions } from '../../Dimensions'
import { route } from '../../Routes'
import { useNavigation } from '@react-navigation/native'
const index = ({ setShowDeliveredAlert }) => {
    const navigation = useNavigation()
    return (
        <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 2, height: '150%', width: '100%',alignItems:'center',justifyContent:'center',position:'absolute' }}>
            <View style={{ position:'absolute'}}>
                <ReceiptBlock />
                <View style={{ position: 'absolute', marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <ReceiptImage height={130} width={130} />
                    <CustomText size={20} style={{ color: color.appLightBlue, fontWeight: '700', marginVertical: 10 }}>Awesome !</CustomText>
                    <CustomText size={15} style={{ color: color.black, fontWeight: '500', marginVertical: 10, textAlign: 'center', paddingHorizontal: 20 }}>Congrats! you successfully delivered this Order.</CustomText>
                    <CustomButton title={"Continue"} onPress={() => {
                        setShowDeliveredAlert(false)
                        navigation.navigate(route.Home)
                    }} textStyle={{ fontSize: 18, fontWeight: '500', color: color.white }} buttonStyle={{ height: 35, borderRadius: 25, width: '60%', marginVertical: 20 }} />
                </View>
            </View>
        </View>
    )
}

export default index