import React, {useState,useEffect} from 'react';
import { BackHandler, View, Text, TouchableOpacity, StyleSheet,Modal,ScrollView, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import {ApplicationActions} from '@actions';
import {useDispatch} from 'react-redux';
import { AuthActions } from '../../actions';
import * as actionTypes from '../../actions/actionTypes';




const ManageAccount = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      // Check if the current screen is Profile, if yes, navigate to Home and return true to prevent the default back action.
      if (navigation.isFocused()) {
        navigation.navigate('MainApp',{screen:'Profile'});
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const minutes = Array.from({ length: 60 }, (_, index) => index); // Generate an array of 0 to 59

  const handleMinuteSelection = (minute) => {
    setSelectedMinute(minute);
    setModalVisible(false);
  };
  const dispatch = useDispatch();
  const loginFailed = () => {
    return {
      type: actionTypes.LOGIN_ERROR,
    };
  };

  const handleLogout = async () => {
    try {
      // dispatch(AuthActions.authentication(false))
      dispatch(loginFailed()); // Dispatch login failed action
      dispatch(ApplicationActions.onclearProfile());
      // AsyncStorage.setItem('loggedIn', 'false');
      navigation.replace('MainApp');
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Kelola Akun</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText} onPress={handleLogout}>Log Out</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Open Modal</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={{alignContent:'center',justifyContent:'center',alignSelf:'center'}}
        >
        <View style={{backgroundColor:'red',width:'80%',height:'80%'}}>
        <TouchableOpacity 
        onPress={() => setModalVisible(false)}        
        style={{width:'20%',height:'20%',backgroundColor:'green'}}>
        </TouchableOpacity>
        </View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontFamily: 'Ubuntu',
    marginBottom: '5%',
    marginTop: '10%',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#5865F2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: '5%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scrollViewContent: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: '80%',
    maxHeight: '80%',
  },
  minuteItem: {
    padding: 10,
  },
  selectedMinuteItem: {
    backgroundColor: 'gray',
  },
  minuteText: {
    fontSize: 18,
  },
  selectedMinuteText: {
    color: '#fff',
  },
});

export default ManageAccount;