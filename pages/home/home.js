import {
  Alert,
  Clipboard,
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  ToastAndroid,
  Pressable
} from "react-native";
import React, {useEffect, useRef, useState} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import {Gap} from "../../components";
import {BookingCleaning, CuciKasur, HydroCleaning, LayananAC, PolesLantai, UrgentCleaner} from "../../assets";
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import LottieView from 'lottie-react-native';
import * as SecureStore from 'expo-secure-store';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationActions} from '../../actions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import OngoingOrdersNotification from '../../components/ongoingorder/ongoingorder'; // Import the OngoingOrdersNotification component.


const {width} = Dimensions.get('window');
const height = width * 0.5;
const images = [
  require('../../assets/image/carousel1.png'),
  require('../../assets/image/carousel2.png'),
  require('../../assets/image/carousel3.png'),
];

const Home = ({navigation}) => {
    useEffect(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => backHandler.remove();
      }, []);
    
      const handleBackPress = () => {
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        BackHandler.addEventListener('hardwareBackPress', handleExitApp);
        return true;
      };
    
      const handleExitApp = () => {
        BackHandler.removeEventListener('hardwareBackPress', handleExitApp);
        BackHandler.exitApp();
      }


  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
        if (userId!==null) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false)
      }
    } catch (error) {
      console.log('Error reading login status from AsyncStorage:', error);
    }
  };

  const userId = useSelector(state => state.auth.login.userId);
  const dispatch = useDispatch();
  const {t} = useTranslation();

    console.log('ini user id',userId)

  const ongoingOrders = useSelector(state => state.application.order);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
      setSelectedOption(option);
      handleModal1Close()
      dispatch(ApplicationActions.onChangeOrderType(option));
      navigation.navigate("Maps", {page: 'General Services'});
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

  const [data, setData] = useState(null);
  const fetchMemberData = async () => {
      try {
          // const id = await AsyncStorage.getItem('id')
          const link = `https://customer.kilapin.com/users/${userId}`
          const response = await fetch(link);
          const data = await response.json()
          console.log("response", data.data)
          setData(data.data)
      } catch (error) {

      }
  }

  useEffect(() => {
      fetchMemberData()
  }, [])


  const handleCopy = (data) => {
      if (data && data.data && data.data.length > 0) {
          const referralCode = data.referral_code;
          if (referralCode) {
              Clipboard.setString(referralCode);
              Alert.alert('Referral Code Copied', `Referral code "${referralCode}" has been copied to clipboard.`);
          }
      }
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
      const timer = setInterval(() => {
          scrollViewRef.current && scrollViewRef.current.scrollTo({x: (activeIndex + 1) * width});
      }, 7000);
      return () => clearInterval(timer);
  }, [activeIndex]);

  const handlePress2 = () => {
      navigation.navigate('News');
  };

  const handleScroll = event => {
      const contentOffset = event.nativeEvent.contentOffset;
      const index = Math.round(contentOffset.x / width);
      setActiveIndex(index);
  };

  const renderImages = () =>
      images.map((image, index) => (
          <TouchableOpacity style={styles.imageContainer} key={index} onPress={handlePress2}>
              <Image source={image} style={styles.image}/>
          </TouchableOpacity>
      ));

  const renderCircleIndicators = () =>
      images.map((_, index) => (
          <TouchableOpacity
              key={index}
              style={[styles.circle, activeIndex === index && styles.activeCircle]}
              onPress={() => scrollViewRef.current && scrollViewRef.current.scrollTo({x: index * width})}
          />
      ));

  const handlePress = () => {
      const phoneNumber = '+6285156913053'
      const url = `whatsapp://send?phone=${phoneNumber}`;
      Linking.openURL(url);
  };

  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [isModalVisible4, setModalVisible4] = useState(false);


  const handleModal1Open = () => {
      setModalVisible1(true);
  };

  const handleModal1Close = () => {
      setModalVisible1(false);
  };

  const handleModal2Open = () => {
      setModalVisible2(true);
  };

  const handleModal3Open = () => {
      setModalVisible3(true);
  };

  const handleModal4Open = () => {
    setModalVisible4(true);
};  

  const handleNavigationAC = () => {
      setModalVisible3(true);
    // navigation.navigate('Maps', {page: "Ac"});
  };
  useEffect(() => {

      console.log("user", userId)
  }, []);
  const desc = t('general_services_desc')

  return (
      <LinearGradient
          colors={['#5865F2', '#DD7DE1']}
          style={styles.backgroundgradient}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
      >
          <SafeAreaView style={styles.areasafeview}>
            {Array.isArray(ongoingOrders) && ongoingOrders.length === 0 ?             
                <View></View>
                    :<OngoingOrdersNotification />}
              <View style={styles.topsection}>
                  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                      <TouchableOpacity onPress={() => navigation.navigate("Profile")} activeOpacity={0.5}>
                          <View onPress={() => navigation.navigate("Profile")}>
                              {profilePhoto ? (
                                  <Image source={{uri: profilePhoto}} style={styles.profiletopimage}/>
                              ) : (
                                  <Image
                                      source={require('../../assets/image/ProfileBroom.png')}
                                      style={styles.profiletopimage}
                                  />
                              )}
                          </View>
                      </TouchableOpacity>
                      <View style={{marginLeft: '5%',}}>
                          <Text style={{fontFamily: 'Ubuntum', color: '#fff', fontSize: 13, marginTop: '-2%'}}>Selamat
                              Datang!</Text>
                          <Text style={{fontFamily: 'Ubuntu', color: '#fff', fontSize: 16, width: '100%'}}>
                              {data && (
                                  <Text style={{fontFamily: 'Ubuntu'}}>
                                    {loggedIn ? (data && data.name && data.name.length > 13
                                      ? data.name.substring(0, 13) + '...'
                                      : data && data.name):'Kilapeeps'}
                                  </Text>
                              )}
                          </Text>
                      </View>
                  </View>
                  <View style={{marginHorizontal: '3%'}}></View>
                  <TouchableOpacity activeOpacity={0.5}>
                      <View
                          style={styles.topnotification}>
                          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("SelectCity")}>
                              <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                  <Text style={{fontFamily: 'Ubuntum', fontSize: 12, color: '#fff'}}>Pilih Lokasi
                                      Kamu</Text>
                                  <Text style={{fontFamily: 'Ubuntu', fontSize: 16, color: '#fff'}}>Jakarta ➤</Text>
                              </View>
                          </TouchableOpacity>
                      </View>
                  </TouchableOpacity>
              </View>
              <View style={styles.container}>
                  <Gap height={20}/>
                  <View style={styles.referralcode}>
                  {loggedIn ? (<View style={{flexDirection:'row'}}>
          <View>
          <Text style={styles.referral}>
        <Text style={{fontFamily: 'Ubuntur'}}>Referral: {data && (
        <Text style={{fontFamily: 'Ubuntu'}}>{(data.referral_code)}</Text> )}</Text></Text>
        </View>
        <TouchableOpacity activeOpacity={0.5} onPress={() => handleCopy(data)}>
        <View>
          <Text style={styles.referralcopytext}>Copy</Text>
        </View>
        </TouchableOpacity>
        </View>):(<View style={{width:'100%'}}>
          <TouchableOpacity onPress={handlePress} style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../assets/image/wabanner.png')}
            style={{ width: '87%', height: 80, justifyContent: 'center', alignItems: 'center', borderRadius: 15}}
          />
        </View>
      </TouchableOpacity>
        </View>)}
                  </View>
                  <Gap height={25}/>
                  <View height='76%' flexGrow={1} style={{marginBottom: wp("6%"),}}>
                      <ScrollView
                          showsVerticalScrollIndicator={false}
                          contentContainerStyle={{
                              justifyContent: "center",
                              alignContent: "center",
                              alignItems: "center",
                          }}
                      >
                          <View style={styles.carouselContainer}>
                              <ScrollView
                                  horizontal
                                  pagingEnabled
                                  showsHorizontalScrollIndicator={false}
                                  onScroll={handleScroll}
                                  ref={scrollViewRef}
                                  selectedIndex={activeIndex}
                              >
                                  {renderImages()}
                              </ScrollView>
                          </View>
                          <View style={styles.circleIndicator}>{renderCircleIndicators()}</View>
                          <Gap height={20}/>
                          <Text style={styles.categoriestext}>{t('services')}</Text>
                          <Gap height={20}/>
                          <View style={styles.categoriesview}>

                              <TouchableOpacity onPress={loggedIn?handleModal1Open:handleModal4Open}>
                                  <LinearGradient
                                      colors={['#5865F2', '#DD7DE1']}
                                      style={styles.homebackgroundcard}>
                                      <View style={styles.categoriescard}>
                                          <UrgentCleaner style={styles.iconurgent}/>
                                          <Gap height={5}/>
                                          <Text style={styles.categoriescardtext}>
                                              {t('general_services')}
                                          </Text>
                                      </View>
                                  </LinearGradient>
                              </TouchableOpacity>
                              <Modal isVisible={isModalVisible4} onBackdropPress={() => setModalVisible4(false)} style={{alignItems:'center'}}>
                                <View style={{borderRadius: 20, backgroundColor: '#fff',width: wp('80%'),height: hp('70%'),alignItems:'center'}}>
                                <LottieView 
                                style={{width:'100%'}}
                                source={require('../../assets/animation/GembokLocked.json')}
                                autoPlay
                                loop/>
                                <Text style={styles.titletext}>Silahkan login dan nikmati semua layanan!</Text>
                                {/* <Text style={styles.subtext}>Silakan login untuk mendapatkan akses penuh dan menikmati semua layanan yang tersedia dalam aplikasi Kilapin</Text> */}
                                <Pressable style={styles.nextbutton} onPress={() => 
                                    {navigation.navigate('Login'); 
                                    setModalVisible4(false);}
                                    }>
                                    <Text style={styles.textbutton} onPress={() => navigation.navigate('Login')}>LOGIN</Text>
                                </Pressable>
                                </View>
                              </Modal>

                              <Modal isVisible={isModalVisible1} onBackdropPress={() => setModalVisible1(false)}
                                     style={{flex: 1}}>
                                  <View style={{borderRadius: 20, backgroundColor: '#fff'}}>
                                      <View style={styles.map}>
                                      </View>
                                      <ScrollView showsVerticalScrollIndicator={false}>
                                          <View style={{
                                              marginTop: '5%',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              flexDirection: 'row',
                                          }}>
                                              <Text style={{
                                                  fontFamily: 'Ubuntu',
                                                  fontSize: 22
                                              }}>{t('general_services')}</Text>
                                              <View style={{marginHorizontal: '2.5%'}}></View>
                                              <View style={{backgroundColor: '#DA7DE1', borderRadius: 10}}>
                                                  <Text style={{color: '#fff', padding: '2%', fontFamily: 'Ubuntum'}}>Best
                                                      Service</Text>
                                              </View>
                                          </View>
                                          <View style={styles.formContainer}>
                                              <Text style={styles.address}>
                                                  Kamu yang membutuhkan cleaning tempat tinggal lebih kompleks dapat
                                                  menggunakan layanan Deep Cleaning, karena tersedia layanan yang
                                                  lebih
                                                  detail lagi seperti vacum sofa, membersihkan plafon, dan lainnya.
                                                  Pastinya Deep Cleaning akan membuat tempat tinggal kamu.
                                              </Text>
                                          </View>
                                      </ScrollView>
                                      {loggedIn ? <View>
                                        <View style={{
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          marginBottom: '4%',
                                          flexDirection: 'row'
                                      }}>
                                          <TouchableOpacity
                                              style={[styles.confirmButton, selectedOption === 'URGENT CLEANER' ? styles.selectedButton : null]}
                                              onPress={() => {
                                                  handleOptionSelect('URGENT CLEANER')
                                              }}
                                          >
                                              <Text style={styles.confirmButtonText}>URGENT CLEANER</Text>
                                          </TouchableOpacity>
                                          <View style={{marginHorizontal: '1.5%'}}></View>
                                          <TouchableOpacity
                                              style={[styles.confirmButton, selectedOption === 'BOOKING CLEANER' ? styles.selectedButton : null]}
                                              onPress={() => handleOptionSelect('BOOKING CLEANER')}
                                          >
                                              <Text style={styles.confirmButtonText}>BOOKING CLEANER</Text>
                                          </TouchableOpacity>
                                      </View>
                                      </View>:<View
                                      style={{justifyContent:'center',alignItems:'center',marginBottom: '4%',}}
                                      >
                                      <TouchableOpacity
                                              style={[styles.confirmButton, selectedOption === 'URGENT CLEANER' ? styles.selectedButton : null]}
                                              onPress={() => {
                                                  navigation.navigate('Login')
                                              }}
                                          >
                                              <Text style={styles.confirmButtonText}>LOGIN</Text>
                                          </TouchableOpacity>
                                        </View>}
                                  </View>
                              </Modal>

                              <Gap width={20}/>

                              <TouchableOpacity onPress={handleModal3Open}>
                                  <LinearGradient
                                      colors={["#EAEAEA", "#F5F5F5"]}
                                      style={styles.homebackgroundcard}>

                                      <View style={styles.categoriescard}>
                                          <BookingCleaning style={styles.iconurgent}/>
                                          <Gap height={5}/>
                                          <Text style={styles.categoriescardtext3}>{t('detail_services')}</Text>
                                      </View>
                                  </LinearGradient>
                              </TouchableOpacity>

                              <Modal isVisible={isModalVisible2} onBackdropPress={() => setModalVisible2(false)}
                                     style={{flex: 1}}>
                                  <View style={{backgroundColor: '#fff', borderRadius: 20}}>
                                      <View style={{borderRadius: 20}}>
                                      </View>
                                      <View style={styles.map}>
                                      </View>
                                      <ScrollView showsVerticalScrollIndicator={false}>
                                          <View style={{
                                              marginTop: '5%',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              flexDirection: 'row',
                                          }}>
                                              <Text style={{
                                                  fontFamily: 'Ubuntu',
                                                  fontSize: 22
                                              }}>{t('detail_services')}</Text>
                                              <View style={{marginHorizontal: '6.5%'}}></View>
                                              <View style={{backgroundColor: '#DA7DE1', borderRadius: 10}}>
                                                  <Text style={{color: '#fff', padding: '2%', fontFamily: 'Ubuntum'}}>Best
                                                      Service</Text>
                                              </View>
                                          </View>
                                          <View style={styles.formContainer}>
                                              <Text style={styles.address}>
                                                  Kamu yang membutuhkan cleaning tempat tinggal lebih kompleks dapat
                                                  menggunakan layanan Deep Cleaning, karena tersedia layanan yang
                                                  lebih
                                                  detail lagi seperti vacum sofa, membersihkan plafon, dan lainnya.
                                                  Pastinya Deep Cleaning akan membuat tempat tinggal kamu.
                                                  {/* {t('general_services_desc')} */}
                                              </Text>
                                          </View>
                                      </ScrollView>
                                      <View style={{
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          marginBottom: '4.01%',
                                          flexDirection: 'row'
                                      }}>
                                          <TouchableOpacity style={styles.confirmButton3} onPress={() => {
                                              handlePress();
                                              setModalVisible2(false);
                                          }}>
                                              <Text style={styles.confirmButtonText3} onPress={() => {
                                                  handlePress();
                                                  setModalVisible2(false);
                                              }}>PESAN</Text>
                                          </TouchableOpacity>

                                      </View>
                                  </View>
                              </Modal>
                              <Gap width={20}/>
                              <TouchableOpacity onPress={handleModal3Open}>
                                  <LinearGradient
                                      colors={["#EAEAEA", "#F5F5F5"]}
                                      style={styles.homebackgroundcard}
                                  >
                                      <View style={styles.categoriescard}>
                                          <HydroCleaning/>
                                          <Gap height={5}/>
                                          <Text style={styles.categoriescardtext3}>{t('commercial_services')}</Text>
                                      </View>
                                  </LinearGradient>
                              </TouchableOpacity>

                              <Modal isVisible={isModalVisible3} onBackdropPress={() => setModalVisible3(false)}
                                     style={{flex: 1}}>
                                  <View style={{
                                      backgroundColor: '#fff',
                                      justifyContent: 'center',
                                      textAlign: 'center',
                                      alignItems: 'center',
                                      borderRadius: 20
                                  }}>
                                      <LottieView
                                          source={require('../../assets/animation/comingsoon.json')}
                                          autoPlay
                                          loop
                                          style={styles.animation}/>
                                      <Text style={styles.titletext}>Segera Hadir!</Text>
                                      <Text style={styles.subtext}>Fitur ini akan segera hadir dan memberikan anda
                                          pelayanan terbaik dari Kilapin!</Text>
                                      <TouchableOpacity style={styles.nextbutton}
                                                        onPress={() => setModalVisible3(false)}>
                                          <Text style={styles.textbutton}
                                                onPress={() => setModalVisible3(false)}>HOME</Text>
                                      </TouchableOpacity>
                                  </View>
                              </Modal>
                          </View>
                          <Gap height={20}/>
                          <View style={styles.categoriesview}>

                              <TouchableOpacity onPress={handleNavigationAC}>
                                  <LinearGradient
                                      colors={["#EAEAEA", "#F5F5F5"]}
                                      style={styles.homebackgroundcard}
                                  >
                                      <View style={styles.categoriescard}>
                                          <LayananAC
                                              style={{marginTop: '5%'}}/>
                                          <Gap height={5}/>
                                          <Text style={styles.categoriescardtext4}>{t('electrical_sercives')}</Text>
                                      </View>
                                  </LinearGradient>
                              </TouchableOpacity>

                              <Gap width={20}/>

                              <TouchableOpacity onPress={handleModal3Open}>
                                  <LinearGradient
                                      colors={["#EAEAEA", "#F5F5F5"]}
                                      style={styles.homebackgroundcard}
                                  >
                                      <View style={styles.categoriescard}>
                                          <PolesLantai/>
                                          <Gap height={5}/>
                                          <Text style={styles.categoriescardtext4}>{t('car_wash')}</Text>
                                      </View>
                                  </LinearGradient>
                              </TouchableOpacity>

                              <Gap width={20}/>

                              <TouchableOpacity onPress={handleModal3Open}>
                                  <LinearGradient
                                      colors={["#EAEAEA", "#F5F5F5"]}
                                      style={styles.homebackgroundcard}>
                                      <View style={styles.categoriescard}>

                                          <CuciKasur/>
                                          <Gap height={5}/>
                                          <Text style={styles.categoriescardtext5}>{t('crystallization')}</Text>
                                      </View>
                                  </LinearGradient>
                              </TouchableOpacity>
                          </View>
                          <Gap height={20}/>
                          <Text style={styles.categoriestext}>{t('best_cleaner')}</Text>
                          <Gap height={20}/>
                          <View style={styles.topcleanerphotosec}>
                              <ScrollView horizontal>
                                  <View onPress={() => navigation.navigate("TopCleanerOne")}>
                                      <TouchableOpacity onPress={() => navigation.navigate("TopCleanerOne")}>
                                          <View style={styles.topcleanerphoto}
                                                onPress={() => navigation.navigate("TopCleanerOne")}>
                                              <Image
                                                  style={{
                                                      flex: 1,
                                                      width: undefined,
                                                      height: undefined,
                                                  }}
                                                  source={require("../../assets/image/TopCleaner1.png")}
                                                  onPress={() => navigation.navigate("TopCleanerOne")}
                                              />
                                          </View>
                                      </TouchableOpacity>
                                  </View>
                                  <Gap width={20}/>
                                  <View onPress={() => navigation.navigate("TopCleanerTwo")}>
                                      <TouchableOpacity onPress={() => navigation.navigate("TopCleanerTwo")}>
                                          <View style={styles.topcleanerphoto}
                                                onPress={() => navigation.navigate("TopCleanerTwo")}>
                                              <Image
                                                  style={{
                                                      flex: 1,
                                                      width: undefined,
                                                      height: undefined,
                                                  }}
                                                  source={require("../../assets/image/TopCleaner2.png")}
                                                  onPress={() => navigation.navigate("TopCleanerTwo")}
                                              />
                                          </View>
                                      </TouchableOpacity>
                                  </View>
                                  <Gap width={20}/>
                                  <View onPress={() => navigation.navigate("TopCleanerThree")}>
                                      <TouchableOpacity onPress={() => navigation.navigate("TopCleanerThree")}>
                                          <View style={styles.topcleanerphoto}
                                                onPress={() => navigation.navigate("TopCleanerThree")}>
                                              <Image
                                                  style={{
                                                      flex: 1,
                                                      width: undefined,
                                                      height: undefined,
                                                  }}
                                                  source={require("../../assets/image/TopCleaner3.png")}
                                                  onPress={() => navigation.navigate("TopCleanerOne")}
                                              />
                                          </View>
                                      </TouchableOpacity>
                                  </View>
                                  <Gap width={20}/>
                                  <View onPress={() => navigation.navigate("TopCleanerOne")}>
                                      <TouchableOpacity onPress={() => navigation.navigate("TopCleanerOne")}>
                                          <View style={styles.topcleanerphoto}
                                                onPress={() => navigation.navigate("TopCleanerOne")}>
                                              <Image
                                                  style={{
                                                      flex: 1,
                                                      width: undefined,
                                                      height: undefined,
                                                  }}
                                                  source={require("../../assets/image/TopCleaner1.png")}
                                                  onPress={() => navigation.navigate("TopCleanerOne")}
                                              />
                                          </View>
                                      </TouchableOpacity>
                                  </View>
                                  <Gap width={20}/>
                                  <View onPress={() => navigation.navigate("TopCleanerTwo")}>
                                      <TouchableOpacity onPress={() => navigation.navigate("TopCleanerTwo")}>
                                          <View style={styles.topcleanerphoto}
                                                onPress={() => navigation.navigate("TopCleanerTwo")}>
                                              <Image
                                                  style={{
                                                      flex: 1,
                                                      width: undefined,
                                                      height: undefined,
                                                  }}
                                                  source={require("../../assets/image/TopCleaner2.png")}
                                                  onPress={() => navigation.navigate("TopCleanerTwo")}
                                              />
                                          </View>
                                      </TouchableOpacity>
                                  </View>
                              </ScrollView>
                          </View>
                          <Gap height={50}/>
                      </ScrollView>
                  </View>
              </View>
          </SafeAreaView>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  areasafeview: {
    marginTop:hp('2%'),
      width: Dimensions.get('screen').width
  },
  topsection: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      textAlign: "center",
      height: Dimensions.get('screen').height / 11
  },
  topnotification: {
      borderRadius: 11,
      width: 120,
      height: 40,
      alignItems: 'center',
      justifyContent: "center",
      textAlign: "center",
      backgroundColor: "#5865F2",
  },
  profiletopimage: {
      borderRadius: 100,
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
  },
  topcleanerphotosec: {
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexDirection: "row",
      marginLeft: wp("8%"),
      marginBottom: wp("12%"),
      marginRight: wp("8%"),
  },
  carouselContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
  },
  imageContainer: {
      width: width * 0.89,
      height: height * 1.01,
      borderWidth: 1,
      borderColor: '#fff',
      borderRadius: 20,
      overflow: 'hidden',
      justifyContent: 'center',
      marginHorizontal: wp('5.5%'),
  },
  image: {
      width: '100%',
      height: '100%',
  },
  circleIndicator: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: hp('-3%'),
      marginBottom: '1%'
  },
  circle: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#ccc',
      marginHorizontal: 5,
  },
  activeCircle: {
      backgroundColor: '#000',
  },
  address: {
      fontSize: 16,
      fontFamily: 'Ubuntur',
      marginBottom: '1%',
  },
  confirmButton: {
      backgroundColor: '#DA7DE1',
      height: 51,
      borderRadius: 20,
      alignItems: 'center',
      marginTop: 2,
      width: '45%',
      justifyContent: 'center',
      textAlign: 'center',
  },
  confirmButton3: {
      backgroundColor: '#DA7DE1',
      height: 51,
      borderRadius: 20,
      alignItems: 'center',
      marginTop: 2,
      width: '90%',
      justifyContent: 'center',
      textAlign: 'center',
  },
  formContainer: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 24,
  },
  animation: {
      height: hp('30%'),
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      marginTop: '1%',
      marginBottom: '-2%'
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
      borderRadius: 20,
      width: '90%',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginTop: hp('2%'),
      marginBottom: hp('2.5%')
  },
  textbutton: {
      fontFamily: 'Ubuntu',
      color: '#fff',
  },
  confirmButtonText: {
      color: '#ffffff',
      fontFamily: 'Ubuntu',
      fontSize: 13,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
  },
  confirmButtonText3: {
      color: '#ffffff',
      fontFamily: 'Ubuntu',
      fontSize: 15,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
  },
    map: {
      flex: 1,
      marginTop: '-2%'
  },
  categoriesview: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      width: wp('90%')
  },
  topcleanerphoto: {
      height: hp('16%'),
      width: wp('28%'),
  },
  iconurgent: {
      alignItems: "flex-start",
      justifyContent: "flex-start",
      color: "#393E46",
  },
  categoriescard: {
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
  },
  homebackgroundcard: {
      height: hp('15%'),
      width: wp('25%'),
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
  },
  categoriescardtext3: {
      fontFamily: "Ubuntu",
      fontSize: 16,
      color: "#DA7DE1",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      width: 100,
      marginTop: -20,
      marginBottom: hp('2%'),
  },
  categoriescardtext4: {
      fontFamily: "Ubuntu",
      fontSize: 16,
      color: "#DA7DE1",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      width: 80,
      marginTop: -20,
      marginBottom: hp('3%'),
  },
  categoriescardtextac: {
      fontFamily: "Ubuntu",
      fontSize: 16,
      color: "#fff",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      width: 80,
      marginTop: -20,
      marginBottom: hp('3%'),
  },
  categoriescardtext5: {
      fontFamily: "Ubuntu",
      fontSize: 16,
      color: "#DA7DE1",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      width: 80,
      marginTop: -20,
      marginBottom: hp('3%'),
  },
  categoriescardtextbooking: {
      fontFamily: "Ubuntu",
      fontSize: 16,
      color: "#fff",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      marginTop: -18,
      marginBottom: hp('3%'),
      width: 100
  },
  categoriescardtext: {
      fontFamily: "Ubuntu",
      fontSize: 16,
      color: "#fff",
      width: 74.5,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      marginTop: -20,
      marginBottom: hp('2%')
  },
  container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#fff'
  },
  backgroundgradient: {
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      paddingVertical: '5%'
  },
  categoriestext: {
      fontFamily: "Ubuntum",
      fontSize: 20,
  },
  referral: {
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      width: wp('70%'),
      borderWidth: 2,
      padding: 10,
      color: '#91399A',
      borderRadius: 10,
      backgroundColor: '#F0F1FF',
      borderColor: '#F0F1FF',
      fontFamily: 'Ubuntu',

  },
  referralcopytext: {
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      borderRadius: 10,
      marginLeft: wp('4%'),
      borderWidth: 2,
      borderColor: '#5865F2',
      padding: 10,
      color: '#fff',
      backgroundColor: '#5865F2',
      fontFamily: 'Ubuntu',
  },
  referralcode: {
      flexDirection: 'row',
      marginBottom: hp('-0.7%')
  },
});

export default Home;