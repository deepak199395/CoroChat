import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home/Home';
import Header from '../Components/Layout/Header';
import Footer from '../Components/Layout/Footer';


const AppRounter = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='home'>
                <Stack.Screen name='home' component={Home} />
                <Stack.Screen name='header' component={Header}/>
                <Stack.Screen name='footer' component={Footer}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default AppRounter

const styles = StyleSheet.create({})