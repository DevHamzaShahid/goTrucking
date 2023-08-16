import { createStackNavigator } from "@react-navigation/stack";
import Register from '../../screens/Register'
import { route } from "../../Routes";
import { color } from "../../utils/colors";
import Login from '../../screens/Login'
import { MyTabs } from "../BottomTabs";
const Stack = createStackNavigator();

export function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login}
                options={{
                    headerShown: false,
                    headerStyle: { backgroundColor: color.white },
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                }
                }
            />

            <Stack.Screen name="Register" component={Register}
                options={{
                    headerShown: false,
                    headerStyle: { backgroundColor: color.white },
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                }
                }
            />

            <Stack.Screen name="MyTabs" component={MyTabs}
                options={{
                    headerShown: false,
                    headerStyle: { backgroundColor: color.white },
                    headerShadowVisible: false,
                    headerBackTitleVisible: false,
                }
                }
            />
        </Stack.Navigator>
    );
}

