import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import color from '../../assets/theme/color';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';

const AppointmentCard = props => {
  const navigation = useNavigation();
  const item = props.data;
  const touch = props.touch;
  const imagePlace = props.image;
  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
    });
  });

  return (
    <TouchableOpacity
      disabled={touch === 'off' ? true : false}
      onPress={() => navigation.navigate('Detail', {item, pt_token, pt_key})}
      style={styles.appointmentbox}>
      <View style={styles.rightbox}>
        <View style={styles.rightinner}>
          <Text numberOfLines={1} style={styles.name}>
            {item.doc_name}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Image source={require('../../assets/images/rx.png')} /> */}
            <Text style={styles.status}>{item.app_status}</Text>
          </View>
        </View>

        <View style={[styles.rightinner, {marginVertical: 7}]}>
          <Text numberOfLines={1} style={styles.des}>
            {item.doc_speciality}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="more-time" style={{fontSize: size.font14}} />
            <Text style={styles.time}>
              Time {item.appointment_time_formatted}
            </Text>
          </View>
        </View>

        <View style={styles.rightinner}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {item.app_type === 'Scheduled (Online)' ? (
              <Image source={require('../../assets/images/computer.png')} />
            ) : (
              <Image source={require('../../assets/images/book.png')} />
            )}
            <Text style={styles.time}>{item.app_type}</Text>
          </View>
          <View style={styles.desbox}>
            <Text style={{color: color.black, fontSize: size.font12}}>
              {item.patient_name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  appointmentbox: {
    width: '92%',
    alignSelf: 'center',
    backgroundColor: color.white,
    flexDirection: 'row',
    elevation: 1,
    borderRadius: 10,
    marginVertical: 10,
    padding: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.borderColor,
  },
  leftbox: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightbox: {
    width: '100%',
    padding: 10,
  },
  rightinner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: size.font18,
    fontWeight: weight.semi,
    color: color.black,
    width: '60%',
  },
  status: {
    fontSize: size.font12,
    color: color.primary,
    fontWeight: weight.semi,
    marginLeft: 5,
  },
  des: {
    fontSize: size.font12,
    color: color.textGrey,
    fontWeight: weight.semi,
    width: '60%',
  },
  time: {
    fontSize: size.font12,
    color: color.textGrey,
    fontWeight: weight.semi,
    marginLeft: 5,
  },
  desbox: {
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 15,
    paddingVertical: 2,
    borderColor: color.primary,
  },
  imageView: {
    width: 55,
    height: 55,
    borderRadius: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.primary,
  },
  imageText: {
    fontSize: size.font25,
    fontWeight: weight.bold,
    color: color.primary,
  },
  image: {
    borderRadius: 100,
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
});
