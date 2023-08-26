import React from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';

const VoucherListModal = ({ visible, vouchers, selectedVoucher, onClose, onSelectVoucher }) => {
  return (
    <Modal visible={visible} transparent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <FlatList
            data={vouchers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}
                onPress={() => onSelectVoucher(item)}
              >
                <Text>{item.name}</Text>
                <View style={{ flex: 1 }} />
                {item.id === selectedVoucher?.id && <Text>✓</Text>}
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-end', marginTop: 10 }}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default VoucherListModal;
