import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Reviewpage = ({route,navigation}) => {
  const {order_id} = route.params
  console.log(order_id)
  const [id,setId] = useState(order_id)
  const [rating, setRating] = useState('');
  const [review, setComment] = useState('');

  const handleRating = (text) => {
    setRating(text);
  };

  const handleComment = (text) => {
    setComment(text);
  };

  const addReview = async () => {
    try {
      console.log("menajalankan review")
      const {order_id} = route.params
      const link = `https://customer.kilapin.com/order/review/${order_id}`
      console.log("ini link",link)
      console.log("ini rating",rating)
      console.log("ini review",review)
      const response = await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          review,
          rating
        })
      })
      console.log("link", response.body)
      const data = await response.text();
      console.log('Response data:', data);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: hp('3%'), marginTop: hp('7%') }}>Ratings & Reviews (213)</Text>
      <View style={styles.starsscore}>
      <Text>Score</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: hp('3%'), }}>
          {[...Array(5)].map((_, i) => {
            const index = i + 1;
            const iconName = index <= rating ? 'ios-star' : 'ios-star-outline';
            return (
              <TouchableOpacity key={index} onPress={() => handleRating(index)}>
                <Ionicons name={iconName} size={24} color="orange" />
              </TouchableOpacity>
            );
          })}
          <Text style={{ marginLeft: 10 }}>{rating} / 5</Text>
        </View>
      </View>
      <View style={styles.inputview}>
        <TextInput multiline style={styles.inputtext2} onChangeText={setComment} value={review} placeholder={'Review'}/>
      </View>
      <View>
      <TouchableOpacity onPress={addReview} style={{ backgroundColor: '#FFB400', padding: 10, borderRadius: 20, marginTop: hp('25%'), width: wp('90%'), fontFamily: 'Ubuntu', height: 51, marginBottom: '5%',  alignItems: 'center', justifyContent: 'center', textAlign: 'center', }}>
        <Text style={{color: '#ffffff', fontFamily: 'Ubuntu', fontSize: 16, alignItems: 'center', justifyContent: 'center', textAlign: 'center', }}>Post</Text>
      </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  inputtext2: {
    borderWidth: 1.5,
    borderColor: '#8D8D8D',
    height: 310,
    borderRadius: 15,
    width: wp('90%'),
    padding: 15,
    fontFamily: 'Ubuntur',
    marginBottom: hp('1%')
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    height: '100%'
  },
  starsscore: {
    marginRight: wp('50%')
  },
  inputview: {
    justifyContent: 'space-between',
    textAlign: 'center',
  },
})

export default Reviewpage;