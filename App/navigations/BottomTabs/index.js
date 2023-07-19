import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Earnings from '../../screens/Earnings';
import MyRoutes from '../../screens/MyRoutes';
import Profile from '../../screens/Profile';
import { HomeStack } from '../HomeStack';
import { Image, View } from 'react-native';
import { color } from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons'
import RouteStack from '../RouteStack'
// svgIcons
import HomeWhite from '../../asset/svgIcons/Home White.svg'
import HomeFaded from '../../asset/svgIcons/Home Faded.svg'
import EarningWhite from '../../asset/svgIcons/Earnings White.svg'
import EarningFaded from '../../asset/svgIcons/Earnings Faded.svg'
import RouteWhite from '../../asset/svgIcons/My Routes White.svg'
import RouteFaded from '../../asset/svgIcons/My Routes Faded.svg'
import ProfileWhite from '../../asset/svgIcons/My Profile White.svg'
import ProfileFaded from '../../asset/svgIcons/My Profile Faded.svg'
import { useIsFocused } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const iconSize=24
export function MyTabs() {
    
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: color.appBlue,
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    width: '95%',
                    alignSelf: 'center',
                },
            }}
        >
            <Tab.Screen name="HomeStack" component={HomeStack} options={{
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    const isFocused = useIsFocused()
                    if (isFocused) {
                        return (<HomeWhite height={iconSize} width={iconSize}/>)
                    }
                    else {
                        return (<HomeFaded height={iconSize} width={iconSize}/>)
                    }
                },
            }} />
            <Tab.Screen name="Earnings" component={Earnings}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        const isFocused = useIsFocused()
                        if (isFocused) {
                            return (<EarningWhite height={iconSize} width={iconSize}/>)
                        }
                        else {
                            return (<EarningFaded height={iconSize} width={iconSize} />)
                        }
                    },
                }}
            />
            <Tab.Screen name="My Routes" component={RouteStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        const isFocused = useIsFocused()
                        if (isFocused) {
                            return (<RouteWhite height={iconSize} width={iconSize} />)
                        }
                        else {
                            return (<RouteFaded height={iconSize} width={iconSize} />)
                        }
                    },
                }}
            />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        const isFocused = useIsFocused()
                        if (isFocused) {
                            return (<ProfileWhite height={iconSize} width={iconSize} />)
                        }
                        else {
                            return (<ProfileFaded height={iconSize} width={iconSize} />)
                        }
                    },
                }}
            />
        </Tab.Navigator>
    );
}