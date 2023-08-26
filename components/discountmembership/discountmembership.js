import React, { useMemo } from "react";
// import { Image } from "expo-image";
import { StyleSheet, View, Text, ImageSourcePropType, Image } from "react-native";
import { Border, Color, FontSize } from "../../assets/styles/GlobalStyles";

const getStyleValue = (key, value) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const DiscountMembership = ({
  promoText,
  promoCode,
  memberDiscountText,
  propTop,
  propTop1,
}) => {
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

  return (
    <View style={[styles.coupon, couponStyle]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: -20,
    marginLeft: 15,
    top: 200,
    left: 25,
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
});

export default DiscountMembership;
