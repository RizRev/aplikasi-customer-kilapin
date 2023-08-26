import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native'

const ChatBL = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={{marginTop: '11%'}}></View>
            <ScrollView>
            <View style={styles.container}>
            <Text style={{fontFamily: 'Ubuntu', fontSize: 22, justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>Pesan</Text>
          <LottieView 
            source={require('../../assets/animation/GembokLocked.json')}
            autoPlay
            loop
            style={styles.namelogo}/>
          <Text style={styles.titletext}>Silahkan login dan nikmati semua layanan!</Text>
          <Text style={styles.subtext}>Silakan login untuk mendapatkan akses penuh dan menikmati semua layanan yang tersedia dalam aplikasi Kilapin</Text>
          <Pressable style={styles.nextbutton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textbutton} onPress={() => navigation.navigate('Login')}>LOGIN</Text>
            </Pressable>
            </View>
            </ScrollView>
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
        maintext: {
            fontFamily: 'Ubuntu',
            fontSize: 20,
            marginTop: hp('5%'),
            marginBottom: hp('5%')
        },
        namelogo: {
             height: hp('45%'),
             marginBottom: hp('0.5%'),
             alignItems: 'center',
             justifyContent: 'center',
             textAlign: 'center',
         },
        titletext: {
            color: '#5865F2',
            fontFamily: 'Ubuntu',
            fontSize: 30,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            width: wp('80%'),
            marginBottom: hp('2%')
        },
        mail: {
            marginBottom: hp('5%'),
            marginTop: '10%'
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
        igot: {
            fontFamily: 'Ubuntum',
            fontSize: 14,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            width: 300,
            color: '#4FC76D',
            marginBottom: hp('2%'),
            marginTop: hp('2%')
        },
        nextbutton: {
            backgroundColor: '#5865F2',
            height: 51,
            borderRadius:30,
            width: 300,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: '2%'
        },
        textbutton: {
            fontFamily: 'Ubuntu',
            color: '#fff',
        },
    })

export default ChatBL;