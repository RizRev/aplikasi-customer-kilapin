import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BackIcon } from '../../assets';

const ArticleBL2 = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
      <TouchableOpacity style={{marginTop: hp('5.9%'), marginRight: wp('6%')}}>
          <BackIcon onPress={() => navigation.navigate('NewsBL')} />
        </TouchableOpacity>
        <View>
        <Text style={styles.title}>Promo Diskon Kilapin!</Text>
        <Text style={styles.author}>By Admin | 17 March 2023</Text>
        </View>
        </View>
        <Image
          style={styles.headerImage}
          source={require("../../assets/image/carousel1.png")}
        />
        <Text style={styles.body}>
        Promo baru di bulan April untuk kamu yang mau bersihin rumah tapi bisa tetep nyantai! Sekarang kamu bisa pakai kode promo KILAPRIL dan KILAPINAJA untuk diskon di bulan April!*
        </Text>
        <Text style={styles.headline}>KILAPRIL : 1x voucher diskon 50% maks. Rp. 35,000</Text><Text style={styles.body}>untuk layanan Urgent Cleaner berlaku untuk semua metode pembayaran.</Text>
        <Text style={styles.headline}>KILAPINAJA : 1x voucher diskon maks. Rp. 25,000</Text><Text style={styles.body}>KILAPINAJA : 1x voucher diskon maks. Rp. 25,000</Text>
        <Text style={styles.body}>Promo ini bakal berlaku untuk semua pengguna Kilapin dengan batasan 2 kali penggunaan kode promo dalam bulan April dan berlaku mulai dari tanggal 1 April 2023 – 30 April 2023.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerImage: {
    height: 200,
    width: '100%',
    marginBottom: hp('2%')
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 1,
  },
  headline: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: 'Ubuntu'
  },
  author: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 20,
  },
  body: {
    fontSize: 18,
    lineHeight: 30,
    marginBottom: hp('2%')
  },

});

export default ArticleBL2;