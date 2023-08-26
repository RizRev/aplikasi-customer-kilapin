import { StyleSheet, View, Text, Pressable, TextInput, BackHandler, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import LottieView from 'lottie-react-native'

const Otp = ({ navigation, route }) => {


  useEffect(() => {
    if (page==='Login') {
      handleResendOTP()
    }
  const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
    BackHandler.addEventListener('hardwareBackPress', handleExitApp);
    return true;
  };

  const handleExitApp = () => {
    BackHandler.removeEventListener('hardwareBackPress', handleExitApp);
    BackHandler.exitApp();
  }
  const page = route.params?.page
  const phoneNumber = route.params?.phoneNumber
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [remainingTime, setRemainingTime] = useState(300) // 300 seconds = 5 minutes
  const [timerActive, setTimerActive] = useState(true)

  const handleValidation = async () => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'App-ID': 'b2d6dc1a-e725-4063-b764-1821de8d623e',
        'API-Key': 'VGE74784/xZP9hENjU18ifDY0mLvuMuW',
        'content-type': 'application/json'
      },
      body: JSON.stringify({ otp: otp, msisdn: `62${phoneNumber}` })
    }

    fetch('https://api.verihubs.com/v1/whatsapp/otp/verify', options)
      .then(response => response.json())
      .then(response => {
        setMessage(response.message)
        if (response.message === 'OTP has been verified') {
          fetch(`https://customer.kilapin.com/users/verification-phone/${phoneNumber}`)
          if (page === 'ChangePW') {
            navigation.navigate('ChangePW',{phone: phoneNumber})
          } else {
            navigation.navigate('Login')
          }
        } else {
          ToastAndroid.show(response.message, ToastAndroid.SHORT);
        }
      })
      .catch(err => console.error(err))
  }
  useEffect(() => {
    if (timerActive) {
      const interval = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerActive]);

  useEffect(() => {
    if (remainingTime === 0) {
      setTimerActive(false);
    }
  }, [remainingTime]);

  const handleResendOTP = () => {
    setRemainingTime(300);
    setTimerActive(true);
    setMessage(''); // Clear the previous message
    // Add code to resend OTP (if needed) here...
    console.log('resend otp')
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'App-ID': 'b2d6dc1a-e725-4063-b764-1821de8d623e',
        'API-Key': 'VGE74784/xZP9hENjU18ifDY0mLvuMuW',
        'content-type': 'application/json'
      },
      body: JSON.stringify({content: ['Kilapin Apps'], msisdn: `62${phoneNumber}`, lang_code: 'en',time_limit: '300'})
    };
    
    fetch('https://api.verihubs.com/v1/whatsapp/otp/send', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };


  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animation/emailotp.json')}
        autoPlay
        loop
        style={styles.namelogo}
      />
      <Text style={styles.titletext}>Masukan OTP dari nomor kamu!</Text>
      <Text style={styles.subtext}>{message}</Text>
      <View style={{ height: hp('1%') }}></View>
      <View style={{ height: hp('2%') }}></View>
      <TextInput
        style={styles.textinput2}
        placeholder="OTP dari nomor kamu"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
      />
      {remainingTime > 0 && (
        <Text style={styles.timerText}>
          Resend OTP in {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}
        </Text>
      )}
      {remainingTime === 0 && (
        <Pressable style={styles.resendButton} onPress={handleResendOTP}>
          <Text style={{fontWeight:'bold'}}>Resend OTP</Text>
        </Pressable>
      )}
      <View style={{ paddingTop: hp('5%') }}></View>
      <Pressable style={styles.nextbutton} onPress={handleValidation}>
        <Text style={styles.textbutton}>NEXT</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  namelogo: {
    flex: 1,
    height: hp('15%'),
    marginTop: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  textinput2: {
    borderWidth: 1.5,
    borderColor: '#8D8D8D',
    height: 51,
    borderRadius: 30,
    width: 300,
    padding: 15,
    fontFamily: 'Ubuntur',
    marginBottom: hp('5%')
  },
  titletext: {
    color: '#DA7DE1',
    fontFamily: 'Ubuntu',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: wp('90%'),
    marginBottom: hp('2%')
  },
  subtext: {
    fontFamily: 'Ubuntur',
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: 300,
    marginBottom: hp('2%')
  },
  nextbutton: {
    backgroundColor: '#DA7DE1',
    height: 51,
    borderRadius: 30,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: hp('4%')
  },
  textbutton: {
    fontFamily: 'Ubuntu',
    color: '#fff'
  }
})

export default Otp