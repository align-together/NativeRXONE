import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import size from '../assets/theme/size';
import weight from '../assets/theme/weight';
import color from '../assets/theme/color';

const Slider = () => {
  const sliderarray = [
    {
      id: '0',
      img: require('../assets/images/slide1.png'),
      discription: 'Connect with your trusted doctor',
    },
    {
      id: '1',
      img: require('../assets/images/slide2.png'),
      discription: 'Intelligent insights of your health',
    },
    {
      id: '2',
      img: require('../assets/images/slide3.png'),
      discription: 'Free Care Tools',
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (activeIndex < 2) {
        setActiveIndex(activeIndex + 1);
      } else {
        setActiveIndex(0);
      }
    }, 2000);
  });
  return (
    <>
      <Image
        source={sliderarray[activeIndex]?.img}
        resizeMode={'contain'}
        style={styles.profileimg}
      />
      <Text style={styles.discriptiontext}>
        {sliderarray[activeIndex]?.discription}
      </Text>
      <View style={styles.activeindexview}>
        <View
          style={{
            height: 10,
            width: 10,
            alignSelf: 'center',
            margin: 5,
            borderRadius: 50,
            backgroundColor: activeIndex == '0' ? '#199a8e' : '#d9d9d9',
          }}
        />
        <View
          style={{
            height: 10,
            width: 10,
            alignSelf: 'center',
            margin: 5,
            borderRadius: 50,
            backgroundColor: activeIndex == '1' ? '#199a8e' : '#d9d9d9',
          }}
        />
        <View
          style={{
            height: 10,
            width: 10,
            alignSelf: 'center',
            margin: 5,
            borderRadius: 50,
            backgroundColor: activeIndex == '2' ? '#199a8e' : '#d9d9d9',
          }}
        />
      </View>
    </>
  );
};

export default Slider;

const styles = StyleSheet.create({
  profileimg: {
    width: 270,
    height: 270,
  },
  discriptiontext: {
    textAlign: 'center',
    fontSize: size.font14,
    fontWeight: weight.bold,
    color: color.primary,
    width: '80%',
    alignSelf: 'center',
  },
  activeindexview: {
    flexDirection: 'row',
    alignSelf: 'center',
    margin: 20,
  },
  containerstyle: {
    width: '90%',
    alignSelf: 'center',
    borderColor: color.primary,
    color: color.primary,
  },
});
