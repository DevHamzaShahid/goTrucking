import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home'
import ViewDetails from '../../screens/ViewDetails'
import { color } from '../../utils/colors';
const Stack = createStackNavigator();
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="ViewDetails" component={ViewDetails} 
             options={{
                headerShown: true,
                headerStyle: { backgroundColor: color.white },
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTitleStyle: { color: color.black,fontSize:20,fontWeight:500 },
                headerTintColor: color.appBlue,
                headerTitleAlign: 'center',
                title: 'Pick-up Points',
                headerRight: () => (
                   <Icon name='bell' size={30} color={color.appBlue} style={{padding:5}} />
                )
            }
            }
            />
        </Stack.Navigator>
    );
}
