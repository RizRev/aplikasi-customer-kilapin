import {
  StyleSheet,
  Image,
  View,
  Text,
  Pressable,
  ImageBackground,
  Dimensions,
  Animated
} from "react-native";
import React, { useRef } from "react";
import { Gap } from "../../components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Swiper from 'react-native-swiper';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');
const SWIPE_THRESHOLD = height

const NewsBL = ({ navigation }) => {

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
    <View style={styles.container}>
        <Swiper autoplay={true} autoplayTimeout={5} paginationStyle={{ marginBottom: '106%', }}>
  <ImageBackground
    source={require("../../assets/image/F45T.png")}
    resizeMode="cover"
    style={styles.imagemain}>
    <View style={{height: hp('20%')}} />
    <Text style={styles.namelogo}></Text>
  </ImageBackground>

  <ImageBackground
    source={require("../../assets/image/diskon.png")}
    resizeMode="cover"
    style={styles.imagemain}
  >
    <View style={{height: hp('20%')}} />
    <Text style={styles.namelogo}></Text>
  </ImageBackground>

  <ImageBackground
    source={require("../../assets/image/carousel3.png")}
    resizeMode="cover"
    style={styles.imagemain}
  >
    <View style={{height: hp('20%')}} />
    <Text style={styles.namelogo}></Text>
  </ImageBackground>

</Swiper>
<PanGestureHandler onGestureEvent={handleGesture} onHandlerStateChange={handleSwipeEnd}>
        <Animated.View style={[styles.contentswipe, { transform: [{ translateY }] }]}>
        <View style={styles.shape}>
          <Gap height={20} />
          <View style={styles.toptext}>
            <Text style={styles.news}>News & Promo</Text>
            <Text style={styles.newsseeall}>Kilapin</Text>
          </View>
          <Gap height={30} />
          <View>
              <View style={styles.newscontainer}>
                <View style={styles.innernewscontainer}>
                <Pressable onPress={() => navigation.navigate("ArticleBL1")}>
                  <Image
                    style={styles.imagenews}
                    source={require("../../assets/image/news-s1.png")}
                    onPress={() => navigation.navigate("ArticleBL1")}
                  />
                  <Gap height={10} />
                  <Text style={styles.newstext} onPress={() => navigation.navigate("ArticleBL1")}>
                  F45T Kilapin Clean
                  </Text>
                  </Pressable>
                </View>
                <View>
                <Pressable onPress={() => navigation.navigate("ArticleBL2")}>
                  <Image
                    style={styles.imagenews}
                    source={require("../../assets/image/news-s2.png")}
                    onPress={() => navigation.navigate("ArticleBL2")}
                  />
                  <Gap height={10} />
                  <Text style={styles.newstext} onPress={() => navigation.navigate("ArticleBL2")}>
                  Promo Diskon Kilapin!
                  </Text>
                  </Pressable>
                </View>
              </View>
              <Gap height={20} />
              <View style={styles.newscontainer}>
                <View style={styles.innernewscontainer}>
                  <Image
                    style={styles.imagenews}
                    source={require("../../assets/image/news-s3.png")}
                  />
                  <Gap height={10} />
                  <Text style={styles.newstext}>
                    Be a Kilapeeps!
                  </Text>
                </View>
                <View>
                  <Image
                    style={styles.imagenews}
                    source={require("../../assets/image/news-s-white.png")}
                  />

                </View>
              </View>
              <Gap height={20} />
              <View style={{marginBottom: hp('5.1%'), backgroundColor: '#fff'}}></View>
          </View>
        </View>
        </Animated.View>
        </PanGestureHandler>
    </View>
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
    bottom: '-105%',
    backgroundColor: '#fff',
    minHeight: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: '190%',
    paddingTop:20,
    paddingHorizontal:20
  },
  innernewscontainer: {
    marginRight: wp("8%"),
  },
  newstext: {
    width: 130,
    fontFamily: "Ubuntum",
    fontSize: 14,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
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
    marginTop: '-3%'
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
    backgroundColor: "#fff",
    alignSelf: "stretch",
    textAlign: "center",
  },
});

export default NewsBL;

