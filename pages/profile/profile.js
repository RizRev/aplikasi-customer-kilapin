import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, BackHandler,Pressable, ActionSheetIOS, Alert } from 'react-native'
import React, { useEffect, useState} from 'react'
import { Gap } from '../../components'
import { Stars, Pencil } from '../../assets'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import {useTranslation} from 'react-i18next';
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native'
import {ApplicationActions} from '@actions';
import {useDispatch} from 'react-redux';
import axios from 'axios';

const Profile = ({navigation}) => {
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtyji62ve/image/upload?folder=ProfileImage';
  const CLOUDINARY_PRESET = 'yjjew3l8';
  let switchLanguageOptions;
  const {t} = useTranslation();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [image, setImage] = useState(null);
  const language = useSelector((state) => state.application.language);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const headers = {
    accept: 'application/json',
    'content-type': 'multipart/form-data',
  };
  const [success, setSuccess] = useState({
    image: false, // Initially set to false: 
  });
  // console.log("Bahasa : ",language);

  useEffect(() => {
    const backAction = () => {
      // Check if the current screen is Profile, if yes, navigate to Home and return true to prevent the default back action.
      if (navigation.isFocused()) {
        navigation.navigate('Home');
        return true;
      }
      // Return false to perform the default back action (close the app if there's no previous screen).
      return false;
    };

    // Add back press listener
    BackHandler.addEventListener('hardwareBackPress', backAction);

    // Clean up the listener when the component is unmounted
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [navigation]);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const userId = useSelector(state => state.auth.login.userId);


  const checkLoginStatus = async () => {
    try {
        if (userId) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false)
      }
    } catch (error) {
      console.log('Error reading login status from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadProfilePhoto();
  }, []);

  const loadProfilePhoto = async () => {
    try {
      const photoUri = await SecureStore.getItemAsync('profilePhotoUri');
      if (photoUri) {
        setProfilePhoto(photoUri);
      }
    } catch (error) {
      console.log('Error loading photo URI:', error);
    }
  };

  const handlePhotoUpload = async (uri) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri,
        name: 'image',
        type: 'image/jpeg',
      });
      formData.append('upload_preset', CLOUDINARY_PRESET);
  
      setLoading(true);
  
      const response = await axios.post(CLOUDINARY_URL, formData, { headers });
      console.log('Image upload response:', response.data);
  
      if (response.data && response.data.secure_url) {
        const imageUrl = response.data.secure_url;
        dispatch(ApplicationActions.onAddImage(imageUrl));
          setImage(imageUrl);
          setSuccess({
            ...success,
            image: true,
          });
      }
      setLoading(false);
    } catch (error) {
      console.log('Image upload error:', error);
      setLoading(false);
    }
  };

  const showActionSheet = () => {
    return new Promise((resolve) => {
      if (Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['Cancel', 'Take Photo', 'Choose from Library'],
            cancelButtonIndex: 0,
          },
          (buttonIndex) => {
            if (buttonIndex === 1) {
              resolve('camera');
            } else if (buttonIndex === 2) {
              resolve('library');
            } else {
              resolve('cancel');
            }
          }
        );
      } else {
        // For Android or other platforms, you can use a custom action sheet library or UI component
        // to provide a similar selection interface.
        // Here, we'll use a basic Alert with buttons to simulate an action sheet on Android.
        Alert.alert(
          'Choose Image Source',
          '',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => resolve('cancel'),
            },
            {
              text: 'Take Photo',
              onPress: () => resolve('camera'),
            },
            {
              text: 'Choose from Library',
              onPress: () => resolve('library'),
            },
          ],
          { cancelable: true }
        );
      }
    });
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }
  
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPermission.status !== 'granted') {
        console.log('Camera permission denied');
      }
  
      const selectedSource = await showActionSheet();
      let result;
      if (selectedSource === 'camera') {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
      } else if (selectedSource === 'library') {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
      }
  
      if (!result.canceled && result.assets.length > 0) {
        const assetUri = result.assets[0].uri;
        setImage(assetUri);
        handlePhotoUpload(assetUri);
      }
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  };

  const [data, setMemberData] = useState('');

  useEffect(() => {

    const fetchMemberData = async () => {
      try {
        const id = await AsyncStorage.getItem('id')
        const link = `https://customer.kilapin.com/users/${id}`
        const response = await fetch(link);
        const data = await response.json()
        console.log("response",data.data)
        setMemberData(data.data)
        const membership = data.data.member
        dispatch(ApplicationActions.onaddMembership(membership));
  
      } catch (error) {
        
      }  
    }
    fetchMemberData()
  },[])

  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
  };

  let textToRender = '';

  if (data.point > 5000) {
    textToRender = 'Si Paranoid';
  } else if (data.point > 750) {
    textToRender = 'Si Perfect';
  } else if (data.point > 150) {
    textToRender = 'Si Suci';
  } else if (data.point < 150) {
    textToRender = 'Si Bersih';
  }

  switch (language) {
    case "id":
      switchLanguageOptions =
        (
          <>
            <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.replace('Voucher',{page: "Profile"})}>
              <Icon name="document-text-outline" size={wp('6%')} color="#333" style={styles.optionIcon} />
              <Text style={styles.optionText}>Voucher</Text>
              <Icon name="chevron-forward-outline" size={wp('6%')} color="#333" style={styles.optionArrowIconVoucher} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.replace('TermsAndCondition')}>
              <Icon name="document-text-outline" size={wp('6%')} color="#333" style={styles.optionIcon} />
              <Text style={styles.optionText}>{t('terms')}</Text>
              <Icon name="chevron-forward-outline" size={wp('6%')} color="#333" style={styles.optionArrowIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer}  onPress={() => navigation.navigate('FAQ')}>
              <Icon name="help-circle-outline" size={wp('7%')} color="#333" style={[styles.optionIcon, {marginLeft: '-0.5%' }]} />
              <Text style={styles.optionText}>{t('faq')}</Text>
              <Icon name="chevron-forward-outline" size={wp('6%')} color="#333" style={styles.optionArrowIcon2} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer}  onPress={() => navigation.navigate('ChatBot')}>
            <Icon name="chatbubbles-outline" size={wp('6%')} color="#333" style={styles.optionIcon} />
              <Text style={styles.optionText}>{t('customer_assistance_center')}</Text>
              <Icon name="chevron-forward-outline" size={wp('6%')} color="#333" style={styles.optionArrowIcon5} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('ContactUs')}>
              <Icon name="call-outline" size={wp('6%')} color="#333" style={styles.optionIcon} />
              <Text style={styles.optionText}>{t('contact_us')}</Text>
              <Icon name="chevron-forward-outline" size={wp('6%')} color="#333" style={styles.optionArrowIcon3} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer}  onPress={() => navigation.navigate('LanguageSelection')}>
              <Icon name="language-outline" size={wp('6%')} color="#333" style={styles.optionIcon} />
              <Text style={styles.optionText}>{t('language')}</Text>
              <Icon name="chevron-forward-outline" size={wp('6%')} color="#333" style={styles.optionArrowIcon4} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer}  onPress={() => navigation.navigate('ManageAccount')}>
              <Icon name="person" size={wp('6%')} color="#333" style={styles.optionIcon} />
              <Text style={styles.optionText}>{t('profile_setting')}</Text>
              <Icon name="chevron-forward-outline" size={wp('6%')} color="#333" style={styles.optionArrowIcon6} />
            </TouchableOpacity>
          </>
        );
      break;
    case "en":
      switchLanguageOptions =
      (
        <>
          <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.replace('Voucher',{page: 'Profile'})}>
              <Icon name="document-text-outline" size={wp('6%')} color="#333" style={styles.optionIcon} />
              <Text style={styles.optionText}>Voucher</Text>
              <Icon name="chevron-forward-outline" size={wp('6%')} color="#333" style={styles.optionArrowIconVoucher} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.replace('TermsAndCondition')}>
              <Icon name="document-text-outline" size={wp('6%')} color="#333" style={styles.optionIcon} />
              <Text style={styles.optionText}>{t('terms')}</Text>
              <Icon name="chevron-forward-outline" size={wp('6%')} color="#333" style={styles.optionArrowIconEn} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer}  onPress={() => navigation.navigate('FAQ')}>
              <Icon name="help-circle-outline" size={wp('7%')} color="#333" style={[styles.optionIcon, {marginLeft: '-0.5%' }]} />
              <Text style={styles.optionText}>{t('faq')}</Text>
              <Icon name="chevron-forward-outline" size={wp('6%')} color="#333" style={styles.optionArrowIconEn2} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer}  onPress={() => navigation.navigate('ChatBot')}>
            <Icon name="chatbubbles-outline" size={wp('6%')} color="#333" style={styles.optionIcon} />
              <Text style={styles.optionText}>{t('customer_assistance_center')}</Text>
              <Icon name="chevron-forward-outline" size={wp('6%')} color="#333" style={styles.optionArrowIconEn3} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('ContactUs')}>
              <Icon name="call-outline" size={wp('6%')} color="#333" style={styles.optionIcon} />
              <Text style={styles.optionText}>{t('contact_us')}</Text>
              <Icon name="chevron-forward-outline" size={wp('6%')} color="#333" style={styles.optionArrowIconEn4} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer}  onPress={() => navigation.navigate('LanguageSelection')}>
              <Icon name="language-outline" size={wp('6%')} color="#333" style={styles.optionIcon} />
              <Text style={styles.optionText}>{t('language')}</Text>
              <Icon name="chevron-forward-outline" size={wp('6%')} color="#333" style={styles.optionArrowIconEn5} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer}  onPress={() => navigation.navigate('ManageAccount')}>
              <Icon name="person" size={wp('6%')} color="#333" style={styles.optionIcon} />
              <Text style={styles.optionText}>{t('profile_setting')}</Text>
              <Icon name="chevron-forward-outline" size={wp('6%')} color="#333" style={styles.optionArrowIconEn6} />
            </TouchableOpacity>
        </>
      );
      break;
    default:
      break;
  }
  if (loggedIn) {
    return (
      <View style={styles.allcontainer}>
      <View style={styles.container}>
          <Text style={{marginTop: hp('12%'), fontFamily: 'Ubuntu', fontSize: 20, marginBottom: hp('4%')}}>Pengaturan Profil</Text>
          <View style={styles.topcleanerphoto}>
                    {profilePhoto ? (
          <Image source={{ uri: profilePhoto }}  style={{
            width: '100%',
            height: '100%',
            borderRadius: 100,}} />
        ) : (
          <Image
            source={require('../../assets/image/ProfileBroom.png')}
            style={{
              flex: 1,
              width: undefined,
              height: undefined,
              borderRadius: 100,}}/>
        )}

          <TouchableOpacity
            onPress={() => pickImage()}
            style={styles.uploadButtonContainer}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={styles.imagePlaceholder}
              />
            ) : (
              <Image
                source={require('../../assets/image/profile.png')} // Change the path to your actual image placeholder
                style={styles.imagePlaceholder}
              />
            )}
          </TouchableOpacity>

              </View>
              <Gap height={20}/>
          <Text style={styles.profilename}>
            {(data.name)}
          </Text>
          <Gap height={5}/>
          <Text style={styles.phonenumber}>
            +62{(data.phone)}
            </Text>
          <Gap height={25}/>
          <View style={styles.benefit}>
            <View style={styles.pointback} onPress={() => navigation.navigate("XPPage")}>
              <Stars onPress={() => navigation.navigate("XPPage")} />
          <Text style={styles.point} onPress={() => navigation.navigate("XPPage")}>
            {(data.point)}  {textToRender}
            </Text> 
            </View>
          </View>
          <Gap height={25}/>
          <View height = '60%' flexGrow = {1} style={{ marginBottom: wp("6%"),}}>
          <ScrollView>
          {switchLanguageOptions}
           <View style={{padding: '30%'}}></View>
          </ScrollView>
          </View>
      </View>
      </View>
    )
  } return (
    <View style={styles.containerr}>
        <View style={{marginTop: '11%'}}></View>
          <ScrollView>
          <View style={styles.containerr}>
      <Text style={{fontFamily: 'Ubuntu', fontSize: 22, }}>Profile</Text>
      <LottieView 
        source={require('../../assets/animation/GembokLocked.json')}
        autoPlay
        loop
        style={styles.namelogo}/>
          <Text style={styles.titletext}>Silahkan login dan nikmati semua layanan!</Text>
          <Text style={styles.subtext}>Silakan login untuk mendapatkan akses penuh dan menikmati semua layanan yang tersedia dalam aplikasi Kilapin</Text>
          <Pressable style={styles.nextbutton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textbutton} onPress={() => navigation.navigate('Login')}>LOGIN</Text>
        </Pressable>
        </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  topcleanerphoto: {
    height: 120,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('4%'),
    backgroundColor: '#fff',
  },
  optionIcon: {
    marginRight: wp('13%'),
  },
  optionText: {
    fontSize: wp('4.5%'),
    color: '#000',
  },
  optionArrowIconVoucher: {
    marginLeft: wp('48%'),
    justifyContent: 'space-between'
  },
  optionArrowIcon: {
    marginLeft: wp('22%'),
    justifyContent: 'space-between'
  },
  optionArrowIcon2: {
    marginLeft: wp('56%'),
    justifyContent: 'space-between'
  },
  optionArrowIcon3: {
    marginLeft: wp('39%'),
    justifyContent: 'space-between'
  },
  optionArrowIcon4: {
    marginLeft: wp('49%'),
    justifyContent: 'space-between'
  },
  optionArrowIcon5: {
    marginLeft: wp('35%'),
    justifyContent: 'space-between'
  },
  optionArrowIcon6: {
    marginLeft: wp('40%'),
    justifyContent: 'space-between'
  },
  optionArrowIconEn: {
    marginLeft: wp('20%'),
    justifyContent: 'space-between'
  },
  optionArrowIconEn2: {
    marginLeft: wp('55%'),
    justifyContent: 'space-between'
  },
  optionArrowIconEn3: {
    marginLeft: wp('29%'),
    justifyContent: 'space-between'
  },
  optionArrowIconEn4: {
    marginLeft: wp('41%'),
    justifyContent: 'space-between'
  },
  optionArrowIconEn5: {
    marginLeft: wp('43%'),
    justifyContent: 'space-between'
  },
  optionArrowIconEn6: {
    marginLeft: wp('34%'),
    justifyContent: 'space-between'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  allcontainer: {
    backgroundColor: '#fff'
  },
  benefit: {
    flexDirection: 'row',
  },
  point: {
    fontSize: 16,
    fontFamily: 'Ubuntu',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: 10,
  },
  pointback: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#FFB400',
    width: '50%',
    height: 40,
    borderRadius: 15,
    flexDirection: 'row',
  },
  profilename: {
    fontFamily: 'Ubuntu',
    fontSize: 24,
    color: '#1E2022',
  },
  phonenumber: {
    fontFamily: 'Ubuntum',
    fontSize: 16,
    color: '#77838F'
  },
  containerr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
},
namelogo: {
     height: hp('45%'),
     marginBottom: hp('0.5%'),
     alignItems: 'center',
     justifyContent: 'center',
     textAlign: 'center',
 },
titletext: {
    color: '#5865F2',
    fontFamily: 'Ubuntu',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: wp('80%'),
    marginBottom: hp('2%')
},
subtext: {
    fontFamily: 'Ubuntur',
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: 300,
    marginBottom: hp('2%')
},
nextbutton: {
    backgroundColor: '#5865F2',
    height: 51,
    borderRadius:30,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '2%'
},
textbutton: {
    fontFamily: 'Ubuntu',
    color: '#fff',
},
uploadButtonContainer: {
  marginLeft: '45%',
  marginTop: '-25%',
  backgroundColor: '#5865F2',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  borderRadius: 60,
  overflow: 'hidden',
  marginTop: 30,
  marginRight: 50
},
imagePlaceholder: {
  width: '100%',
  height: '100%',
},
})

export default Profile