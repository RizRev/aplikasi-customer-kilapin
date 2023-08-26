import React, { useState,useEffect } from 'react';
import { BackHandler,View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { BackIcon } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const data = [
    {
        sender:'kilapin',
        text:'Saat ini belum ada promosi untuk kamu, akan saya kabari anda secepatnya jika ada '
    }
]

const Chats = () => {
  const [messages, setMessages] = useState(data);
  const [newMessage, setNewMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      // Check if the current screen is Profile, if yes, navigate to Home and return true to prevent the default back action.
      if (navigation.isFocused()) {
        navigation.navigate('MainApp',{screen: 'Chat'});
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
    
  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'me' }]);
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <View style={{flexDirection: 'row', marginTop:hp('5%'), alignItems: 'center',}}>
      <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <BackIcon style={{ width: 25, height: 25, resizeMode: 'contain', marginLeft: wp('5%') }} />
        </TouchableOpacity>
        <Image source={require('../../assets/image/kilapinklogo.png')} style={{ marginLeft: wp('5%'), width: 40, height: 40, borderRadius: 20, marginHorizontal: 10 }} />
        <View>
        <Text style={styles.contactName}>Kilapin</Text>
        <Text style={styles.contactDetails}>Last seen: Today</Text>
        </View>
        </View>
      </View>
      <View style={styles.messageContainer}>
        {messages.map((message, index) => (
          <View key={index} style={message.sender === 'me' ? styles.sentMessage : styles.receivedMessage}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity disabled style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  contactName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  contactDetails: {
    fontSize: 14,
    color: '#888',
  },
  messageContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sentMessage: {
    backgroundColor: '#e2ffc7',
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: '70%',
  },
  receivedMessage: {
    backgroundColor: '#e2ffc7',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f1f0f0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#97aade',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  sendButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Chats;

