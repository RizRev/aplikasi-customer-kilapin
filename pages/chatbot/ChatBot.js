import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = newMessages => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    const userMessage = newMessages[0].text;
    const botMessage = generateBotResponse(userMessage);
    setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
  };

  const generateBotResponse = userMessage => {
    let botMessage;
  
    const keywords = [
      { keyword: 'hi', response: 'Hello! How can I assist you?' },
      { keyword: 'how are you?', response: "I'm a bot, so I don't have feelings. But thank you for asking!" },
      { keyword: 'kilapin', response: 'One stop solution for the sanitation in Indonesia.' },
      { keyword: 'pembayaran', response: 'Pada proses pembayaran, Kilapin hanya menyediakan layanan pembayaran cashless dengan adanya koneksi pada berbagai e-wallet dan virtual account untuk E-Banking, M-Banking, dan QRIS.' },
      { keyword: 'dana kembali', response: `Apabila kamu mengalami kendala, kamu tidak perlu khawatir karena pengembalian saldo dapat dilakukan oleh Kilasquad.Jika kamu mengalami kendala Cleaner yang datang tidak sesuai dengan aplikasi, silakan tekan tombol report pada aplikasi atau laporkan pada halaman ‘help’ di website Kilapin. 
  
        Jika kamu mengalami kendala cleaning session dibatalkan atau transaksi gagal namun saldo/limit terpotong, jangan khawatir. Saldo pada kartu kredit/debit akan kembali secara otomatis dalam waktu berikut: 
  
        1. Untuk Bank BCA & BRI pengembalian saldo akan mengambil waktu maksimal 7 hari kerja. 
        2. Untuk Bank lainnya pengembalian saldo akan mengambil waktu maksimal 14 hari kerja. 
  
        Apabila sudah menunggu hingga waktu tersebut namun saldo belum juga kembali, mohon beritahukan ke kami melalui halaman ‘help’ pada website Kilapin. 
  
        Tombol Hubungi kami hanya tersedia jika kamu membuka halaman ini melalui handphone/tablet.` },
      { keyword: 'membership', response: `Si Bersih 
               Ketika sudah mendapatkan 150 poin, kamu berhak mendapatkan diskon 5% untuk menggunakan Kilapin Service.
  
               Si Suci
               Ketika sudah mendapatkan 750 point, kamu berhak mendapatkan discount 5% untuk menggunakan Kilapin Service dan juga voucher discount untuk add-ons service sebesar 10.000 untuk tiga kali penggunaan. 
  
               Si Perfect
               Ketika sudah mendapatkan 2000 point, kamu berhak mendapatkan discount 6% untuk menggunakan Kilapin Service dan juga voucher discount untuk add-ons service sebesar 20.000 untuk tiga kali penggunaan. 
  
               Si Paranoid
               Ketika sudah mendapatkan 5000 point, kamu berhak mendapatkan FREE service (hanya berlaku satu kali untuk satu kamar tidur) dan discount 6% untuk menggunakan Kilapin Service.` },
      { keyword: 'bye', response: 'Goodbye! Have a great day!' },
    ];
  
    const lowerCaseMessage = userMessage.toLowerCase();
    const matchedKeyword = keywords.find(keywordObj => lowerCaseMessage.includes(keywordObj.keyword));
  
    if (matchedKeyword) {
      botMessage = {
        _id: Math.random().toString(),
        text: matchedKeyword.response,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'ChatBot',
        },
      };
    } else {
      botMessage = {
        _id: Math.random().toString(),
        text: "I'm sorry, I didn't understand that. Can you please rephrase your question?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'ChatBot',
        },
      };
    }
  
    return botMessage;
  };
  
  
  

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#5865F2'
          },
          left: {
            backgroundColor: '#E0E0E0'
          }
        }}
        textStyle={{
          right: {
            color: '#FFFFFF'
          },
          left: {
            color: '#000000'
          }
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kilapin ChatBot</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{
          _id: 1
        }}
        renderBubble={renderBubble}
        placeholder="Type your message..."
        showUserAvatar={false}
        renderUsernameOnMessage
        bottomOffset={Platform.OS === 'ios' ? 34 : 0} // Adjust bottom offset for iOS devices
        scrollToBottom
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    marginTop:heightPercentageToDP('5%')
  },
  header: {
    backgroundColor: '#DA7DE1',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF'
  }
});

export default ChatBot;