import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

const PopUpMustLogin = ({ visible, children, onClose }) => {
  const [showModal, setShowModal] = useState(visible);

  const handleOnClose = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <Modal transparent visible={showModal} onRequestClose={handleOnClose}>
      <TouchableOpacity style={{ flex: 1 }} onPress={handleOnClose}>
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: 20,
            borderRadius: 5,
            padding: 20,
          }}
        >
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PopUpMustLogin;