import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';

const TermsAndCondition = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
            <Image source={require('../../assets/image/KilapinIcon.png')} style={{marginLeft: '-2%', marginTop: '-6%', marginRight: '-3%', width: 95, height: 95}} />
            <View>
      <Text style={styles.header}>Terms and Conditions</Text>
      <Text style={{marginBottom: '10%', marginTop: '2%', fontFamily: 'Ubuntur', fontSize: 16}}>Kilapin App</Text>
      </View>
      </View>
      <View style={{marginBottom: '8%', paddingVertical: 0.5, paddingHorizontal: '10%', backgroundColor: '#696969', justifyContent: 'center', alignItems: 'center'}}></View>
      <ScrollView>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '3%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pasal 1</Text>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '5%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Ruang Linkup</Text>
      <Text style={styles.text}>
      Kilapin merupakan sebuah aplikasi yang menyediakan layanan jasa pembersih pada aplikasi Kilapin dengan ruang lingkup usaha mempertemukan penyedia jasa dan customer untuk melakukan pekerjaan jasa. Dalam layanan ini Kilapin sebagai penyedia jasa dan customer sepakat untuk saling melakukan transaksi atas jasa yang diberikan berdasarkan syarat dan ketentuan pemakaian Kilapin untuk customer guna melakukan pekerjaan jasa dan membayar harga jasa.
      </Text>
      <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '3%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pasal 2</Text>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '5%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Kesepakatan Para Pihak</Text>
      <Text style={styles.text}>
      Kilapin sepakat untuk menyediakan layanan sebagaimana Kilapin dan customer sepakat untuk menggunakan layanan. Penyediaan dan penggunaan layanan ini dilakukan dengan ketentuan, customer dengan ini memberikan kuasa kepada Kilapin untuk:
      </Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>1.</Text> Mempertemukan, merekomendasikan dan/atau meneruskan penawaran serta permintaan pekerjaan jasa di antara customer dan Kilapin.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>2.</Text> Melakukan promosi pekerjaan jasa.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 30}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>3.</Text> Mengelola sistem dan menentukan syarat dan ketentuan dari penggunaan Kilapin.</Text>
      
      <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '3%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pasal 3</Text>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '5%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Hak Dan Kewajiban Para Pihak</Text>
      <Text style={{fontFamily: 'Ubuntum', fontSize: 16, marginBottom: '3%', marginTop: '2%'}}>Kilapin</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>1.</Text> Berkewajiban untuk memberikan layanan kepada customer.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>2.</Text> Kilapin berhak untuk menerima pembayaran dari customer.</Text>
      <Text style={{fontFamily: 'Ubuntum', fontSize: 16, marginBottom: '3%', marginTop: '2%'}}>Customer</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>1.</Text> Customer berhak untuk menggunakan layanan dan menerima hasil pekerjaan jasa dari Kilapin.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 30}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>2.</Text> Customer berkewajiban untuk melakukan pembayaran harga jasa kepada Kilapin.</Text>
      
      <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '3%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pasal 4</Text>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '5%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Ketentuan Umum</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>1.</Text> Kilapin memberikan jasa kepada customer melalui aplikasi. Dan pembayaran dilakukan melalui platform aplikasi dengan metode pembayaran cashless yang dipilih oleh customer.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>2.</Text> Customer wajib untuk membaca dan menyetujui ketentuan Kilapin untuk menggunakan jasa cleaning.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>3.</Text> Dalam memberikan layanan, Kilapin akan berusaha semaksimal mungkin untuk memberikan jasa terbaik seperti memberikan Kilapeeps terbaik, namun Kilapin tidak bertanggung jawab atas semua tindakan customer yang tidak dapat dipertanggungjawabkan, baik berupa pelanggaran peraturan perundang-undangan maupun pelanggaran perjanjian.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>4.</Text> Customer wajib memberikan izin untuk penggunaan air dan juga listrik untuk kebutuhan jasa dari Kilapin. Serta mengijinkan Kilapeeps untuk datang membersihkan rumah customer.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>5.</Text> Dalam menggunakan layanan, customer dilarang untuk: Menggunakan nama Kilapin untuk kegiatan yang menimbulkan konflik yang berbau dengan SARA, dan sebagainya. Melakukan transaksi di luar aplikasi Kilapin dengan Kilapeeps. Juga melakukan transaksi yang bertujuan untuk kejahatan. Melakukan aktivitas yang dapat menimbulkan kejahatan kepada Kilapeeps, meretas platform aplikasi, website, dan juga sosial media Kilapin.</Text>
      
      <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '3%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pasal 5</Text>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '5%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Akun</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>1.</Text> Akun Untuk dapat menggunakan Kilapin, setiap customer wajib untuk melakukan pembuatan akun dengan cara melakukan pendaftaran terlebih dahulu pada platform. Pendaftaran tersebut dapat dilakukan dengan cara:</Text>
      <Text style={{ marginLeft: '8%', fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>1.</Text> Pendaftaran secara mandiri dengan cara mengisi formulir yang telah disediakan oleh Kilapin pada aplikasi. </Text>
      <Text style={{ marginLeft: '8%', fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>2.</Text> Pendaftaran yang dilakukan dengan bantuan Kilapin berdasarkan persetujuan dan konfirmasi dari customer dengan menggunakan sarana komunikasi apapun (telepon, email, dll).</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>2.</Text> Dalam melakukan pendaftaran, customer wajib untuk menyerahkan data pribadi yang meliputi nama, alamat tempat tinggal, alamat email dan nomor telepon. Jika ada identitas yang dipalsukan atau disalahgunakan customer, Kilapin dapat mengambil keputusan untuk menghapus akun customer tersebut.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>3.</Text> Setelah melakukan sign in pada aplikasi ataupun website Kilapin, customer dapat menggunakan username serta password yang telah didaftarkan. Jangan memberikan password kepada orang lain untuk menjaga identitas dan sebagai tindakan preventif akan kejahatan yang dapat ditimbulkan. Kilapin tidak bertanggung jawab jika customer menyebarkan password kepada pihak yang tidak bertanggung jawab dan mengalami kerugian. </Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>4.</Text> Order dapat dilakukan dengan men-input alamat lengkap, jenis tempat tinggal, jam booking, dan juga produk yang akan dipilih customer dari Kilapin. Setelah itu orderan diterima dan customer menunggu Kilapeeps sampai di tempat tinggal customer. </Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>5.</Text> Setelah selesai dengan jasa Kilapin, customer wajib untuk memberikan rating juga review untuk Kilapeeps yang memberikan jasa kepada customer. </Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>6.</Text> Segala informasi dan data yang Kelapin terima dalam pembuatan akun dijamin kerahasiaannya dan dapat digunakan oleh Kilapin untuk kebutuhan perusahaan dalam memperbaharui, memberikan informasi kepada customer dan mengembangkan Kilapin. </Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>7.</Text> Kilapin berhak untuk melakukan penghapusan akun dan juga blokir akun customer dengan ketentuan sebagai berikut : </Text>
      <Text style={{ marginLeft: '8%', fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>1.</Text> Customer melakukan pelanggaran terhadap syarat dan ketentuan Kilapin.</Text>
      <Text style={{ marginLeft: '8%', fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>2.</Text> Customer memberikan identitas pribadi yang dipalsukan atau disalahgunakan oleh customer.</Text>
      <Text style={{ marginLeft: '8%', fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>3.</Text> Customer diketahui telah meretas atau merusak platform aplikasi ataupun website Kilapin.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>8.</Text> Customer dapat melaporkan kepada pihak Kilapin jika ada hal yang mencurigakan atas akun yang digunakan customer.</Text>

      <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '3%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pasal 6</Text>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '5%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Layanan</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>1.</Text> Akun Untuk dapat menggunakan Kilapin, setiap customer wajib untuk melakukan pembuatan akun dengan cara melakukan pendaftaran terlebih dahulu pada platform. Pendaftaran tersebut dapat dilakukan dengan cara:</Text>
      <Text style={{ marginLeft: '8%', fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>1.</Text> Pendaftaran secara mandiri dengan cara mengisi formulir yang telah disediakan oleh Kilapin pada aplikasi. </Text>
      <Text style={{ marginLeft: '8%', fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>2.</Text> Pendaftaran yang dilakukan dengan bantuan Kilapin berdasarkan persetujuan dan konfirmasi dari customer dengan menggunakan sarana komunikasi apapun (telepon, email, dll).</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>2.</Text> Dalam melakukan pendaftaran, customer wajib untuk menyerahkan data pribadi yang meliputi nama, alamat tempat tinggal, alamat email dan nomor telepon. Jika ada identitas yang dipalsukan atau disalahgunakan customer, Kilapin dapat mengambil keputusan untuk menghapus akun customer tersebut.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>3.</Text> Setelah melakukan sign in pada aplikasi ataupun website Kilapin, customer dapat menggunakan username serta password yang telah didaftarkan. Jangan memberikan password kepada orang lain untuk menjaga identitas dan sebagai tindakan preventif akan kejahatan yang dapat ditimbulkan. Kilapin tidak bertanggung jawab jika customer menyebarkan password kepada pihak yang tidak bertanggung jawab dan mengalami kerugian. </Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>4.</Text> Order dapat dilakukan dengan men-input alamat lengkap, jenis tempat tinggal, jam booking, dan juga produk yang akan dipilih customer dari Kilapin. Setelah itu orderan diterima dan customer menunggu Kilapeeps sampai di tempat tinggal customer. </Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>5.</Text> Setelah selesai dengan jasa Kilapin, customer wajib untuk memberikan rating juga review untuk Kilapeeps yang memberikan jasa kepada customer. </Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>6.</Text> Segala informasi dan data yang Kelapin terima dalam pembuatan akun dijamin kerahasiaannya dan dapat digunakan oleh Kilapin untuk kebutuhan perusahaan dalam memperbaharui, memberikan informasi kepada customer dan mengembangkan Kilapin. </Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>7.</Text> Kilapin berhak untuk melakukan penghapusan akun dan juga blokir akun customer dengan ketentuan sebagai berikut : </Text>
      <Text style={{ marginLeft: '8%', fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>1.</Text> Customer melakukan pelanggaran terhadap syarat dan ketentuan Kilapin.</Text>
      <Text style={{ marginLeft: '8%', fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>2.</Text> Customer memberikan identitas pribadi yang dipalsukan atau disalahgunakan oleh customer.</Text>
      <Text style={{ marginLeft: '8%', fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>2.</Text> Customer diketahui telah meretas atau merusak platform aplikasi ataupun website Kilapin.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>8.</Text> Customer dapat melaporkan kepada pihak Kilapin jika ada hal yang mencurigakan atas akun yang digunakan customer.</Text>

      
      <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '3%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pasal 7</Text>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '5%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Equipment</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>1.</Text> Kilapin menyediakan peralatan dan bahan pembersih.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>2.</Text> Jika customer ingin menggunakan peralatan ataupun bahan pembersih dari customer, alat dan bahan tersebut haruslah berfungsi dengan sempurna (tidak rusak ataupun mati)  juga aman digunakan dan tidak memerlukan keahlian khusus ketika digunakan oleh Kilapeeps.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>3.</Text> Jika alat ataupun bahan pembersih dari customer sulit digunakan maka customer akan menjelaskan terlebih dahulu secara detail mengenai alat dan bahan pembersih tersebut sebelum dilakukan oleh Kilapeeps.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>4.</Text> Kilapin memiliki standar untuk setiap jasa pembersihan dengan peralatan keterampilan yang telah disediakan oleh Kilapin. Oleh karena itu, Kilapin tidak akan bertanggung jawab atas peralatan ataupun hasil penggunaanya. Therefore, Kilapin will not be responsible for any of the equipment and tools usage beside Kilapin’s very own.</Text>
        
      <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '3%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pasal 8</Text>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '5%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Booking</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>1.</Text> Customer hanya bisa melakukan booking di aplikasi Kilapin.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>2.</Text> Penawaran harga dari Kilapin berdasarkan informasi jasa yang diinginkan oleh customer. Penawaran ini berlaku selama 14 hari dari tanggal penawaran ini diberikan kepada customer.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>3.</Text> Semua pesanan yang dilakukan customer harus mengizinkan Kilapeeps untuk menggunakan air dan juga listrik untuk kebutuhan Kilapin mengerjakan jasa customer. </Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>4.</Text> Waktu estimasi Kilapeeps datang kepada customer adalah 15 menit, dengan syarat dan ketentuan tertentu, dari customer membuat pesanan pada aplikasi Kilapin. </Text>

      <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '3%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pasal 9</Text>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '5%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pembayaran</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>1.</Text> Pembayaran akan dilakukan setelah pesanan atau booking dalam aplikasi dilakukan. Pembayaran dilakukan dengan cashless.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>2.</Text> Jika terjadi pelanggaran atas ketentuan dan pasal Kilapin oleh customer maka customer sendiri yang akan bertanggung jawab kepada Kilapin untuk biaya hukum antara pengacara dengan customer.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>3.</Text> Pembayaran dilakukan hanya di dalam aplikasi, tidak bisa secara langsung kepada Kilapeeps.</Text>
        
      <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '3%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pasal 10</Text>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '5%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pembatalan</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>1.</Text> Customer yang membatalkan pesanannya lebih dari 10 detik untuk urgent cleaning, dan kurang dari 2 jam sebelum untuk booking, akan dianggap hangus, atau pesanannya tidak bisa dibatalkan.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>2.</Text> Pesanan yang memenuhi syarat untuk dibatalkan akan di-refund  sesuai dengan biaya jasa yang dipakai setelah dipotong 25% untuk biaya administrasi. </Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>3.</Text> Jika customer tidak memberikan akses untuk Kilapeeps masuk ke dalam tempat tinggalnya maka pesanannya akan dianggap hangus.</Text>


      <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '3%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pasal 11</Text>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '5%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Membership</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>1.</Text> Si Bersih, customer akan mendapatkan diskon 5% untuk pelayanan jasa kebersihan Kilapin setiap kali pemesanan dilakukan.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>2.</Text> Si Suci, customer akan mendapatkan diskon 5% untuk pelayanan jasa kebersihan Kilapin setiap kali pemesanan dilakukan. Dan mendapatkan voucher diskon senilai 10.000 rupiah untuk Advanced Cleaner yang dapat dipakai sebanyak tiga kali.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>3.</Text> Si Perfect, customer akan mendapatkan diskon 6% untuk pelayanan jasa kebersihan Kilapin setiap kali pemesanan dilakukan. Dan mendapatkan voucher diskon senilai 20.000 rupiah untuk Advanced Cleaner yang dapat dipakai sebanyak tiga kali. </Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>4.</Text> Si Paranoid, customer akan mendapatkan service satu kamar tidur secara gratis sebanyak satu kali dan mendapatkan diskon 6% untuk pelayanan jasa kebersihan Kilapin setiap kali pemesanan dilakukan.</Text>

      <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '3%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pasal 12</Text>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '5%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pengaduan</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>1.</Text> Melaporkan dalam waktu 24 jam melalui website sejak tanggal layanan dilakukan untuk pengembalian dana. Jika tidak dilakukan maka customer tidak berhak mendapatkan pengembalian dana.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>2.</Text> Kilapin membutuhkan estimasi paling lambat 5 hari kerja untuk memproses keluhan.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>3.</Text> Jika terjadi kerusakan/kecelakaan/pencurian maka Kilapin akan berusaha untuk memperbaiki atau mengganti barang tersebut bahwa terbukti dari pihak Kilapin yang melakukan kesalahan.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>4.</Text> Jika customer tidak puas dengan layanan Kilapin dengan keluhan yang diajukan dalam waktu 24 jam setelah service selesai maka Kilapeeps spesialis akan membersihkan ulang area ataupun barang tersebut untuk kepuasan customer.</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}><Text style={{fontFamily: 'Ubuntu', fontSize: 16, lineHeight: 24,}}>5.</Text> Jika pencurian terjadi selama layanan, Kilapin akan melakukan segala upaya untuk mengganti barang atau memberikan kompensasi kepada pelanggan atas barang yang dicuri. Kilapin akan menyelidiki insiden tersebut dan mengambil tindakan yang diperlukan terhadap Kilapeeps yang bertanggung jawab atas pencurian tersebut. Pelanggan diharuskan untuk melaporkan pencurian dalam waktu 24 jam sejak selesainya layanan agar memenuhi syarat untuk mendapatkan kompensasi.</Text>

      <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '3%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pasal 13</Text>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '5%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pelanggaran</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}>Jika salah satu pihak melanggar salah satu ketentuan dalam perjanjian ini maka pihak yang dirugikan harus bertanggung jawab sesuai ketentuan yang berlaku. Dan jika dirasa pelanggarannya cukup serius maka akan dilakukan secara hukum yang berlaku.</Text>

      <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '3%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Pasal 14</Text>
        <Text style={{fontFamily: 'Ubuntu', fontSize: 20, marginBottom: '5%', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>Yurisdiksi</Text>
      <Text style={{fontFamily: 'Ubuntur', fontSize: 16, lineHeight: 24, marginBottom: 20}}>Syarat dan ketentuan ini dibuat berdasarkan hukum sehingga jika terjadi permasalah ataupun perselisihan dengan syarat dan ketentuan ini maka penyelesaiannya dilakukan berdasarkan hukum Negara Republik Indonesia.</Text>
        </ScrollView>

        <TouchableOpacity
      onPress={() => navigation.navigate('MainApp', {screen: 'Profile'})}
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
      <Text style={{ color: '#fff', fontFamily: 'Ubuntu', textAlign: 'center', fontSize: 18 }}>TERIMA</Text>
    </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    header: {
      fontSize: 22,
      fontWeight: 'bold'
    },
    text: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 20,
    },
  });  

export default TermsAndCondition