import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const data = [
  {
    id: '1',
    name: 'John',
    comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex',
    stars: 4,
    profileImage: require('../../assets/image/Clean1.png'),
  },
  {
    id: '2',
    name: 'Mudryk',
    comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex',
    stars: 3,
    profileImage: require('../../assets/image/Clean2.jpg'),
  },
  {
    id: '3',
    name: 'Peter',
    comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex',
    stars: 5,
    profileImage: require('../../assets/image/Clean1.png'),
  },
  {
    id: '4',
    name: 'Sarah',
    comment: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex',
    stars: 4,
    profileImage: require('../../assets/image/Clean1.png'),
  },
];

export default function Review({route,navigation}) {
  const [comments, setComments] = useState(data);
  const {order_id} = route.params
  console.log(order_id)
  const review = ({ item }) => {
    const stars = [];
    for (let i = 0; i < item.stars; i++) {
      stars.push(<MaterialIcons key={i} name="star" size={16} color="#FFD700" />);
    }

    return (
      <View style={styles.comment}>
        <View style={styles.commentHeader}>
          <View style={styles.namestars}>
          <Image source={require('../../assets/image/Clean1.png')} style={styles.profileImage} />
            <View style={styles.starsname}>
              <View>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.stars}>{stars}</View>
              </View>
            <Text style={styles.verified}>Verified Account</Text>
            </View>
          </View>
          <Text style={styles.text}>{item.comment}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rating & Reviews</Text>
      <View style={styles.summarysec}>
        <Text style={styles.summary}>Summary</Text>
        <View style={styles.ratingcount}>
          <View style={styles.ratereview}>
          <Text style={styles.mainratetext}>4,5 <MaterialIcons name="star" size={20} color="#FFD700" /></Text>
          <Text>273 Reviews</Text>
          </View>
          <View style={styles.ratingrecommended}>
          <Text style={styles.mainratetext}>90%</Text>
          <Text>Recommended</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('ReviewPage', {order_id: order_id})}>
          <Text style={styles.confirmButtonText}>Write a review</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={comments}
        renderItem={review}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <View>
      <TouchableOpacity style={styles.confirmButton2} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.confirmButtonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: hp('3%')
  },
  confirmButton: {
    backgroundColor: '#FFB400',
    height: 45,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: wp('90%'),
    marginBottom: '-2%'
  },
  confirmButton2: {
    backgroundColor: '#DA7DE1',
    height: 45,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: hp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: wp('90%')
  },
  confirmButtonText: {
    color: '#ffffff',
    fontFamily: 'Ubuntu',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  summarysec: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  mainratetext: {
    fontFamily: 'Ubuntu',
    fontSize: 26,
    marginBottom: hp('1%')
  },
  ratingcount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: hp('2%'),
  },
  ratereview: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginRight: wp('5%')
  },
  ratingrecommended: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  summary: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: hp('-0.1%'),
    fontFamily: 'Ubuntum',
    fontSize: 16
  },
  list: {
    width: '100%',
  },
  starsname:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  verified: {
    fontFamily: 'Ubuntum',
    fontSize: 14,
    color: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginLeft: wp('10%')
  },
  namestars: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  comment: {
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: hp('2%'),
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
    
  },
  commentHeader: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 5,
    marginRight: 10,
  },
  name: {
    fontFamily: 'Ubuntu',
    marginBottom: 5,
    fontSize: 16
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#555',
    fontFamily: 'Ubuntur',
    marginTop: hp('2%'),
    fontSize: 14
  },
});