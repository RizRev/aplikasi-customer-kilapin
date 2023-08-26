import { StyleSheet, View, Text, Pressable, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {LinearGradient} from 'expo-linear-gradient';
import { Gap } from '../../components'
import RadioGroup from 'react-native-radio-buttons-group';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native'
import { Formik, Field } from 'formik';
import * as yup from 'yup';

const Signup = ({navigation}) => {

  const [errorMessage, setErrorMessage] = useState(null); 

  const [radioButtons, setRadioButtons] = useState([
    {
        id: '1',
        label: '',
        value: 'accept',
        borderColor: '#3C3B3B',
        color: '#3C3B3B',
    },
  ]);

  const handleRegistration = (values) => {
    const formData = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      postal_code: values.postal_code,
      password: values.password,
      confirm: values.confirm,
    };

    fetch('https://customer.kilapin.com/users/register', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.success) {
          console.log(values.phone)
          navigation.navigate('Otp',{phoneNumber:values.phone});
          const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'App-ID': 'b2d6dc1a-e725-4063-b764-1821de8d623e',
              'API-Key': 'VGE74784/xZP9hENjU18ifDY0mLvuMuW',
              'content-type': 'application/json'
            },
            body: JSON.stringify({content: ['Kilapin Apps'], msisdn: `62${values.phone}`, lang_code: 'en',time_limit: '300'})
          };
          console.log('option body',options.body)
          fetch('https://api.verihubs.com/v1/whatsapp/otp/send', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
        }
        else {
          setErrorMessage(data.data);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
    });    
  };

  const [isRadioSelected, setIsRadioSelected] = useState(false);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    setIsRadioSelected(true);
  }

  const SignupSchema = yup.object().shape({
    name: yup.string().required('Silahkan Masukan Nama Anda'),
    email: yup.string().email('Email Tidak Valid').required('Masukan Nomor Telepon Anda'),
    phone: yup.string().matches(/^[1-9][0-9]{0,15}$/, "Nomor Telepon Tidak Dapa Diawali Dengan 0 dan Tidak Dapat Memasukan Huruf").required('Masukan Nomor Telepon'),
    address: yup.string().min(10, 'Minimum Karakter').required('Masukkan Alamat Anda'),
    postal_code: yup.number().min(5, 'Minimum Karakter').required('Kode Pos Dibutuhkan'),
    password: yup.string().min(8, 'Minimum Karakter').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must contain at least 8 characters, at least one letter and one number').required('Password is required'),
    confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  return (
    <Formik
      initialValues={{ name: '', email: '', phone: '', address: '', postal_code: '', password: '', confirm: '' }}
      onSubmit={handleRegistration}
      validationSchema={SignupSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <ScrollView style={styles.container}>
          <LinearGradient colors={['#fff', '#fff']} style={styles.backgroundgradient}>
            <LottieView 
              source={require('../../assets/animation/kilapin.json')}
              autoPlay
              loop
              style={styles.namelogo}/>
            <View style={{height: hp('50%')}}></View>
            <View style={styles.shape}>
              {errorMessage ? <Text style={styles.error2}>{errorMessage}</Text> : null}
              <Gap height={16} />
              <TextInput style={styles.textinput} placeholder='Nama' onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name}/>
              {errors.name && touched.name ? <Text style={styles.error}>{errors.name}</Text> : null}
              <Gap height={16} />
              <TextInput style={styles.textinput} placeholder='Email' onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email}/>
              {errors.email && touched.email ? <Text style={styles.error}>{errors.email}</Text> : null}
              <Gap height={16} />
              <View style={{flexDirection: 'row'}}>
                <View style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' ,borderWidth: 1.5, borderColor: '#8D8D8D', height: 51, borderTopLeftRadius: 30, borderBottomLeftRadius:30, width: 60}}>
                  <Text style={{fontSize: 16}}>+62</Text>
                </View>
                <View style={{marginHorizontal: '-0.2%'}}></View>
                <TextInput style={styles.textinput2} name='phone' placeholder='Nomor Telepon' onChangeText={handleChange('phone')} onBlur={handleBlur('phone')} value={values.phone}/>
              </View>
              {errors.phone && touched.phone ? <Text style={styles.error}>{errors.phone}</Text> : null}
              <Gap height={16} />
              <TextInput style={styles.textinput} secureTextEntry={false} placeholder='Address' onChangeText={handleChange('address')} onBlur={handleBlur('address')} value={values.address}/>
              {errors.address && touched.address ? <Text style={styles.error}>{errors.address}</Text> : null}
              <Gap height={16} />
              <TextInput style={styles.textinput} secureTextEntry={false} placeholder='Kode Pos' onChangeText={handleChange('postal_code')} onBlur={handleBlur('postal_code')} value={values.postal_code}/>
              {errors.postal_code && touched.postal_code ? <Text style={styles.error}>{errors.postal_code}</Text> : null}
              <Gap height={16} />
              <TextInput style={styles.textinput} secureTextEntry={true} placeholder='Password' onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password}/>
              {errors.password && touched.password ? <Text style={styles.error}>{errors.password}</Text> : null}
              <Gap height={16} />
              <TextInput style={styles.textinput} secureTextEntry={true} placeholder='Confirm Password' onChangeText={handleChange('confirm')} onBlur={handleBlur('confirm')} value={values.confirm}/>
              {errors.confirm && touched.confirm ? <Text style={styles.error}>{errors.confirm}</Text> : null}
              <Gap height={16} />
              <View style={styles.radio}>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '1%'}}>
                  <RadioGroup radioButtons={radioButtons} onPress={onPressRadioButton}/>
                  <Text style={{width: '89%'}}>Dengan mendaftar ini anda menyetujui dan terikat dalam<Text style={{color: '#DA7DE1', textAlign: 'center'}} onPress={() => navigation.navigate('TermsAndConditionBL')}> Syarat dan Ketentuan.</Text></Text>
                </View>
              </View>
              <Gap height={20} />
              <Pressable style={styles.press} onPress={handleSubmit}>
                <Text style={styles.buttontext}>SIGN UP</Text>
              </Pressable>
            </View>
          </LinearGradient>
        </ScrollView>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1 ,
  },
  error: {
    fontFamily: 'Ubuntur',
    fontSize: 13,
    color: 'red',
    textAlign: 'center',
    width: 290,
    marginTop: '1%'
  },
  error2: {
    fontFamily: 'Ubuntur',
    fontSize: 13,
    color: 'red',
    textAlign: 'center',
    width: 290,
    marginTop: '-55%',
    backgroundColor: '#fff',
    paddingTop: '35%',
    paddingBottom: '5%',
    marginBottom: '-5%'
  },
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
  textinput: {
    borderWidth: 1.5,
    borderColor: '#8D8D8D',
    height: 51,
    borderRadius:30,
    width: 300,
    padding: 15,
    fontFamily: 'Ubuntur',
  },
  backgroundgradient: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  namelogo: {
    flex: 1,
     color:'#fff',
     fontFamily: 'Ubuntu',
     fontSize: 32,
     height: hp('15%'),
     marginTop: hp('15%'),
     marginBottom: hp('-5%'),
     alignItems: 'center',
     justifyContent: 'center',
     textAlign: 'center',
 },
  namelogo: {
      color:'#fff',
      fontFamily: 'Ubuntu',
      fontSize: 32,
      height: hp('30%'),
      marginTop: hp('-1%'),
      marginBottom: hp('-15%')
  },
  shape: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    textAlign: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: ('-70%')
  },
  maintext: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#5865F2',
    fontFamily: 'Ubuntur',
    fontSize: 16,
    marginTop: -0,
    width: 300,
    marginBottom: -5,
  },
  subtext: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#3C3B3B',
    fontFamily: 'Ubuntur',
    fontSize: 14,
    marginTop: 20,
    width: 280,
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
  googlepress: {
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    height: 51,
    borderRadius:30,
    width: 300,
    borderWidth: 1.5,
    borderColor: '#505050'
  },
  googlebuttontext: {
    color: '#505050',    
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Ubuntum',
    fontSize: 16,
  },
  accsignup: {
    marginTop: 20,
  },
  daftartext: {
    color: '#5865F2',
  },
  radio: {
    width: 300,
  },
})

export default Signup