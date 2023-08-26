import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions, ScrollView, BackHandler } from 'react-native';
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

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Order = ({navigation}) => {
  const {t} = useTranslation();
  const [addressInput, setAddressInput] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const dispatch = useDispatch();
    
  const addresses = [
    {id: 111222, value: 'Anandamaya Residences'},
    {id: 111333, value: 'Plaza Senayan Apartment'},
    {id: 111111, value: 'Botanica Apartments'},
    {id: 111223, value: 'District 8 Apartments'},
    {id: 111224, value: 'Pakubuwono View'},
    {id: 111225, value: 'Verde One Apartments'},
    {id: 111226, value: 'The Peak Sudirman'},
    {id: 111227, value: 'Setiabudi Sky Garden'},
    {id: 111228, value: 'Senopati Suites'},
    {id: 111229, value: 'Pakubuwono Residence'},
    {id: 111230, value: 'Oakwood Premier Cozmo'},
    {id: 111231, value: 'Ascott Kuningan'},
    {id: 111232, value: 'Senayan Residence'},
    {id: 111233, value: 'Residence 8 Apartments'},
    {id: 111234, value: 'Four Season Residence'},
    {id: 111235, value: 'The Summit'},
    {id: 111236, value: 'The Capital Residence'},
    {id: 111237, value: 'My Home - Ciputra World 1'},
    {id: 111238, value: 'Casa Domaine'},
    {id: 111239, value: 'Pondok Indah Residences'},
    {id: 111240, value: 'Kempinski Residences'},
    {id: 111241, value: 'SCBD Suites'},
    {id: 111242, value: 'Gandaria Heights'},
    {id: 111243, value: 'Ascott Jakarta (Thamrin)'},
    {id: 111244, value: 'The Mansion at Kemang'},
    {id: 111245, value: '1 Park Avenue (The Hamilton)'},
    {id: 111246, value: 'Senayan City Residence'},
    {id: 111247, value: 'Kemang Village Residences'},
    {id: 111248, value: 'Taman Anggrek Residences'},
    {id: 111249, value: 'Four Winds Senayan'},
    {id: 111250, value: 'Setiabudi Residences'},
    {id: 111251, value: 'Kusuma Candra Apartments'},
    {id: 111252, value: 'Ra Residence Simatupang'},
    {id: 111253, value: 'Denpasar Residence Kuningan'},
    {id: 111254, value: 'Central Park Residences'},
    {id: 111255, value: 'Pearl Garden Resort Apartment'},
    {id: 111256, value: 'Essence Dharmawangsa'},
    {id: 111257, value: 'Apartemen Permata Hijau'},
    {id: 111258, value: 'Apartments Ambassador 2'},
    {id: 111259, value: 'Menteng Eksekutif'},
    {id: 111260, value: 'Royal Mediterania Garden Residences'},
    {id: 111261, value: 'The Windsor Apartments'},
    {id: 111262, value: 'Fraser Residence'},
    {id: 111263, value: 'Ciputra World 2 Residences'},
    {id: 111264, value: 'Pavilion Apartments'},
    {id: 111265, value: 'LAvenue Pancoran'},
    {id: 111266, value: 'Sudirman Suites'},
    {id: 111267, value: 'Batavia Apartments'},
    {id: 111268, value: 'Kedoya Elok Apartments'},
    {id: 111269, value: 'Casa Grande Residences'},
    {id: 111270, value: 'Menteng Park'},
    {id: 111271, value: '1Park Residences'},
    {id: 111272, value: '1 @ Cik Ditiro Apartments'},
    {id: 111273, value: 'Seaview Condominium'},
    {id: 111274, value: 'Cik Ditiro Residence'},
    {id: 111275, value: 'Capitol Suites'},
    {id: 111276, value: 'Istana Sahid Apartments'},
    {id: 111277, value: 'St. Moritz Penthouse and Residence'}
  ];
  
  const filteredAddresses = addresses.filter((address) => {
    const searchTerm = addressInput.toLowerCase();
    return (
      address.value.toLowerCase().includes(searchTerm) ||
      address.id.toString().includes(searchTerm)
    );
  });
  
  const handleAddressChange = (address) => {
    setSelectedAddress(address);
    setAddressInput(`${address.id} - ${address.value}`);
  };
  

  const [isOpen, setIsOpen] = useState(false);
  const [isGraniteChecked, setGraniteChecked] = useState(false);
  const [isMarbleChecked, setMarbleChecked] = useState(false)
  const [isInsuranceChecked, setInsuranceChecked] = useState(false);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  const [data, setMemberData] = useState('');
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [voucher, setVoucher] = useState('')
  const [service, setService] = useState('Booking')

  const generateMinuteOptions = () => {
    const options = [];
    for (let hour = 8; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute++) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const amPm = hour < 12 ? 'AM' : 'PM';
        const time = `${formattedHour}:${formattedMinute}`;
        const labelStyle = hour >= 20 || hour < 8 ? { color: '#888', fontSize: 12, textAlign: 'center'} : { color: '#333', fontSize: 12, textAlign: 'center' };
        options.push(
          <Picker.Item key={time} label={`${formattedHour}:${formattedMinute} ${amPm}`} value={time} style={labelStyle} />
        );
      }
    }
    return options;
  };

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        console.log("menjalankan get data user")
        const id = await AsyncStorage.getItem('id')
        const link = `https://customer.kilapin.com/users/${id}`
        const response = await fetch(link);
        const dataMember = await response.json()
        setMemberData(dataMember.data)
        if (response.ok){
          console.log("data diri sudah ready",dataMember)
        }
      } catch (error) {
        console.log(error)
      }  
    }
    fetchMemberData()
  },[])

  const [item_name, setSelectedPackage] = useState('');
  const [time, setSelectedTime] = useState('');
  const [type, setSelectedType] = useState('');

  const handlePackageChange = (itemValue) => {
    setSelectedPackage(itemValue);
  }

  const handleTimeChange = (itemValue) => {
    setSelectedTime(itemValue);
  }

  const handleTypeChange = (itemValue) => {
    setSelectedType(itemValue);
  }
  const [option,setOption] = useState('Nothing')


  const [harga,setHarga] = useState('')
  const [itemId,setItemId] = useState('')
  useEffect(() => {
    // Definisikan fungsi untuk melakukan fetch ke API
    let fetchData = async () => {
      try {
        if (isGraniteChecked&&isMarbleChecked) {
          setOption('Granite and Marmer')
        } else if (isGraniteChecked) {
          setOption('Granite')
        } else if (isMarbleChecked) {
          setOption('Marmer')
        } else {
          setOption('Nothing')
        }
        const response = await fetch('https://customer.kilapin.com/service/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description: item_name,
            option,
          }),
        });

        const data = await response.json();
        // Proses data response sesuai kebutuhan, misalnya:
        const hasil_search = JSON.stringify(data);
        console.log(hasil_search)
        if (isInsuranceChecked) {
          var totalharga = parseInt(data.data[0].price) + 12500;
        } else {
          var totalharga = parseInt(data.data[0].price)+7500
        }      
        // const totalharga = parseInt(harga)+7500
        setItemId(data.data[0]._id)
        console.log('ini total harga',totalharga)
        setHarga(totalharga)
      } catch (error) {
        // Handle error jika ada
        console.error('Error fetching data:', error);
      }
    };

    // Panggil fungsi fetchData setiap kali item_name atau option berubah
    fetchData();
  }, [item_name, option,isGraniteChecked,isMarbleChecked,isInsuranceChecked]); // Tambahkan item_name dan option sebagai dependensi

  const [nilai,setNilai] = useState(0)
  const handleOrder = async () => {
    try {
      console.log(item_name)
      let itemName = item_name;
      // if (isGraniteChecked){
      //   itemName += "-granite"
      //   setOption('Granite')
      // }
      // if (isMarbleChecked){
      //   itemName += "-marble"
      //   setOption('Marmer')
      // }
      var name =  data.name
      var phone = data.phone
      var email = data.email
      var customer_id = await AsyncStorage.getItem('id')
      const splitAddress = addressInput.split(' - ');
      const postal_code = parseInt(splitAddress[0]);
      const address_code = splitAddress[1];
      // console.log("Address Code : ",address_code);
      if(name){
      console.log(option)
      console.log("menjalankan order")
      console.log("data order",{name,phone,email,customer_id,item_name,type,gross_amount,addressInput,postal_code,address_code})
      // var nilai = grossAmount
      
      // const response = await fetch('https://customer.kilapin.com/service/search', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     description:item_name,
      //     option
      //   }),
      // }
      // );

      // const hasil1= await response.json();
      // console.log('lewating fetch', hasil1.data.price)
      const response = await fetch('https://customer.kilapin.com/order/input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id,
          email,
          phone,
          name,
          address: address_code,
          postal_code: postal_code,
          booking_type: service,
          service_id: itemId,
          gross_amount: harga,
          category: 'General Cleaning',
          notes,
          voucher,
          insurance: isInsuranceChecked
        }),
      }
      );

      const data= await response.json();
      console.log('lewating fetch',data.data)
      const data_order_id = await data.data.order_id
      const data_url_order = await data.message


      if (data) {
        dispatch(ApplicationActions.onAddOrder(data.data));
        console.log("sudah oke",data_order_id)
        await AsyncStorage.setItem('order_id', data_order_id.toString())
        await AsyncStorage.setItem('url', data_url_order)
        await AsyncStorage.setItem('gross_amount', harga.toString())
        await AsyncStorage.setItem('address', address_code.toString())
        await AsyncStorage.setItem('service', itemId.toString())
        // console.log("data order", data_order_id)
        navigation.navigate('PaymentGateway');
    } 
    else {
      console.log("belum oke")
    }
      // if (response.status === 200) {
      //   const hasil = await response.json();
      //   console.log('ini hasil',hasil);
      // } else {
      //   console.log('Terjadi kesalahan dalam respons:', response);
      // }

