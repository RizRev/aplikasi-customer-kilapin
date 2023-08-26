import React, {useState, useEffect} from "react";
// import { Image } from "expo-image";
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity,BackHandler, ScrollView,Modal,TextInput, KeyboardAvoidingView } from "react-native";
import Discount from "../../components/discount/discount";
import { Color, FontSize, Border } from "../../assets/styles/GlobalStyles";
// import { ScrollView } from "react-native-gesture-handler";
import {useSelector} from 'react-redux';
import {ApplicationActions} from '@actions';
import {useDispatch} from 'react-redux';
import { Alert } from "react-native";

const Airconditioner = ({navigation}) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.login.userId);
  const description = useSelector(state => state.application.address);
  const discount = [];
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });
  
  useEffect(() => {
    // Function to handle the hardware back gesture
    const handleHardwareBackPress = () => {
      // Navigate back to the Home screen
      navigation.navigate('Maps', {page: 'Ac'});
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

  
  const handleMembershipPress = () => {
      // Navigate to the same page without search bar field
      // Replace 'YourPageName' with the appropriate screen name
      navigation.navigate("Membership");
  };

    const handleBackPress = () => {
        navigation.navigate('Maps', {page: 'Ac'});  
    }  

    const [isEditing, setIsEditing] = useState(false);
    const [voucherCode, setVoucherCode] = useState('');

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleClaimPress = async () => {
    console.log('claim',userId,voucherCode,membership)
    const response = await fetch('https://customer.kilapin.com/voucher/claim', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          user_id: userId,
          code_voucher: voucherCode,
          membership:membership
      }),
  });

  const data = await response.json();
  console.log('response',data)
    // Lakukan tindakan klaim di sini dengan voucherCode
    console.log('Mengklaim voucher dengan kode:', voucherCode);
    Alert.alert(`${data.message}`)
    // Setelah klaim berhasil, reset state dan kembali ke tampilan awal
    setIsEditing(false);
    setVoucherCode('');
    fetchVoucherData()
  };
  return (
    <SafeAreaView style={styles.myVoucher}>
        <Image
          style={[styles.myVoucherChild, styles.voucherPosition]}
          contentFit="cover"
          source={require("../../assets/figma-assets/rectangle-1.png")}
        />
        <View style={[styles.myVoucherItem, styles.voucherPosition]} />
        <Text style={[styles.kilapeepsYouHave, styles.textTypo]}>{`Electrical Services`}</Text>
        <Image
          style={styles.generalCleaning1}
          contentFit="cover"
          source={require("../../assets/figma-assets/general-cleaning.png")}
        />
        {/* Need to Add TextInput */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
                <View style={styles.contain}>
                    <TextInput
                        // onChangeText={text => setIdCard(text)}
                        placeholder='Test'
                        success=''
                        value=''
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        {/* Need to Add TextInput */}
        <View style={[styles.back, styles.backFlexBox]}>
          <Image
            style={styles.backChild}
            contentFit="cover"
            source={require("../../assets/figma-assets/vector-1.png")}
          />
          <TouchableOpacity onPress={handleBackPress}>
              <Text style={styles.back1}>Back</Text>
          </TouchableOpacity>
        </View>
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contain: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 15,
  },
  textInput: {
      flex: 1,
      marginTop: -100,
      backgroundColor: "#f2f2f2",
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginTop: 16,
      width: "100%",
      fontSize: FontSize.size_md,
      // You can add more styles as needed
  },
  discount_card: {
    marginTop: 100,
  },
  voucherPosition: {
    width: 1000,
    left: 0,
    top: 0,
    position: "absolute",
  },
  textTypo: {
    textAlign: "left",
    color: 
    Color.white
    // 'red'
    ,
    // fontFamily: FontFamily.satoshiVariableBlack,
    fontWeight: "900",
    position: "absolute",
  },
  searchBarPosition: {
    left: "48%",
    position: "absolute",
  },
  vectorIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  backFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  myVoucher1Typo: {
    // fontFamily: FontFamily.satoshiVariableBold,
    fontWeight: "700",
    top: 9,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    position: "absolute",
  },
  myVoucherChild: {
    height: 1000,
    weight: "100%"
  },
  myVoucherItem: {
    backgroundColor: 
    Color.orchid
    // "grey"
    ,
    height: 147,
    // marginHorizontal:
  },
  kilapeepsYouHave: {
    marginTop: 40,
    top: 53,
    left: 37,
    fontSize: FontSize.size_xl,
  },
  generalCleaning1: {
    top: 154,
    left: 58,
    width: 70,
    height: 72,
    display: "none",
    position: "absolute",
  },
  searchBarChild: {
    height: "44%",
    width: "3.59%",
    top: "28%",
    right: "3.59%",
    bottom: "28%",
    left: "92.81%",
    display: "none",
  },
  searchBarItem: {
    top: 15,
    left: 290,
    height: 16,
    width: 11,
    position: "absolute",
  },
  vectorIcon: {
    width: "150%",
    height: "150%",
  },
  
  text: {
    top: 1,
    left: 3,
    fontSize: 6,
  },
  vectorParent: {
    width: 13,
    height: 10,
  },
  enterVoucherCode: {
    fontSize: 12,
    color: "#505050",
    marginLeft: 10,
    // fontFamily: FontFamily.satoshiVariableMedium,
    fontWeight: "500",
    textAlign: "left",
  },
  frame: {
    top: 5,
    left: 12,
    width: 108,
    height: 14,
    overflow: "hidden",
  },
  searchBar: {
    marginLeft: -153,
    top: 182,
    borderRadius: 60,
    borderStyle: "solid",
    borderColor: "#c2c2c2",
    borderWidth: 1,
    width: 325,
    height: 50,
  },
  backChild: {
    height: 11,
    width: 6,
  },
  back1: {
    lineHeight: 13,
    marginLeft: 7,
    fontSize: FontSize.size_xs,
    // fontFamily: FontFamily.satoshiVariableMedium,
    fontWeight: "500",
    textAlign: "left",
    color: 
    Color.white
    // 'red'
    ,
  },
  back: {
    top: 45,
    left: 25,
    width: 39,
    height: 13,
  },
  myVoucher1: {
    left: 43,
  },
  frameChild: {
    top: 35,
    left: 65,
    width: 21,
    height: 1,
    position: "absolute",
  },
  membership: {
    left: 175,
    color: Color.gray,
  },
  myVoucherParent: {
    marginLeft: -144,
    top: 130,
    borderRadius: Border.br_xl,
    backgroundColor: 
    Color.white
    // 'red'
    ,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    width: 286,
    height: 35,
  },
  myVoucher: {
    backgroundColor: 
    Color.whitesmoke
    // "grey"
    ,
    flex: 1,
    overflow: "hidden",
    height: 800,
    width: "100%",
  },
});

export default Airconditioner;
