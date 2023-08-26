import { StyleSheet, View, Text, Pressable, Image } from 'react-native'
import React, { useEffect } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Tutorial = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.maintext}>Tutorial</Text>
        <Image source={require('../../assets/image/Tutorial.png')} style={{height: hp('63%'), width: wp('60%'), marginTop: hp('-2%') }}/>
      <View style={styles.tuts}>
        <View style={styles.numbershape}>
            <Text style={styles.number}>1</Text>
        </View>
      <Text style={styles.subtext}>Bagian ini merupakan estimasi cleaner anda akan tiba, Kilapin menetapkan cleaner akan tiba selama 15 Menit!</Text>
      </View>
      <View style={styles.tuts}>
        <View style={styles.numbershape}>
            <Text style={styles.number}>2</Text>
        </View>
      <Text style={styles.subtext}>Bagian ini merupakan informasi cleaner, serta button untuk approve cleaner (cleaner harus sama dengan foto) dengan memfoto cleaner dan approve cleaning ketika sudah selesai cleaning!</Text>
      </View>

      <Pressable style={styles.nextbutton} onPress={() => navigation.navigate('Task')}>
            <Text style={styles.textbutton} onPress={() => navigation.navigate('Task')}>NEXT</Text>
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
    maintext: {
        fontFamily: 'Ubuntu',
        fontSize: 20,
        marginTop: hp('-1%'),
        marginBottom: hp('4%')
    },
    tuts:{
        flexDirection: 'row',       
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        marginTop: hp('2'),
    },
    numbershape: {
        height: 25,
        width: 25,
        backgroundColor: '#4552AF',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginRight: 10,
    },
    number: {
        fontFamily: 'Ubuntu',
        color: '#fff',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    subtext: {
        fontFamily: 'Ubuntur',
        fontSize: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
    },
    nextbutton: {
        backgroundColor: '#4552AF',
        height: 51,
        borderRadius:30,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: hp('3%')
    },
    textbutton: {
        fontFamily: 'Ubuntu',
        color: '#fff',
    },
})

export default Tutorial