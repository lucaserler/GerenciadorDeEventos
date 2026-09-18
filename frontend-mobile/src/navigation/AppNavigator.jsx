import {
    NavigationContainer
} from "@react-navigation/native";

import {
    createNativeStackNavigator
} from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EventsScreen from "../screens/EventsScreen";
import CreateEventScreen from "../screens/CreateEventScreen";
import EditEventScreen from "../screens/EditEventScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="Login"
            >

                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        title: "Login"
                    }}
                />

                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{
                        title: "Cadastro"
                    }}
                />

                <Stack.Screen
                    name="CreateEvent"
                    component={CreateEventScreen}
                    options={{ title: "Novo Evento" }}
                />

                <Stack.Screen
                    name="EditEvent"
                    component={EditEventScreen}
                    options={{ title: "Editar Evento" }}
                />

                <Stack.Screen
                    name="Events"
                    component={EventsScreen}
                    options={{
                        title: "Eventos"
                    }}
                />

            </Stack.Navigator>

        </NavigationContainer>
    );
}

export default AppNavigator;