import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native'
import React, {useState} from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native'
import { Gap } from '../../components'



const ChangePW = ({navigation,route}) => {
    const validationSchema = yup.object().shape({
        password: yup.string().min(8, 'Minimum Karakter').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must contain at least 8 characters, at least one letter and one number').required('Password is required'),
        confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),});
    const phone = route.params?.phone
    // const phone = 85814735655
    const changePW = async(values) => {
        console.log(phone,values)
        const response = await fetch(`https://customer.kilapin.com/users/change-pw/${phone}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password:values.password,
        }),
      });
        const data = await response.json()
        if (data) {
          if (data.message === 'Change Password Success') {
            Alert.alert(
                'Change Password Success',
                'Password has been successfully changed.',
                [{
                    text: 'OK',
                    onPress: () => {
                        navigation.navigate('Login');
                    }
                }]
            );
        }
         else {
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
    <View>
        <View
    style={{backgroundColor:'#fff',height:hp('100%'),marginTop:hp('5%')}}
    >
    <Formik
          initialValues={{
            password: '', 
        }}
          validationSchema={validationSchema}
          onSubmit={(values) => changePW(values)}
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
        <TextInput style={styles.textinput} secureTextEntry={true} placeholder='Password' onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password}/>
              {errors.password && touched.password ? <Text style={styles.error}>{errors.password}</Text> : null}
              <Gap height={16} />
              <TextInput style={styles.textinput} secureTextEntry={true} placeholder='Confirm Password' onChangeText={handleChange('confirm')} onBlur={handleBlur('confirm')} value={values.confirm}/>
              {errors.confirm && touched.confirm ? <Text style={styles.error}>{errors.confirm}</Text> : null}
                {errors.phone && touched.phone ? <Text style={styles.errorText}>{errors.phone}</Text>: <View style={{height:15}}></View>}
                <Pressable style={styles.press} onPress={handleSubmit}>
                    <Text style={styles.buttontext}>
                        Input New Password
                    </Text>
                </Pressable>
            </View>
                
        )}
    </Formik>
    </View>
      <Text>changePW</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'red'
  },
  error: {
    fontFamily: 'Ubuntur',
    fontSize: 13,
    color: 'red',
    textAlign: 'center',
    width: 290,
    marginTop: '1%'
  },
  textinput: {
    borderWidth: 1.5,
    borderColor: '#8D8D8D',
    height: 51,
    borderRadius:30,
    width: 300,
    padding: 15,
    fontFamily: 'Ubuntur',
  },
  press: {
    justifyContent: 'center',
    backgroundColor: '#DA7DE1',
    height: 51,
    borderRadius:30,
    width: 300,
    marginBottom:'10%'
  },
  buttontext:{
    color: '#fff',    
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Ubuntu',
    fontSize: 16,
  },
})

export default ChangePW