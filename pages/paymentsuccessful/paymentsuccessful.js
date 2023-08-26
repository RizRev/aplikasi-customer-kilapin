import { BackHandler,StyleSheet, View, Text, Pressable } from 'react-native'
import React, { useEffect,useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {ApplicationActions} from '@actions';

const Paymentsuccessful = ({navigation,route}) => {
    const {discount} = route.params
    const dispatch = useDispatch();
    const [OrderStatus, setOrderStatus] = useState('');
    const [pesan, setPesan] = useState('')
    const fetchOrderDetail = async () => {
        try {
            
          } catch (error) {
        }  
      }

      const fetchOrderStatus = async () => {
        try {
            console.log("menjalankan get data order")
            var order_id = await AsyncStorage.getItem('order_id')
            console.log(order_id)
            const link = `https://customer.kilapin.com/notif/status/${order_id}`
            const response = await fetch(link);
            const data = await response.json()
            console.log("message", data.message)

            if (data.message === "Sudah membayar"){
                let order_id = await AsyncStorage.getItem('order_id')
                    console.log('ini order id payment',order_id)
                    const link = `https://customer.kilapin.com/order/detail/${order_id}`
                    const response = await fetch(link);
                    const data = await response.json()
                if (data) {
                    dispatch(ApplicationActions.onclearOrder());
                    console.log('order-detail',data)
                    dispatch(ApplicationActions.onAddOrder(data.data));
                    setPesan("Yeay! Your cleaner is on the way!")
                    navigation.navigate('Home')
                }
            // }
            // } else if (data.message === "pembayaran expired") {
            //     navigation.navigate('PaymentGateway',{discount: discount})
            //     setPesan("Your payment expired, please re-order!")
            } else {
                navigation.navigate('PaymentGateway',{discount: discount})
                setPesan("Please pay your order")
            }
            // if (data.message) {
                
            // } else {
            //     setPesan("Loading")
            // }
            console.log(pesan)
        } catch (error) {
          
        }  
      }
    
    // dispatch(ApplicationActions.onclearVoucher());
    useEffect(() => {

        fetchOrderStatus()
        // Fungsi ini akan dijalankan saat komponen YourComponent dipasang
        const backAction = () => {
          // Cegah kembali ke layar sebelumnya
          return true;
        };
    
        // Tambahkan event listener untuk mengendalikan "back" gesture
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
    
        // Bersihkan event listener saat komponen di-unmount
        return () => backHandler.remove();
      }, []);
    
  return (
    <View style={styles.container}>
    <LottieView 
        source={require('../../assets/animation/ontheway.json')}
        autoPlay
        loop
        style={styles.animation}/>
      <Text style={styles.titletext}>{pesan ? (pesan):("Loading")}</Text>
      <Text style={styles.subtext}>Selamat cleaning service terbaik akan segera tiba dan membuat tempat kamu menjadi sangat bersih!</Text>
      <Pressable style={styles.nextbutton} onPress={fetchOrderStatus}>
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

export default Paymentsuccessful