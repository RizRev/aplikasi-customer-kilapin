import React, { useState,useEffect } from 'react';
import { SafeAreaView,View,BackHandler, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from 'react-native-modal';

const SelectCity = ({ navigation }) => {
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
    const [searchQuery, setSearchQuery] = useState('');
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const cities = [
      { name: 'Jakarta', image: require('../../assets/image/Jakarta.png') },
      { name: 'Palembang', image: require('../../assets/image/Palembang.png') },
      { name: 'Bali', image: require('../../assets/image/Bali.png') },
      { name: 'Makassar', image: require('../../assets/image/Makassar.png') },
      { name: 'Surabaya', image: require('../../assets/image/Surabaya.png') },
      { name: 'Bandung', image: require('../../assets/image/Bandung.png') },
    ];
  
    const filterCities = () => {
      if (searchQuery === '') {
        return cities;
      } else {
        return cities.filter(city =>
          city.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      }
    };
  
    const handleCityPress = (cityName) => {
      if (cityName === "Jakarta") {
        navigation.navigate('Home');
      } else {
        setIsAlertVisible(true);
      }
    }
  
    const closeAlert = () => {
      setIsAlertVisible(false);
    };
    return (
        <SafeAreaView style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff',    height: hp('100%'),marginTop:'4%'
 }}>
            <Text style={styles.mainlokasi}>Pilih Lokasi Kamu</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: '90%', marginBottom: '1%' }}>
                <Text style={{ width: '90%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>Kami menjangkau beberapa kota di seluruh Indonesia untuk memberikan layanan terbaik</Text>
            </View>
            <View height='78%' flexGrow={1} style={{ marginBottom: wp("6%"), }}>
            <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}>
        {filterCities().map(city => (
          <TouchableOpacity key={city.name} onPress={() => handleCityPress(city.name)}>
            <Image source={city.image} style={{ marginVertical: '5%', width: wp('85%'), height: hp('25%'), borderRadius: 20 }} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal isVisible={isAlertVisible} onBackdropPress={closeAlert}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>City Alert</Text>
          <Text style={{textAlign: 'center', fontFamily: 'Ubuntur', fontSize: 15}}>Mohon maaf layanan Kilapin belum tersedia di kota ini</Text>
          <TouchableOpacity style={{backgroundColor: '#DA7DE1', borderRadius: 20, marginHorizontal: '10%', marginTop: '5%'}} onPress={closeAlert}>
            <Text style={{color: '#fff', fontFamily: 'Ubuntum', padding: 7, textAlign: 'center', fontSize: 16}}>Back</Text>
          </TouchableOpacity>
        </View>
      </Modal>
            </View>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
  mainlokasi: {
    fontFamily: 'Ubuntum',
    fontSize: 24,
    marginTop: '5%',
    marginBottom: '1%'
  },
  alertContainer: {
    backgroundColor: '#fff',
    padding: '5%',
    borderRadius: 20,
  },
  alertText: {
    color: '#000',
    fontSize: 20,
    marginBottom: '3%',
    textAlign: 'center',
    fontFamily: 'Ubuntu'
  },
  searchContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: wp('5%'),
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.85,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 0.84,
    elevation: 2
  },
  searchInput: {
    fontSize: 16,
    height: 40,
    flex: 1,
    marginLeft: 10,
  },
  
  searchInput: {
    fontSize: 16,
    height: 40,
  },
});

export default SelectCity
