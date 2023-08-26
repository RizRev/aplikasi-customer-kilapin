import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Gap } from "../../components";
import { UrgentCleaner, BookingCleaning, HydroCleaning, LayananAC, CuciKasur, PolesLantai} from "../../assets";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import YouTubeIframe from 'react-native-youtube-iframe';
import LottieView from 'lottie-react-native';
import * as Location from 'expo-location';
import {useTranslation} from 'react-i18next';

const { width } = Dimensions.get('window');
const height = width * 0.6;
const images = [
  require('../../assets/image/carousel1.png'),
  require('../../assets/image/carousel2.png'),
  require('../../assets/image/carousel3.png'),
];

const HomeBL = ({ navigation }) => {

  const [userLocation, setUserLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // Get the user's current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      if (latitude >= -6.3 && latitude <= -5.9 && longitude >= 106.6 && longitude <= 107.1) {
        setUserLocation({ latitude, longitude });
      } else {
        // User is not in Jakarta, show the modal
        setShowModal(true);
      }
    })();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      scrollViewRef.current && scrollViewRef.current.scrollTo({ x: (activeIndex + 1) * width });
    }, 7000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handlePress2 = () => {
    // Navigate to the desired page here
    navigation.navigate('NewsBL');
  };

  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / width);
    setActiveIndex(index);
  };

  const renderImages = () =>
    images.map((image, index) => (
      <TouchableOpacity style={styles.imageContainer} key={index} onPress={handlePress2}>
        <Image source={image} style={styles.image} />
      </TouchableOpacity>
    ));

  const renderCircleIndicators = () =>
    images.map((_, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.circle, activeIndex === index && styles.activeCircle]}
        onPress={() => scrollViewRef.current && scrollViewRef.current.scrollTo({ x: index * width })}
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

const handleModal1Open = () => {
  setModalVisible1(true);
};

const handleModal2Open = () => {
  setModalVisible2(true);
};

