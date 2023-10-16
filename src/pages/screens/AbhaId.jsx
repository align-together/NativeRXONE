import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-community/clipboard';

import color from '../../assets/theme/color';
import BackHeader from '../../compontents/headers/BackHeader';
import AbhaComman from '../../compontents/comman/AbhaComman';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import Button from '../../compontents/comman/Button';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const AbhaId = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader />
      <View style={styles.body}>
        <AbhaComman />
        <Text style={[styles.text, {alignSelf: 'center', marginVertical: 30}]}>
          Creating ABHA ID for
        </Text>
        <View style={styles.top}>
          <Text style={styles.topText}>Anuj Pawar</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AbhaId;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  body: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  title: {
    marginVertical: 20,
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.black,
    textAlign: 'center',
  },
  text: {
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.black,
    marginVertical: 20,
    textAlign: 'center',
  },
  top: {
    height: 25,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    paddingHorizontal: 15,
    marginBottom: 10,
    alignSelf: 'center',
  },
  topText: {
    fontSize: size.font12,
    fontWeight: weight.low,
    color: color.white,
  },
});
