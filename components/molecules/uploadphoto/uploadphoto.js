import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const uploadphoto = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChoosePhoto = () => {
    const options = {
      title: 'Select Photo',
      mediaType: 'photo',
      quality: 0.5,
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.uri) {
        setSelectedImage(response);
      }
    });
  };

  const handleUploadPhoto = () => {
    const formData = new FormData();
    formData.append('photo', {
      uri: selectedImage.uri,
      type: selectedImage.type,
      name: selectedImage.fileName,
    });
    fetch('https://example.com/upload-photo', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      {selectedImage && (
        <Image source={{ uri: selectedImage.uri }} style={{ width: 300, height: 300 }} />
      )}
      <Button title="Upload Photo" onPress={handleChoosePhoto} />
      {selectedImage && <Button title="Upload Photo" onPress={handleUploadPhoto} />}
    </View>
  );
};

export default uploadphoto;