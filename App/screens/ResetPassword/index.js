import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, StyleSheet, Keyboard, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BackGroundImage from '../../asset/svgs/Authbackground.svg'
import Login from '../../asset/svgIcons/login.svg'
import CustomText from '../../components/CustomText'
import CustomTextInput from '../../components/CustomTextInput'
import CustomButton from '../../components/CustomButton'
import { color } from '../../utils/colors'
import Block from '../../components/Block'
import { route } from '../../Routes'
import { dimensionsWidth } from '../../Dimensions'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, userLoginAction } from '../../redux/actions/auth'
import CustomActivityIndicator from '../../components/CustomLoader'
import { isValidEmail, isValidPassword } from '../../helper'
import { useRoute } from '@react-navigation/native'
import { resetState } from '../../redux/actions/resetReduxState'

const index = ({ navigation }) => {

    const [loggedIn, setLoggedIn] = useState(false)
    const dispatch = useDispatch()
    const truckingState = useSelector(state => state);
    const { loading: resetLoader, error, data } = truckingState.ResetPassword
    const [inputData, setInputData] = useState({
        password: '',
        confirmPassword: ''
    });
    // for otp
    const [otpValues, setOtpValues] = useState(['', '', '', '']);
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const parameter = useRoute();
    const param = parameter?.params;

    // Otp Stuff below

    const handleOtpChange = (index, value) => {
        if (value) {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = value;
            setOtpValues(newOtpValues);

            if (index < 3) {
                inputRefs[index + 1].current.focus();
            }
        } else {
            const newOtpValues = [...otpValues];
            newOtpValues[index] = value;
            setOtpValues(newOtpValues);

            if (index > 0) {
                inputRefs[index - 1].current.focus();
            }
        }
    };
    useEffect(() => {
        if (data?.message) {
            alert(data?.message || 'error')
            dispatch(resetState())
            navigation.navigate(route.Login)
        }
        else if (error) {
            alert("Invalid OTP Code")
        }
    }, [data?.message, error])



    // Api handlers
    const Reset = async () => {
        if (otpValues.some(value => !value)) {
            alert('Please fill all otp fields')
        }
        else {
            if (inputData.password == '' || inputData.confirmPassword == '') {
                alert("Both password fields are required")
            }
            else {
                if (inputData.password != inputData.confirmPassword) {
                    alert('Password does not match')
                }
                else {

                    if (isValidPassword(inputData.password)) {
                        dispatch(resetPassword({ otp: otpValues.join(''), password: inputData.password, confirmPassword: inputData.confirmPassword }))
                    }
                    else {
                        alert('Password must be at least 8 characters long, contain at least one uppercase letter, and only consist of alphanumeric characters.')
                    }
                }
            }
        }
    }

    const scrollViewRef = useRef()
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                // Calculate the scroll offset by subtracting the margin (e.g., 100) from the keyboard height
                const scrollOffset = e.endCoordinates.height - 100;
                scrollViewRef.current.scrollTo({ x: 0, y: scrollOffset, animated: true });
            }
        );

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);


    return (
        <Block>
            {resetLoader && <CustomActivityIndicator />}
            {/* <BackGroundImage height={'100%'} style={{ position: 'absolute' }} /> */}
            <Image source={require('../../asset/pngs/Authbackground.png')} resizeMode='cover' style={{ height: '100%', width: '100%', position: 'absolute', zIndex: -1 }} />

            {/* upper part image with text */}
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                style={{ flex: 1 }}
            >
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
                >
                    <View style={{ width: "90%", alignSelf: 'center', marginTop: 80, alignItems: 'center', justifyContent: 'center' }}>
                        <Login />
                        <CustomText size={30} style={{ fontWeight: '600', marginTop: 10 }}>
                            Welcome To
                        </CustomText>
                        <CustomText size={32} style={{ fontWeight: '600' }}>
                            GO TRUCKING
                        </CustomText>
                        <CustomText size={22} style={{ fontWeight: '600', color: color.appLightBlue, marginTop: 20 }} >
                            Reset Password
                        </CustomText>
                        <CustomText size={16} style={{ fontWeight: '500', color: color.black, marginTop: 20, textAlign: 'center' }} >
                            Please Enter The 4 Digit Code Sent To {param?.email || 'Your Email'}
                        </CustomText>



                        {/* otp inputs*/}
                        <View style={styles.container}>
                            <View style={styles.otpContainer}>
                                {otpValues.map((value, index) => (
                                    <TextInput
                                        key={index}
                                        ref={inputRefs[index]}
                                        style={styles.otpInput}
                                        maxLength={1}
                                        keyboardType="numeric"
                                        onChangeText={text => handleOtpChange(index, text)}
                                        value={value}
                                    />
                                ))}
                            </View>
                        </View>

                        {/* textInputs */}
                        <CustomTextInput
                            placeholder="Password"
                            ContainerStyle={{
                                width: '80%', height: 40, borderRadius: 30, borderWidth: 1.2, height: 50, borderColor: '#147FD6', shadowColor: '#147FD6',
                                shadowOffset: {
                                    width: 1,
                                    height: 1,
                                },
                                shadowRadius: 2,
                                shadowOpacity: 0.6,
                            }}
                            leftIcon={'lock'}
                            value={inputData.password}
                            onChangeText={text => setInputData({ ...inputData, password: text })}
                        />

                        <CustomTextInput
                            placeholder="Confirm Password"
                            ContainerStyle={{
                                width: '80%', height: 40, borderRadius: 30, borderWidth: 1.2, height: 50, borderColor: '#147FD6', shadowColor: '#147FD6',
                                shadowOffset: {
                                    width: 1,
                                    height: 1,
                                },
                                shadowRadius: 2,
                                shadowOpacity: 0.6,
                            }}
                            leftIcon={'lock'}
                            value={inputData.confirmPassword}
                            onChangeText={text => setInputData({ ...inputData, confirmPassword: text })}
                        />

                        <CustomButton onPress={Reset} title={"Reset"} buttonStyle={{ height: 50, width: '80%', backgroundColor: color.appBlue, marginVertical: 30 }} textStyle={{ color: color.white, fontWeight: '700' }} />


                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </Block>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    otpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    otpInput: {
        width: 50,
        height: 50,
        borderBottomWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        marginRight: 10,
        fontSize: 20,
        backgroundColor: color.white,
        elevation: 3,
        shadowColor: color.appLightBlue,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        fontSize: 28,
        fontWeight: '700'
    },
});


export default index