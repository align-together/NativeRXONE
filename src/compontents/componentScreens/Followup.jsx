import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,Alert,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import BackHeader from '../headers/BackHeader';
import Slot from '../comman/Slot';
import weight from '../../assets/theme/weight';
import color from '../../assets/theme/color';
import size from '../../assets/theme/size';
import FollowStatus from '../FollowStatus';
import AppointmentType from '../AppointmentType';
import Button from '../comman/Button';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetDate from '../GetDate';
import Loader from '../comman/Loader';
// // import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../../.env'


const Followup = props => {
  const navigation = useNavigation();
  const data = props.route.params;
  const records = data.records;
  const imagePlace = data.imagePlace;
  console.log(imagePlace, 'imagePlace props');
  const [selectType, setSelectType] = useState('');
  const [status, setStatus] = useState(1);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState();
  const [slot, setSlot] = useState('');
  const [slotData, setSlotData] = useState([]);
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [slot_duration, setSlot_duration] = useState('');
  const [pType, setPType] = useState('');
  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');
  const [datas, setDatas] = useState('');

  console.log(pType, 'pType');
  console.log(current, 'current');
  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
    });
  });
  const getDate = date => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return setCurrent([year, month, day].join('-'));
  };

  //   const getDate1 = item => {
  //     console.log(item);
  //   };
  const slots = slot => {
    setSlot(slot);
    console.log(slot, 'dckdsfjkg');
  };

  const slotsData = item => {
    setSlotData(item);
    console.log(item, 'item');
  };

  useEffect(() => {
    slot ? setStatus(3) : null;
  });

  const duration = item => {
    setSlot_duration(item);
    console.log(item, 'item');
  };

  const minuteConverter = time => {
    let h = Number(time.split(':')[0]);
    let m =
      Math.round(
        ((1 / 60) * Number(time.split(':')[1]) + Number.EPSILON) * 60,
      ) / 100;
    let mConverted = Number(m.toString().split('.')[1]);
    return setTime(`${h}.${m == 0 ? m : mConverted}`);
  };

  useEffect(() => {
    minuteConverter(slot);
  });

  const handleBookButton = () => {
    const end_time = parseFloat(time) + 0.2;
    //Show Loader
    setLoading(true);
    var dataToSend = JSON.stringify({
      appointment_date: `${current}`,
      time_alloted: `${time}0`,
      is_inperson: `${pType}`,
      slot_duration: `${slot_duration}`,
      end_time: `${end_time}0`,
    });
    console.log(dataToSend, '........Follow up dataToSend');
    fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/book/followup/${live}/${data.appointment_id}`,
      {
        method: 'POST',
        body: dataToSend,
        headers: {
          //Header Defination
          pt_token: pt_token,
          pt_key: pt_key,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson) {
          navigation.navigate('Appointment');
          Alert.alert(' ',responseJson.message);
        } else {
          console.log(responseJson.message);
          Alert.alert(' ',responseJson.message);
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, 'error');
      });
  };

  const dst = item => {
    setDatas(item);
    setStatus(2);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      <BackHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerInner}>
          <Text style={styles.title}>Booking Follow-up Appointment for</Text>
          <View style={styles.box}>
            <View style={styles.boxInner}>
              <Text style={styles.boxText}>{records.patient_name}</Text>
            </View>
            <Text style={styles.title}>With</Text>
            <View
              style={[styles.boxInner, {backgroundColor: color.onlineColor}]}>
              <Text style={styles.boxText}>{records.doc_name}</Text>
            </View>
          </View>
          <Text style={styles.title}>
            Follow the steps to book the appointment
          </Text>
          <View style={{marginTop: 20}}>
            <FollowStatus status={status} />
          </View>
          <View style={styles.typeBox}>
            {selectType == '' ? (
              <>
                <Text style={styles.typeText}>Select Appointment Type</Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectType('online'), setStatus(1);
                    setPType('False');
                  }}>
                  <AppointmentType
                    name="Online (Video)"
                    image={require('../../assets/images/zoom.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectType('offline'), setStatus(1);
                    setPType('True');
                  }}>
                  <AppointmentType
                    name="In Person (at Facility)"
                    image={require('../../assets/icons/Home.png')}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <>
                {datas === '' ? (
                  <View style={styles.date}>
                    <View style={styles.dateInner}>
                      <View style={styles.dateBox}>
                        <Image
                          style={{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain',
                          }}
                          source={
                            selectType == 'online'
                              ? require('../../assets/images/zoom.png')
                              : require('../../assets/icons/Home.png')
                          }
                        />
                      </View>
                      <Text style={styles.dateText}>
                        {selectType == 'online'
                          ? 'Online Appointment'
                          : 'In Person (at Facility)'}
                      </Text>
                    </View>

                    <View style={styles.dateContainer}>
                      <Text style={styles.dateText}>Select Date</Text>

                      <GetDate
                        dt={dst}
                        getDate={getDate}
                        type={selectType}
                        current={current}
                        hos_id={records.hos_id}
                        doc_id={records.doc_id}
                      />
                    </View>
                  </View>
                ) : (
                  <>
                    {slot ? (
                      <View
                        style={{
                          marginVertical: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={{uri: imagePlace}}
                            style={styles.image}
                          />

                          <View
                            style={{
                              marginLeft: 20,
                              width: '50%',
                            }}>
                            <Text style={[styles.title, {textAlign: 'left'}]}>
                              {records.doc_name}
                            </Text>
                            <Text
                              style={{
                                fontSize: size.font12,
                                fontWeight: weight.low,
                                color: color.textGrey,
                              }}>
                              {records.doc_speciality}
                            </Text>
                          </View>
                        </View>
                        <View style={[styles.dateInner, {marginTop: 30}]}>
                          <Image
                            style={{
                              width: 20,
                              height: 20,
                              resizeMode: 'contain',
                            }}
                            source={
                              selectType == 'online'
                                ? require('../../assets/images/zoom.png')
                                : require('../../assets/icons/Home.png')
                            }
                          />
                          <Text style={styles.dateText}>
                            {selectType == 'online'
                              ? 'Online Appointment'
                              : 'In Person (at Facility)'}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={handleBookButton}
                          style={{
                            width: '60%',
                            marginTop: 20,
                            height: 30,
                          }}>
                          <Button text="Book Now" />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <>
                        <View style={styles.time}>
                          <View style={styles.dateInner}>
                            <View style={styles.dateBox}>
                              <Image
                                style={{
                                  width: 20,
                                  height: 20,
                                  resizeMode: 'contain',
                                  marginRight: 10,
                                }}
                                source={
                                  selectType == 'online'
                                    ? require('../../assets/images/zoom.png')
                                    : require('../../assets/icons/Home.png')
                                }
                              />
                            </View>
                            <Text style={styles.timeText}>
                              {selectType == 'online'
                                ? 'Online Appointment'
                                : 'In Person (at Facility)'}
                            </Text>
                          </View>

                          <View style={{width: '70%'}}>
                            <Text style={styles.timeText}>
                              Select preferred slot from {records.doc_name}{' '}
                              schedule as on
                            </Text>
                            <Text
                              style={[
                                styles.timeText,
                                {fontWeight: weight.bold, lineHeight: 25},
                              ]}>
                              {new Date(current).toDateString()}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.timeSlot}>
                          <Slot
                            slots={slots}
                            slotsData={slotsData}
                            duration={duration}
                            end_slot={(i)=>{console.log("------------------------------")}}
                          />
                        </View>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Followup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  containerInner: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: size.font14,
    color: color.black,
    fontWeight: weight.semi,
    textAlign: 'center',
    lineHeight: 25,
  },
  box: {
    marginVertical: 15,
  },
  boxInner: {
    paddingHorizontal: 25,
    borderRadius: 50,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 27,
    marginVertical: 10,
  },
  boxText: {
    fontSize: size.font12,
    color: color.white,
    fontWeight: weight.low,
  },
  typeBox: {
    marginVertical: 20,
  },
  typeText: {
    fontSize: size.font16,
    fontWeight: weight.semi,
    color: color.black,
    lineHeight: 40,
  },
  date: {
    alignSelf: 'center',
  },
  dateContainer: {
    alignSelf: 'center',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateInner: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },

  dateText: {
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.black,
    marginLeft: 10,
  },
  dateboxinner: {
    backgroundColor: color.secondary,
    borderRadius: 5,
    flexDirection: 'row',
    marginVertical: 20,
  },
  datetext: {
    fontSize: size.font14,
    fontWeight: color.textPrimary,
    color: color.black,
  },

  time: {
    paddingVertical: 20,
    backgroundColor: color.secondary,
    alignItems: 'center',
    borderRadius: 5,
  },
  timeText: {
    textAlign: 'center',
    color: color.black,
    fontSize: size.font14,
    lineHeight: 20,
    marginVertical: 5,
  },
  timeSlot: {
    marginVertical: 20,
  },
  slotText: {
    fontSize: size.font16,
    fontWeight: weight.semi,
    color: color.black,
    marginVertical: 15,
  },
  image: {
    borderRadius: 100,
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
});
