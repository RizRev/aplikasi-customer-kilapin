import React, {useState, useEffect} from "react";
// import { Image } from "expo-image";
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity,BackHandler, ScrollView,Modal,TextInput } from "react-native";
import Discount from "../../components/discount/discount";
import { Color, FontSize, Border } from "../../assets/styles/GlobalStyles";
// import { ScrollView } from "react-native-gesture-handler";
import {useSelector} from 'react-redux';
import {ApplicationActions} from '@actions';
import {useDispatch} from 'react-redux';
import { Alert } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Voucher = ({navigation,route}) => {

  const dispatch = useDispatch();
  const {page,price} = route.params
  console.log("page",page,price)
  const userId = useSelector(state => state.auth.login.userId);
  const description = useSelector(state => state.application.address);
  const membership = useSelector(state => state.application.membership)
  const booking_type = useSelector(state => state.application.orderType)
  const voucher = useSelector(state => state.application.voucher)
  // const code = 'code voucher'
  // dispatch(ApplicationActions.onuseVoucher(code))
  // useEffect(() => {
  //   const backAction = () => {
  //     // Check if the current screen is Profile, if yes, navigate to Home and return true to prevent the default back action.
  //     if (navigation.isFocused()) {
  //       navigation.navigate('Order',{page: 'Voucher'})
  //       // navigation.navigate('MainApp', {screen: 'Profile'});
  //       return true;
  //     }
  //     // Return false to perform the default back action (close the app if there's no previous screen).
  //     return false;
  //   };

  //   // Add back press listener
  //   BackHandler.addEventListener('hardwareBackPress', backAction);

  //   // Clean up the listener when the component is unmounted
  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', backAction);
  //   };
  // }, [navigation]);

  // useEffect(() => {
  //   const backAction = () => {
  //     if (page ==='Profile') {

  //     } else {

  //     }
  //     navigation.navigate('MainApp');
  //     return true;
  //   };


  //   return () => backHandler.remove();
  // }, [navigation]);
  
  useEffect(() => {
    setVoucherData(voucher)
    const backAction = () => {
      if (page ==="Order"){
        console.log('masuk')
        navigation.navigate('Order',{page:'Voucher'})
      } else {
        navigation.navigate('MainApp', {screen: 'Profile'})  
      }
        return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
}, [navigation]);


  const discount = [];
  const [voucherData, setVoucherData] = useState([]);
  
  const fetchVoucherData = async () => {
    try {
      console.log('menjalankan voucher')
      const response = await fetch(`https://customer.kilapin.com/users/${userId}`);
      const data = await response.json();
      console.log('profile',data)

      // Add an incrementing 'id' property to each voucher object
      const vouchersWithId = data.data.vouchers.map((voucher, index) => ({
        ...voucher,
        id: index + 1, // Adding 1 to avoid 'id' starting from 0 if needed
      }));
        setVoucherData(vouchersWithId);
      console.log(vouchersWithId.length)
    } catch (error) {
      console.error('Error fetching voucher data:', error);
    }
  };



  useEffect(() => {
    fetchVoucherData();
  }, []);

  
  
  const handleMembershipPress = () => {
      // Navigate to the same page without search bar field
      // Replace 'YourPageName' with the appropriate screen name
      navigation.navigate("Membership");
  };

  const handleBackPress = () => {
    if (page ==="Order"){
      navigation.navigate('Order',{page: 'Voucher'})
    } else {
      navigation.navigate('MainApp', {screen: 'Profile'})  }
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
      {/* <ScrollView> */}
        <Image
          style={[styles.myVoucherChild, styles.voucherPosition]}
          contentFit="cover"
          source={require("../../assets/figma-assets/rectangle-1.png")}
        />
        <View style={[styles.myVoucherItem, styles.voucherPosition]} />
        <Text style={[styles.kilapeepsYouHave, styles.textTypo]}>{`Kilapeeps,
  you have ${voucherData.length} vouchers`}</Text>
        <Image
          style={styles.generalCleaning1}
          contentFit="cover"
          source={require("../../assets/figma-assets/general-cleaning.png")}
        />
        <View style={{backgroundColor:'red'}}>
        {page==='Order'?     
        <View>
          {voucher.map((data, index) => (
          <Discount
            key={data.id}
            promoText={require('../../assets/figma-assets/vector.png')}
            promoCode={{ uri: data.image }}
            page={`${page}`}
            memberDiscountText={`${data.event} - ${data.tnc}`}
            tnc={`${data.tnc}`}
            event={`${data.event}`}
            discount={`${data.discount}`}
            code={`${data.code}`}
            transminimum={`${data.transMinimum}`}
            maxDiscount={`${data.maxDiscount}`}
            propTop={221 + index * 150}
            style={styles.discount_card}
          />
        ))}
        </View> 
        :      
        <View>
          {voucherData.map((data, index) => (
          <Discount
            key={data.id}
            promoText={require('../../assets/figma-assets/vector.png')}
            promoCode={{ uri: data.image }}
            page={`${page}`}
            memberDiscountText={`${data.event} - ${data.tnc}`}
            tnc={`${data.tnc}`}
            event={`${data.event}`}
            discount={`${data.discount}`}
            code={`${data.code}`}
            transminimum={`${data.transMinimum}`}
            maxDiscount={`${data.maxDiscount}`}
            propTop={221 + index * 150}
            style={styles.discount_card}
          />
        ))}
        </View>}
        </View>

        <View style={[styles.searchBar, styles.searchBarPosition]}>
        {isEditing ? (
        <TextInput
          style={styles.input}
          onChangeText={setVoucherCode}
          value={voucherCode}
          placeholder="Masukkan kode voucher"
        />
      ) : (
        <TouchableOpacity onPress={handleEditPress} style={styles.ticketButton}>
<Image
            style={[styles.searchBarChild, styles.vectorIconLayout]}
            contentFit="cover"
            source={require("../../assets/figma-assets/group-21.png")}
          />
          <Image
            style={styles.searchBarItem}
            contentFit="cover"
            source={require("../../assets/figma-assets/vector-11.png")}
          />
          <View style={[styles.frame, styles.backFlexBox]}>
            <View style={styles.vectorParent}>
              <Image
                style={[styles.vectorIcon, styles.vectorIconLayout]}
                contentFit="cover"
                source={require("../../assets/figma-assets/vector2.png")}
              />
              <Text style={[styles.text, styles.textTypo]}>%</Text>
            </View>
            <Text style={styles.enterVoucherCode}>Enter voucher</Text>
          </View>
        </TouchableOpacity>
      )}

      {isEditing && (
        <TouchableOpacity onPress={handleClaimPress} style={styles.enterButton}>
          <Text style={styles.enterButtonText}>Enter</Text>
        </TouchableOpacity>
      )}
        </View>
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
        <View style={[styles.myVoucherParent, styles.searchBarPosition]}>
          <Text style={[styles.myVoucher1, styles.myVoucher1Typo]}>
            My Voucher
          </Text>
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require("../../assets/figma-assets/line-22.png")}
          />
          {/* <TouchableOpacity onPress={handleMembershipPress}>
            <Text style={[styles.membership, styles.myVoucher1Typo]}>Membership</Text>
          </TouchableOpacity> */}
        </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 20,
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

export default Voucher;