const handleModal3Open = () => {
  setModalVisible3(true);
};

  useEffect(() => {
    return () => {
      YouTubeIframe.current?.stop();
    };
  }, []);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
    <Modal visible={showModal} animationType="slide" backdropOpacity={0.6}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: '7%', borderRadius: 20 }}>
            <Text style={{ fontSize: 20, marginBottom: 10, fontFamily: 'Ubuntu', textAlign: 'center' }}>Location Alert</Text>
            <Text style={{ marginBottom: 20, fontFamily: 'Ubuntur', textAlign: 'center' }}>{t('apologize')}</Text>
            <TouchableOpacity style={{backgroundColor: '#DA7DE1', padding: 10, borderRadius: 20}} onPress={() => setShowModal(false)}>
              <Text style={{textAlign: 'center', color: '#fff', fontFamily: 'Ubuntu'}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <LinearGradient
        colors={['#5865F2', '#DD7DE1']}
        style={styles.backgroundgradient}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View style={styles.topsection}>
        <>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}> 
      <TouchableOpacity onPress={() => navigation.navigate("ProfileBL")}>
          <Image
            style={styles.profiletopimage}
            source={require('../../assets/image/kilapinklogo.png')}
            imageStyle={{ borderRadius: 100 }}
          />
      </TouchableOpacity>
      <View style={{marginLeft: '5%',}}>
        <Text style={{fontFamily: 'Ubuntum', color: '#fff', fontSize: 14}}>Selamat Datang di</Text>
        <Text style={{fontFamily: 'Ubuntu', color: '#fff', fontSize: 20}}>KILAPIN!</Text>
      </View>
      </View>
      <View style={{marginHorizontal: '3%'}}></View>    
      <TouchableOpacity onPress={() => navigation.navigate("SelectCityBL")}>
          <View style={styles.topnotification}>
            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <Text style={{fontFamily: 'Ubuntum', fontSize: 12, color: '#fff'}}>{t('choose_location')}</Text>
          <Text style={{fontFamily: 'Ubuntu', fontSize: 16, color: '#fff'}}>Jakarta ➤</Text>
          </View>
          </View>
      </TouchableOpacity>
    </>
        </View>
      </LinearGradient>
      <View style={styles.container}>
      <View height = '90%' flexGrow = {1} style={{ marginBottom: wp("6%"),}}>
        <ScrollView
        showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
        <Gap height={17} />
        <View style={styles.referralcode}>
        <TouchableOpacity onPress={handlePress} style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../assets/image/wabanner.png')}
            style={{ width: '87%', height: 80, justifyContent: 'center', alignItems: 'center', borderRadius: 15}}
          />
        </View>
      </TouchableOpacity>
        </View>

        <Gap height={21} />

    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={scrollViewRef}
        selectedIndex={activeIndex}>
        {renderImages()}
      </ScrollView>
    </View>
    <View style={styles.circleIndicator}>{renderCircleIndicators()}</View>
        <Gap height={25} />
          <Text style={styles.categoriestext}>{t('services')}</Text>
          <Gap height={20} />
          <View style={styles.categoriesview}>
          <TouchableOpacity onPress={handleModal1Open}>
            <LinearGradient
              colors={['#5865F2', '#DD7DE1']}
              style={styles.homebackgroundcard}
              >
              <View
                style={styles.categoriescard}
              >
                <UrgentCleaner
                  style={styles.iconurgent}
                />
                <Gap height={5} />
                <Text
                  style={styles.categoriescardtext}
                >
                  {t('general_services')}
                </Text>
              </View>
            </LinearGradient>
 </TouchableOpacity>

 <Modal isVisible={isModalVisible1} onBackdropPress={() => setModalVisible1(false)} style={{flex: 1}}>
 <View style={{borderRadius: 20, backgroundColor: '#fff'}}>
          <YouTubeIframe
        ref={YouTubeIframe}
        videoId="4ksRpKPwEB8"
        play={true}
        height={200}/>
      <View style={styles.map}>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{marginTop: '5%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row',}}>
    <Text style={{ fontFamily: 'Ubuntu', fontSize: 22}}>{t('general_services')}</Text>
    <View style={{marginHorizontal: '2.5%'}}></View>
    <View style={{backgroundColor: '#DA7DE1', borderRadius: 10}}>
      <Text style={{color: '#fff', padding: '2%',  fontFamily: 'Ubuntum'}}>Best Service</Text>
    </View>
    </View>
      <View style={styles.formContainer}>
        <Text style={styles.address}>Kamu yang membutuhkan cleaning tempat tinggal lebih kompleks dapat menggunakan layanan Deep Cleaning, karena tersedia layanan yang lebih detail lagi seperti vacum sofa, membersihkan plafon, dan lainnya. Pastinya Deep Cleaning akan membuat tempat tinggal kamu.</Text>
      </View>
      </ScrollView>
      <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: '4%'}}>
      <TouchableOpacity style={styles.confirmButton} onPress={() => {
  navigation.navigate("Login");
  setModalVisible1(false)}}>
    
          <Text style={styles.confirmButtonText} onPress={() => navigation.navigate("Login")}>LOGIN</Text>
        </TouchableOpacity>
        </View>
    </View>
 </Modal>
      <Gap width={20} />
            <TouchableOpacity onPress={handleModal2Open}>
            <LinearGradient
              colors={['#5865F2', '#DD7DE1']}
              style={styles.homebackgroundcard}>
                
              <View style={styles.categoriescard}>
                <BookingCleaning style={styles.iconurgent}/>
                <Gap height={5} />
                <Text style={styles.categoriescardtextbooking}>{t('detail_services')}</Text>
              </View>
            </LinearGradient>
</TouchableOpacity>

