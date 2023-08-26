import React, { useEffect, useState } from 'react';
import { BackHandler,StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BackIcon } from '../../assets';


const ArticleBL1= ({ navigation, route }) => {

  useEffect(() => {
    const backAction = () => {
        navigation.navigate('MainApp',{screen:('News')})
        return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
}, [navigation]);


  const [news, setNews] = useState({});
  const { newsId } = route.params;
  console.log(newsId);

  useEffect(() => {
    const getNewsDetail = async () => {
      const response = await fetch(`https://customer.kilapin.com/news/detail/${newsId}`);
      const data = await response.json();
      console.log(data);
      setNews(data.data);
    };
    getNewsDetail();
  }, []);

  const renderDescription = () => {
    const paragraphs = news.desc.split('<p>').filter((paragraph) => paragraph.trim() !== '');
    return paragraphs.map((paragraph, index) => (
      <Text key={index} style={styles.paragraph}>
        {paragraph.replace(/<[^>]+>/g, '')}
      </Text>
    ));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {Object.keys(news).length > 0 ? (
          <View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ marginTop: hp('5.9%'), marginRight: wp('6%') }}
              >
                <BackIcon onPress={() => navigation.navigate('News')} />
              </TouchableOpacity>
              <View>
                <Text style={styles.title}>{news.title}</Text>
                <Text style={styles.author}>By Admin | 17 March 2023</Text>
              </View>
            </View>
            <Image style={styles.headerImage} source={{ uri: news.image }} />
            {renderDescription()}
          </View>
        ) : (
          <View>
            <Text>tunggu sejenak</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerImage: {
    height: 200,
    width: '100%',
    marginBottom: hp('2%'),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 1,
  },
  author: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 18,
    lineHeight: 30,
    marginBottom: hp('2%'),
  },
});

export default ArticleBL1;
