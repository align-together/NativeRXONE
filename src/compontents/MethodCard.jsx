import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import size from '../assets/theme/size';
import weight from '../assets/theme/weight';
import color from '../assets/theme/color';

const MethodCard = props => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: props.status,
        },
      ]}>
      <View style={styles.imageBox}>
        <Image source={props.image} />
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.price}>INR. {props.rupee}</Text>
        {props.discount ? (
          <Text style={styles.dis}>(After {props.discount}% Discount)</Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={[styles.button, {
          backgroundColor: props.buttonColor,
          marginTop: props.mode === 'Pay Cash' ? 21 : 0
        }]}>
        <Text style={styles.buttonText}>{props.mode}</Text>
      </TouchableOpacity>

      <Text style={styles.desText}> {props.des}</Text>
    </View>
  );
};

export default MethodCard;
const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 175,
    borderRadius: 10,
    padding: 10,
  },
  imageBox: {
    alignSelf: 'center',
    marginVertical: 5,
  },
  contentBox: {
    alignSelf: 'center',
  },
  price: {
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.white,
    textAlign: 'center',
    lineHeight: 25,
  },
  dis: {
    fontSize: size.font10,
    fontWeight: weight.low,
    color: color.white,
    paddingVertical:4
  },
  button: {
    paddingHorizontal: 10,
    height: 20,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: size.font12,
    fontWeight: weight.semi,
    color: color.white,
  },
  desText: {
    fontSize: size.font8,
    fontWeight: weight.low,
    color: color.white,
    textAlign: 'center',
    marginTop: 5
  }
});
