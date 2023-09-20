import { View, Text, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native'
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
import { forgetPassword, userLoginAction } from '../../redux/actions/auth'
import CustomActivityIndicator from '../../components/CustomLoader'
import { isValidEmail, isValidPassword } from '../../helper'
import { resetState } from '../../redux/actions/resetReduxState'

const index = ({ navigation }) => {

    const [loggedIn, setLoggedIn] = useState(false)
    const dispatch = useDispatch()

    const truckingState = useSelector(state => state);
    const { loading: ForgotPasswordLoader, error, data } = truckingState?.ForgetPassword
    const [inputData, setInputData] = useState({
        email: '',
        password: '',
    });


    const Send = async () => {
        if (inputData.email == '') {
            alert("Please enter an email address")
        }
        else {
            if (isValidEmail(inputData.email)) {
                ////////////////////////////////
                dispatch(forgetPassword(inputData?.email))
                // navigation.navigate(route.ResetPassword)
            } else {
                alert('Please enter email in correct format')
            }

        }
    }
    useEffect(() => {
        if (data?.message == 'Reset Password Email has been Sent') {
            dispatch(resetState())
            navigation.navigate(route.ResetPassword, { email: inputData?.email })
        }
        else if (error) {
            alert("Email not found")
        }
    }, [error, data])



const scrollViewRef=useRef()
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
            {ForgotPasswordLoader && <CustomActivityIndicator />}
            {/* <BackGroundImage height={'100%'} style={{ position: 'absolute' }} /> */}
            <Image source={require('../../asset/pngs/Authbackground.png')} resizeMode='cover' style={{ height: '100%', width: '100%', position: 'absolute', zIndex: -1 }} />

            {/* upper part image with text */}
            <ScrollView
             ref={scrollViewRef}
             contentContainerStyle={{ flexGrow: 1 }}
             showsVerticalScrollIndicator={false}
             keyboardShouldPersistTaps="handled"
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
                        Forgot Password
                    </CustomText>
                    <CustomText size={16} style={{ fontWeight: '500', color: color.black, marginTop: 20, textAlign: 'center' }} >
                        Please Enter Your Email Address To Receive a Verification Code
                    </CustomText>
                    {/* textInputs */}
                    <CustomTextInput
                        autoCapitalize={false}
                        placeholder="Email"
                        ContainerStyle={{
                            width: '80%', height: 40, marginVertical: 30, borderRadius: 30, borderWidth: 1.2, height: 50, borderColor: '#147FD6', shadowColor: '#147FD6',
                            shadowOffset: {
                                width: 1,
                                height: 1,
                            },
                            shadowRadius: 2,
                            shadowOpacity: 0.6,
                        }}
                        leftIcon={'email'}
                        value={inputData.email}
                        onChangeText={text => setInputData({ ...inputData, email: text })}
                    />



                    <CustomButton onPress={Send} title={"Send"} buttonStyle={{ height: 50, width: '80%', backgroundColor: color.appBlue, marginVertical: 30 }} textStyle={{ color: color.white, fontWeight: '700' }} />

                    <View style={{ flexDirection: 'row', marginVertical: 30 }}>
                        <CustomText>
                            Don’t have account?{'  '}
                        </CustomText>
                        <TouchableOpacity onPress={() => navigation.navigate(route.Register)}>
                            <CustomText style={{ fontWeight: '600', color: color.appLightBlue }}>
                                Register Now
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                    </View>
                    </KeyboardAvoidingView>
            </ScrollView>
        </Block>
    )
}

export default index