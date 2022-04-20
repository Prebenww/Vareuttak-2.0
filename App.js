import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from "./screens/Home";
import Scanner from "./components/Scanner";
import QrScan from "./components/QrScan";


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
               <Stack.Screen
                   name='Home'
                   component={Home}
                   options={{
                       title: 'Vareuttak',
                       shadowOpacity: 50,
                       headerStyle: {
                           backgroundColor: '#011B4D',
},
                       headerTintColor: '#fff',
                       headerTitleStyle: {
                           fontWeight: 'bold',
                           fontSize: 28,

                       },
                       headerTitleAlign: 'left'
                   }}
               />
                <Stack.Screen
                    options={{
                        title: 'Vareuttak',

                        headerStyle: {
                            backgroundColor: '#011B4D',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 28,

                        },
                        headerTitleAlign: 'left'
                    }}

                    name='Scanner'
                    component={Scanner} />
                <Stack.Screen
                    options={{
                        headerShown: false,
                        title: 'Vareuttak',

                        headerStyle: {
                            backgroundColor: '#011B4D',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 28,

                        },
                        headerTitleAlign: 'left'
                    }}

                    name='QrScan'
                    component={QrScan} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerStyle: {
        backgroundColor: '#011B4D',
    }
});
