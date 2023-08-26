import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions, ScrollView, BackHandler, SafeAreaView, FlatList } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { BackIcon } from '../../assets';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Gap } from '../../components'
import LottieView from 'lottie-react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { GOOGLE_MAPS_API_KEY } from '../../apiKeys';
import { CheckBox } from 'react-native-elements';
import { TextInput as PaperTextInput } from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import { useSelector } from 'react-redux';
import {ApplicationActions} from '@actions';
import {useDispatch} from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

const Maps = ({navigation, route}) => {
  const userId = useSelector(state => state.auth.login.userId);
  const [myAddress,setMyAddress] = useState();
  const {t} = useTranslation();
  const [addressInput, setAddressInput] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [location, setLocation] = useState(null);
  const dispatch = useDispatch();
  let page;
  if (route && route.params && route.params.page) {
    page = route.params.page;
    console.log("ASU : ",page);
  } else {
    // Set a default value or handle the situation when no route param is passed
    page = 'defaultPage'; // Replace 'defaultPage' with the value you want to use as the default page
    console.log("ASU : ",page);
  }
  // dispatch(ApplicationActions.onclearCodeVoucher());
  // dispatch(ApplicationActions.onclearVoucher());
  // dispatch(ApplicationActions.onClearListVoucher())
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [predictions, setPredictions] = useState([]);
  const [userPinnedLocation, setUserPinnedLocation] = useState(false); // New state variable
  const [fixAddress, setFixAddress] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  

//   console.log("Data userId : ",userId);
const [voucher,setVouchers] = useState([])

useEffect(() => {
  dispatch(ApplicationActions.onclearVoucher())
  dispatch(ApplicationActions.onclearCodeVoucher());
  const fetchVoucherData = async () => {
    try {
      const response = await fetch(`https://customer.kilapin.com/users/${userId}`);
      const data = await response.json();

      // Add an incrementing 'id' property to each voucher object
      const vouchersWithId = data.data.vouchers.map((voucher, index) => ({
        ...voucher,
        id: index + 1, // Adding 1 to avoid 'id' starting from 0 if needed
      }));

      // Filter vouchers based on validity
      const currentDate = new Date();
      const validVouchers = vouchersWithId.filter((voucher) => {
        const validFrom = new Date(voucher.validFrom);
        const validUntil = new Date(voucher.validUntil);
        return currentDate >= validFrom && currentDate <= validUntil;
      });

      // Filter vouchers based on type
      const allVouchers = validVouchers;
      const urgentVouchers = validVouchers.filter((voucher) => voucher.type === 'Urgent' || voucher.type === 'All');
      const bookingVouchers = validVouchers.filter((voucher) => voucher.type === 'Booking' || voucher.type === 'All');

      console.log("VOucher Urgent : ",urgentVouchers);
      // Set the filtered vouchers based on type
      setVouchers(allVouchers); // Show all valid vouchers
      // setVouchers(urgentVouchers); // Show only urgent vouchers
      // setVouchers(bookingVouchers); // Show only booking vouchers
    } catch (error) {
      console.error('Error fetching voucher data:', error);
    }
  };

  fetchVoucherData();
}, []);

const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAV8U-V09T5ymjAbKsWL67xHuTiatlHrus`
    );
    const result = await response.json();

    if (result?.results?.length > 0) {
      const address = result.results[0].formatted_address;
      const selectedData = {
        description: address,
        place_id: '', // You can set a custom place_id if needed
        longitude: longitude,
        latitude: latitude,
        structured_formatting: {
          main_text: address,
          secondary_text: '',
        },
        terms: [
          { offset: 0, value: address },
          // Additional terms if needed
        ],
        types: ['custom'], // You can set custom types if needed
      };
      console.log('selected data address',selectedData)
      return selectedData;
    } else {
      console.log('Error: No address found for the given coordinates.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching address:', error);
    return null;
  }
};

  useEffect(() => {
    (async () => {
      // Request foreground location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      // Get the user's current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });

      let TextAddress = await getAddressFromCoordinates(currentLocation.coords.latitude,currentLocation.coords.longitude)
      setMyAddress(TextAddress.description)
      dispatch(ApplicationActions.onAddLat(currentLocation.coords.latitude));
      dispatch(ApplicationActions.onAddLng(currentLocation.coords.longitude));
    
      console.log('my address',TextAddress)
      console.log('fix address',fixAddress)
    })();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('MainApp');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);
  
  const [destination, setDestination] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    title: 'San Francisco',
  });

  
 
  if (!location) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center', backgroundColor: '#fff', height: hp('105%'),}}>
              <LottieView 
        source={require('../../assets/animation/kilapin.json')}
        autoPlay
        loop
        style={{
            height: hp('20%'),
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginLeft: wp('30%'),
            marginBottom: '15%'
        }}/>
      </View>
    );
  }

  const origin = `${location.latitude},${location.longitude}`;
  const destinationString = `${destination.latitude},${destination.longitude}`;
  const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destinationString}&key=${GOOGLE_MAPS_API_KEY}`;
  
  
  
  
  const handleMarkerDragEnd = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
  
    const selectedData = await getAddressFromCoordinates(latitude, longitude);
    if (selectedData) {
      selectedData.userPicked = true; // Set the userPicked flag to true when the user pins a location
      setUserPinnedLocation(true);
      handlePlaceSelect(selectedData, null);
    }
  
    // Update the region and location based on the new latitude and longitude
    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    setLocation({
      latitude: latitude,
      longitude: longitude,
    });
  };
  
  const handlePlaceSelect = async (data, details) => {
    setPredictions([]); // Clear the predictions when a location is selected
    setAddressInput(data.description);
    setFixAddress(data.description);
    setSelectedAddress(data);
    dispatch(ApplicationActions.onAddAddress(data.description));
    console.log("Data SetSelectedAddress: ", data.description);

    // Use a regular expression to find the 5-digit number in the address (Finding Postal Code)
    const postalCodeRegex = /\b\d{5}\b/;
    const match = data.description.match(postalCodeRegex);

    if (match && match.length > 0) {
        const postalcode = match[0];
        console.log("Postal Code: ", postalcode);
        dispatch(ApplicationActions.onAddPostalCode(postalcode));
    }
    if (data.userPicked) {
      // User picked the location on the map
    //   console.log("Masuk sini!");
      setRegion({
        latitude: data.latitude,
        longitude: data.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
      setLocation({
        latitude: data.latitude,
        longitude: data.longitude,
      });
      console.log("LONG : ",data.longitude);
      console.log("LAT : ",data.latitude);
      dispatch(ApplicationActions.onAddLat(data.latitude));
      dispatch(ApplicationActions.onAddLng(data.longitude));
    } else {
      // User chose the location from the suggestion
      try {
        // Fetch detailed place information using the place_id from the selected data
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAV8U-V09T5ymjAbKsWL67xHuTiatlHrus&place_id=${data.place_id}&fields=geometry,address_components`
        );
        const result = await response.json();
        const { lat, lng } = result?.result?.geometry?.location || {};
  
        if (lat && lng) {
          setRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          });
          setLocation({
            latitude: lat,
            longitude: lng,
          });
          console.log("LONG : ",lng);
          console.log("LAT : ",lat);
          dispatch(ApplicationActions.onAddLat(lat));
          dispatch(ApplicationActions.onAddLng(lng));
        } else {
          console.log("Error: Unable to get latitude and longitude.");
        }
  
        // Extract the postal code from the response
        const addressComponents = result?.result?.address_components || [];
        const postalCodeComponent = addressComponents.find((component) =>
          component.types.includes("postal_code")
        );
        const postalCode = postalCodeComponent?.long_name || "";
        
        console.log("Postal Code: ", postalCode);
        dispatch(ApplicationActions.onAddPostalCode(postalCode));

      } catch (error) {
        console.error("Error fetching place details: ", error);
      }
    }
  };
  

  const handleOrder = () => {
    // Your logic for handling the order
    // For example, you can do some processing before navigating to the next page


    // Navigate to the desired page using navigation.navigate
    if (!fixAddress) {
      console.log('ini dispatch',fixAddress,myAddress)
      dispatch(ApplicationActions.onAddAddress(myAddress));

    }
    if (page && page === 'Ac') {
      navigation.navigate('Airconditioner',{page: 'Maps'}); // Replace 'NextPage' with the name of the screen you want to navigate to
    } else {
      navigation.navigate('Order',{page: 'Maps'}); // Replace 'NextPage' with the name of the screen you want to navigate to
    }
  };

//   const handleConfirmPress = () => {
//     if (!fixAddress) {
//       // Show warning message if fixAddress is empty
//       setShowWarning(true);
//     } else {
//       navigation.navigate('Order');
//       // Continue with your logic for handling the confirm press
//       // ...
//     }
//   };
const searchOptions = {
  componentRestrictions: {country: 'id'}
}
  
  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        style={styles.map}
        region={region}
        provider={PROVIDER_GOOGLE}
        // onRegionChangeComplete={(reg) => setRegion(reg)}
        onPress={handleMarkerDragEnd} // Add onPress handler to allow user pinning
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            pinColor="red"
          />
        )}

        {/* Interactive Marker */}
        {destination && (
          <Marker
            coordinate={destination}
            draggable
            onDragEnd={handleMarkerDragEnd} // Handle drag end event of the marker
          />
        )}
      </MapView>
    
      {/* Floating text field at the bottom */}
      <View style={styles.floatingTextField}>
        <Text style={styles.label}>{t('complete_address')}</Text>
        <Gap height={10} />
        <View
          style={{
            backgroundColor: 'white',
            borderWidth: 1.5,
            borderColor: '#565656',
            borderRadius: 30,
            width: wp('82%'),
            overflow: 'hidden',
            marginLeft: -5, // Adjust the left margin here
          }}
        >
         <GooglePlacesAutocomplete
            placeholder='Find Address'
            onPress={(data, details = null) => handlePlaceSelect(data, details)}
            query={{
              key: 'AIzaSyAV8U-V09T5ymjAbKsWL67xHuTiatlHrus',
              language: 'id',
              components: 'country:id'
            }}
            searchOptions={searchOptions}
            // Set predefined value for the text input based on the selected address
            // This will update the text field with the selected address from the map
            predefinedPlaces={selectedAddress ? [selectedAddress] : []}
          />
        </View>
        <Text style={styles.label2}>Selected Address</Text>
        <Gap height={10} />
        <View
          style={{
            marginTop: 10,
            backgroundColor: 'white',
            borderWidth: 1.5,
            borderColor: '#565656',
            borderRadius: 30,
            width: wp('82%'),
            overflow: 'hidden',
            marginLeft: -5, // Adjust the left margin here
          }}
        >
          <TextInput
            placeholder=""
            style={{ padding: 10 }}
            value={!fixAddress ? myAddress : fixAddress} // Set the value from selectedAddress
            // onChangeText={text => setSelectedAddress(text)}
          />
        </View>
        {/* {showWarning && <Text style={styles.warningText}>Please choose a location or pick a suggestion.</Text>} */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleOrder}>
            <Text style={styles.confirmButtonText}>NEXT</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    // warningText: {
    //     color: 'red',
    //     fontSize: 12,
    //     marginTop: 5,
    //   },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'center',
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
  title: {
    fontFamily: 'Ubuntu',
    fontSize: 24,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: wp('25%')
  },
  label: {
    fontFamily: 'Ubuntum',
    fontSize: 15,
    marginTop: 16,
    marginBottom: 2,
  },
  confirmButton: {
    backgroundColor: '#DA7DE1',
    height: 51,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    // width: wp('44%')
  },
  pricetotal: {
    backgroundColor: '#DA7DE1',
    height: 51,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: wp('44%')
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
    marginBottom: hp('-11.5%')
  },
  inputview: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  inputtext: {
    borderWidth: 1.5,
    borderColor: '#565656',
    height: 41,
    borderRadius:30,
    width: wp('92%'),
    padding: 15,
    fontFamily: 'Ubuntur',
    fontSize: 12
  },
  inputtext2: {
    borderWidth: 1.5,
    borderColor: '#565656',
    height: 41,
    borderRadius:30,
    width: wp('92%'),
    fontFamily: 'Ubuntur',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontSize: 12,
    marginTop: '4%',
    paddingLeft: '3%',
  },
  inputtext3: {
    borderWidth: 1.5,
    borderColor: '#565656',
    height: 41,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 22,
    borderBottomLeftRadius: 21,
    borderBottomRightRadius:22,
    width: wp('92%'),
    fontFamily: 'Ubuntur',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontSize: 12,
    marginLeft: '-0.5%',
    marginTop: '-0.5%'
  },
  predictionsList: {
    position: 'absolute',
    top: 70,
    left: 20,
    right: 20,
    zIndex: 999,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: '#565656',
    borderRadius: 30,
    maxHeight: 200,
  },
  floatingTextField: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  label2: {
    fontWeight: 'bold',
    fontFamily: 'Ubuntum',
    fontSize: 16,
    marginTop: 16,
    marginBottom: -10,
  },
});

export default Maps;