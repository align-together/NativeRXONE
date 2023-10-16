import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import size from '../../assets/theme/size';
import color from '../../assets/theme/color';
import weight from '../../assets/theme/weight';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';

const Slot = ({
  type,
  current,
  slots,
  slotsData,
  hos_id,
  doc_id,
  duration,
  end_slot,
}) => {

  const [slot, setSlot] = useState('');
  const [morningSlot, setMorningSlot] = useState([]);
  const [afternoonSlot, setAfternoonSlot] = useState([]);
  const [eveningSlot, setEveningSlot] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectDate = useSelector(state => state.selectDate);

  const slotData = selectDate.selectDate.time_slots;
  console.log('slotData', slotData)
  console.log('000000000000000000000000000000000000000', selectDate);

  // {(selectDate.selectDate.time_slots).map(({e}) => {
  //   console.log(e);
  // })}

  // useEffect(() => {
  //   slots(slot);
  // }, [slot, slotData]);

  useEffect(() => {
    console.log('slotData', slotData)
    let d = slotData?.filter((item) => item.slot <= '12:00')
    setMorningSlot(d)
    let b = slotData?.filter((item) => item.slot >= '12:20' && item.slot <= '17:00')
    setAfternoonSlot(b)
    let g = slotData?.filter((item) => item?.slot >= '17:20')
    setEveningSlot(g)
  }, [slot, slotData]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  });

  const eveSlots = () => {
    console.log('eveSlots', slotData);

    {
      slotData?.map((item) => {
        if (item.slot <= '09:00') { console.log("Morning", item.slot) }
        else if (item.slot > '09:00' && item.slot <= '11:00') console.log("Af", item.slot)
        else console.log("Evening", item.slot);
        // console.log(item.slot);
      })
    }
  }

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      {selectDate.loading === true ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50,
          }}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator
              animating={true}
              color={color.primary}
              size={size.font25}
              style={styles.activityIndicator}
            />
          </View>
        </View>
      ) : (
        <>
          {!slotData ? (
            <Text style={styles.error}>{selectDate.selectDate.message}</Text>
          ) : (
            <>
              <>
                <View style={styles.timing}>
                  <Icon
                    name="partly-sunny-outline"
                    size={size.font20}
                    color={color.black}
                  />
                  <Text style={styles.timingText} onPress={eveSlots} >Morning</Text>
                </View>
                <FlatList
                  data={morningSlot}
                  numColumns={4}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <>

                      <TouchableOpacity
                        disabled={item.is_available === true ? false : true}
                        onPress={() => {
                          setSlot(item.slot);
                          slots(item.slot);
                          duration(item.slot_duration);
                          end_slot(item.end_time);
                        }}
                        style={[
                          styles.slotStyle,
                          {
                            backgroundColor:
                              item.slot === slot && item.is_available === true
                                ? color.primary
                                : color.secondary,
                            borderWidth: item.is_available === true ? 1 : 0,
                            borderColor: color.primary,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.text,
                            {
                              color:
                                item.slot === slot
                                  ? color.white
                                  : color.textGrey,
                            },
                          ]}>
                          {item.slot} AM
                        </Text>
                      </TouchableOpacity>

                    </>
                  )}
                />
              </>





              <>
                <View style={styles.timing}>
                  <Icon
                    name="sunny-outline"
                    size={size.font20}
                    color={color.black}
                  />
                  <Text style={styles.timingText} onPress={() => {
                    (slotData.map((e) => {
                      if (e.slot >= '12:20' && e.slot <= '17:00') console.log(e)
                    }))
                  }}>Afternoon</Text>
                </View>
                <FlatList
                  data={afternoonSlot}
                  numColumns={4}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <>
                      <TouchableOpacity
                        disabled={(item.is_available === true) ? false : true}
                        onPress={() => {
                          setSlot(item?.slot);
                          slots(item?.slot);
                          duration(item?.slot_duration);
                          end_slot(item?.end_time);
                        }}
                        style={[
                          styles.slotStyle,
                          {
                            backgroundColor:
                              (item.slot === slot && item.is_available) === true
                                ? color.primary
                                : color.secondary,
                            borderWidth: item.is_available === true ? 1 : 0,
                            borderColor: color.primary,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.text,
                            {
                              color:
                                item.slot === slot
                                  ? color.white
                                  : color.textGrey,
                            },
                          ]}>
                          {item.slot} PM
                        </Text>

                      </TouchableOpacity>

                    </>
                  )}
                />
              </>






              <>
                <View style={styles.timing}>
                  <Icon
                    name="moon-outline"
                    size={size.font20}
                    color={color.black}
                  />
                  <Text style={styles.timingText}
                    onPress={() => {
                      (slotData.map((e) => {
                        if (e?.slot >= '17:20') {
                          console.log(e)
                        } else {
                          <Text>Demo</Text>
                        }
                      }));
                      eveSlots
                    }}
                  >Evening</Text>
                </View>
                <FlatList
                  data={eveningSlot}
                  numColumns={4}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                    <>

                      <TouchableOpacity
                        disabled={item.is_available === true ? false : true}
                        onPress={() => {
                          setSlot(item.slot);
                          slots(item.slot);
                          duration(item.slot_duration);
                          end_slot(item.end_time);
                        }}
                        style={[
                          styles.slotStyle,
                          {
                            backgroundColor:
                              (item.slot === slot && item.is_available) === true
                                ? color.primary
                                : color.secondary,
                            borderWidth: item.is_available === true ? 1 : 0,
                            borderColor: color.primary,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.text,
                            {
                              color:
                                item.slot === slot &&
                                  item.is_available === true
                                  ? color.white
                                  : color.textGrey,
                            },
                          ]}>
                          {item.slot} PM
                        </Text>
                      </TouchableOpacity>


                    </>
                  )}
                />
              </>



            </>
          )}
        </>
      )}
    </View>
  );
};

export default Slot;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  slotStyle: {
    width: '22.5%',
    height: 25,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  text: {
    fontSize: size.font12,
    color: color.textGrey,
    fontWeight: weight.semi,
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
  error: {
    fontSize: size.font14,
    fontWeight: weight.low,
    color: color.errorColor,
    textAlign: 'center',
    marginTop: 50,
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 50,
    width: 50,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
