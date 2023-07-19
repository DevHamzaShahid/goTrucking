import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyRoutes from '../../screens/MyRoutes'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { color } from '../../utils/colors';
import Tracking from '../../screens/Tracking'

const Stack = createStackNavigator();

const index = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Receipt" component={Tracking}
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
            />
        </Stack.Navigator>
    );
}

export default index