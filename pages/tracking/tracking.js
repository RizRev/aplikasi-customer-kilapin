import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Linking, Animated, PanResponder,Alert,BackHandler } from 'react-native';
import { BackIconWhite } from '../../assets';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, onChildAdded } from "firebase/database";
import ChatTrack from '../../assets/vector/jsx/ChatTrack'
import Alerto from '../../assets/vector/jsx/Alerto'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapViewDirections from 'react-native-maps-directions';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


const firebaseConfig = {
  apiKey: "AIzaSyCU5A_RbhV9n-_L3TQg6R1KQtCHn4lkB5A",
  authDomain: "maps-c04b2.firebaseapp.com",
  databaseURL: "https://maps-c04b2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "maps-c04b2",
  storageBucket: "maps-c04b2.appspot.com",
  messagingSenderId: "1044820818114",
  appId: "1:1044820818114:web:3f8bf463fff32ab8d2a35b",
  measurementId: "G-C48B3QDYGK"
};

const firebaseApp = initializeApp(firebaseConfig, "Maps");
const database = getDatabase(firebaseApp);

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Tracking = ({route, navigation}) => {
  useEffect(() => {
    const backAction = () => {
      // Check if the current screen is Profile, if yes, navigate to Home and return true to prevent the default back action.
      if (navigation.isFocused()) {
        navigation.navigate('MainApp',{screen:'Home'});
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
  const [loading, setLoading] = useState(false);
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
  
      // if (response.data && response.data.secure_url) {
      //   const imageUrl = response.data.secure_url;
      //   dispatch(ApplicationActions.onAddImage(imageUrl));
      //     setImage(imageUrl);
      //     setSuccess({
      //       ...success,
      //       image: true,
      //     });
      // }
      setLoading(false);
      setApprove(true)
    } catch (error) {
      console.log('Image upload error:', error);
      setLoading(false);
    }
  };
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dtyji62ve/image/upload?folder=ProfileImage';
  const CLOUDINARY_PRESET = 'yjjew3l8';
  const [image, setImage] = useState(null);

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
  }

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
        } catch (error) {
      }  
    }
    fetchMemberData()
  },[])

  let isAnimating = false;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },      
      onPanResponderMove: (evt, gestureState) => {
        translateY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (isAnimating) {
          return;
        }
        if (gestureState.dy < -150) {
          isAnimating = true;
          Animated.timing(translateY, {
            toValue: -500,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            isAnimating = false;
          });
        } else if (gestureState.dy > 150) {
          isAnimating = true;
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            isAnimating = false;
          });
        } else {
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
        }
      },
      
      
    })
  ).current;

  const translateY = useRef(new Animated.Value(0)).current;

  const [count, setCount] = useState(0);
  const [order_detail, setOrderDetail] = useState('')
  const [approvedcleaner,setApprove] = useState(false)
  const {order_id} = route.params
  console.log(order_id)
  const ini = order_id
  const [timeLeft, setTimeLeft] = useState(600);
  const [timeLeft1, setTimeLeft1] = useState(900);
  useEffect(() => {
  const fetchOrderDetail = async () => {
    try {
      const link = `https://customer.kilapin.com/order/detail/${order_id}`
      const response = await fetch(link);
      const data = await response.json()
      setOrderDetail(data.data)
      console.log('order-detail',data.data)
      console.log('ini lokasi',order_detail.order.lat)
      } catch (error) {
    }  
  }
  fetchOrderDetail()
  if (order_detail.status === 'Placement') {

  }
  const intervalId = setInterval(() => {
    setCount(count => count + 1);
  }, 3000);
return () => clearInterval(intervalId);
},[count])


useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
  }, 2000);

  return () => clearInterval(interval);
}, []);

const hours = Math.floor(timeLeft / 3600);
const minutes = Math.floor((timeLeft % 3600) / 60);
const seconds = timeLeft % 60;



useEffect(() => {
  const interval = setInterval(() => {
    setTimeLeft1(prevTimeLeft => prevTimeLeft - 1);
  }, 2000);

  return () => clearInterval(interval);
}, []);

