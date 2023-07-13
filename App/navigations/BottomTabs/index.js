import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Earnings from '../../screens/Earnings';
import MyRoutes from '../../screens/MyRoutes';
import Profile from '../../screens/Profile';
import { HomeStack } from '../HomeStack';
import { Image, View } from 'react-native';
import { color } from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons'

// svgIcons
import HomeIcon from '../../asset/svgIcons/home.svg';
import EarningIcon from '../../asset/svgIcons/earnings';
import MyRouteIcon from '../../asset/svgIcons/myRoute.svg';
import ProfileIcon from '../../asset/svgIcons/profile.svg';
const Tab = createBottomTabNavigator();

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
                    return (
                        <Icon name="home" size={24} color="#FFF" />
                    )
                },
            }} />
            <Tab.Screen name="Earnings" component={Earnings}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <EarningIcon height={20} width={20} />
                        )
                    },
                }}
            />
            <Tab.Screen name="My Routes" component={MyRoutes}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <MyRouteIcon height={20} width={20} />
                        )
                    },
                }}
            />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        return (
                            <ProfileIcon height={20} width={20} />
                        )
                    },
                }}
            />
        </Tab.Navigator>
    );
}