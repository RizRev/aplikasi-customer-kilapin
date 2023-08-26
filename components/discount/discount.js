import React, { useMemo,useState } from "react";
// import { Image } from "expo-image";
import { StyleSheet, View, Text, ImageSourcePropType, Image,TouchableOpacity,Modal } from "react-native";
import { Border, Color, FontSize } from "../../assets/styles/GlobalStyles";
import {useSelector} from 'react-redux';
import {ApplicationActions} from '@actions';
import {useDispatch} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';




const getStyleValue = (key, value) => {
  
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const Discount = ({
  promoText,
  promoCode,
  memberDiscountText,
  tnc,
  event,
  code,
  discount,
  propTop,
  propTop1,
  page,
  transminimum,
  maxDiscount
}
) => {
  let dispatch = useDispatch();
  const navigation = useNavigation();
  const couponStyle = useMemo(() => {
    return {
      ...getStyleValue("top", propTop),
    };
  }, [propTop]);

  const diskon20KhususStyle = useMemo(() => {
    return {
      ...getStyleValue("top", propTop1),
    };
  }, [propTop1]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleUse = (code,discount) => {
    setIsModalVisible(false)
    console.log('ini voucher',maxDiscount,transminimum)
    dispatch(ApplicationActions.onmaxDiscount(maxDiscount))
    dispatch(ApplicationActions.onminTrans(transminimum))
    dispatch(ApplicationActions.onuseVoucher(code))
    dispatch(ApplicationActions.onvoucherDiscount(discount))
    navigation.navigate('Order',{page: 'Voucher_discount',code:code,discount: discount})
  }

  console.log("INI TNC : ",JSON.stringify(tnc));
  const tncItems = tnc.split('-').map(item => item.trim()).filter(item => item !== '');


  return (
    <View>
      <View 
    style={[styles.discountContainer, couponStyle]}>
      <TouchableOpacity 
      onPress={toggleModal}
      style={styles.coupon}>
        <Image style={styles.vectorIcon} contentFit="cover" source={promoText} />
        <Image
          style={[styles.bannerIcon, styles.titleLayout]}
          contentFit="cover"
          source={promoCode}
        />
        <View style={[styles.title, styles.titleLayout]} />
        <Text style={[styles.diskon20Khusus, diskon20KhususStyle]}>
          {memberDiscountText}
        </Text>
      </TouchableOpacity>
    </View>
    <Modal visible={isModalVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          {/* <Text>{discount}</Text> */}
          {/* <Image contentFit="cover" source={promoText} /> */}
          <Image
          style={styles.image_voucher}
          contentFit="cover"
          source={promoCode}
        />
          {/* <Text style={{color:'purple',textAlign:'center',fontSize:20,fontWeight:'bold'}}>Event</Text>
          <Text style={{fontWeight:'bold',textAlign:'center', paddingBottom:10}}>{event}</Text> */}
          <Text style={{color:'purple',textAlign:'left',fontSize:15,fontWeight:'bold'}}>Terms & Condition</Text>
          {tncItems.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bulletPoint}>&bull;</Text>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
            <View style={styles.footer_button}>
              {page === 'Order' ? 
              <TouchableOpacity onPress={() => toggleUse(code,discount)} >
                <View style={styles.button_press_footer}>
                  <Text style={styles.closeButton}>Use</Text>
                </View>
              </TouchableOpacity>
            :
            <View style={styles.button_press_footer}></View>
              }
               <TouchableOpacity onPress={toggleModal}>
                <View style={styles.button_press_footer}>
                  <Text style={styles.closeButton}>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  image_voucher:{
    width: "100%",
    height:100,
    borderRadius: 15,
    marginBottom: 10
  },
  button_press_footer:{
    alignItems: "center",
  },
  footer_button:{
    padding:10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white"
  },
  titleLayout: {
    width: 249,
    borderTopRightRadius: Border.br_xl,
    borderTopLeftRadius: Border.br_xl,
    position: "absolute",
  },
  vectorIcon: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
    position: "absolute",
  },
  bannerIcon: {
    top: 14,
    left: 30,
    height: 68,
  },
  title: {
    top: 129,
    left: 279,
    backgroundColor: Color.white,
    height: 47,
    transform: [
      {
        rotate: "-180deg",
      },
    ],
  },
  diskon20Khusus: {
    marginLeft: -106.5,
    top: 89,
    left: "50%",
    fontSize: FontSize.size_sm,
    lineHeight: 15,
    fontWeight: "700",
    // fontFamily: FontFamily.satoshiVariableBold,
    color: Color.black,
    textAlign: "left",
    width: 214,
    height: 27,
    position: "absolute",
  },
  coupon: {
    // backgroundColor:'blue',
    marginTop: 30,
    // top: 200,
    left: 50,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    width: 309,
    height: 142,
    position: "absolute",
  },
  discountContainer: {
    // backgroundColor:'green',
    // height:'20%',
    // width:'80%',
    marginTop: 0,
    // marginLeft: 13,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width:'80%',
    // height:'80%',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginTop: 10,
    color: "blue",
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: 10,
    marginRight: 5,
  },
  itemText: {
    flex: 1,
  },
});

export default Discount;
