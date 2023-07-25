import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from '../HomeStack';
import { color } from '../../utils/colors';
import RouteStack from '../RouteStack';
import EarningStack from '../EarningStack';
import ProfileStack from '../ProfileStack';
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
const iconSize = 24
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
                        return (<HomeWhite height={iconSize} width={iconSize} />)
                    }
                    else {
                        return (<HomeFaded height={iconSize} width={iconSize} />)
                    }
                },
            }} />
            <Tab.Screen name="EarningStack" component={EarningStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        const isFocused = useIsFocused()
                        if (isFocused) {
                            return (<EarningWhite height={iconSize} width={iconSize} />)
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
            <Tab.Screen name="ProfileStack" component={ProfileStack}
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