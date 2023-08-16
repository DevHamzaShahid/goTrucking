import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
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

const initialInputData = {
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
};
const index = ({ navigation }) => {
    const dispatch = useDispatch();
    const truckingState = useSelector(state => state);
    const { loading: signUpLoader, error, success } = truckingState?.signUp
    const [inputData, setInputData] = useState({
        fullName: '',
        email: '',
        mobileNumber: '',
        password: '',
    });
    const [signedUp,setSetSignedup]=useState(false)

    useEffect(() => {
        if (signedUp)
        {
            error && alert(error)
            if (truckingState.signUp.data) {
                alert("succesfully registered")
                setInputData(initialInputData)
            }
        }
    }, [truckingState.signUp.data, error, success,signedUp])
    const signUp = async () => {
        if (inputData.fullName == '' || inputData.mobileNumber == '' || inputData.email == '' || inputData.password == '') {
            alert("Please enter name,Phone Number, email or password")
        }
        else {
            await dispatch(userSignupAction(inputData))
            setSetSignedup(true)
        }
    }
    return (
        <Block>
            {signUpLoader && <CustomActivityIndicator />}
            <Image source={require('../../asset/pngs/Authbackground.png')} resizeMode='cover' style={{ height: '100%', width: '100%', position: 'absolute', zIndex: -1 }} />
            {/* upper part image with text */}
            <ScrollView showsVerticalScrollIndicator={false}>
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
            </ScrollView>
        </Block>
    )
}

export default index