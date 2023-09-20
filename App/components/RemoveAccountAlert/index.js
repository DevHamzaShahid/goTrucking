import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '../../components/CustomText';
import { dimensions } from '../../Dimensions';
import CustomButton from '../CustomButton';
import { color } from '../../utils/colors';
import Error from '../../asset/svgIcons/Error.svg';
import Success from '../../asset/svgIcons/success.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CheckBox, SocialIcon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { removeAccount } from '../../redux/actions/auth';

const index = ({
    setRemoveAccount
}) => {
    // set color
    const AlertThemeColor = color.errorRed;
    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(false);
    const handleChange = (value) => {
        setIsChecked(!isChecked);
    };


   

    return (
        <View
            style={{
                backgroundColor: 'rgba(120,120,120,0.5)',
                flex: 1,
                position: 'absolute',
                zIndex: 999,
                height: '100%',
                width: '100%',
            }}>
            <View
                style={{
                    borderRadius: 20,
                    backgroundColor: AlertThemeColor,
                    width: '85%',
                    alignSelf: 'center',
                    marginTop: (dimensions / 2) * 0.45,
                    paddingVertical: 20,
                }}>
                {/*Alert Icon */}
                <View
                    style={{
                        borderWidth: 4,
                        borderColor: color.white,
                        backgroundColor: AlertThemeColor,
                        height: 80,
                        width: 80,
                        borderRadius: 50,
                        alignSelf: 'center',
                        position: 'absolute',
                        top: -40,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Error />
                </View>
                <TouchableOpacity style={{ position: 'absolute', right: 15, top: 15 }} onPress={() => {
                    setRemoveAccount(false)
                }}>
                    <Icon name="close" color={color.white} size={24} />
                </TouchableOpacity>
                {/* description Body */}
                <View
                    style={{
                        marginVertical: 60,
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 15,
                    }}>
                    <CustomText size={23} style={{ fontWeight: '700', color: color.white }}>
                        Warning
                    </CustomText>
                    <CustomText
                        size={16}
                        style={{
                            color: color.white,
                            fontWeight: '500',
                            textAlign: 'center',
                        }}>
                        Before you proceed with deleting your account, please keep in mind that this action is permanent and cannot be undone. Once you confirm the deletion, all your personally identifiable information will be erased, and any data that you had in progress will be lost.
                        {'\n\n'}
                        To confirm that you want to permanently delete your account, please agree to the below term.
                    </CustomText>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CheckBox
                            checked={isChecked}
                            onPress={handleChange}
                            // Use ThemeProvider to make change for all checkbox
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            checkedColor="white"
                        />
                        <CustomText style={{ color: color.white }}>I Agree with the above terms.</CustomText>
                    </View>
                </View>

                {/*Floating Button */}
                <CustomButton
                    onPress={() => {
                        if (isChecked) {
                            setRemoveAccount(false)
                            dispatch(removeAccount())
                        }
                        else {
                            alert('please check the terms')
                        }
                    }}
                    title={'OK'}
                    buttonStyle={{
                        backgroundColor: color.white,
                        borderRadius: 50,
                        borderWidth: 1.5,
                        borderColor: AlertThemeColor,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '90%',
                        alignSelf: 'center',
                        position: 'absolute',
                        bottom: -25,
                    }}
                    textStyle={{ color: AlertThemeColor, fontSize: 16, fontWeight: '700' }}
                />
            </View>
        </View>
    );
};

export default index;
