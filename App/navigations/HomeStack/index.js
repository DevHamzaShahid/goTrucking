import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home'
const Stack = createStackNavigator();

export function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}
