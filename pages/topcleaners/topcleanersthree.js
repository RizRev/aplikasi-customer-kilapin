import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, BackHandler} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';

const TopCleanerThree = ({ navigation }) =>  {

  const ratings = [
    { stars: 5, text: 'Sangat baik sekali, dengan pelayanan terbaik dari Sanjayaman', name: 'Sri Asih' },
    { stars: 4, text: 'Service dari sanjayaman membuat hunian saya menjadi bersih', name: 'Peter Ronald' },
    { stars: 5, text: 'Cleaner terbaik hingga saat ini, terimakasih sanjayaman', name: 'Gunawan Cahyadi' },
    { stars: 5, text: 'Pelayanan luar biasa dari sanjayaman', name: 'Windah Giska' },
    { stars: 4, text: 'Hunian saya menjadi sangat bersih setelah dibersihkan', name: 'Kumala Ilham' },
  ];

  const swiperRef = useRef(null);

  useEffect(() => {
    const autoplayTimer = setInterval(() => {
      if (swiperRef.current) {
        const currentIndex = swiperRef.current.state.index;
        const nextIndex = (currentIndex + 1) % ratings.length;
        swiperRef.current.scrollBy(nextIndex - currentIndex, true);
      }
    }, 5000);

    return () => {
      clearInterval(autoplayTimer);
    };
  }, []);

  useEffect(() => {
    // Function to handle the hardware back gesture
    const handleHardwareBackPress = () => {
      // Navigate back to the Home screen
      navigation.navigate('Home');
      // Return true to indicate that we've handled the back press
      return true;
    };

    // Subscribe to the hardware back press event when the component mounts
    BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);

    // Clean up the event listener when the component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleHardwareBackPress);
    };
  }, [navigation]);
  
  return (
    <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: '6%'}}>
            <View style={{marginTop: '4%'}}>
            <Text style={{fontFamily: 'Ubuntur', color: '#000', fontSize: 18}}>Top Cleaner 3</Text>
            <Text style={{fontFamily: 'Ubuntu', color: '#000', fontSize: 24, marginVertical: '2%' }}>Toria His</Text>
            <Text style={{fontFamily: 'Ubuntum', color: '#000', fontSize: 20}}>Jakarta</Text>
          </View>
          <Text style={{fontFamily: 'Ubuntu', fontSize: 90, color: '#000', marginLeft: '10%'}}>4.9</Text>
          </View>
          <View style={{flex: 1}}>
          <Swiper
       ref={swiperRef}
       style={styles.swiper}
       showsButtons={false}
       loop={false}
       horizontal={true}
       paginationStyle={styles.pagination}
      >
        {ratings.map((rating, index) => (
          <View key={index} style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {Array.from({ length: rating.stars }).map((_, starIndex) => (
                <Icon
                  key={starIndex}
                  name="star"
                  size={24}
                  color="#FFD700"
                  style={styles.starIcon}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>{rating.text}</Text>

            <Text style={{fontSize: 16, marginTop: '1%'}}>{rating.name}</Text>
          </View>
        ))}
      </Swiper>
      </View>
<TouchableOpacity
      onPress={() => navigation.navigate('Home')}
      style={{
        backgroundColor: '#DA7DE1',
        borderRadius: 200,
        paddingHorizontal: 50,
        paddingVertical: 7,
        fontFamily: 'Ubuntu',

      }}
      activeOpacity={0.6}
    >
      <Text style={{ color: '#fff', fontFamily: 'Ubuntu' }}>Back</Text>
    </TouchableOpacity>
    <ImageBackground source={require("../../assets/image/TopCleanerThree.png")} style={styles.backgroundImage}>
      </ImageBackground>
      <View style={{marginTop: '-50%'}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    paddingTop: '0.1%',
    marginTop: '5%',
    height: '80%', 
  },
  pagination: {
    marginTop: 100
  },
  ratingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  starIcon: {
    marginRight: 5,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    width: '80%',
  },
});


export default TopCleanerThree;