//       const hasil = await response.json();
// if (response.ok) {
//   console.log(hasil);
// } else {
//   const errorMessage = await response.text();
//   console.log('Terjadi kesalahan:', errorMessage);
// }

      // const data_order_id = await data.data.data.order_id
      // const data_url_order = await data.data.transactionRedirectUrl
      // console.log('Response data:', data);

      //   if (data) {
      //     console.log("sudah oke")
      //     await AsyncStorage.setItem('order_id', data_order_id)
      //     await AsyncStorage.setItem('url', data_url_order)
      //     await AsyncStorage.setItem('gross_amount', grossAmount.toString())
      //     await AsyncStorage.setItem('address', address)
      //     await AsyncStorage.setItem('service', service)
      //     console.log("data order", data_order_id)
      //     console.log("data order",data_order_id)
             
      //   navigation.navigate('PaymentGateway');
      // } 
      // else {
      //   console.log("belum oke")
      // }
      } else {
        console.log("belum ada data member")
      }
      
    } catch (error) {
      console.error(error);
    }
  };
 
  var gross_amount = ''
  if (item_name && !isInsuranceChecked && !isGraniteChecked && !isMarbleChecked) {
    if (item_name === 'Apartment Size 15-35m2') {
      gross_amount += '107500';
    } else if (item_name === 'Apartment Size 36-70m2') {
      gross_amount += '157500';
    } else if (item_name === 'Apartment Size 71-135m2') {
      gross_amount += '207500';
    } else if (item_name === 'Apartment Size 136-200m2') {
      gross_amount += '257500';
    } else if (item_name === 'Apartment Size 201-250m2') {
      gross_amount += '307500';
    } else if (item_name === 'Apartment Size 251-300m2') {
      gross_amount += '357500';
    } else if (item_name === 'Apartment Size 301-400m2') {
      gross_amount += '407500';
    } else if (item_name === 'Apartment Size 401-500m2') {
      gross_amount += '457500';
    } else {
      gross_amount += '1007500';
    }
  } else if (item_name && isInsuranceChecked && isGraniteChecked && isMarbleChecked) {
    if (item_name === 'Apartment Size 15-35m2') {
      gross_amount += '130500';
    } else if (item_name === 'Apartment Size 36-70m2') {
      gross_amount += '180500';
    } else if (item_name === 'Apartment Size 71-135m2') {
      gross_amount += '230500';
    } else if (item_name === 'Apartment Size 136-200m2') {
      gross_amount += '280500';
    } else if (item_name === 'Apartment Size 201-250m2') {
      gross_amount += '330500';
    } else if (item_name === 'Apartment Size 251-300m2') {
      gross_amount += '380500';
    } else if (item_name === 'Apartment Size 301-400m2') {
      gross_amount += '430500';
    } else if (item_name === 'Apartment Size 401-500m2') {
      gross_amount += '480500';
    } else {
      gross_amount += '1030500';
    }
  } else if (item_name && isInsuranceChecked && isMarbleChecked) {
    if (item_name === 'Apartment Size 15-35m2') {
      gross_amount += '120500';
    } else if (item_name === 'Apartment Size 36-70m2') {
      gross_amount += '170500';
    } else if (item_name === 'Apartment Size 71-135m2') {
      gross_amount += '220500';
    } else if (item_name === 'Apartment Size 136-200m2') {
      gross_amount += '270500';
    } else if (item_name === 'Apartment Size 201-250m2') {
      gross_amount += '320500';
    } else if (item_name === 'Apartment Size 251-300m2') {
      gross_amount += '370500';
    } else if (item_name === 'Apartment Size 301-400m2') {
      gross_amount += '420500';
    } else if (item_name === 'Apartment Size 401-500m2') {
      gross_amount += '470500';
    } else {
      gross_amount += '1020500';
    }
  } else if (item_name && isInsuranceChecked && isGraniteChecked) {
    if (item_name === 'Apartment Size 15-35m2') {
      gross_amount += '122500';
    } else if (item_name === 'Apartment Size 36-70m2') {
      gross_amount += '172500';
    } else if (item_name === 'Apartment Size 71-135m2') {
      gross_amount += '222500';
    } else if (item_name === 'Apartment Size 136-200m2') {
      gross_amount += '272500';
    } else if (item_name === 'Apartment Size 201-250m2') {
      gross_amount += '322500';
    } else if (item_name === 'Apartment Size 251-300m2') {
      gross_amount += '372500';
    } else if (item_name === 'Apartment Size 301-400m2') {
      gross_amount += '422500';
    } else if (item_name === 'Apartment Size 401-500m2') {
      gross_amount += '472500';
    } else {
      gross_amount += '1022500';
    }
  } else if (item_name && isMarbleChecked && isGraniteChecked) {
    if (item_name === 'Apartment Size 15-35m2') {
      gross_amount += '125500';
    } else if (item_name === 'Apartment Size 36-70m2') {
      gross_amount += '175500';
    } else if (item_name === 'Apartment Size 71-135m2') {
      gross_amount += '225500';
    } else if (item_name === 'Apartment Size 136-200m2') {
      gross_amount += '275500';
    } else if (item_name === 'Apartment Size 201-250m2') {
      gross_amount += '325500';
    } else if (item_name === 'Apartment Size 251-300m2') {
      gross_amount += '375500';
    } else if (item_name === 'Apartment Size 301-400m2') {
      gross_amount += '425500';
    } else if (item_name === 'Apartment Size 401-500m2') {
      gross_amount += '475500';
    } else {
      gross_amount += '1025500';
    }
  } else if (item_name && isInsuranceChecked) {
      if (item_name === 'Apartment Size 15-35m2') {
        gross_amount += '112500';
      } else if (item_name === 'Apartment Size 36-70m2') {
        gross_amount += '162500';
      } else if (item_name === 'Apartment Size 71-135m2') {
        gross_amount += '212500';
      } else if (item_name === 'Apartment Size 136-200m2') {
        gross_amount += '262500';
      } else if (item_name === 'Apartment Size 201-250m2') {
        gross_amount += '312500';
      } else if (item_name === 'Apartment Size 251-300m2') {
        gross_amount += '362500';
      } else if (item_name === 'Apartment Size 301-400m2') {
        gross_amount += '412500';
      } else if (item_name === 'Apartment Size 401-500m2') {
        gross_amount += '462500';
      } else {
        gross_amount += '1012500';
      }
  } else if (item_name && isGraniteChecked) {
    if (item_name === 'Apartment Size 15-35m2') {
      gross_amount += '117500';
    } else if (item_name === 'Apartment Size 36-70m2') {
      gross_amount += '167500';
    } else if (item_name === 'Apartment Size 71-135m2') {
      gross_amount += '217500';
    } else if (item_name === 'Apartment Size 136-200m2') {
      gross_amount += '267500';
    } else if (item_name === 'Apartment Size 201-250m2') {
      gross_amount += '317500';
    } else if (item_name === 'Apartment Size 251-300m2') {
      gross_amount += '367500';
    } else if (item_name === 'Apartment Size 301-400m2') {
      gross_amount += '417500';
    } else if (item_name === 'Apartment Size 401-500m2') {
      gross_amount += '467500';
    } else {
      gross_amount += '1017500';
    }
  } else if (item_name && isMarbleChecked) {
    if (item_name === 'Apartment Size 15-35m2') {
      gross_amount += '115500';
    } else if (item_name === 'Apartment Size 36-70m2') {
      gross_amount += '165500';
    } else if (item_name === 'Apartment Size 71-135m2') {
      gross_amount += '215500';
    } else if (item_name === 'Apartment Size 136-200m2') {
      gross_amount += '265500';
    } else if (item_name === 'Apartment Size 201-250m2') {
      gross_amount += '315500';
    } else if (item_name === 'Apartment Size 251-300m2') {
      gross_amount += '365500';
    } else if (item_name === 'Apartment Size 301-400m2') {
      gross_amount += '415500';
    } else if (item_name === 'Apartment Size 401-500m2') {
      gross_amount += '465500';
    } else {
      gross_amount += '1015500';
    }
  }

  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    title: 'San Francisco',
  });
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  useEffect(() => {
    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access location was denied');
          return;
        }
  
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
  
        setRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
    })();
  }, []);

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

  return (
    <View style={styles.container}>
      <View style={styles.mainheader}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        </View>
        <View style={styles.headertitle}>
        <Text style={styles.title}>Order</Text>
        </View>
      </View>
      <View style={styles.map}>
      <MapView
  style={styles.map}
  region={region}
  provider={PROVIDER_GOOGLE}
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
</MapView>
<View style={styles.map} />
</View>
<View height = '1%' width = '100%' flexGrow = {1} style={{ marginBottom: wp("1%"), backgroundColor: '#fff', paddingBottom: '5%', paddingTop: '-15%', marginTop: '-3%'}}>
      <ScrollView
      showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}>
      <View style={{marginTop: '-4%'}}>
      <Text style={styles.label}>{t('complete_address')}</Text>
            <Gap height={10} />
      <View
    style={{
      backgroundColor: 'white',
      borderWidth: 1.5,
      borderColor: '#565656',
      borderRadius: 30,
      width: wp('92%'),
      overflow: 'hidden',
    }}
  >
  <PaperTextInput
  value={addressInput}
  onChangeText={(text) => {
    setAddressInput(text);
    setSelectedAddress(null);
  }}
  underlineColor="transparent"
  placeholder="Enter your address"
  style={{
    backgroundColor: 'white',
    height: 11,
    borderRadius: 300,
    width: wp('92%'),
    padding: 15,
    fontFamily: 'Ubuntur',
    fontSize: 12,
  }}
