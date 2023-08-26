import {
  StyleSheet,
  Image,
  View,
  Text,
  Pressable,
  ImageBackground,
  Dimensions,
  Animated,
  BackHandler
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Swiper from 'react-native-swiper';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get('window');
const SWIPE_THRESHOLD = height

const News = ({ navigation }) => {
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
  const [newsData, setNewsData] = useState('');
  const {t} = useTranslation();

  useEffect(() => {
    async function fetchData (){
      const link = `https://customer.kilapin.com/news/`
      const response = await fetch(link);
      const data = await response.json()
      setNewsData(data.data)
      console.log("response",newsData)
    } 

    fetchData()

  },[])

  const translateY = useRef(new Animated.Value(0)).current;

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  

  const handleSwipeEnd = ({ nativeEvent }) => {
    const { translationY, velocityY } = nativeEvent;

    const swipeDirection = velocityY < 0 ? -1 : 1;

    if (Math.abs(translationY) > SWIPE_THRESHOLD) {
      Animated.timing(translateY, {
        toValue: swipeDirection * height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
  <Swiper autoplay={true} autoplayTimeout={5} paginationStyle={{ marginBottom: '0%'}}>
  <ImageBackground
    source={require("../../assets/image/F45T.png")}
    resizeMode="cover"
    style={{width: '100%',height:'100%'}}>
    {/* <View style={{height: hp('20%')}} /> */}
    {/* <Text style={styles.namelogo}></Text> */}
  </ImageBackground>

  <ImageBackground
    source={require("../../assets/image/diskon.png")}
    resizeMode="cover"
    style={{width: '100%',height:'100%'}}
  >
    {/* <View style={{height: hp('20%')}} /> */}
    {/* <Text style={styles.namelogo}></Text> */}
  </ImageBackground>

  <ImageBackground
    source={require("../../assets/image/carousel3.png")}
    resizeMode="cover"
    style={{width: '100%',height:'100%'}}>
    {/* <View style={{height: hp('20%')}} /> */}
    {/* <Text style={styles.namelogo}></Text> */}
  </ImageBackground>
</Swiper>
<View style={{backgroundColor:'#fff',width:'100%',height:'70%'}}>
<View style={styles.toptext}>
            <Text style={styles.news}>{t('news_promo')}</Text>
            <Text style={styles.newsseeall}>Kilapin</Text>
</View>
{newsData ? <View style={{height:'100%',flex: 1,flexDirection: 'row',flexWrap:'wrap'}}>
  {newsData.map((news) => {
                return(
                  <View
                  style={{width: '40%',height: '25%',borderRadius:20,margin:'5%'}}
                  // style={styles.innernewscontainer}
                  key={news._id}
                  >
                  <Pressable
                  onPress={() => navigation.navigate("ArticleBL1",{newsId:news._id})}
                  >
                  <View 
                  style={{height:'70%',borderRadius:20,}}
                  >
                  <Image
                  style={{width: '100%',height:'100%',borderRadius:20,}}
                  source={{uri: news.image}}
                  onPress={() => navigation.navigate("ArticleBL1",{newsId:news._id})}
                />
                  </View>
                  <View 
                  style={{height:'30%',marginTop:'5%'}}
                  >
                  <Text style={styles.newstext}>{news.title}</Text>
                  </View> 
                  </Pressable>
                  </View>
                )
              })}
</View>:<View></View>}
</View>
{/* <PanGestureHandler onGestureEvent={handleGesture} onHandlerStateChange={handleSwipeEnd}>
        <Animated.View style={[styles.contentswipe, { transform: [{ translateY }] }]}> */}
        {/* <View style={styles.shape}>
          <View style={styles.toptext}>
            <Text style={styles.news}>{t('news_promo')}</Text>
            <Text style={styles.newsseeall}>Kilapin</Text>
          </View>
            {newsData ? 
            <View style={{backgroundColor:'green',height: hp('10%'),width: '100%',flex: 1,flexDirection: 'row',flexWrap: 'wrap',justifyContent: 'space-between',alignItems: 'center',paddingHorizontal: '3%'}}>
              
        </View> */}
        {/* </Animated.View>
        </PanGestureHandler> */}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  newscontainer: {
    flexDirection: "row",
  },
  contentswipe: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '-57%',
    backgroundColor: '#fff',
    minHeight: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: '190%',
    paddingTop:20,
    paddingHorizontal:20
  },
  innernewscontainer: {
    marginBottom: '10%',
    width: '40%',
    backgroundColor: 'grey',
    // flex: 1
    // alignItems: 'center',
    // justifyContent: 'center'
    // padding: '5%'
  },
  newstext: {
    width: 130,
    fontFamily: "Ubuntum",
    fontSize: 14,
  },
  container: {
    
    backgroundColor: "green",
      width:"100%",
      height:'100%'  },
  news: {
    fontFamily: "Ubuntu",
    marginRight: wp("50%"),
    fontSize: 14,
  },
  newsseeall: {
    fontFamily: "Ubuntum",
    color: "#5865F2",
    fontSize: 14,
  },
  toptext: {
    flexDirection: "row",
    marginTop: '3%',
    paddingHorizontal: '7%'
  },
  namelogo: {
    flex: 1,
    color: "#fff",
    fontFamily: "Ubuntu",
    fontSize: 32,
    height: hp("25%"),
    marginTop: hp("20%"),
  },
  shape: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "stretch",
    // height: '100%'
  },
});

export default News;