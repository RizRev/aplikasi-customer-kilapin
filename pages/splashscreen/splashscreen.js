import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import LottieView from 'lottie-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';


const Splashscreen = ({ navigation }) => {
  const login = useSelector(state => state.auth.login.loggedIn);
  if (login) {
    console.log('masuk login = true')
    setTimeout(() => {
      navigation.replace('MainApp');
    }, 1000); // Add a delay of 1 second before navigating
  } else {
    console.log('masuk login = false')
    setTimeout(() => {
      navigation.replace('LanguageSelection');
    }, 2500);
  }
  // useEffect(() => {
  // }, [navigation]);

  const [fontsLoaded] = useFonts({
    Ubuntu: require("../../assets/fonts/Ubuntu-Bold.ttf"),
    Ubuntur: require("../../assets/fonts/Ubuntu-Regular.ttf"),
    Ubuntum: require("../../assets/fonts/Ubuntu-Medium.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.background}>
      <LottieView 
        source={require('../../assets/animation/kilapinwithtagline.json')}
        autoPlay
        loop
        style={{
          height: hp('20%'),
          marginTop: hp('20%')
        }}
      />
      <LottieView 
        source={require('../../assets/animation/poweredbyprodigium.json')}
        autoPlay
        loop 
        style={{
          height: hp('5%'),
          marginBottom: hp('4%')
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: '#fff'
  }
});

export default Splashscreen;