import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MyProfile from '../../screens/MyProfile'
import { color } from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import EditProfile from '../../screens/EditProfile'
const Stack = createStackNavigator();

const index = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyProfile" component={MyProfile}
                options={{
                    headerShown: false,
                }
                }
            />
               <Stack.Screen name="EditProfile" component={EditProfile}
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: color.white },
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    headerTitleStyle: { color: color.black, fontSize: 20, fontWeight: 500 },
                    headerTintColor: color.appBlue,
                    headerTitleAlign: 'center',
                    title: 'Edit Profile',
                    // headerRight: () => (
                    //     <Icon name='bell' size={30} color={color.appBlue} style={{ padding: 5 }} />
                    // )
                }
                }
            />
        </Stack.Navigator>
    );
}

export default index