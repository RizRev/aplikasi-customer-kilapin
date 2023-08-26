import * as React from "react";
// import { Image } from "expo-image";
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity } from "react-native";
import DiscountMembership from "../../components/discountmembership/discountmembership";
import { Color, Color2, FontFamily, FontSize, Border } from "../../assets/styles/GlobalStyles";
// import LinearGradient from "react-native-linear-gradient";


const Membership = ({navigation}) => {

  const handleMembershipPress = () => {
      // Navigate to the same page without search bar field
      // Replace 'YourPageName' with the appropriate screen name
      navigation.goBack()
  };
  
  return (
    <SafeAreaView style={styles.myVoucher}>
      <Image
        style={[styles.myVoucherChild, styles.voucherPosition]}
        contentFit="cover"
        source={require("../../assets/figma-assets/rectangle-1.png")}
      />
      <View style={[styles.myVoucherItem, styles.voucherPosition]} />
      <Text style={[styles.kilapeepsYouHave, styles.textTypo]}>{`Kilapeeps,
you have 10 vouchers`}</Text>
      
      <Image
        style={styles.generalCleaning1}
        contentFit="cover"
        source={require("../../assets/figma-assets/general-cleaning.png")}
      />
      <DiscountMembership
        promoText={require("../../assets/figma-assets/vector.png")}
        promoCode={require("../../assets/figma-assets/banner1.png")}
        memberDiscountText="Disc. 20% Off for New User"
        propTop={221}
        style={styles.discount_card}
      />
      <DiscountMembership
        promoText={require("../../assets/figma-assets/vector.png")}
        promoCode={require("../../assets/figma-assets/banner.png")}
        memberDiscountText="Diskon 20% Khusus Pengguna Baru"
        propTop={386}
        propTop1={91}
      />
      
      <View style={[styles.back, styles.backFlexBox]}>
        <Image
          style={styles.backChild}
          contentFit="cover"
          source={require("../../assets/figma-assets/vector-1.png")}
        />
        <Text style={styles.back1}>Back</Text>
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
        <TouchableOpacity onPress={handleMembershipPress}>
          <Text style={[styles.membership, styles.myVoucher1Typo]}>Membership</Text>
        </TouchableOpacity>
      </View>
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
    color: Color.white,
    fontFamily: FontFamily.satoshiVariableBlack,
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
    fontFamily: FontFamily.satoshiVariableBold,
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
    height: 147,
    backgroundColor: Color2.coloratas,
    colorUp: Color2.coloratas,
    colorBot: Color2.colorbawah,
  },
  myGlobalStyle: {
    colorUp: Color2.coloratas,
    colorBot: Color2.colorbawah,
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
    fontFamily: FontFamily.satoshiVariableMedium,
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
    fontFamily: FontFamily.satoshiVariableMedium,
    fontWeight: "500",
    textAlign: "left",
    color: Color.white,
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
    backgroundColor: Color.white,
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
    backgroundColor: Color.whitesmoke,
    flex: 1,
    overflow: "hidden",
    height: 800,
    width: "100%",
  },
});

export default Membership;
