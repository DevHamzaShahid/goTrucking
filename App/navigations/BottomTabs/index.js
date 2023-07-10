import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Earnings from '../../screens/Earnings';
import MyRoutes from '../../screens/MyRoutes';
import Profile from '../../screens/Profile';
import { HomeStack } from '../HomeStack';

const Tab = createBottomTabNavigator();

export function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeStack" component={HomeStack}  options={{headerShown:false}}/>
            <Tab.Screen name="Earnings" component={Earnings} />
            <Tab.Screen name="My Routes" component={MyRoutes} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}