import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';

const ContactUs = ({navigation}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image source={require('../../assets/image/KilapinIcon.png')} style={{marginLeft: '-2%', marginTop: '-6%', marginRight: '-3%', width: 95, height: 95, justifyContent: 'center', alignItems: 'center'}} />
            <View>
      <Text style={styles.header}>Contact Us</Text>
      <Text style={{marginBottom: '10%', marginTop: '2%', fontFamily: 'Ubuntur', fontSize: 16}}>Kilapin App</Text>
      </View>
      </View>
      <View style={{marginBottom: '8%', paddingVertical: 0.5, paddingHorizontal: '10%', backgroundColor: '#696969', justifyContent: 'center', alignItems: 'center'}}></View>
      <ScrollView>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '5%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>{t('contactus')}</Text>
      <Text style={styles.text}>
      help@kilapin.com 
      </Text>
      </ScrollView>
        <TouchableOpacity
      onPress={() => navigation.navigate('MainApp')}
      style={{
        backgroundColor: '#DA7DE1',
        borderRadius: 200,
        marginBottom: '3%',
        paddingHorizontal: 50,
        paddingVertical: '5%',
        fontFamily: 'Ubuntu',

      }}
      activeOpacity={0.6}>
      <Text style={{ color: '#fff', fontFamily: 'Ubuntu', textAlign: 'center', fontSize: 18 }}>HOME</Text>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    header: {
      fontSize: 22,
      fontWeight: 'bold'
    },
    text: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 5,
    },
  });  

export default ContactUs