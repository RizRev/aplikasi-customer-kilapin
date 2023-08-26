import { Gap } from '../../components';
import { StyleSheet, View, Text, Pressable, TextInput, BackHandler, Alert,KeyboardAvoidingView,Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as actionTypes from '../../actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';

const Login = ({ navigation }) => {
  const loginStart = () => {
    return {
      type: actionTypes.LOGIN_START,
    };
  };
  
  const loginSuccessAction = data => {
    return {
      type: actionTypes.LOGIN_SUCCESS,
      data,
    };
  };
  
  const loginFailed = () => {
    return {
      type: actionTypes.LOGIN_ERROR,
    };
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      dispatch(loginStart()); // Dispatch login start action
      const response = await fetch('https://customer.kilapin.com/users/login-mongose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (response) {
        const data = await response.json();
        console.log('Response data:', data);
        // if (data.message){

        // }
        if (data.data) {
          if (data.message === 'Account Belum Di-verifikasi'){
            navigation.navigate('Otp',{phoneNumber:data.data.phone,page:'Login'});
          } else {
            await AsyncStorage.setItem('id', data.data._id);
            dispatch(loginSuccessAction(data.data._id)); // Dispatch login success action with the response data
            // const id = useSelector(apl)
            signInWithEmailAndPassword(auth, 'revan1@gmail.com', 'qwerty123')
              .then(() => {
                console.log("Login success", auth);
                AsyncStorage.setItem('loggedIn', 'true');
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'MainApp' }],
                });
              })
              .catch((err) => Alert.alert("Login error", err.message));
          }
        } else {
          setErrorMessage(data.message);
        }
      } else {
        throw new Error('Invalid response status');
      }
    } catch (error) {
      console.error(error);
      dispatch(loginFailed()); // Dispatch login failed action
    }
  };
  
  

  const [opacity, setOpacity] = useState(1);

  const handlePressIn = () => {
    setOpacity(0.5);
  };

  const handlePressOut = () => {
    setOpacity(1);
  };

  
  

  return (
    <KeyboardAvoidingView style={styles.container}>
        <View style={styles.section_animation}>
            <LottieView
                source={require('../../assets/animation/kilapin.json')}
                autoPlay
                loop
                style={styles.namelogo}/>
        </View>

        <View style={styles.shape}>
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
            <Gap height={16}/>
            <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email}
                       autoCapitalize="none"/>
            <Gap height={16}/>
            <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} value={password}
                       secureTextEntry={true}/>
            <Pressable
                style={({pressed}) => [
                    styles.press,
                    {
                        opacity: pressed ? 0.5 : opacity,
                    },
                ]}
                onPress={handleLogin}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <Text style={styles.buttontext}
                      onPress={handleLogin}
                      onPressIn={handlePressIn}
                      onPressOut={handlePressOut}
                >SIGN IN</Text>
            </Pressable>
            {/* <View style={{backgroundColor:'red',width:'20%',height:'5%',marginTop:20}}> */}
                <Text 
                style={{fontWeight:'bold',marginTop:'5%'}}
                onPress={()=>navigation.navigate('InputPhone')}
                >Lupa Password?</Text> 
            {/* </View> */}
            <View style={styles.section_footer_text}>
                <Text style={styles.accsignup}>Tidak punya akun? 
                <Text style={styles.daftartext}
                onPress={() => navigation.navigate('SignUp')}
                >Daftar</Text>
                </Text>
            </View>
        </View>
    </KeyboardAvoidingView>
)
}

const styles = StyleSheet.create({
section_footer_text: {
    flexDirection: "row",
    flex: 1,
    width: Dimensions.get("screen").width,
    justifyContent: "space-evenly"
},
section_animation: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
},
container: {
    flex: 1,
    width: Dimensions.get("screen").width,
    backgroundColor: "white"
},
backgroundgradient: {

    alignItems: 'center',
    justifyContent: 'center',
},
namelogo: {
    flex: 1,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
shape: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    textAlign: 'center',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
},
maintext: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#5865F2',
    fontFamily: 'Ubuntur',
    fontSize: 16,
    marginTop: 20,
},
input: {
    borderWidth: 1.5,
    borderColor: '#8D8D8D',
    height: 51,
    borderRadius: 30,
    width: 300,
    padding: 15,
    fontFamily: 'Ubuntur',
},
press: {
    justifyContent: 'center',
    backgroundColor: '#DA7DE1',
    height: 51,
    borderRadius: 30,
    width: 300,
    marginTop: 10,
},
buttontext: {
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Ubuntu',
    fontSize: 16,
},
accsignup: {
    marginTop: 20,
},
daftartext: {
    color: '#DA7DE1',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
},
})
export default Login
