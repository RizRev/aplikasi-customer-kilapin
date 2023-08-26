import { StyleSheet, View, Text, Pressable } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native'

const Successotp = ({navigation}) => {  

  return (
    <View style={styles.container}>
        <LottieView 
        source={require('../../assets/animation/ceklis.json')}
        autoPlay
        loop
        style={styles.namelogo}/>
      <Text style={styles.titletext}>Register success!</Text>
      <Text style={styles.subtext}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet</Text>
      <Pressable style={styles.nextbutton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textbutton} onPress={() => navigation.navigate('Login')}>LOGIN</Text>
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
    titletext: {
        color: '#DA7DE1',
        fontFamily: 'Ubuntu',
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: wp('80%'),
        marginBottom: hp('2%'),
        marginTop: hp('5%'),
    },
    namelogo: {
         height: hp('-15%'),
         width: wp('85%'),
         alignItems: 'center',
         justifyContent: 'center',
         textAlign: 'center',
         marginTop: hp('8%')
     },
    subtext: {
        fontFamily: 'Ubuntur',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: 300,
        marginBottom: hp('15%'),
    },
    nextbutton: {
        backgroundColor: '#DA7DE1',
        height: 51,
        borderRadius:30,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: hp('10%')
    },
    textbutton: {
        fontFamily: 'Ubuntu',
        color: '#fff',
    },
})

export default Successotp