import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Chat = () => {
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
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const data = [
      {
        "id": 1,
        "name": "Kilapin",
        "username": "kilapin",
        "email": "kilapin@kilapin.com",
        "address": {
          "street": "Jakarta",
          "suite": "Jakarta",
          "city": "Jakarta",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
          "name": "Kilapin",
          "catchPhrase": "Multi-layered client-server neural-net",
          "bs": "harness real-time e-markets"
        }
      },
    ];
  
    setUsers(data);
    setFilteredUsers(data);
  }, []);


  const handlePressUser = user => {
    navigation.navigate('Chat', { user });
  };

  const handleSearch = text => {
    const filtered = users.filter(user => {
      const name = user.name.toLowerCase();
      const searchText = text.toLowerCase();
      return name.includes(searchText);
    });
    setFilteredUsers(filtered);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Chats')}
    >
      <Image
        style={styles.avatar}
        source={require('../../assets/image/kilapinklogo.png')}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastMessage}>
          See last message from {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <Text style={styles.inboxHeader}>Inbox</Text>
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  topcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  inboxHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: hp('2%'),
  },
  topchatsearch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    padding: 5,
    width: wp('90%')
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontFamily: 'Ubuntur',
  },
  item: {
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.8,
    borderBottomColor: '#EBEBEB',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Ubuntu'
  },
  lastMessage: {
    color: '#666',
    fontFamily: 'Ubuntur'
  },
});

export default Chat;
