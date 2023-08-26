import React, {useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { ChangePW,InputPhone,Airconditioner, Maps, Voucher, Membership, ChatBot, ManageAccount, LanguageSelection, XPPage, SelectCity, SelectCityBL, ComingSoon, ComingSoonBL, ContactUs, FAQ, TermsAndConditionBL, TopCleanerOne, TopCleanerTwo, TopCleanerThree, TopCleanerThreeBL, TopCleanerTwoBL, TopCleanerOneBL, Tracking, Successotp, Otp, NewsBL, TaskBL, ProfileBL, ChatBL, HomeBL, Review, ReviewPage, Tutorial, PaymentGateway, AddressChange, Order, SplashScreen, Login, SignUp, Home, Task, Profile, Chat, News, ChatScreen, PaymentSuccessful, ArticleBL1, ArticleBL2, Article1, Article2, TermsAndCondition, CameraView, Test,Chats} from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator,  BottomNavigatorBL } from '../components';
import OrderBooking from '../pages/orderbooking/orderbooking';
import {initReactI18next} from 'react-i18next';
import {BaseSetting} from '../config/setting';
import i18n from 'i18next';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainAppBL = () => {
    return (
        <Tab.Navigator initialRouteName="HomeBL" tabBar={props => <BottomNavigatorBL {...props}/>}>
            <Tab.Screen name="NewsBL" component={NewsBL} options={{headerShown: false,gestureEnabled: false}}/>
            <Tab.Screen name="TaskBL" component={TaskBL} options={{headerShown: false}}/>
            <Tab.Screen name="HomeBL" component={HomeBL} options={{headerShown: false}}/>
            <Tab.Screen name="ChatBL" component={ChatBL} options={{headerShown: false}}/>
            <Tab.Screen name="ProfileBL" component={ProfileBL} options={{headerShown: false}}/>
        </Tab.Navigator>
    )
}

const MainApp = () => {
    return (
        <Tab.Navigator initialRouteName="Home" tabBar={props => <BottomNavigator {...props}/>}>
            <Tab.Screen name="News" component={News} options={{headerShown: false,gestureEnabled: false}}/>
            <Tab.Screen name="Task" component={Task} options={{headerShown: false}}/>
            <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Tab.Screen name="Chat" component={Chat} options={{headerShown: false}}/>
            <Tab.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        </Tab.Navigator>
    )
}

const Router = () => {

    const language = useSelector(state => state.application.language);

    /**
     * init language
     */
    useEffect(() => {
        i18n.use(initReactI18next).init({
        resources: BaseSetting.resourcesLanguage,
        lng: BaseSetting.defaultLanguage,
        fallbackLng: BaseSetting.defaultLanguage,
        compatibilityJSON: 'v3',
        });
    }, []);

    /**
     * when reducer language change
     */
    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);


    
    return (
    <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
        <Stack.Screen name="LanguageSelection" component={LanguageSelection} options={{ headerShown: false }} />
        <Stack.Screen name="Voucher" component={Voucher} options={{ headerShown: false }} />
        <Stack.Screen name="Membership" component={Membership} options={{ headerShown: false }} />
        <Stack.Screen name="MainAppBL" component={MainAppBL} options={{headerShown: false}}/>
        <Stack.Screen name="ArticleBL1" component={ArticleBL1} options={{headerShown: false}}/>
        <Stack.Screen name="ArticleBL2" component={ArticleBL2} options={{headerShown: false}}/>
        <Stack.Screen name="Article1" component={Article1} options={{headerShown: false}}/>
        <Stack.Screen name="Article2" component={Article2} options={{headerShown: false}}/>
        <Stack.Screen name="MainApp" component={MainApp} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="Otp" component={Otp} options={{headerShown: false}}/>
        <Stack.Screen name="Successotp" component={Successotp} options={{headerShown: false}}/>
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Order" component={Order} options={{headerShown: false}}/>
        <Stack.Screen name="Airconditioner" component={Airconditioner} options={{headerShown: false}}/>
        <Stack.Screen name="OrderBooking" component={OrderBooking} options={{headerShown: false}}/>
        <Stack.Screen name="Maps" component={Maps} options={{headerShown: false}}/>
        <Stack.Screen name="AddressChange" component={AddressChange} options={{headerShown: false}}/>
        <Stack.Screen name="PaymentGateway" component={PaymentGateway} options={{headerShown: false}}/>
        <Stack.Screen name="PaymentSuccessful" component={PaymentSuccessful} options={{headerShown: false}}/>
        <Stack.Screen name="Tutorial" component={Tutorial} options={{headerShown: false}}/>
        <Stack.Screen name="ReviewPage" component={ReviewPage} options={{headerShown: false}}/>
        <Stack.Screen name="Review" component={Review} options={{headerShown: false}}/>
        <Stack.Screen name="Tracking" component={Tracking} options={{headerShown: false}}/>
        {/* <Stack.Screen name="TopCleanerOneBL" component={TopCleanerOneBL} options={{headerShown: false}}/> */}
        {/* <Stack.Screen name="TopCleanerTwoBL" component={TopCleanerTwoBL} options={{headerShown: false}}/>
        <Stack.Screen name="TopCleanerThreeBL" component={TopCleanerThreeBL} options={{headerShown: false}}/> */}
        <Stack.Screen name="TopCleanerOne" component={TopCleanerOne} options={{headerShown: false}}/>
        <Stack.Screen name="TopCleanerTwo" component={TopCleanerTwo} options={{headerShown: false}}/>
        <Stack.Screen name="TopCleanerThree" component={TopCleanerThree} options={{headerShown: false}}/>
        <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} options={{headerShown: false}}/>
        <Stack.Screen name="TermsAndConditionBL" component={TermsAndConditionBL} options={{headerShown: false}}/>
        <Stack.Screen name="FAQ" component={FAQ} options={{headerShown: false}}/>
        <Stack.Screen name="ContactUs" component={ContactUs} options={{headerShown: false}}/>
        <Stack.Screen name="ComingSoonBL" component={ComingSoonBL} options={{headerShown: false}}/>
        <Stack.Screen name="ComingSoon" component={ComingSoon} options={{headerShown: false}}/>
        <Stack.Screen name="CameraView" component={CameraView} options={{headerShown: false}}/>
        <Stack.Screen name="photoCleaner" component={Test} options={{headerShown: false}}/>
        <Stack.Screen name="SelectCityBL" component={SelectCityBL} options={{headerShown: false}}/>
        <Stack.Screen name="SelectCity" component={SelectCity} options={{headerShown: false}}/>
        <Stack.Screen name="Chats" component={Chats} options={{headerShown: false}}/>
        <Stack.Screen name="XPPage" component={XPPage} options={{headerShown: false}}/>
        <Stack.Screen name="ManageAccount" component={ManageAccount} options={{headerShown: false}}/>
        <Stack.Screen name="ChatBot" component={ChatBot} options={{headerShown: false}}/>
        <Stack.Screen name="InputPhone" component={InputPhone} options={{headerShown: false}}/>
        <Stack.Screen name="ChangePW" component={ChangePW} options={{headerShown: false}}/>
    </Stack.Navigator>
    )
}

export default Router;