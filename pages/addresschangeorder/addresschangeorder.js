import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { BackIcon } from '../../assets';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Gap } from '../../components'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native'

const Addresschange = ({navigation}) => {
  const [address, setAddress] = useState('');
  console.log("bisa",address)
  const handleAddress = async() => {
    try {
      if (address) {
        const address1 = JSON.stringify(address)
        console.log("address",address1)
        const result = await AsyncStorage.setItem('address',address1)
        console.log(result)
        console.log("local storage address",AsyncStorage.getItem('address'))
      } else {
        console.log("tidak ada address")
      }
    } catch (error) {
      console.log("ini error",error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainheader}>
        <View style={styles.header}>
        <TouchableOpacity>
          <BackIcon onPress={() => navigation.navigate('Order')} />
        </TouchableOpacity>
        </View>
        <View style={styles.headertitle}>
        <Text style={styles.title}>Order</Text>
        </View>
      </View>
      <View style={styles.map}>
      <LottieView 
        source={require('../../assets/animation/loading.json')}
        autoPlay
        loop
        style={{
            height: hp('20%'),
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginLeft: wp('30%')
        }}/>
<View style={styles.map} />
</View>
      <View style={styles.formContainer}>
        <View>
            <Text style={styles.label}>Full Address</Text>
            <Gap height={10} />
            <View style={styles.inputview}>
            <TextInput style={styles.inputtext} onChangeText={setAddress} value={address} placeholder={'Enter your address'} />
            </View>
        </View>
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.confirmButtonText} onPress={handleAddress}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'center',
  },
  mainheader:{
    flexDirection: 'row',
    marginTop: hp('5%'),
    marginBottom: hp('1%'),
  },
  inputtext: {
    borderWidth: 1.5,
    borderColor: '#8D8D8D',
    height: 51,
    borderRadius:30,
    width: wp('90%'),
    padding: 15,
    fontFamily: 'Ubuntur',
  },
  inputview: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  headertitle: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Ubuntu',
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: wp('30%')
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  label: {
    fontFamily: 'Ubuntu',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  confirmButton: {
    backgroundColor: '#DA7DE1',
    height: 51,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontFamily: 'Ubuntu',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
map: {
    flex: 1,
    marginBottom: -20
  },
});

export default Addresschange