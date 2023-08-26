import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';

const FAQ = ({navigation}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const {t} = useTranslation();

  const faqs = [
    {
      id: 0,
      question: t('payment'),
      answer:
        t('answer_payment')
    },
    {
      id: 1,
      question: t('funds'),
      answer:
        t('answer_funds')
    },
    {
      id: 2,
      question: t('membership'),
      answer:
        t('answer_membership')
    }
  ];

  const handlePress = (index) => {
    if (activeIndex === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <View style={styles.maincontainer}>
      <View style={{flexDirection: 'row'}}>
        <Image source={require('../../assets/image/KilapinIcon.png')} style={{marginLeft: '-2.2%', marginTop: '-6%', marginRight: '-3%', width: 90, height: 90}} />
      <View>
      <Text style={styles.header}>Frequently Asked Questions</Text>
      <Text style={{marginBottom: '10%', marginTop: '2%', fontFamily: 'Ubuntur', fontSize: 16}}>Kilapin App</Text>
      </View>
      </View>
      <View style={{marginBottom: '2%', paddingVertical: 0.5, paddingHorizontal: '10%', backgroundColor: '#696969', justifyContent: 'center', alignItems: 'center'}}></View>
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {faqs.map((faq, index) => (
          <View key={faq.id}>
            <TouchableOpacity
              style={[
                styles.question,
                activeIndex === index ? styles.activeQuestion : null
              ]}
              onPress={() => handlePress(index)}
            >
              <Text style={[styles.questionText, {width: '90%'}]}>{faq.question}</Text>
              <Ionicons
                name={activeIndex === index ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#666"
                style={{ marginLeft: 10 }}
                />
            </TouchableOpacity>
            {activeIndex === index && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerText}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
    <TouchableOpacity
      onPress={() => navigation.navigate('MainApp')}
      style={{
        backgroundColor: '#DA7DE1',
        borderRadius: 200,
        marginBottom: '3%',
        paddingHorizontal: 50,
        paddingVertical: '5%',
        fontFamily: 'Ubuntu',

      }}
      activeOpacity={0.6}
    >
    <Text style={{ color: '#fff', fontFamily: 'Ubuntu', textAlign: 'center', fontSize: 18 }}>HOME</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
  container: {
    backgroundColor: '#fff'
  },
  content: {
    padding: 1
  },
  question: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD'
  },
  activeQuestion: {
    backgroundColor: '#EEE'
  },
  questionText: {
    flex: 1,
    fontFamily: 'Ubuntur',
    fontSize: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  answerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD'
  },
  answerText: {
    fontSize: 16,
    width: '90%'
  }
});



export default FAQ;
