import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { userLoginAction } from '../../redux/actions/auth'
import CustomActivityIndicator from '../../components/CustomLoader'
import { isValidEmail, isValidPassword } from '../../helper'

const index = ({ navigation }) => {

    const [loggedIn, setLoggedIn] = useState(false)
    const dispatch = useDispatch()

    const truckingState = useSelector(state => state);
    const { loading: loginLoader, error } = truckingState.userLogin
    const [inputData, setInputData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (loggedIn) {
            if (!error) {
                if (truckingState?.userLogin?.data?.token) {
                    dispatch({ type: 'USER_TOKEN', payload: truckingState?.userLogin?.data?.token });
                    navigation.navigate("MyTabs")
                }
            }
            else {
                alert("Wrong email address or password")
            }
        }
    }, [truckingState?.userLogin?.data, loggedIn]);

    const logIn = async () => {
        if (inputData.email == '' || inputData.password == '') {
            alert("Please enter email or password")
        }
        else {
            if (isValidEmail(inputData.email)) {
                // if (isValidPassword(inputData.password)) {
                await dispatch(userLoginAction(inputData))
                setLoggedIn(true)
                // }
                // else {
                //     alert('Make sure password is 8-digit and alphanumeric')
                // }
            } else {
                alert('Please enter email in correct format')
            }

        }
    }

    return (
        <Block>
            {loginLoader && <CustomActivityIndicator />}
            {/* <BackGroundImage height={'100%'} style={{ position: 'absolute' }} /> */}
            <Image source={require('../../asset/pngs/Authbackground.png')} resizeMode='cover' style={{ height: '100%', width: '100%', position: 'absolute', zIndex: -1 }} />

            {/* upper part image with text */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ width: "90%", alignSelf: 'center', marginTop: 80, alignItems: 'center', justifyContent: 'center' }}>
                    <Login />
                    <CustomText size={30} style={{ fontWeight: '600', marginTop: 10 }}>
                        Welcome To
                    </CustomText>
                    <CustomText size={32} style={{ fontWeight: '600' }}>
                        GO TRUCKING
                    </CustomText>
                    <CustomText size={22} style={{ fontWeight: '600', color: color.appLightBlue, marginTop: 20 }} >
                        Login
                    </CustomText>

                    {/* textInputs */}
                    <CustomTextInput
                        autoCapitalize={false}
                        placeholder="Email"
                        ContainerStyle={{
                            width: '80%', height: 40, borderRadius: 30, borderWidth: 1.2, height: 50, borderColor: '#147FD6', shadowColor: '#147FD6',
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
                        placeholder="Password"
                        secureTextEntry={true}
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

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View>
                            {/* <Text>
                                Forgot Password
                            </Text> */}
                        </View>
                        <TouchableOpacity onPress={()=>navigation.navigate(route.ForgetPassword)} style={{}}>
                            <CustomText size={13} style={{ fontWeight: '500', color: color.appLightBlue }}>
                                Forgot Password
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                    <CustomButton onPress={logIn} title={"Login"} buttonStyle={{ height: 50, width: '80%', backgroundColor: color.appBlue, marginVertical: 30 }} textStyle={{ color: color.white, fontWeight: '700' }} />

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
            </ScrollView>
        </Block>
    )
}

export default index