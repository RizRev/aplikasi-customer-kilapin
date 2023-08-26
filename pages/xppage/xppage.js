import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { KLogo } from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackIcon3 } from '../../assets';

const XPPage = ({navigation}) => {

  const [point, setPoint] = useState(0);

useEffect(() => {
  AsyncStorage.getItem('id')
    .then(id => {
      if (id) {
        fetch(`https://customer.kilapin.com/users/${id}`)
          .then(response => response.json())
          .then(data => {
            if (data.success && data.data && data.data.length > 0) {
              const receivedPoint = parseInt(data.data.point, 10);
              if (!isNaN(receivedPoint)) {
                setPoint(receivedPoint);
              }
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
    })
    .catch(error => {
      console.error('Error retrieving id from AsyncStorage:', error);
    });
}, []);

  let buttonText;
  if (point >= 0 && point <= 150) {
    buttonText = 'Si Bersih';
  } else if (point > 150 && point <= 750) {
    buttonText = 'Si Suci';
  } 
    else if (point > 750 && point <=200){
      buttonText = 'Si Perfect'
    }
  else if (point > 2000) {
    buttonText = 'Si Paranoid';
  }

  const progress = (point / 5000) * 100;
  
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', backgroundColor: '#DA7DE1', marginBottom: '1%', borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <BackIcon3 style={{marginRight: '80%', marginTop: '7%', marginBottom: '-15%'}} onPress={() => navigation.navigate('Profile')}/>
      </TouchableOpacity>
        <KLogo style={{marginBottom: '7%', marginTop: '20%'}}/>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 34, letterSpacing: 0.1, color: '#fff'}}>{buttonText}</Text>
        <Text style={{fontFamily: 'Ubuntum', fontSize: 20, letterSpacing: 0.1, color: '#fff', marginBottom: '5%'}}>You have {`${point}`} XP</Text>
        <View style={{backgroundColor: '#fff', paddingHorizontal: '5%', paddingVertical: '7%', marginBottom: '9%', borderRadius: 20, justifyContent: 'space-between'}}>
          <View style={styles.progressBar}>
            <View style={[styles.progressIndicator, { width: `${progress}%` }]} />
            <View style={[styles.indicatorPoint, { left: `${progress}%` }]} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '2%', marginBottom: '-3%'}}>
            <Text style={{justifyContent: 'flex-start', alignItems: 'flex-start', fontFamily: 'Ubuntum', color: '#5D64E6'}}>0 XP</Text>
            <Text style={{justifyContent: 'flex-end', alignItems: 'flex-end', fontFamily: 'Ubuntum', color: '#5D64E6'}}>5000 XP</Text>
          </View>
        </View>
      </View>
      <ScrollView>
      <View style={{backgroundColor: '#fff', flex: 1, paddingBottom: "5%"}}>
        <View style={{borderWidth: 1, borderRadius: 30, backgroundColor: '#fff', padding: '5%', marginHorizontal: '5%', borderColor: '#7B7B7B', marginTop: '6%'}}>
          <Text style={{fontFamily: 'Ubuntum', font: 16, marginBottom: '2%'}}>Si Bersih</Text>
          <Text style={{fontFamily: 'Ubuntur'}}>If you have reached 150 points, you can get a 5% service discount every time you order this service.</Text>
        </View>
        <View style={{borderWidth: 1, borderRadius: 30, backgroundColor: '#fff', padding: '5%', marginHorizontal: '5%', borderColor: '#7B7B7B', marginTop: '6%'}}>
          <Text style={{fontFamily: 'Ubuntum', font: 16, marginBottom: '2%'}}>Si Suci</Text>
          <Text style={{fontFamily: 'Ubuntur'}}>If you have reached 750 points, you can get a 5% service discount every time you order this service, Also IDR 10.000 add-ons service voucher discount for three times using the service</Text>
        </View>
        <View style={{borderWidth: 1, borderRadius: 30, backgroundColor: '#fff', padding: '5%', marginHorizontal: '5%', borderColor: '#7B7B7B', marginTop: '6%'}}>
          <Text style={{fontFamily: 'Ubuntum', font: 16, marginBottom: '2%'}}>Si Perfect</Text>
          <Text style={{fontFamily: 'Ubuntur'}}>If you have reached 2000 points, you can get a 6% service discount every time you order this service. Also IDR 20.000 add-ons service voucher discount for three times using the service.</Text>
        </View>
        <View style={{borderWidth: 1, borderRadius: 30, backgroundColor: '#fff', padding: '5%', marginHorizontal: '5%', borderColor: '#7B7B7B', marginTop: '6%'}}>
          <Text style={{fontFamily: 'Ubuntum', font: 16, marginBottom: '2%'}}>Si Paranoid</Text>
          <Text style={{fontFamily: 'Ubuntur'}}>If you have reached 5000 points, you can get a 5% service discount every time you order this service (only once service for one bedroom) and a 6% Kilapin service discount every time you order this service.</Text>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  progressBar: {
    width: Dimensions.get('window').width - 100,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#8B8B8B',
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: '#ADADAD',
    borderRadius: 10,
  },
  indicatorPoint: {
    position: 'absolute',
    top: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ff5f5f',
    borderWidth: 2,
    borderColor: '#fff',
    transform: [{ translateX: -10 }],
  },
});

export default XPPage;
