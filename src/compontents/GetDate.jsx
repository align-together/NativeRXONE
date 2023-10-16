import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';

import color from '../assets/theme/color';
import size from '../assets/theme/size';
import weight from '../assets/theme/weight';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {fetchAsyncSelectDate} from '../features/selectDate/selectDateSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
// import { "https://rx-opd-prod-4gag6.ondigitalocean.app/v2/", live } from '../../.env'

const GetDate = ({getDate, current, type, hos_id, doc_id, dt}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
    });
  });

  const data = {type, current, pt_token, pt_key, doc_id, hos_id};
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      if (pt_token) {
        dispatch(fetchAsyncSelectDate(data));
      }
    }, [pt_token,type, current, pt_key]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          getDate(date);
          dt('2');
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View style={styles.type}>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={[
            styles.typeInner,
            {backgroundColor: color.secondary, borderRadius: 10},
          ]}>
          <Text style={styles.date}>{new Date(date).toDateString()}</Text>

          <Image
            source={require('../assets/images/date.png')}
            style={{
              width: 18,
              height: 18,
              tintColor: color.primary,
              marginLeft: 15,
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GetDate;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  type: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '80%',
  },
  typeInner: {
    height: 25,
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.primary,
    flexDirection: 'row',
  },
  date: {
    fontSize: size.font14,
    color: color.black,
    fontWeight: weight.low,
  },
  timing: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  timingText: {
    fontSize: size.font14,
    fontWeight: weight.low,
    color: color.black,
    marginLeft: 10,
  },
});
