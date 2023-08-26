import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  BackHandler,
  TouchableOpacity
} from "react-native";
import React, { useEffect,useState } from "react";
import { Gap } from "../../components";
import {
  ProfileIcon,
  TimeIcon,
  DateIcon,
  LocationIcon,
  ProfileIconGreen,
  DateIconGreen,
  LocationIconGreen,
  TimeIconGreen, 
} from "../../assets";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LottieView from 'lottie-react-native'
import { useSelector } from 'react-redux';

const Task = ({ navigation }) => {
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
  const userId = useSelector(state => state.auth.login.userId);
  const [count, setCount] = useState(0);
  const [sortHistoryOtherDone, setSortHistoryOtherDone] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
        if (userId) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false)
      }
    } catch (error) {
      console.log('Error reading login status from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const link = `https://customer.kilapin.com/order/on-going/${userId}`;
        const response = await fetch(link);
        const data = await response.json();
        const orderHistory = data.data;
        console.log('order history',JSON.stringify(orderHistory))
        if (userId) {
          setSortHistoryOtherDone(orderHistory)
        } else {
          console.log('tidak ada order history')
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchOrderStatus();
    const intervalId = setInterval(() => {
      setCount(count => count + 1);
    }, 3000);
  
    return () => clearInterval(intervalId);
  }, [count]);
  function splitDate(dateString) {
    const firstDashIndex = dateString.indexOf(' ');
    const secondDashIndex = dateString.indexOf('-', firstDashIndex + 3);
  
    const datePart = dateString.slice(0, firstDashIndex);
  
    return datePart;
  }
  
  function splitTime(dateTimeString) {
    const firstDashIndex = dateTimeString.indexOf(' ');
    const secondDashIndex = dateTimeString.indexOf(' ', firstDashIndex);
  
    const timePart = dateTimeString.slice(secondDashIndex + 1);
  
    return timePart;
  }

 if (loggedIn) {
  return (
    <View style={styles.allcontainer}>
      <View style={styles.container}>
        <Text style={styles.order}>Order</Text>
        <Gap height={25} />
        <View style={styles.filtersec}>
          <Text style={styles.filtertext}>Your Order List</Text>
        </View>
        <Gap height={10} />
        <View height = '80%' flexGrow = {1}>
          <ScrollView contentContainerStyle={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",}}>
            <View style={styles.orderhistoryscroll}>
            <View>
            {(
              sortHistoryOtherDone
              ) ? (
                sortHistoryOtherDone.map((sortHistoryOtherDone) => (
              <View
              key = {sortHistoryOtherDone.order_id}
              >
                <TouchableOpacity style={[styles.ordercard,     {borderColor: 
                  sortHistoryOtherDone.status === "Done" ? "#32CD32" :
                  sortHistoryOtherDone.status === "Canceled" ? "#FF6347" : "#54CC76"
                }]}
                disabled={sortHistoryOtherDone.status === 'Open'||sortHistoryOtherDone.status==='Ready to Booked'}
                onPress={() => navigation.navigate("Tracking", {order_id: sortHistoryOtherDone.order_id})}
                >
                    <View>
                    <View
                  style={styles.topcontentcard}
                  key = {sortHistoryOtherDone.order_id}
                >
                  <View>
                    <Text style={styles.ordertitle1}>{sortHistoryOtherDone.service} Cleaning</Text>
                    <Text style={styles.ordertitle2}>
                      {sortHistoryOtherDone.order_id}
                    </Text>
                  </View>
                  <View
                  style={[styles.orderstatus, {backgroundColor: 
                    sortHistoryOtherDone.status === "Done" ? "#32CD32" :
                    sortHistoryOtherDone.status === "Canceled" ? "#FF6347" : "#54CC76"
                  }]}
                  disabled={sortHistoryOtherDone.status === 'Ready to Booked'||sortHistoryOtherDone.status === 'Open'}
                    onPress={() => navigation.navigate("Tracking", {order_id: sortHistoryOtherDone.order_id})}
                  >
                    <Text
                      style={styles.orderstatustext}
                      disabled={sortHistoryOtherDone.status==="Waiting for Payment" || sortHistoryOtherDone.status==="Done" || sortHistoryOtherDone.status==="Open" || sortHistoryOtherDone.status==="Ready to Booked"}
                      onPress={() => navigation.navigate(
                        "Tracking", {order_id: sortHistoryOtherDone.order_id}
                        )}
                      
                    >
                      {(sortHistoryOtherDone.status === ("Open") || sortHistoryOtherDone.status === ("Ready to Booked")) ? ("Waiting For Cleaner") : ((sortHistoryOtherDone.status === "Placement")?("Get Cleaner"):(sortHistoryOtherDone.status))}
                    </Text>
                  </View>
                </View>
                <Gap height={20} />
                <View style={styles.person}>
                {sortHistoryOtherDone.status === "Done" ? <ProfileIcon /> : <ProfileIconGreen />}
                  <Gap width={10} />
                  <Text style={styles.persontext}>{sortHistoryOtherDone.cleaner_id ? ("Cleaner Ranger"):("Wait!")}</Text>
                  <Gap width={35} />
                  <View style={styles.date2}>
                  {sortHistoryOtherDone.status === "Done" ? <DateIcon /> : <DateIconGreen />}
                    <Gap width={10} />
                    <Text style={styles.persontext}>
                      {/* waktu */}
                      {sortHistoryOtherDone.time ? (splitDate(sortHistoryOtherDone.time)):("Silahkan menunggu")}
                      </Text>
                  </View>
                </View>
                <Gap height={20} />
                <View style={styles.person}>
                {sortHistoryOtherDone.status === "Done" ? <TimeIcon /> : <TimeIconGreen />}
                  <Gap width={10} />
                  <Text style={styles.persontext}>
                    {sortHistoryOtherDone.booking_type === "Urgent" ? ("Now") : 
                    (splitTime(sortHistoryOtherDone.time))
                    // 'time'
                    }
                  </Text>
                  <View style={styles.date}>
                    <Gap width={20} />
                    {sortHistoryOtherDone.status === "Done" ? <LocationIcon /> : <LocationIconGreen />}
                    <Gap width={10} />
                    <Text style={{fontFamily: 'Ubuntur', }}>
                      {sortHistoryOtherDone.address ? (sortHistoryOtherDone.address.slice(0,30)):'Silahkan Menunggu'}
                      {/* {OrderHistory.address.split(' ').slice(0,4).join(' ')}... */}
                      </Text> 
                  </View>
                </View>
                </View>
              </TouchableOpacity>
            </View>                
            ))) : (<Text>Loading...</Text>)}
          </View>
            </View>
          </ScrollView>
        </View>
        <View style={{backgroundColor: '#fff', padding: '2%'}}></View>
      </View>
    </View>
  );
 }
 return (
  <View style={styles.containerr}>
      <View style={{marginTop: '11%'}}></View>
        <ScrollView>
        <View style={styles.containerr}>
    <Text style={{fontFamily: 'Ubuntu', fontSize: 22, }}>Order</Text>
    <LottieView 
      source={require('../../assets/animation/GembokLocked.json')}
      autoPlay
      loop
      style={styles.namelogo}/>
        <Text style={styles.titletext}>Silahkan login dan nikmati semua layanan!</Text>
        <Text style={styles.subtext}>Silakan login untuk mendapatkan akses penuh dan menikmati semua layanan yang tersedia dalam aplikasi Kilapin</Text>
        <Pressable style={styles.nextbutton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textbutton} onPress={() => navigation.navigate('Login')}>LOGIN</Text>
      </Pressable>
      </View>
      </ScrollView>
  </View>
)
};


const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff'
  },
  filtersec: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  filtertext: {
    fontFamily: "Ubuntum",
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 15,
  },
  order: {
    fontFamily: "Ubuntu",
    fontSize: 20,
    color: "#1E2022",
    marginTop: hp('4%')
  },
  ordercard: {
    padding: wp('1%'),
    width: wp('90%'),
    height: hp('20%'),
    backgroundColor: "#FFF",
    borderColor: '#DA7DE1',
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: hp('3%'),
  },
  topcontentcard: {
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    flexDirection: "row",
  },
  orderstatus: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#DA7DE1",
    borderRadius: 10,
    width: wp('40%'),
    height: 30,
    marginRight: 12,
    marginTop: 10,
    fontSize: 12,
    marginLeft: '-3%'
  },

  orderstatustext: {
    color: "#fff",
    fontFamily: "Ubuntu",
    fontSize: 12,
  },
  ordertitle1: {
    marginTop: 12,
    marginLeft: 12,
    color: "#1E2022",
    fontSize: 12,
    fontFamily: "Ubuntu",
    marginBottom: 2
  },
  ordertitle2: {
    marginLeft: 12,
    fontSize: 10,
    fontFamily: "Ubuntur",
    width: '90%',
    marginBottom: -2
  },
  person: {
    marginLeft: 12,
    flexDirection: "row",
  },
  persontext: {
    fontFamily: "Ubuntur",
    color: "#4B4B4B",
  },
  date: {
    flexDirection: "row",
    width: wp('60%')
  },
  date2: {
    flexDirection: "row",
    marginLeft: '-5%'
  },
  containerr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
},
namelogo: {
     height: hp('45%'),
     marginBottom: hp('0.5%'),
     alignItems: 'center',
     justifyContent: 'center',
     textAlign: 'center',
 },
titletext: {
    color: '#5865F2',
    fontFamily: 'Ubuntu',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: wp('80%'),
    marginBottom: hp('2%')
},
subtext: {
    fontFamily: 'Ubuntur',
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: 300,
    marginBottom: hp('2%')
},
nextbutton: {
    backgroundColor: '#5865F2',
    height: 51,
    borderRadius:30,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '2%'
},
textbutton: {
    fontFamily: 'Ubuntu',
    color: '#fff',
},
}
);

export default Task;