/>
{(filteredAddresses.length > 0 && selectedAddress === null && addressInput !== '') && (
  filteredAddresses.map((address) => (
    <TouchableOpacity
      key={address.id}
      style={{
        backgroundColor: 'white',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
      }}
      onPress={() => handleAddressChange(address)}
    >
      <Text>{address.value}</Text>
    </TouchableOpacity>
  ))
)}

  </View>
        <View style={{}}>
          <Text style={{ marginBottom: '3%', fontFamily: 'Ubuntum', fontSize: 15, marginTop: '3%'}}>{t('types_of_residences')}</Text>
          <View style={{ height: hp('6%'), borderWidth: 1.5, borderColor: '#565656', borderRadius: 30, padding: 10, flexDirection: 'row', alignItems: 'center',}}>
        <Picker
          style={{ height: hp('5%'), flex: 1, paddingHorizontal: wp('43.5%') }}
          itemStyle={{ justifyContent: 'flex-start' }}
          selectedValue={type}
          onValueChange={handleTypeChange}
        >
          <Picker.Item label={t('choose_types_of_residences')} value="" style={{ color: '#888', fontSize: 12 }} />
          <Picker.Item label="Apartment" value="apartment" style={{ color: '#333', fontSize: 12 }} />
          <Picker.Item label="Residence" value="residence" style={{ color: '#333', fontSize: 12 }} />
        </Picker>
        </View>
        </View>
        </View>
        <View style={{justifyContent: 'center', marginTop: hp('0.5%')}}>
        <View style={{marginLeft: '1%', marginRight: '1%'}}>
        <Text style={{ marginTop: hp('1%'), fontFamily: 'Ubuntum', fontSize: 15}}>{t('residence_size')}</Text>
        <View style={{ height: hp('6%'), borderWidth: 1.5, borderColor: '#565656', borderRadius: 30, padding: 10, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <Picker
          style={{ height: hp('5%'), flex: 1, paddingVertical: 5, paddingHorizontal: wp('43.5%') }}
          itemStyle={{ justifyContent: 'flex-start' }}
          selectedValue={item_name}
          onValueChange={handlePackageChange}>
          <Picker.Item label={t('choose_residence_size')} value="" style={{ color: '#888', fontSize: 12 }}/>
          <Picker.Item label="Apartment Size 15 - 35m2" value="15 - 35 m2"  style={{ color: '#333', fontSize: 12 }}/>
          <Picker.Item label="Apartment Size 36 - 70m2" value="36 - 70 m2"  style={{ color: '#333', fontSize: 12}}/>
          <Picker.Item label="Apartment Size 71 - 135m2" value="71 - 135 m2"  style={{ color: '#333', fontSize: 12}}/>
          <Picker.Item label="Apartment Size 136 - 200m2" value="136 - 200 m2"  style={{ color: '#333', fontSize: 12}}/>
          <Picker.Item label="Apartment Size 201 - 250m2" value="201 - 250 m2"  style={{ color: '#333', fontSize: 12}}/>
          <Picker.Item label="Apartment Size 251 - 300m2" value="251 - 300 m2"  style={{ color: '#333', fontSize: 12}}/>
          <Picker.Item label="Apartment Size 301 - 400m2" value="301 - 400 m2"  style={{ color: '#333', fontSize: 12}}/>
          <Picker.Item label="Apartment Size 401 - 500m2" value="401 - 500 m2"  style={{ color: '#333', fontSize: 12}}/>
          <Picker.Item label="Apartment Size >500m2" value="Apartment Size >500m2"  style={{ color: '#333', fontSize: 12}}/>
        </Picker>
        </View>
        </View>
        
        </View>
        <View style={[{justifyContent: 'center', alignItems: 'center'}]}>
          <View>
        <Text style={styles.label}>{t('note')}</Text>
        <Gap height={10} />
        <TextInput onChangeText={(text) => setNotes(text)} style={styles.inputtext} placeholder={t('note')} />
        </View>
        <View>
        <Text style={styles.label}>Voucher</Text>
        <Gap height={10} />
        <TextInput onChangeText={(text) => setVoucher(text)} style={styles.inputtext} placeholder={t('available_voucher')} />
        </View>
        </View>
            <View style={{marginTop: '6%', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
          <Text style={{fontFamily: 'Ubuntu', fontSize: 18, marginBottom: '0.1%'}}>Add-ons</Text>
          <View>
      <TouchableOpacity onPress={() => setIsOpen((prevIsOpen) => !prevIsOpen)} style={styles.inputtext2}>
        <Text>{isOpen ? t('close') : t('choose')}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={{ marginTop: '-11.41%', borderWidth: 1.5,  borderTopLeftRadius: 21, borderTopRightRadius: 22, borderBottomLeftRadius: 24, borderBottomRightRadius: 24}}>
      <TouchableOpacity onPress={() => setIsOpen((prevIsOpen) => !prevIsOpen)} style={styles.inputtext3}>
      </TouchableOpacity>
        <View style={{ borderColor: '#565656',  borderTopLeftRadius: 21, borderTopRightRadius: 22, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>                                                                                 
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '-1%'}}>
          <Text style={{fontFamily: 'Ubuntum'}}>Asuransi</Text>
            <View style={{marginHorizontal: '31%'}}></View>
          <View style={{marginRight: '-5.5%'}}>
            <CheckBox checked={isInsuranceChecked}  onPress={() => setInsuranceChecked(!isInsuranceChecked)} />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '-5%'}}>
          <Text style={{fontFamily: 'Ubuntum'}}>Lantai Marble</Text>
            <View style={{marginHorizontal: '26%'}}></View>
          <View style={{marginRight: '-5.4%'}}>
            <CheckBox checked={isMarbleChecked}  onPress={() => setMarbleChecked(!isMarbleChecked)} />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '-5%'}}>
          <Text style={{fontFamily: 'Ubuntum'}}>Lantai Granite</Text>
            <View style={{marginHorizontal: '25.5%'}}></View>
          <View style={{marginRight: '-5.3%'}}>
            <CheckBox checked={isGraniteChecked}  onPress={() => setGraniteChecked(!isGraniteChecked)} />
          </View>
        </View>
        </View>
        </View>
      )}
    </View>
        </View>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 18, marginTop: '7%', marginBottom: '3%'}}>{t('price_summary')}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{alignItems: 'flex-start'}}>
        <Text style={{fontFamily: 'Ubuntum'}}>{t('price_total')}</Text>
        </View>
        <View style={{marginHorizontal: '24.35%'}}></View>
        <Text style={{fontFamily: 'Ubuntum'}}>
        {harga}
        {/* {item_name ? (
              item_name === 'Select Your Place Type' ? '                    -' :
              item_name === 'Apartment Size 15-35m2' ? 'Rp.100.000' :
              item_name === 'Apartment Size 36-70m2' ? 'Rp.150.000' :
              item_name === 'Apartment Size 71-135m2' ? 'Rp.200.000' :
              item_name === 'Apartment Size 136-200m2' ? 'Rp.250.000' :
              item_name === 'Apartment Size 201-250m2' ? 'Rp.300.000' :
              item_name === 'Apartment Size 251-300m2' ? 'Rp.350.000' :
              item_name === 'Apartment Size 301-400m2' ? 'Rp.400.000' :
              item_name === 'Apartment Size 401-500m2' ? 'Rp.450.000' :
              item_name === 'Apartment Size >500m2' ? 'Rp.1.000.000' :
              ''
            ) : ''} */}
        </Text>
        </View>
        <View style={{marginVertical: '1%'}}></View>
        <View style={{flexDirection: 'row'}}>
        <Text style={{fontFamily: 'Ubuntum'}}>Platform Fee</Text>
        <View style={{marginHorizontal: '24.6%'}}></View>
        <Text style={{fontFamily: 'Ubuntum'}}>Rp. 7.500</Text>
        </View>
        {isInsuranceChecked ?        
        <View style={{flexDirection: 'row'}}>
        <Text style={{fontFamily: 'Ubuntum', marginTop: '2%'}}>Asuransi</Text>
        <View style={{marginHorizontal: '28.6%'}}></View>
        <Text style={{fontFamily: 'Ubuntum', marginTop: '2%'}}>Rp. 5.000</Text>
        </View>:<View style={{flexDirection: 'row'}}>
        <Text style={{fontFamily: 'Ubuntum', marginTop: '2%'}}>Asuransi</Text>
        <View style={{marginHorizontal: '36.25%'}}></View>
        <Text style={{fontFamily: 'Ubuntum', marginTop: '2%'}}>-</Text>
        </View>}
        {isMarbleChecked ?        
        <View style={{flexDirection: 'row'}}>
        <Text style={{fontFamily: 'Ubuntum', marginTop: '2%'}}>Add-ons Marble</Text>
        <View style={{marginHorizontal: '22%'}}></View>
        <Text style={{fontFamily: 'Ubuntum', marginTop: '2%'}}>Rp. 8.000</Text>
        </View>:<View style={{flexDirection: 'row'}}>
        </View>}
        {isGraniteChecked ?        
        <View style={{flexDirection: 'row'}}>
        <Text style={{fontFamily: 'Ubuntum', marginTop: '2%'}}>Add-ons Granite</Text>
        <View style={{marginHorizontal: '20.6%'}}></View>
        <Text style={{fontFamily: 'Ubuntum', marginTop: '2%'}}>Rp. 10.000</Text>
        </View>:<View style={{flexDirection: 'row'}}>
        </View>}
        <View style={{marginVertical: '1%'}}></View>
        <View style={{flexDirection: 'row'}}>
        <Text style={{fontFamily: 'Ubuntum'}}>Diskon</Text>
        <View style={{marginHorizontal: '37.85%'}}></View>
        <Text style={{fontFamily: 'Ubuntum'}}>-</Text>
        </View>
        </ScrollView>
        <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.pricetotal}>
          <Text style={{color: '#fff', fontFamily: 'Ubuntu'}}>
            Total:{' '}
            {harga}
            {/* {item_name ? (
              item_name === 'Select Your Place Type' ? (
                '-'
              ) : item_name === 'Apartment Size 15-35m2' ? (
                isInsuranceChecked && isGraniteChecked && isMarbleChecked ? (
                  'Rp.130.500'
                ) : isInsuranceChecked && isGraniteChecked ? (
                  'Rp.122.500'
                ) : isInsuranceChecked && isMarbleChecked ? (
                  'Rp.120.500'
                ) : isGraniteChecked && isMarbleChecked ? (
                  'Rp.125.500'
                ) : isMarbleChecked ? (
                  'Rp.115.000'
                ) : isGraniteChecked ? (
                  'Rp.127.500'
                ) : isInsuranceChecked ? (
                  'Rp.112.500'
                ) : (
                  'Rp.107.500'
                )
              ) : item_name === 'Apartment Size 36-70m2' ? (
                isInsuranceChecked && isGraniteChecked && isMarbleChecked ? (
                  'Rp.180.500'
                ) : isInsuranceChecked && isGraniteChecked ? (
                  'Rp.172.500'
                ) : isInsuranceChecked && isMarbleChecked ? (
                  'Rp.170.500'
                ) : isGraniteChecked && isMarbleChecked ? (
                  'Rp.175.500'
                ) : isMarbleChecked ? (
                  'Rp.165.500'
                ) : isGraniteChecked ? (
                  'Rp.167.500'
                ) : isInsuranceChecked ? (
                  'Rp.162.500'
                ) : (
                  'Rp.157.500'
                )
              ) : item_name === 'Apartment Size 71-135m2' ? (
                isInsuranceChecked && isGraniteChecked && isMarbleChecked ? (
                  'Rp.230.500'
                ) : isInsuranceChecked && isGraniteChecked ? (
                  'Rp.222.500'
                ) : isInsuranceChecked && isMarbleChecked ? (
                  'Rp.220.500'
                ) : isGraniteChecked && isMarbleChecked ? (
                  'Rp.225.500'
                ) : isMarbleChecked ? (
                  'Rp.215.500'
                ) : isGraniteChecked ? (
                  'Rp.217.500'
                ) : isInsuranceChecked ? (
                  'Rp.212.500'
                ) : (
                  'Rp.207.500'
                )
              ) : item_name === 'Apartment Size 136-200m2' ? (
                isInsuranceChecked && isGraniteChecked && isMarbleChecked ? (
                  'Rp.280.500'
                ) : isInsuranceChecked && isGraniteChecked ? (
                  'Rp.272.500'
                ) : isInsuranceChecked && isMarbleChecked ? (
                  'Rp.270.500'
                ) : isGraniteChecked && isMarbleChecked ? (
                  'Rp.275.500'
                ) : isMarbleChecked ? (
                  'Rp.265.500'
                ) : isGraniteChecked ? (
                  'Rp.267.500'
                ) : isInsuranceChecked ? (
                  'Rp.262.500'
                ) : (
                  'Rp.257.500'
                )
              ) : item_name === 'Apartment Size 201-250m2' ? (
                isInsuranceChecked && isGraniteChecked && isMarbleChecked ? (
                  'Rp.330.500'
                ) : isInsuranceChecked && isGraniteChecked ? (
                  'Rp.322.500'
                ) : isInsuranceChecked && isMarbleChecked ? (
                  'Rp.320.500'
                ) : isGraniteChecked && isMarbleChecked ? (
                  'Rp.325.500'
                ) : isMarbleChecked ? (
                  'Rp.315.500'
                ) : isGraniteChecked ? (
                  'Rp.317.500'
                ) : isInsuranceChecked ? (
                  'Rp.312.500'
                ) : (
                  'Rp.307.500'
                )
              ) : item_name === 'Apartment Size 251-300m2' ? (
                isInsuranceChecked && isGraniteChecked && isMarbleChecked ? (
                  'Rp.380.500'
                ) : isInsuranceChecked && isGraniteChecked ? (
                  'Rp.372.500'
                ) : isInsuranceChecked && isMarbleChecked ? (
                  'Rp.370.500'
                ) : isGraniteChecked && isMarbleChecked ? (
                  'Rp.375.500'
                ) : isMarbleChecked ? (
                  'Rp.365.500'
                ) : isGraniteChecked ? (
                  'Rp.367.500'
                ) : isInsuranceChecked ? (
                  'Rp.362.500'
                ) : (
                  'Rp.357.500'
                )
              ) : item_name === 'Apartment Size 301-400m2' ? (
                isInsuranceChecked && isGraniteChecked && isMarbleChecked ? (
                  'Rp.430.500'
                ) : isInsuranceChecked && isGraniteChecked ? (
                  'Rp.422.500'
                ) : isInsuranceChecked && isMarbleChecked ? (
                  'Rp.420.500'
                ) : isGraniteChecked && isMarbleChecked ? (
                  'Rp.425.500'
                ) : isMarbleChecked ? (
                  'Rp.415.500'
                ) : isGraniteChecked ? (
                  'Rp.417.500'
                ) : isInsuranceChecked ? (
                  'Rp.412.500'
                ) : (
                  'Rp.407.500'
                )
              ) : item_name === 'Apartment Size 401-500m2' ? (
                isInsuranceChecked && isGraniteChecked && isMarbleChecked ? (
                  'Rp.480.500'
                ) : isInsuranceChecked && isGraniteChecked ? (
                  'Rp.472.500'
                ) : isInsuranceChecked && isMarbleChecked ? (
                  'Rp.470.500'
                ) : isGraniteChecked && isMarbleChecked ? (
                  'Rp.475.500'
                ) : isMarbleChecked ? (
                  'Rp.465.500'
                ) : isGraniteChecked ? (
                  'Rp.467.500'
                ) : isInsuranceChecked ? (
                  'Rp.462.500'
                ) : (
                  'Rp.457.500'
                )
              ) : item_name === 'Apartment Size >500m2' ? (
                isInsuranceChecked && isGraniteChecked && isMarbleChecked ? (
                  'Rp.1.030.500'
                ) : isInsuranceChecked && isGraniteChecked ? (
                  'Rp.1.022.500'
                ) : isInsuranceChecked && isMarbleChecked ? (
                  'Rp.1.020.500'
                ) : isGraniteChecked && isMarbleChecked ? (
                  'Rp.1.025.500'
                ) : isMarbleChecked ? (
                  'Rp.1.015.500'
                ) : isGraniteChecked ? (
                  'Rp.1.017.500'
                ) : isInsuranceChecked ? (
                  'Rp.1.012.500'
                ) : (
                  'Rp.1.007.500'
                )
              ) : (
                ''
              )
            ) : (
              ''
            )} */}
          </Text>
        </View>
        <View style={{marginHorizontal: wp('1.5%')}}></View>
        <TouchableOpacity style={styles.confirmButton} onPress={handleOrder}>
          <Text style={styles.confirmButtonText}>CONFIRM</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: wp('44%')
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
});

export default Order;