import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import color from '../../assets/theme/color';

const AbhaComman = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          marginBottom: 15,
          resizeMode: 'contain',
          width: 150,
          height: 50,
        }}
        source={require('../../assets/images/national-health.png')}
      />
      <Text style={styles.text}>Integrate your Profile with ABHA </Text>
      <Text style={styles.text}>(Ayushman Bharat Health Account)</Text>
    </View>
  );
};

export default AbhaComman;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: size.font14,
    fontWeight: weight.low,
    color: color.black,
    textAlign: 'center',
  },
});
