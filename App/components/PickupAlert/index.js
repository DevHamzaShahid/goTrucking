import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { color } from '../../utils/colors'
import CustomButton from '../CustomButton'
import { dimensions } from '../../Dimensions'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity, View } from 'react-native'
import CustomText from '../../components/CustomText'
const index = ({ closeButton,description,title,PickupAlertNext }) => {
    return (
        <View style={{position:'absolute',zIndex:999,height:'100%',width:'100%',backgroundColor:'rgba(0,0,0,0.4)'}}>
             <LinearGradient
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 0.5, y: 1.0 }}
            style={{ width: '85%', height: dimensions / 2 * 0.75, alignSelf: 'center', borderRadius: 10, marginTop: dimensions / 2 * 0.55, }}
            locations={[0, 0.1, 0.8, 0.85, 1]}
            colors={['#0095EA', '#0095EA', '#1B4160', '#1B4160']}>

            <TouchableOpacity onPress={() => closeButton()} style={{ position: 'absolute', top: 25, right: 25, height: 25, width: 25, borderRadius: 4, borderColor: color.white, borderWidth: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="close" color={"#fff"} size={20} />
            </TouchableOpacity>

            <View style={{ marginVertical: 70, paddingHorizontal: 20 }}>
                <CustomText size={19} style={{ fontWeight: '600', color: color.white }}>
                   {title}
                </CustomText>
                <CustomText size={16} style={{ fontWeight: '500', color: color.white }}>
                    {description}
                </CustomText>
            </View>

            {/* Lets Start button */}
            <CustomButton onPress={()=>PickupAlertNext()} title={'Let’s Start    >'} buttonStyle={{ alignItems: 'center', backgroundColor: 'transparent', height: 30, width: 150, position: 'absolute', bottom: 20, right: 20, justifyContent: 'center', borderRadius: 8, borderColor: color.white, borderWidth: 2 }} textStyle={{ color: color.white, fontSize: 14, fontWeight: '500' }} />
        </LinearGradient>
       </View>
    )
}

export default index