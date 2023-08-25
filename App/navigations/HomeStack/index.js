import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home'
import ViewDetails from '../../screens/ViewDetails'
import { color } from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BackIcon from 'react-native-vector-icons/MaterialIcons'
import PackageDetails from '../../screens/PackageDetails'
import MyRoutes from '../../screens/MyRoutes';
import Receipt from '../../screens/Receipt';
import PackageDetailsDelivery from '../../screens/PackageDetailsDelivery'
import { route } from '../../Routes';
import { TouchableOpacity } from 'react-native';
const Stack = createStackNavigator();

export function HomeStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="ViewDetails" component={ViewDetails}
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: color.white },
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                    headerTitleStyle: { color: color.black, fontSize: 20, fontWeight: 500 },
                    headerTintColor: color.appBlue,
                    headerTitleAlign: 'center',
                    title: 'Pick-up Points',
                    headerRight: () => (
                        <Icon name='bell' size={30} color={color.appBlue} style={{ padding: 5 }} />
                    )
                }
                }
            />
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
                    headerRight: () => (
                        <Icon name='bell' size={30} color={color.appBlue} style={{ padding: 5 }} />
                    ),
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate(route.MyRoutes)}>
                            <BackIcon name='arrow-back-ios-new' size={30} color={color.appBlue} style={{ padding: 5 }} />
                        </TouchableOpacity>
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
                    ),
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate(route.MyRoutes)}>
                            <BackIcon name='arrow-back-ios-new' size={30} color={color.appBlue} style={{ padding: 5 }} />
                        </TouchableOpacity>
                    )
                }
                }
            />
            {/* <Stack.Screen name="MyRoutes" component={MyRoutes} options={
                { headerShown: false }
            } /> */}
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
                    ),
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate(route.MyRoutes)}>
                            <BackIcon name='arrow-back-ios-new' size={30} color={color.appBlue} style={{ padding: 5 }} />
                        </TouchableOpacity>
                    )
                }
                }
            />
        </Stack.Navigator>
    );
}
