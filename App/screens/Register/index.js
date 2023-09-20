import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image, Platform, KeyboardAvoidingView, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Block from '../../components/Block'
import BackGroundImage from '../../asset/svgs/Authbackground.svg'
import CustomText from '../../components/CustomText'
import Register from '../../asset/svgIcons/register.svg'
import { color } from '../../utils/colors'
import CustomTextInput from '../../components/CustomTextInput'
import CustomButton from '../../components/CustomButton'
import { route } from '../../Routes'
import { userSignupAction } from '../../redux/actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import CustomActivityIndicator from '../../components/CustomLoader'
import { isValidEmail, isValidPassword } from '../../helper'


const initialInputData = {
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
};
const index = ({ navigation }) => {
    const scrollViewRef = useRef();
    const dispatch = useDispatch();
    const truckingState = useSelector(state => state);
    const { loading: signUpLoader, error, success } = truckingState?.signUp
    const [inputData, setInputData] = useState({
        fullName: '',
        email: '',
        mobileNumber: '',
        password: '',
    });
    const [signedUp, setSetSignedup] = useState(false)
    useEffect(() => {
        if (signedUp) {
            error && alert('User Already exist with this email address or phone number')
            if (truckingState?.signUp.data) {
                alert("succesfully registered")
                setInputData(initialInputData)
            }
        }
    }, [truckingState.signUp.data, error, success, signedUp])
    const signUp = async () => {
        if (inputData.fullName == '' || inputData.mobileNumber == '' || inputData.email == '' || inputData.password == '') {
            alert("All feilds are required")
        }
        else {
            if (isValidEmail(inputData.email)) {
                if (isValidPassword(inputData.password)) {
                    await dispatch(userSignupAction(inputData))
                    setSetSignedup(true)
                }
                else {
                    alert('Make sure password is 8-digit and alphanumeric')
                }
            } else {
                alert('Please enter email in correct format. abc@example.com')
            }
        }
    }

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
            {signUpLoader && <CustomActivityIndicator />}
            <Image source={require('../../asset/pngs/Authbackground.png')} resizeMode='cover' style={{ height: '100%', width: '100%', position: 'absolute', zIndex: -1 }} />
            {/* upper part image with text */}
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
                >
                    <View style={{ width: "90%", alignSelf: 'center', marginTop: 80, alignItems: 'center', justifyContent: 'center', }}>
                        <Register />
                        <CustomText size={30} style={{ fontWeight: '600', marginTop: 10 }}>
                            Welcome To
                        </CustomText>
                        <CustomText size={32} style={{ fontWeight: '600' }}>
                            GO TRUCKING
                        </CustomText>
                        <CustomText size={22} style={{ fontWeight: '600', color: color.appLightBlue, marginTop: 20 }} >
                            Register
                        </CustomText>

                        {/* textInputs */}
                        <CustomTextInput
                            placeholder="Name"
                            ContainerStyle={{
                                width: '90%', height: 40, borderRadius: 30, borderWidth: 1.2, height: 50, borderColor: '#147FD6', shadowColor: '#147FD6',
                                shadowOffset: {
                                    width: 1,
                                    height: 1,
                                },
                                shadowRadius: 2,
                                shadowOpacity: 0.6,
                            }}
                            leftIcon={'account'}
                            value={inputData.fullName}
                            onChangeText={text => setInputData({ ...inputData, fullName: text })}
                        />
                        <CustomTextInput
                            placeholder="Email"
                            autoCapitalize={false}

                            ContainerStyle={{
                                width: '90%', height: 40, borderRadius: 30, borderWidth: 1.2, height: 50, borderColor: '#147FD6', shadowColor: '#147FD6',
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
                        <CustomTextInput
                            placeholder="Phone Number"
                            keyboardType='number-pad'
                            ContainerStyle={{
                                width: '90%', height: 40, borderRadius: 30, borderWidth: 1.2, height: 50, borderColor: '#147FD6', shadowColor: '#147FD6',
                                shadowOffset: {
                                    width: 1,
                                    height: 1,
                                },
                                shadowRadius: 2,
                                shadowOpacity: 0.6,
                            }}
                            leftIcon={'phone'}
                            value={inputData.mobileNumber}
                            onChangeText={text => setInputData({ ...inputData, mobileNumber: text })}
                        />
                        <CustomTextInput
                            placeholder="Password"
                            secureTextEntry={true}
                            ContainerStyle={{
                                width: '90%', height: 40, borderRadius: 30, borderWidth: 1.2, height: 50, borderColor: '#147FD6', shadowColor: '#147FD6',
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

                        <CustomButton onPress={signUp} title={"Sign Up"} buttonStyle={{ height: 50, width: '90%', backgroundColor: color.appBlue, marginVertical: 30 }} textStyle={{ color: color.white, fontWeight: '700' }} />

                        <View style={{ flexDirection: 'row', marginVertical: 30 }}>
                            <CustomText style={{}}>
                                Already have account?{'  '}
                            </CustomText>
                            <TouchableOpacity onPress={() => navigation.navigate(route.Login)}>
                                <CustomText style={{ fontWeight: '600', color: color.appLightBlue }}>
                                    Login
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