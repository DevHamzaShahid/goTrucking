import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyRoutes from '../../screens/MyRoutes'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { color } from '../../utils/colors';
import Tracking from '../../screens/Tracking'
import PackageDetails from '../../screens/PackageDetails'
import PackageDetailsDelivery from '../../screens/PackageDetailsDelivery'
import Receipt from '../../screens/Receipt'
import { TouchableOpacity } from 'react-native';
import BackIcon from 'react-native-vector-icons/MaterialIcons'
import { route } from '../../Routes';
import CustomText from '../../components/CustomText'
import { useDispatch, useSelector } from 'react-redux';
const Stack = createStackNavigator();

const index = ({ navigation }) => {
    //dispatch
    const dispatch = useDispatch()
    //selectors

    const truckingState = useSelector(state => state);

    const continueBtn = truckingState?.ContinueBtnAvail?.continueBtn;
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyRoutes" component={MyRoutes} options={
                { headerShown: false }
            } />

            <Stack.Screen name="PackageDetails" component={PackageDetails}
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: color.white },
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    headerTitleStyle: { color: color.black, fontSize: 20, fontWeight: 500 },
                    headerTintColor: color.appBlue,
                    headerTitleAlign: 'center',
                    title: 'Package Details',
                    // headerRight: () => (
                    //     <Icon name='bell' size={30} color={color.appBlue} style={{ padding: 5 }} />
                    // ),
                    // headerLeft: () => (
                    //     <TouchableOpacity onPress={() => navigation.navigate(route.MyRoutes)}>
                    //         <BackIcon name='arrow-back-ios-new' size={30} color={color.appBlue} style={{ padding: 5 }} />
                    //     </TouchableOpacity>
                    // )
                    headerRight: () => {
                       return continueBtn && (
                            <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }} onPress={async() => {
                               await dispatch({ type: 'SET_CONTINUE_BTN', payload: false })
                                navigation.navigate(route.MyRoutes)
                            }}>
                                <CustomText
                                    size={14}
                                    style={{ color: color.appBlue, fontWeight: '600' }}>Continue</CustomText>
                                <BackIcon name='arrow-forward' size={24} color={color.appBlue} style={{ padding: 5 }} />
                            </TouchableOpacity>
                        )
                    }
                }
                }
            />
            <Stack.Screen name="PackageDetailsDelivery" component={PackageDetailsDelivery}
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: color.white },
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    headerTitleStyle: { color: color.black, fontSize: 20, fontWeight: 500 },
                    headerTintColor: color.appBlue,
                    headerTitleAlign: 'center',
                    title: 'Package Details',
                    // headerRight: () => (
                    //     <Icon name='bell' size={30} color={color.appBlue} style={{ padding: 5 }} />
                    // ),
                    // headerLeft: () => (
                    //     <TouchableOpacity onPress={() => navigation.navigate(route.MyRoutes)}>
                    //         <BackIcon name='arrow-back-ios-new' size={30} color={color.appBlue} style={{ padding: 5 }} />
                    //     </TouchableOpacity>
                    // )
                    headerRight: () => {
                       return continueBtn && (
                            <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }} onPress={async() => {
                              await navigation.navigate(route.MyRoutes)
                                dispatch({ type: 'SET_CONTINUE_BTN', payload: false })
                            }}>
                                <CustomText
                                    size={14}
                                    style={{ color: color.appBlue, fontWeight: '600' }}>Continue</CustomText>
                                <BackIcon name='arrow-forward' size={24} color={color.appBlue} style={{ padding: 5 }} />
                            </TouchableOpacity>
                        )
                    }
                }
                }
            />
            {/* <Stack.Screen name="Receipt" component={Tracking}
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: color.white },
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    headerTitleStyle: { color: color.black, fontSize: 20, fontWeight: 500 },
                    headerTintColor: color.appBlue,
                    headerTitleAlign: 'center',
                    title: 'Tracking',
                    headerRight: () => (
                        <Icon name='bell' size={30} color={color.appBlue} style={{ padding: 5 }} />
                    )
                }
                }
            /> */}
            {/* <Stack.Screen name="PackageDetails" component={PackageDetails}
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: color.white },
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    headerTitleStyle: { color: color.black, fontSize: 20, fontWeight: 500 },
                    headerTintColor: color.appBlue,
                    headerTitleAlign: 'center',
                    title: 'Package Details',
                    headerRight: () => (
                        <Icon name='bell' size={30} color={color.appBlue} style={{ padding: 5 }} />
                    )
                }
                }
            />
             <Stack.Screen name="PackageDetailsDelivery" component={PackageDetailsDelivery}
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: color.white },
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    headerTitleStyle: { color: color.black, fontSize: 20, fontWeight: 500 },
                    headerTintColor: color.appBlue,
                    headerTitleAlign: 'center',
                    title: 'Package Details',
                    headerRight: () => (
                        <Icon name='bell' size={30} color={color.appBlue} style={{ padding: 5 }} />
                    )
                }
                }
            />
            <Stack.Screen name="MyRoutes" component={MyRoutes} options={
                { headerShown: false }
            } />
            <Stack.Screen name="Receipt" component={Receipt}
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: color.white },
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    headerTitleStyle: { color: color.black, fontSize: 20, fontWeight: 500 },
                    headerTintColor: color.appBlue,
                    headerTitleAlign: 'center',
                    title: 'Receipt',
                    headerRight: () => (
                        <Icon name='bell' size={30} color={color.appBlue} style={{ padding: 5 }} />
                    )
                }
                }
            /> */}
        </Stack.Navigator>
    );
}

export default index