import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BackIcon } from '../../assets';

const Article1= ({ navigation }) => {
  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
      <TouchableOpacity style={{marginTop: hp('5.9%'), marginRight: wp('6%')}}>
          <BackIcon onPress={() => navigation.navigate('News')} />
        </TouchableOpacity>
        <View>
        <Text style={styles.title}>F45T KILAP</Text>
        <Text style={styles.author}>By Admin | 17 March 2023</Text>
        </View>
        </View>
        <Image
          style={styles.headerImage}
          source={require("../../assets/image/carousel2.png")}
        />
        <Text style={styles.body}>
        Kerjaan padat, banyak meeting ga sempet beresin apart? Stop worrying, #KilapinAja! Sekarang udah ada fitur F45T Kilap dengan service 45 menit aja buat bersihin apartemenmu! Tersedia secara bertahap dengan jumlah cleaner yang terus meningkat ya! F45T Kilap dapat dinikmati oleh pengguna Kilapin yang memiliki tipe studio dan 1BR dan berada di seluruh area Jakarta Utara.
        </Text>
        <Text style={styles.headline}>Jaminan Cleaner Pilihan</Text>
        <Text style={styles.body}>Tersedia dengan pilihan cleaner terbaik untuk setiap sesi bersih bersih apartmu!Tersedia dengan pilihan cleaner terbaik untuk setiap sesi bersih bersih apartmu!</Text>
        <Text style={styles.body}>1. Pastikan kamu sudah download aplikasi Kilapin.</Text>
        <Text style={styles.body}>2. Buka aplikasi Kilapin kemudian klik ikon Urgent Cleaner.</Text>
        <Text style={styles.body}> 3. Masukkan alamat lokasi Apart kamu, dan pastikan lokasi penjemputan dan tujuan ada di sekitar area Jakarta Utara..</Text>
        <Text style={styles.body}>4. Begitu lokasi apartmu kamu sudah sesuai, pilih kategori F45T Kilap sebelum klik order.</Text>
        <Text style={styles.body}>5. Cleaner Kilapin akan segera meluncur ke apart kamu.</Text>
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
    marginBottom: hp('2%'),
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

export default Article1;