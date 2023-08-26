import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {ApplicationActions} from '../../actions';

const OngoingOrdersNotification = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object
  const [isVisible, setIsVisible] = useState(true); // State to control the visibility of the notification
//   const [isVisible, setIsVisible] = useState(true); // State to control the visibility of the notification
  // Get the ongoing orders from the Redux store
  const ongoingOrders = useSelector(state => state.application.order);
  console.log('modal on going order',ongoingOrders)

  if (!ongoingOrders) {
    // If no ongoing orders, don't render the notification component
    return null;
  } else {
    var statusPaymentOrder = ongoingOrders.status_payment 
  }

  const handleNotificationPress = () => {
    if (statusPaymentOrder == 'Unpaid') {
      navigation.navigate('PaymentGateway',{discount: ongoingOrders.total_discount});
    } else {
      navigation.navigate('Task');
    }
    // Navigate to the Task screen when notification is pressed
  };

  const handleNotificationClose = () => {
    if (statusPaymentOrder == 'Unpaid') {
      // console.log('anjiiingg')
      // navigation.navigate('PaymentGateway',{discount: ongoingOrders.total_discount});
    } else {
    dispatch(ApplicationActions.onclearOrder());
  }
    // Set the visibility state to false when the close button is pressed
    setIsVisible(false);
  };

  if (!isVisible || !ongoingOrders) {
    // If isVisible is false or no ongoing orders, don't render the notification component
    return null;
  }

  const handleOrderStatusUpdate = async () => {
    try {
      const link = `https://customer.kilapin.com/order/status/Cancel/${ongoingOrders.order_id}`;
      const response = await fetch(link, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Status Update Response:', data);
      dispatch(ApplicationActions.onclearOrder());
      // Assuming the API response returns updated order details, update the orderDetail state.
      // handleOrder()
    } catch (error) {
      console.log('Error while updating order status:', error);
    }
  };

  return (
    <>
    {
      statusPaymentOrder == 'Unpaid' ? 
      <TouchableOpacity style={styles.container} onPress={handleNotificationPress}>
        <LinearGradient colors={['#5865F2', '#DD7DE1']}
          style={styles.gradient}
        >
          <View>
            <Text style={styles.notificationText}>Order ID: {ongoingOrders.order_id ? ongoingOrders.order_id: ongoingOrders.order.order_id}</Text>
            <Text style={styles.notificationText}>Address: {ongoingOrders.address?ongoingOrders.address:ongoingOrders.order.address}</Text>
            {/* Display Cancel Button */}
            <TouchableOpacity onPress={handleOrderStatusUpdate} >
            <View style={{flex: 1, marginTop: 10, alignItems: 'center', backgroundColor: "#FF6347", borderRadius: 20,height:30}}>
                <Text style={styles.orderstatustext}>
                    Cancel Order
                </Text>
            </View>
            </TouchableOpacity>
            {/* Display Cancel Button */}
          </View>
        </LinearGradient>
      </TouchableOpacity>  :
      
      <TouchableOpacity style={styles.container} onPress={handleNotificationPress}>
    <LinearGradient
      colors={['#5865F2', '#DD7DE1']} // Use the same combination color
      style={styles.gradient}
    >
      <View>
        <Text style={styles.notificationText}>Order ID: {ongoingOrders.order.order_id}</Text>
        <Text style={styles.notificationText}>Address: {ongoingOrders.order.address}</Text>
        {/* Display other relevant order details */}
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={handleNotificationClose}>
        <Icon name="close-outline" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </LinearGradient>
  </TouchableOpacity>  
  
    
  }
    </>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    position: 'absolute',
    bottom: 10,
    left: 30,
    right: 30,
    zIndex: 999, // Ensure the notification is above other components
    marginBottom: 10
  },
  gradient: {
    padding: 10,
    borderRadius: 10,
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'YourFontFamily', // Replace with your font family
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  orderstatustext: {
    marginTop:4,
    color: "#fff",
    fontFamily: "Ubuntu",
    fontSize: 12
  },
});

export default OngoingOrdersNotification;