const hours1 = Math.floor(timeLeft1 / 3600);
const minutes1 = Math.floor((timeLeft1 % 3600) / 60);
const seconds1 = timeLeft1 % 60;
  const handleOrderStatusUpdate = async (newStatus) => {
    console.log(newStatus)
    if (newStatus==='Approved-Cleaner') {
      pickImage()
    }
    try {
      const link = `https://customer.kilapin.com/order/status/${newStatus}/${order_id}`;
      const response = await fetch(link, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Status Update Response:', data);
      // Assuming the API response returns updated order details, update the orderDetail state.
      // handleOrder()
    } catch (error) {
      console.log('Error while updating order status:', error);
    }
  };



  const [cleanerApproved, setCleanerApproved] = useState(false);
  // const [status, setStatus] = useState(false);


  const handleCleanerApproval = () => {
    setCleanerApproved(true);
  }

  const [region, setRegion] = useState(null);
  const [location, setLocation] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);

  useEffect(() => {
  
    const userLocationsRef = ref(database, 'userLocations');
    

    onChildAdded(userLocationsRef, (snapshot) => {

      const latestChildKey = snapshot.key;
      

      const driverLocationRef = ref(database, `userLocations/${latestChildKey}`);
      

      onValue(driverLocationRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {

          setDriverLocation({
            latitude: data.latitude,
            longitude: data.longitude,
          });
        }
      });
    });
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: order_detail.order.lat,
        longitude: order_detail.order.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

// Fungsi untuk mendapatkan style berdasarkan status order
const getStyleByStatus = (status) => {
  switch (status) {
    case "Arrival-Cleaner":
      return styles.confirmButton6; // Style untuk "Arrival-Cleaner"
    case "Order-Ongoing":
      return styles.confirmButton6; // Style untuk "Order-Ongoing"
    default:
      return {backgroundColor: '#E7E7E7',
      height: 51,
      borderRadius: 20,
      alignItems: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginTop: hp('2%'),
      width: wp('90%')}; // Style default untuk status lainnya
  }
};


  if (order_detail) {
    return (
      <View style={styles.container}>
        <View style={styles.mainheader}>
          <View style={styles.header}>
          <TouchableOpacity>
            <BackIconWhite />
          </TouchableOpacity>
          </View>
          
          <View style={styles.headertitle}>
          <Text style={styles.title}>Order</Text>
          </View>
        </View>
        <MapView style={styles.map} region={{        
        latitude: order_detail.order.lat,
        longitude: order_detail.order.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,}}>
    {location && <Marker coordinate={{latitude: order_detail.order.lat, longitude: order_detail.order.lng}} pinColor="transparent" />}
    {driverLocation && (
      <Marker coordinate={{ 
        latitude: driverLocation.latitude, 
        longitude: driverLocation.longitude 
      }}
      image={require('../../assets/K50.png')}
  
        style={styles.customMarker}
        anchor={{ x: 0.5, y: 0.5 }} 
        pinColor="transparent"
      />
    )}
  
    {location && driverLocation && (
      <MapViewDirections
        origin={{ latitude: order_detail.order.lat, longitude: order_detail.order.lng }}
        destination={{ latitude: driverLocation.latitude, longitude: driverLocation.longitude }}
        apikey={'AIzaSyAuyS1LLibOZOGt-eliwsfzzTSYb3fVkmQ'}
        strokeWidth={3}
        strokeColor="hotpink"
      />
    )}
  </MapView>
      <View>
        <View style={{height: '40.5%', marginBottom: '9%',}}>
        <Animated.View
          style={{
            transform: [{ translateY }],
            // height: 310,
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          {...panResponder.panHandlers}
        >
    {order_detail.order.status!=='Arrival-Cleaner' ? (<View></View>) : (
      <View style={{backgroundColor: '#303030', padding: hp('1%'), borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: '-1%'}}>
            <Text style={styles.labelchange}>Cleaner kamu sudah sampai</Text>
            <View style={{justifyContent: 'center', alignContent: 'center',}}>
            <Text style={{fontFamily: 'Ubuntu', color: '#fff', fontSize: 46, textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Text>
            </View>
          </View>)}
          {order_detail.order.status!=='Placement' ? (<View></View>) : (
      <View style={{backgroundColor: '#303030', padding: hp('1%'), borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: '-1%'}}>
            <Text style={styles.labelchange}>Cleaner kamu sudah sampai</Text>
            <View style={{justifyContent: 'center', alignContent: 'center',}}>
            <Text style={{fontFamily: 'Ubuntu', color: '#fff', fontSize: 46, textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>{`${hours1.toString().padStart(2, '0')}:${minutes1.toString().padStart(2, '0')}:${seconds1.toString().padStart(2, '0')}`}</Text>
            </View>
          </View>)}
  
        <View style={styles.formContainer}>
          <View style={styles.addresscontainer}>
              <View style={{flexDirection: 'row', }}>
          <ImageBackground
                style={styles.profiletopimage}
                source={{uri:`${order_detail.cleaner_photo}`}}
                imageStyle={{ borderRadius: 100 }}
              ></ImageBackground>
              <View style={{ marginLeft: wp('5%')}}>
              <Text style={{marginBottom: hp('-1%'), color: "#4FC76D"}}>Cleaner kamu adalah:</Text>
              <Text style={styles.label}>{order_detail ? (order_detail.cleaner.name?order_detail.cleaner.name:'Kilapartner') : ("Wait!")}</Text>
              </View>
          </View>
          <TouchableOpacity style={styles.confirmButton4} onPress={() => Linking.openURL(`whatsapp://send?phone=+6285156913053`)}>
            <View style={{backgroundColor: '#E70F0F', padding: '2%',  borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignContenta: 'center', }}>
              <Alerto/>
            </View>
          </TouchableOpacity>
          <View style={{marginHorizontal: '0.1%'}}></View>
          <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('ChatScreen',{order_id: order_detail.order.order_id,name: data.name,phone: data.phone,id: data._id})}>
            <View style={{backgroundColor: '#4FC76D', padding: '5%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignContent: 'center', }}>
              <ChatTrack />
            </View>
          </TouchableOpacity>
          </View>
  
          <View style={{justifyContent: 'center'}}>
          <TouchableOpacity 
            onPress={() => {
              if (order_detail.order.status === "Arrival-Cleaner") {
                handleOrderStatusUpdate("Approved-Cleaner");
              } else if (order_detail.order.status === "Order-Ongoing") {
                handleOrderStatusUpdate("Done");
                navigation.navigate('Review', 
                {order_id: order_id}
                );
              } 
            }}
            style={getStyleByStatus(order_detail.order.status)}
            >
          <Text
            style={styles.confirmButtonText}
          >            
          {order_detail.order.status === "Arrival-Cleaner" ? "Approved-Cleaner" :
            order_detail.order.status === "Order-Ongoing" ? "Approved-Cleaning" :
                "Wait!"
                }</Text>
          </TouchableOpacity>
          </View>
        </View>
        <View style={{ backgroundColor: '#fff', paddingVertical: '0.1%', }}>
    <View style={{ paddingHorizontal: '5%'}}>
      <View
        style={{
          backgroundColor: '#f5f5f5',
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Order #{(order_detail.order.order_id)}
        </Text>
        <Text style={{ fontSize: 14 }}>Pesanan pada {order_detail.order.createdAt ? order_detail.order.createdAt.slice(0,10):'Wait!'}
        </Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Layanan
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: '#d9d9d9',
            paddingBottom: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ flex: 2, fontSize: 16 }}>{(order_detail.service)} Order</Text>
          <Text style={{ flex: 1, textAlign: 'right', fontSize: 16 }}>
          Rp.{(order_detail.order.total_price)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: '#d9d9d9',
            paddingBottom: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ flex: 2, fontSize: 16 }}>Add-ons</Text>
          <Text style={{ flex: 1, textAlign: 'right', fontSize: 16 }}>
            {order_detail.order.service_id.option === 'Nothing' ? 'No Addon': order_detail.order.service_id.option}
          </Text>
        </View>
      
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Detail Cleaner
        </Text>
        <Text style={{ fontSize: 16 }}>
          Nama Cleaner: {order_detail.cleaner.name?order_detail.cleaner.name:'Kilapartner'}
          {'\n'}
          Tipe Hunian: {(order_detail.order.service_id.name)}
          {'\n'}
          Nomor Telepon Cleaner: {(order_detail.cleaner.phone)}
        </Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Detail Pelanggan
        </Text>
        <Text style={{ fontSize: 16 }}>
          Nama: {(data.name)}
          {'\n'}
          Alamat: {(order_detail.order.address)}
          {'\n'}
          Nomor Telepon: {(data.phone)}
          {'\n'}
          Email: {(data.email)}
        </Text>
      </View>
    </View>
  </View>
  </Animated.View>
  </View>
      </View>
      </View>
    );
  }
  return (
    <View></View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  label: {
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'center',
  },
  profiletopimage: {
    borderRadius: 100,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: hp('-0.8%')
  },
  mainheader:{
    flexDirection: 'row',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
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
  title: {
    fontFamily: 'Ubuntu',
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: wp('26%')
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  label: {
    fontFamily: 'Ubuntum',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  labelchange:{
    fontFamily: 'Ubuntu',
    fontSize: 11,
    color: '#FFF',
    alignItems: 'flex-start',
  },
  confirmButton: {
    backgroundColor: '#4FC76D',
    height: 51,
    borderRadius: 20,
    alignItems: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: -30
  },
  confirmButton6: {
    backgroundColor: '#4FC76D',
    height: 51,
    borderRadius: 20,
    alignItems: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: hp('2%'),
    width: wp('90%')
  },
  confirmButton4: {
    backgroundColor: '#E70F0F',
    height: 51,
    borderRadius: 20,
    alignItems: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: wp('3%')
  },
  confirmButton2: {
    backgroundColor: '#E7E7E7',
    height: 51,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: hp('2%'),
    width: wp('90%'),
  },
  approveButtonEnabled: {
    backgroundColor: '#4FC76D',
    height: 51,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: hp('2%'),
    marginLeft: wp('2%'),
    width: wp('45%'),
  },
  confirmButtonText: {
    color: '#ffffff',
    fontFamily: 'Ubuntu',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  confirmButtonText2: {
    color: '#000',
    fontFamily: 'Ubuntu',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  approveButtonTextEnabled :{
    color: '#fff',
    fontFamily: 'Ubuntu',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
map: {
    flex: 1,
    marginBottom: '-27%'
  },
  customMarker: {
    width: '20%',
    height:'20%'
  }
});

export default Tracking;