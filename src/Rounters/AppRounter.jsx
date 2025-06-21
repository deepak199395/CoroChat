import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screens/Home/Home';
import Header from '../Components/Layout/Header';
import Footer from '../Components/Layout/Footer';
import Saving from '../Screens/Saving/Saving';
import Options from '../Screens/Options/Options';
import Setting from '../Screens/Settings/Setting';
import LoginScreen from '../Screens/Auth/LoginScreen';
import RegisterScreen from '../Screens/Auth/RegisterScreen';
import Packege from '../Screens/Packege/Packege';
import CreateDueForm from '../Screens/Packege/CreateDueForm';
import Showloan from '../Screens/Packege/Showloan';
import DetailsLoanFile from '../Screens/Packege/DetailsLoanFile';
import UserProfile from '../Screens/Auth/UserProfile';
import splashScreen from '../Screens/splashScreen';
import DeallyExppess from '../Screens/Expenss/DeallyExppess';
import ShoWexpances from '../Screens/Expenss/ShoWexpances';
import DashBoard from '../DASHBORD/DashBoard';
import Appsetting from '../Screens/Options/Appsetting';
import Documents from '../Screens/Options/Documents';
import ITR from '../Screens/Options/ITR';
import Expenses from '../Screens/Options/Expenses';
import LoanRecord from '../Screens/Options/LoanRecord';
import BankDetails from '../Screens/Options/BankDetails';
import SIP from '../Screens/Options/SIP';
import Legal from '../Screens/Options/Legal';
import NetWorthTracker from '../Screens/Options/NetWorthTracker';
import BillSlid from '../Components/Layout/BillSplid/BillSlid';


const AppRounter = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='splashScreen'>
                <Stack.Screen name='home' component={Home} options={{headerShown:false}} />
                <Stack.Screen name='header' component={Header}/>
                <Stack.Screen name='footer' component={Footer}/>
                <Stack.Screen name='Saving' component={Saving}/>
                <Stack.Screen name='Options' component={Options}/>
                <Stack.Screen name='Packege' component={Packege}/>
                <Stack.Screen name='Setting' component={Setting}/>
                <Stack.Screen name='LoginScreen' component={LoginScreen}/>
                <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>
                <Stack.Screen name='CreateDueForm' component={CreateDueForm}/>
                <Stack.Screen name='Showloan' component={Showloan}/>
                <Stack.Screen name='DetailsLoanFile' component={DetailsLoanFile}/>
                <Stack.Screen name='UserProfile' component={UserProfile}/>
                <Stack.Screen name='splashScreen' component={splashScreen} options={{headerShown:false}}/>
                <Stack.Screen name='DeallyExppess' component={DeallyExppess}/>
                <Stack.Screen name='ShoWexpances' component={ShoWexpances}/>
                <Stack.Screen name='DashBoard' component={DashBoard}/>
                <Stack.Screen name='Appsetting' component={Appsetting}/>
                <Stack.Screen name='Documents' component={Documents}/>
                <Stack.Screen name='ITR' component={ITR}/>
                <Stack.Screen name='Expenses' component={Expenses}/>
                <Stack.Screen name='LoanRecord' component={LoanRecord}/>
                <Stack.Screen name='BankDetails' component={BankDetails}/>
                <Stack.Screen name='SIP' component={SIP}/>
                <Stack.Screen name='NetWorthTracker' component={NetWorthTracker}/>
                <Stack.Screen name='Legal' component={Legal}/>
                <Stack.Screen name='BillSlid' component={BillSlid}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default AppRounter

const styles = StyleSheet.create({})