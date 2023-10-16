import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import size from '../../assets/theme/size';
import color from '../../assets/theme/color';
import weight from '../../assets/theme/weight';

const BackHeader = () => {
  const navigation = useNavigation();
  const back = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity style={styles.headerbox} onPress={back}>
      <Icon name="arrow-back-ios" size={20} color={'#101623'} />
      <Text style={styles.headertext}>Back</Text>
    </TouchableOpacity>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  headerbox: {
    width: '100%',
    height: 60,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headertext: {
    fontSize: size.font18,
    color: color.black,
    fontWeight: weight.semi,
    marginLeft: 5,
  },
});
