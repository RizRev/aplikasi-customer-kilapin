import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions, ScrollView, Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Modal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ApplicationActions } from '@actions';
import { BaseSetting } from '../../config/setting';
import * as Utils from '@utils';
import i18n from 'i18next';

const LanguageSelection = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState(BaseSetting.languageSupport);
  const [languageSelected, setLanguageSelected] = useState(i18n.language);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const cities = [
    { name: 'id', image: require('../../assets/image/Indonesia.png') },
    { name: 'en', image: require('../../assets/image/English.png') },
  ];

  const onChange = select => {
    setLanguageSelected(select);
  };

  const saveLanguage = () => {
    if (!loading) {
      setLoading(true);
      const oldLanguage = i18n.language;
      dispatch(ApplicationActions.onChangeLanguage(languageSelected));
      i18n.changeLanguage(languageSelected);
      setTimeout(() => {
        Utils.reloadLocale(oldLanguage, languageSelected);
        navigation.navigate('MainApp');
      }, 500);
    }
  };
  
  const filterLanguage = text => {
    setCountry(text);
    if (text) {
      setLanguage(
        language.filter(item => Utils.languageFromCode(item).includes(text)),
      );
    } else {
      setLanguage(BaseSetting.languageSupport);
    }
  };

  const filterCities = () => {
    if (searchQuery === '') {
      return cities;
    } else {
      return cities.filter(city =>
        city.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
  };

  const closeAlert = () => {
    setIsAlertVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainLokasi1}>Chose Your Language</Text>

      <ScrollView
        style={styles.cardContainer}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        {filterCities().map(city => (
          <TouchableOpacity key={city.name} onPress={() => onChange(city.name)}>
            <View style={[styles.setText,languageSelected === city.name && styles.selectText]}>
              <Text style={styles.mainLokasi}>{city.name === 'id' ? 'Bahasa Indonesia' : 'English'}</Text>
            </View>
            {/* <Image
              source={city.image}
              style={[
                styles.cardImage,
                languageSelected === city.name && styles.selectedCardImage,
              ]}
            /> */}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={saveLanguage}>
        <Text style={styles.saveButtonText}>{t('save')}</Text>
      </TouchableOpacity>

      <Modal isVisible={isAlertVisible} onBackdropPress={closeAlert}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>{t('language_alert')}</Text>
          <Text style={styles.alertDescription}>{t('language_not_available')}</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>{t('back')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  mainLokasi1: {
    // marginLeft: wp('5%'),
    fontFamily: 'Ubuntum',
    fontSize: 24,
    marginTop: hp('8%'),
    marginBottom: hp('1%'),
  },
  mainLokasi: {
    marginLeft: wp('5%'),
    fontFamily: 'Ubuntum',
    fontSize: 24,
    marginTop: hp('8%'),
    marginBottom: hp('1%'),
  },
  cardContainer: {
    flex: 1,
    marginBottom: hp('6%'),
  },
  cardImage: {
    marginVertical: hp('5%'),
    width: wp('85%'),
    height: hp('25%'),
    borderRadius: 20,
  },
  selectedCardImage: {
    borderWidth: 2,
    borderColor: '#DA7DE1',
  },
  saveButton: {
    backgroundColor: '#DA7DE1',
    borderRadius: 20,
    paddingHorizontal: wp('5%'),
    paddingVertical: 10,
    marginVertical: hp('6%'),
    width: wp('85%'),
    alignSelf: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Ubuntum',
  },
  alertContainer: {
    backgroundColor: '#fff',
    padding: wp('5%'),
    borderRadius: 20,
  },
  alertText: {
    color: '#000',
    fontSize: 20,
    marginBottom: hp('3%'),
    textAlign: 'center',
    fontFamily: 'Ubuntu',
  },
  alertDescription: {
    textAlign: 'center',
    fontFamily: 'Ubuntur',
    fontSize: 15,
  },
  backButton: {
    backgroundColor: '#DA7DE1',
    borderRadius: 20,
    marginHorizontal: wp('10%'),
    marginTop: hp('5%'),
  },
  backButtonText: {
    color: '#fff',
    fontFamily: 'Ubuntum',
    padding: 7,
    textAlign: 'center',
    fontSize: 16,
  },
  setText: {
    // marginBottom: hp('5%'),
    width: wp('85%'),
    height: hp('15%'),
    // borderTopWidth: 2,
    // borderBottomWidth:2
  },
  selectText:{
    // backgroundColor: '#d6b4d9',
    borderBottomWidth:2
  }
});

export default LanguageSelection;
