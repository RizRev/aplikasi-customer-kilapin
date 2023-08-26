import React, { useState, useLayoutEffect, useCallback, useEffect } from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { GiftedChat, Avatar } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { database } from '../../config/firebase';

const Chatscreen = ({ navigation,route }) => {
  const [count, setCount] = useState(0);
  // const [order_id, setOrder_id] = useState('');
  const [user_id, setUserId] = useState('');
  // const [name, setName] = useState('');
  // const [phone, setPhone] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const {order_id,name,phone,id} = route.params
  // useEffect(() => {
  //   const fetchAsyncStorageData = async () => {
  //     // const orderChat = await AsyncStorage.getItem('order');
  //     // const userName = await AsyncStorage.getItem('name');
  //     // const userId = await AsyncStorage.getItem('id');
  //     // const userPhone = await AsyncStorage.getItem('phone');

  //     // setOrder_id(orderChat);
  //     // setName(userName);
  //     // setUserId(userId);
  //     // setPhone(userPhone);
  //   };
    
  //   fetchAsyncStorageData();
  // }, []);
  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'me' }]);
      setNewMessage('');
    }
  };

    useLayoutEffect(() => {
      const collectionRef = collection(database, `kilapin-${order_id}`);
      const q = query(collectionRef, orderBy('createdAt', 'desc'));
  
      console.log(collectionRef);
  
      const unsubscribe = onSnapshot(q, querySnapshot => {
        console.log('querySnapshot unsusbscribe');
        setMessages(
          querySnapshot.docs.map(doc => ({
            order_id: doc.data().order_id,
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            user: doc.data().user,
            text: doc.data().text
          }))
        );
        const receivedMessages = querySnapshot.docs.map(doc => ({
          order_id: doc.data().order_id,
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          user: doc.data().user,
          text: doc.data().text
        }));
    
        // Filter out messages sent by the current user
        const ini = receivedMessages.filter(
          message => message.user.name !== name // Assuming `id` is the current user's _id
        );
        console.log("ini itu",ini)
      });
      return unsubscribe;
    }, [order_id,count]);

    const reloadUseLayoutEffect = () => {
      setTimeout(() => {
        setCount(count + 1);
      }, 1000);
    };
    useLayoutEffect(() => {
      reloadUseLayoutEffect();
    }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    const { _id, createdAt, text, user } = messages[0];    
    if (order_id) {
      addDoc(collection(database, `kilapin-${order_id}`), {
        order_id,
        _id,
        createdAt,
        text,
        user
      });
    }
  }, [order_id, database]);

  const renderAvatar = () => {
    if (userAvatar) {
      return <Avatar source={{ uri: userAvatar }} />;
    } else {
      return <Avatar />;
    }
  };
  console.log(name,order_id,id)

  return (
    <GiftedChat
    messages={messages}
    showAvatarForEveryMessage={false}
    showUserAvatar={false}
    onSend={onSend}
    messagesContainerStyle={{
    backgroundColor: '#fff'
    }}
    user={{
      _id:id,
      order_id:order_id,
      phone:phone,
      name:name
    }}
    />
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
},
header: {
  marginBottom: '-11%',
  paddingHorizontal: '5%',
  paddingVertical: '8%',
  backgroundColor: '#fff',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
  },
});

export default Chatscreen;
