import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { BackIcon } from '../../assets';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Gap } from '../../components'
import LottieView from 'lottie-react-native'

const Addresschange = ({navigation}) => {
  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handlePackageChange = (itemValue) => {
    setSelectedPackage(itemValue);
  }

  const handleTimeChange = (itemValue) => {
    setSelectedTime(itemValue);
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainheader}>
        <View style={styles.header}>
        <TouchableOpacity>
          <BackIcon onPress={() => navigation.navigate('Profile')} />
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
            <TextInput style={styles.inputtext} placeholder={'Enter your address'} />
            </View>
        </View>
        <View>
            <Text style={styles.label}>Landmark</Text>
            <Gap height={10} />
            <View style={styles.inputview}>
            <TextInput style={styles.inputtext} placeholder={'Enter your address'} />
            </View>
        </View>
        <View>
            <Text style={styles.label}>Address</Text>
            <Gap height={10} />
            <View style={styles.inputview}>
            <TextInput style={styles.inputtext} placeholder={'Enter your address'} />
            </View>
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('Order')}>
          <Text style={styles.confirmButtonText}>CONFIRM</Text>
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
  addresscontainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    fontFamily: 'Ubuntu',
    fontSize: 18,
    marginRight: 16,
  },
  title: {
    fontFamily: 'Ubuntu',
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: wp('30%')
  },
  mapImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
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
  labelchange:{
    fontFamily: 'Ubuntum',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
    color: '#5865F2',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  address: {
    fontSize: 16,
    fontFamily: 'Ubuntur',
    marginBottom: 10,
    marginTop: 10,
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