import { StyleSheet, View, Text, Pressable } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native'


const ComingSoon = ({navigation}) => {
  return (
    <View style={styles.container}>
    <LottieView 
        source={require('../../assets/animation/comingsoon.json')}
        autoPlay
        loop
        style={styles.animation}/>
      <Text style={styles.titletext}>Segera Hadir!</Text>
      <Text style={styles.subtext}>Fitur ini akan segera hadir dan memberikan anda pelayanan terbaik dari Kilapin!</Text>
      <Pressable style={styles.nextbutton} onPress={() => (navigation.navigate('Home'))}>
            <Text style={styles.textbutton}onPress={() => (navigation.navigate('Home'))}>HOME</Text>
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
    animation: {
        height: hp('40%'),
        marginTop: hp('5%'),
        marginBottom: hp('5%')
    },
    titletext: {
        color: '#4552AF',
        fontFamily: 'Ubuntu',
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: wp('80%'),
        marginBottom: hp('2%'),
        marginTop: hp('5%')
    },
    subtext: {
        fontFamily: 'Ubuntur',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: 300,
        marginBottom: hp('2%'),
        color: '#343434'
    },
    nextbutton: {
        backgroundColor: '#4552AF',
        height: 51,
        borderRadius:30,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: hp('15%')
    },
    textbutton: {
        fontFamily: 'Ubuntu',
        color: '#fff',
    },
})

export default ComingSoon