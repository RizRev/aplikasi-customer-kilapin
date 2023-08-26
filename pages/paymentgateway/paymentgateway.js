import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Linking, BackHandler } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native'
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationActions} from '@actions';


const RadioButton = ({discount}) => {
  console.log('jin',discount)
  // const address = useSelector(state => state.application.address);
  const service = useSelector(state => state.application.size);
  // console.log(''service)
  const addOn = useSelector(state => state.application.floor);
  const voucherDiscount = useSelector(state => state.application.discount)
  const order_detail = useSelector(state => state.application.order);
  console.log("hasil redux",order_detail)
  const address = order_detail.address
  const gross_amount = order_detail.total_price
  const [url, setUrl] = useState('')
  AsyncStorage.getItem('url').then((res) => setUrl(res))
  console.log(url)
//   const formatPrice = () => (price) => {
//     // Assuming the 'price' is in number format (e.g., 100000)
//     return new Intl.NumberFormat("id-ID", {
//         style: "currency",
//         currency: "IDR",
//     }).format(price);
// }
  const formatRupiah = (angka) => {
  const rupiah = angka.toString().split('').reverse().join('');
  let hasil = '';
  let ribuan = 0;
  for (let i = 0; i < rupiah.length; i++) {
    hasil += rupiah[i];
    ribuan++;
    if (ribuan === 3 && i !== rupiah.length - 1) {
      hasil += '.';
      ribuan = 0;
    }
  }
  return hasil.split('').reverse().join('');
};
  return (
    <View style={styles.container}>
      <LottieView 
        source={require('../../assets/animation/bill.json')}
        autoPlay
        loop
        style={{
            height: hp('45%'),
            marginBottom: hp('15%')
        }}/>
      <View style={{marginTop: hp('-10%'),}}></View>
      <View style={styles.shapebill2}>
        <View style={styles.shapebill}>
          <View style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
            <Text style={styles.pricetext}>Detail Pembayaran</Text>
              <View style={{flexDirection: 'row', marginTop: '2.5%',}}>
                <View style={{width:100}}>
                  <Text style={{color: '#fff'}}>Jenis Layanan</Text>
                  <Text style={{color: '#fff'}}>Alamat</Text>
                  <Text style={{color: '#fff'}}>Harga Pokok</Text>
                  <Text style={{color: '#fff'}}>Add Ons</Text>
                  <Text style={{color: '#fff'}}>Diskon</Text>
                </View>
                <View style={{marginRight:5}}>
                  <Text style={{color: '#fff'}}>:</Text>
                  <Text style={{color: '#fff'}}>:</Text>
                  <Text style={{color: '#fff'}}>:</Text>
                  <Text style={{color: '#fff'}}>:</Text>
                  <Text style={{color: '#fff'}}>:</Text>
                </View>
                <View style={{width:'40%'}}>
                <Text style={{color: '#fff'}}>{service}</Text>
                  <Text style={{color: '#fff'}}>{address?address.substring(0, 20):'tunggu =ya'}</Text>
                  <Text style={{color: '#fff'}}>Rp. {gross_amount ? formatRupiah(gross_amount) : '0'}</Text>
                  <Text style={{color: '#fff'}}>{addOn}</Text>
                  <Text style={{color: '#fff'}}>Rp. {order_detail.total_discount?formatRupiah(order_detail.total_discount):'0'}</Text>
                </View>
              </View>
          </View>
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: wp('100%'),
    height: hp('100%')
  },
  shapebill:{
    backgroundColor: '#DA7DE1',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 20,
    paddingBottom: hp('3%'),
    marginTop: '-3%',
    marginBottom: '1%'
  },
  shapebill2:{
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  pricetext: {
    fontFamily: 'Ubuntu',
    fontSize: 28,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#fff',
    marginTop: hp('2%')
  },
  descp:{
    width: wp('70%'),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: hp('0.5%'),
    color: '#fff'
  },
nextbutton: {
    backgroundColor: '#DA7DE1',
    height: 45,
    borderRadius:30,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
    color: '#fff',
    fontFamily: 'Ubuntu',
    marginRight: '2.5%',
    marginBottom: '5.4%'
},
nextbutton2: {
  backgroundColor: '#353535',
  height: 45,
  borderRadius: 1130,
  width: '40%',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#fff',
  fontFamily: 'Ubuntu',
},
textbutton2: {
    fontFamily: 'Ubuntu',
    color: '#fff',
    fontSize: 12
},
textbutton: {
  fontFamily: 'Ubuntu',
  color: '#fff',
},
});

export default function App({navigation,route}) {
  useEffect(() => {
    // Function to handle the hardware back gesture
    const handleHardwareBackPress = () => {
      // Navigate back to the Home screen
      navigation.navigate('MainApp',{screen:'Home'});
      // Return true to indicate that we've handled the back press
      return true;
    };

    // Subscribe to the hardware back press event when the component mounts
    BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);

    // Clean up the event listener when the component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleHardwareBackPress);
    };
  }, [navigation]);
  const {discount} = route.params
  console.log('ini discount',discount)
  const [url, setUrl] = useState('');

  AsyncStorage.getItem('url').then((res) => setUrl(res));
  console.log(url);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
      <RadioButton 
      discount={discount}
      />  
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '-5%', marginBottom: '5%', marginRight: '0.5%'}}>
        <Pressable style={styles.nextbutton} onPress={() => Linking.openURL(`${url}`)}>
          <Text style={styles.textbutton}>BAYAR DISINI</Text>
        </Pressable>
        <Pressable style={styles.nextbutton2} onPress={() => navigation.navigate('PaymentSuccessful',{discount: discount})}>
          <Text style={styles.textbutton2}>SAYA SUDAH BAYAR</Text>
        </Pressable> 
        </View>
    </View>
  );
}