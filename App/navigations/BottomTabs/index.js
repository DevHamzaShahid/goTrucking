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
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Alert, View } from 'react-native';
import { route } from '../../Routes';

const Tab = createBottomTabNavigator();
const iconSize = 24

export function MyTabs() {
    const truckingState = useSelector(state => state);
    const { shipment_Id } = truckingState.shipmentId || ''


    const navigation = useNavigation()
    
    // const handleTabPress = () => {
    //     if (!shipment_Id) {
    //     //   navigation.navigate(route.MyRoutes);
        
    //       Alert.alert('No Shipment in Progress', 'You clicked on My Routes tab, but no shipment is in progress.', [
    //         { text: 'OK' }
    //       ]);
    //     }
    //   };
    return (
        <View style={{ flex: 1, backgroundColor: color.white }}>
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
            tabBarOptions={{
                activeTintColor: color.white,
                inactiveTintColor: color.textGrey,
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
            {/* <Tab.Screen name="EarningStack" component={EarningStack}
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
            /> */}
            
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
                // listeners={{
                //     tabPress: handleTabPress
                //   }}
                // listeners={({ navigation }) => ({
                //     tabPress: (e) => {
                //       // Prevent default tab press behavior
                //       e.preventDefault();
                      
                //       // Show an alert when the tab is pressed
                //       Alert.alert('Tab Pressed', 'You clicked on My Routes tab!', [
                //         { text: 'OK' }
                //       ]);
                //     //   navigation.navigate('RouteStack',{screen:'MyRoutes'})
                //     }
                //   })}
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
        </View>

    );
}