<Modal isVisible={isModalVisible2} onBackdropPress={() => setModalVisible2(false)} style={{flex: 1}}>
  <View style={{backgroundColor: '#fff', borderRadius: 20}}>
    <View style={{borderRadius: 20}}>
          <YouTubeIframe
        ref={YouTubeIframe}
        videoId="4ksRpKPwEB8"
        play={true}
        height={200}
        style={{borderRadius:20}} />
        </View>
      <View style={styles.map}>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{marginTop: '5%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row',}}>
    <Text style={{ fontFamily: 'Ubuntu', fontSize: 22}}>{t('detail_services')}</Text>
    <View style={{marginHorizontal: '6.5%'}}></View>
    <View style={{backgroundColor: '#DA7DE1', borderRadius: 10}}>
      <Text style={{color: '#fff', padding: '2%',  fontFamily: 'Ubuntum'}}>Best Service</Text>
    </View>
    </View>
      <View style={styles.formContainer}>
        <Text style={styles.address}>Kamu yang membutuhkan cleaning tempat tinggal lebih kompleks dapat menggunakan layanan Deep Cleaning, karena tersedia layanan yang lebih detail lagi seperti vacum sofa, membersihkan plafon, dan lainnya. Pastinya Deep Cleaning akan membuat tempat tinggal kamu.</Text>
      </View>
      </ScrollView>
      <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: '4%'}}>
      <TouchableOpacity style={styles.confirmButton} onPress={() => {
        navigation.navigate("Login");
        setModalVisible2(false);
      }}>
        <Text style={styles.confirmButtonText}>LOGIN</Text>
      </TouchableOpacity>
        </View>
    </View>
  </Modal>
            <Gap width={20} />
            <TouchableOpacity onPress={handleModal3Open}>
            <LinearGradient
              colors={["#EAEAEA", "#F5F5F5"]}
              style={styles.homebackgroundcard}
            >
              <View style={styles.categoriescard}>
            <HydroCleaning
                  style={{}}
                />
                <Gap height={5} />
                <Text style={styles.categoriescardtext3}>{t('commercial_services')}</Text>
              </View>
            </LinearGradient>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible3} onBackdropPress={() => setModalVisible3(false)} style={{flex: 1}}>
            <View style={{backgroundColor: '#fff', justifyContent: 'center', textAlign: 'center', alignItems: 'center', borderRadius: 20}}>
    <LottieView 
        source={require('../../assets/animation/comingsoon.json')}
        autoPlay
        loop
        style={styles.animation}/>
      <Text style={styles.titletext}>Segera Hadir!</Text>
      <Text style={styles.subtext}>Fitur ini akan segera hadir dan memberikan anda pelayanan terbaik dari Kilapin!</Text>
      <TouchableOpacity style={styles.nextbutton} onPress={() => setModalVisible3(false)}>
            <Text style={styles.textbutton} onPress={() => setModalVisible3(false)}>HOME</Text>
        </TouchableOpacity>
    </View>
            </Modal>

          </View>
          <Gap height={20} />
          <View style={styles.categoriesview} >

          <TouchableOpacity onPress={handleModal3Open}>
          <LinearGradient
              colors={["#EAEAEA", "#F5F5F5"]}
              style={styles.homebackgroundcard}
            >
              <View style={styles.categoriescard}>
              <LayananAC
                  style={{marginTop: '5%'}}
                />
                <Gap height={5} />
                <Text style={styles.categoriescardtext4}>{t('electrical_sercives')}</Text>
              </View>
            </LinearGradient>
      </TouchableOpacity>

            <Gap width={20} />

            <TouchableOpacity onPress={handleModal3Open}>
            <LinearGradient
              colors={["#EAEAEA", "#F5F5F5"]}
              style={styles.homebackgroundcard}
            >
              <View style={styles.categoriescard} >
              <PolesLantai
                  style={{}}
                />
                <Gap height={5} />
                <Text style={styles.categoriescardtext4}>{t('car_wash')}</Text>
              </View>
            </LinearGradient>
            </TouchableOpacity>

            <Gap width={20} />

            <TouchableOpacity onPress={handleModal3Open}>
            <LinearGradient
              colors={["#EAEAEA", "#F5F5F5"]}
              style={styles.homebackgroundcard}>
              <View style={styles.categoriescard}>
              <CuciKasur
                  style={{}}/>
                <Gap height={5} />
                <Text style={styles.categoriescardtext5}>{t('crystallization')}</Text>
              </View>
            </LinearGradient>
        </TouchableOpacity>
          </View>
          <Gap height={20} />
          <Text style={styles.categoriestext}>{t('best_cleaner')}</Text>
          <Gap height={20} />
          <View style={styles.topcleanerphotosec}>
            <ScrollView horizontal>
              <View onPress={() => navigation.navigate("TopCleanerOneBL")}>
              <TouchableOpacity onPress={() => navigation.navigate("TopCleanerOneBL")}>
                <View style={styles.topcleanerphoto} onPress={() => navigation.navigate("TopCleanerOneBL")}>
                  <Image
                    style={{
                      flex: 1,
                      width: undefined,
                      height: undefined,
                    }}
                    source={require("../../assets/image/TopCleaner1.png")}
                    onPress={() => navigation.navigate("TopCleanerOneBL")}
                  />
                </View>
                </TouchableOpacity>
              </View>
              <Gap width={20} />
              <View onPress={() => navigation.navigate("TopCleanerTwoBL")}>
              <TouchableOpacity onPress={() => navigation.navigate("TopCleanerTwoBL")}>
                <View style={styles.topcleanerphoto} onPress={() => navigation.navigate("TopCleanerTwoBL")}>
                  <Image
                    style={{
                      flex: 1,
                      width: undefined,
                      height: undefined,
                    }}
                    source={require("../../assets/image/TopCleaner2.png")}
                    onPress={() => navigation.navigate("TopCleanerTwoeBL")}
                  />
                </View>
                </TouchableOpacity>
              </View>
              <Gap width={20} />
              <View onPress={() => navigation.navigate("TopCleanerThreeBL")}>
              <TouchableOpacity onPress={() => navigation.navigate("TopCleanerThreeBL")}>
                <View style={styles.topcleanerphoto} onPress={() => navigation.navigate("TopCleanerThreeBL")}>
                  <Image
                    style={{
                      flex: 1,
                      width: undefined,
                      height: undefined,
                    }}
                    source={require("../../assets/image/TopCleaner3.png")}
                    onPress={() => navigation.navigate("TopCleanerOneBL")}
                  />
                </View>
                </TouchableOpacity>
              </View>
              <Gap width={20} />
              <View onPress={() => navigation.navigate("TopCleanerOneBL")}>
              <TouchableOpacity onPress={() => navigation.navigate("TopCleanerOneBL")}>
                <View style={styles.topcleanerphoto} onPress={() => navigation.navigate("TopCleanerOneBL")}>
                  <Image
                    style={{
                      flex: 1,
                      width: undefined,
                      height: undefined,
                    }}
                    source={require("../../assets/image/TopCleaner1.png")}
                    onPress={() => navigation.navigate("TopCleanerOneBL")}
                  />
                </View>
                </TouchableOpacity>
              </View>
              <Gap width={20} />
              <View onPress={() => navigation.navigate("TopCleanerTwoBL")}>
              <TouchableOpacity onPress={() => navigation.navigate("TopCleanerTwoBL")}>
                <View style={styles.topcleanerphoto} onPress={() => navigation.navigate("TopCleanerTwoBL")}>
                  <Image
                    style={{
                      flex: 1,
                      width: undefined,
                      height: undefined,
                    }}
                    source={require("../../assets/image/TopCleaner2.png")}
                    onPress={() => navigation.navigate("TopCleanerTwoBL")}
                  />
                </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
          <Gap height={50} />
        </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topsection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
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
    borderRadius:20,
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
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  address: {
    fontSize: 16,
    fontFamily: 'Ubuntur',
    marginBottom: 10,
    marginBottom: '1%',
  },
  confirmButton: {
    backgroundColor: '#DA7DE1',
    height: 51,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 2,
    width: '90%',
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
    marginTop: '-2%'
  },
  profiletopimage: {
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: '#fff'
  },
  topcleanerphotosec: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    marginLeft: wp("8%"),
    marginBottom: wp("12%"),
    marginRight: wp("8%"),
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
    width: 60,
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
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: 80,
    marginTop: -20,
    marginBottom: hp('3%'),
  },
  categoriescardtextbooking:{
    fontFamily: "Ubuntu",
    fontSize: 16,
    color: "#fff",
    width: 60,
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
  referralcode:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('-0.7%')
  },
});

export default HomeBL;
