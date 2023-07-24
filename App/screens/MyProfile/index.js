import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomText from '../../components/CustomText';
import Block from '../../components/Block';
import RoundTop from '../../asset/svgs/Round top.svg'
import ProfileImage from '../../asset/svgs/ProfileImagee.svg'
import { color } from '../../utils/colors';
import RatingStars from '../../components/RatingStars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { route } from '../../Routes';


arrDummy = [
    {
        id: '12',
        iconName: 'car',
        heading: 'ID Card',
        description: 'Verifications',
        rightIcon: 'arrow-right',
    },
    {
        id: '123',
        iconName: 'card',
        heading: 'fdsfdsfgs',
        description: 'dcsfcsds',
        rightIcon: 'arrow-right',
    },
    {
        id: '124',
        iconName: 'pencil',
        heading: 'Responsible Service Alcohol',
        description: 'Responsible Service Alcohol',
        rightIcon: 'arrow-right',
    },
    {
        id: '125',
        iconName: 'bucket',
        heading: 'Responsible Service Alcohol',
        description: 'Responsible Service Alcohol',
        rightIcon: 'arrow-right',
    },
    {
        id: 'signout',
        iconName: 'logout',
        heading: 'Logout',
        description: 'Logout',
        rightIcon: 'arrow-right',
    }
]
const index = ({navigation}) => {
    const rating = 4;
    return (
        <Block>
            {/* nav header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', zIndex: 2, top: 50, width: '100%' }}>
                <Icon
                    name='arrow-left'
                    size={30}
                    color={color.white}
                    style={{ marginLeft: 20 }}
                />
               <TouchableOpacity onPress={()=>navigation.navigate(route.EditProfile)}>
               <Icon
                    name='pencil'
                    size={30}
                    color={color.white}
                    style={{ marginRight: 20 }}
                />
               </TouchableOpacity>
            </View>

            {/*Profile header */}
            <View>
                <RoundTop width={"100%"} style={{ marginTop: -160 }} />
                <View style={{ alignItems: 'center', height: 152, width: 152, borderRadius: 80, backgroundColor: color.white, justifyContent: 'center', position: 'absolute', top: 120, left: -20 }}>
                    <ProfileImage height={150} width={150} />
                </View>
                <View style={{ position: 'absolute', top: 130, left: 150 }}>
                    <CustomText size={32} style={{ fontWeight: '700', color: color.white }}>Fred John</CustomText>
                    <CustomText size={16} style={{ fontWeight: '400', color: color.white }}>Fred1@gmail.com</CustomText>
                    <CustomText size={15} style={{ fontWeight: '400', color: color.white }}>+001 9876 543 7</CustomText>
                    <RatingStars rating={rating} />
                </View>
            </View>

            {/* Body */}
            <View style={{ width: '80%', alignSelf: 'center', marginVertical: 50, }}>
                {arrDummy?.map((item) => (

                    <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', borderBottomColor: color.textGrey,borderBottomWidth:1 }}>
                        <View style={{ width: '20%', height: 30, alignItems: 'center' }}>
                            <Icon name={item.iconName} color={color.appBlue} size={30} />
                        </View>
                        <View style={{ width: '70%', height: 60, justifyContent: 'center' }}>
                            <CustomText size={13} style={{ fontWeight: '600', color: color.appBlue }}>{item.heading}</CustomText>
                            <CustomText size={10} style={{ fontWeight: '500', color: color.textGrey }}>{item.description}</CustomText>
                        </View>
                        <View style={{ width: '10%', height: 60, justifyContent: 'center' }}>
                            <Icon name={item.rightIcon} color={color.appBlue} size={30} />
                        </View>
                    </View>
                ))}
            </View>

        </Block>
    )
}

export default index