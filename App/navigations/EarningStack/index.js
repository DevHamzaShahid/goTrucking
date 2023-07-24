import { View, Text } from 'react-native'
import React from 'react'
import MyEarnings from '../../screens/MyEarnings'
import { color } from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const index = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyEarnings" component={MyEarnings}
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: color.appBlue },
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    headerTitleStyle: { color: color.white, fontSize: 20, fontWeight: 500 },
                    headerTintColor: color.appBlue,
                    headerTitleAlign: 'center',
                    title: '',
                    headerRight: () => (
                        <Icon name='bell' size={30} color={color.white} style={{ padding: 5,marginRight:20 }} />
                    )
                    ,
                    headerLeft: () => (
                        <Icon name='arrow-left' size={30} color={color.white} style={{ padding: 5,marginLeft:20 }} />
                    )
                }
                }
            />
        </Stack.Navigator>
    );
}


export default index