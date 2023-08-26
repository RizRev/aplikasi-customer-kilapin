import React from 'react'
import { View,Text,SafeAreaView,TextInput,StyleSheet,Pressable, Alert } from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from "react-native-responsive-screen";
import LottieView from 'lottie-react-native'
import { Formik } from 'formik';
import * as Yup from 'yup';

const InputPhone = ({navigation}) => {
    const validationSchema = Yup.object().shape({
        phone: Yup.string()
          .required('Nomor telepon diperlukan')
          .min(11, 'Nomor telepon harus 12-13 angka')
          .max(12, 'Nomor telepon harus 12-13 angka'),
      });
    const sendPhone = async(values) => {
        const sanitizedPhone = values.phone.replace(/\D/g, '');
        const phone = parseInt(sanitizedPhone)
        console.log(phone)
        const link = `https://customer.kilapin.com/users/check-phone/${phone}`
        const response = await fetch(link);
        const data = await response.json()
        if (data) {
            if (data.message === 'OTP sent successfully') {
                navigation.navigate('Otp',{page:'ChangePW',phoneNumber:phone})
            } else {
                console.log('else phone number',data.message)
                Alert.alert(`${data.message}`)
            }
            console.log("response",data)
            console.log('')
        } else {
            console.log('Error')
        }
        console.log("response",data)
        console.log(values)
    }
  return (
    <View
    style={{backgroundColor:'#fff',height:hp('100%'),marginTop:hp('5%')}}
    >
    <Formik
          initialValues={{
            phone: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => sendPhone(values)}
    >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <View style={{width:wp('60%'),height:hp('30%')}}>
            <LottieView
                source={require('../../assets/animation/kilapin.json')}
                autoPlay
                loop
                style={styles.namelogo}/>
        </View>
                <View style={{flexDirection: 'row'}}>
                <View style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' ,borderWidth: 1.5, borderColor: '#8D8D8D', height: 51, borderTopLeftRadius: 30, borderBottomLeftRadius:30, width: 60}}>
                    <Text style={{fontSize: 16}}>+62</Text>
                </View>
                <View style={{marginHorizontal: '-0.2%'}}></View>
                <TextInput style={styles.textinput2} name='phone' placeholder='Nomor Telepon' 
                keyboardType='numeric'
                onChangeText={handleChange('phone')} onBlur={handleBlur('phone')} value={values.phone}
                />
                </View>
                {errors.phone && touched.phone ? <Text style={styles.errorText}>{errors.phone}</Text>: <View style={{height:15}}></View>}
                <Pressable style={styles.press} onPress={handleSubmit}>
                    <Text style={styles.buttontext}>
                        Input phone
                    </Text>
                </Pressable>
            </View>
                
        )}
    </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
    textinput2: {
        borderWidth: 1.5,
        borderColor: '#8D8D8D',
        height: 51,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        width: 240,
        padding: 15,
        fontFamily: 'Ubuntur',
      },
      press: {
        alignSelf: 'center',
        backgroundColor: '#DA7DE1',
        height: 51,
        borderRadius:30,
        width: 300,
      },
      buttontext:{
        marginTop:13,
        color: '#fff',    
        alignItems: 'center',
        alignSelf:'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: 'Ubuntu-Bold',
        fontSize: 16,
      },
      errorText: {
        // marginTop:-10,
        color: 'red',
        height: 25
      },  
})

export default InputPhone