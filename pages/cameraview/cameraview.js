import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, StyleSheet, TouchableOpacity, BackHandler } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MailComposer from 'expo-mail-composer';

export default function CameraView({navigation}) {

  const handleBackButton = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
  
    return () => backHandler.remove();
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const sendEmail = () => {
    if (!selectedImage) {
      Alert.alert('Tidak Ada Foto', 'Mohon Ambil Foto Terlebih Dahulu!');
      return;
    }

    MailComposer.composeAsync({
      recipients: ['valerikevin10@gmail.com'],
      subject: 'Cleaner Photo',
      body: 'Cleaner Photo Kilapin Apps',
      attachments: [selectedImage],
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#DA7DE1', width: '100%' }}>
       <Text style={{fontFamily: 'Ubuntu', color: '#fff', paddingVertical: '5.5%', paddingHorizontal: '25%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontFamily: 'Ubuntu', fontSize: 32, width: '100%'}}>Foto Cleaner</Text>
      <View style={{backgroundColor: '#fff', padding: '15%', borderRadius: 30, justifyContent: 'center',}}>
      {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, marginBottom: 20, borderRadius: 20 }} />}
      <TouchableOpacity onPress={takePhoto} style={styles.button}>
        <Text style={{fontFamily: 'Ubuntu', color: '#fff', paddingVertical: '5.5%', paddingHorizontal: '25%', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>Ambil Foto</Text>
      </TouchableOpacity>
      <View style={{paddingVertical: '2%'}}></View>
      <TouchableOpacity onPress={sendEmail} style={styles.button2}>
      <Text style={{fontFamily: 'Ubuntu', color: '#fff', paddingVertical: '5%', paddingHorizontal: '25%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '1%'}}>Kirim</Text>
      </TouchableOpacity>
      <View style={{paddingVertical: '2%'}}></View>
      <TouchableOpacity onPress={handleBackButton} style={styles.button3}>
      <Text style={{fontFamily: 'Ubuntu', color: '#fff', paddingVertical: '5%', paddingHorizontal: '25%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '1%'}}>Back</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7DBDE1',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button2: {
    backgroundColor: '#9DE17D',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button3: {
    backgroundColor: '#F5E552',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});