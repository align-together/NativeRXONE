import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import color from '../../assets/theme/color';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';

const BookHeader = ({name, image}) => {
  console.log('                   image                   ', image, name)
  const navigation = useNavigation();
  const back = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <View style={styles.box}>
          <Image source={{uri: image}} style={styles.icon} />
          <Text numberOfLines={1} style={styles.text}>{name}</Text>
        </View>
        <TouchableOpacity onPress={back}>
          <Icon name="close" size={size.font20} color={color.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: color.backgroundColor,
  },
  containerInner: {
    width: '90%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    borderColor: color.borderColor,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    marginRight: 20,
  },
  text: {
    fontSize: size.font16,
    fontWeight: weight.semi,
    color: color.black,
    width:'80%'
  },
});
