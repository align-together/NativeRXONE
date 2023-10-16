import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fetchProfiles } from '../../features/profile/profileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../compontents/headers/Header';
import GetProfile from '../../compontents/comman/GetProfile';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import color from '../../assets/theme/color';
import Chart from '../../compontents/comman/Chart';
import { TouchableOpacity } from 'react-native';
import Button from '../../compontents/comman/Button';
import HeartRate from '../../compontents/comman/HeartRate';
import Loader from '../../compontents/comman/Loader';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env';

const Track = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = useState();
  const [profile_id, setProfile_id] = useState('');
  const [profile, setProfile] = useState('');
  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');
  const [record, setRecord] = useState();
  const [trendRecord, setTrendRecord] = useState();
  const [recordData, setRecordData] = useState();
  const [selectBio, setSelectBio] = useState(null);
  const [firstIndex, setFirstIndex] = useState();
  const [count, setCount] = useState();

  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
    });
    // AsyncStorage.getItem('profile').then(value => {
    //   console.log('profile id is  .........................', value)
    //   setProfile_id(value);
    // });
  });

  const params = { pt_token, pt_key };
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      if (pt_token) {
        dispatch(fetchProfiles(params));
      }
    }, [pt_token, pt_key, profile_id]),
  );

  const getProfile_Id = item => {
    setProfile_id(item.profile_id);
    setProfile(item);
  };

  const handleRecordData = async () => {
    setLoading(true);
    console.log('setLoading true .......    1')
    const response = await fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/list/master/trackers/${live}/${profile_id}`,
      {
        headers: {
          pt_token: pt_token,
          pt_key: pt_key,
        },
      },
    );
    try {
      if (response.status === 401) {
        console.log(response);
        console.log('Could not authenticate user with the provided details');
        setLoading(false);
      } else {
        const data = await response.json();
        setRecord(data.records);
        // console.log(data);
        const firstIndex = data.records[0];
        setFirstIndex(firstIndex);
        setLoading(false);
      }
    } catch (error) {
      console.log('............error of handleRecordDa.ta', error)
      setLoading(false);

    }
  };

  const handleRecordPainData = async () => {
    setLoading(true);
    console.log('setLoading true .......    2', profile_id, live)

    const response = await fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/list/pain/areas/${live}/${profile_id}/chronic_pain`,
      {
        headers: {
          pt_token: pt_token,
          pt_key: pt_key,
        },
      },
    );
    console.log('response', response)
    console.log('profile_id', profile_id)
    try {
      if (response.status === 401) {
        console.log(response);
        console.log('Could not authenticate user with the provided details');
        setLoading(false);
      } else {
        const data = await response.json();
        const dataArray = data.records;
        const lastIndex = dataArray.length - 1; // get the last index

        setCount(dataArray[lastIndex].body_part_no);
        console.log(data, '/ggg....................................///');
        setLoading(false);
      }
    } catch (error) {
      console.log('............error of handleRecordPainDa.ta', error, profile_id, live);
      setLoading(false);

    }
  };

  useEffect(() => {
    if (firstIndex) {
      selectValue(firstIndex);
      handleTrendRecordData(firstIndex.bio_marker);
    }
  }, firstIndex);
  const handleTrendRecordData = async value => {
    console.log(value, '***********value *****************');
    setLoading(true);
    console.log('setLoading true .......    3')

    console.log(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/fetch/bio/trend/${live}/${profile_id}/${value}`,
      '*****************************',
    );
    const response = await fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/fetch/bio/trend/${live}/${profile_id}/${value}`,
      {
        headers: {
          pt_token: pt_token,
          pt_key: pt_key,
        },
      },
    );

    try {
      if (response.status === 401) {
        // navigation.navigate('Login');
        console.log('Could not authenticate user with the provided details');
        setLoading(false);
      } else {
        const data = await response.json();
        setTrendRecord(data.records);
        console.log(
          data,
          'the trend trackers data **************************************************************',
        );
        setLoading(false);
      }
    } catch (err) {
      console.log('err of handleTrendRecordDa.ta', err)
      setLoading(false);
    }
  };


  const bio = item => {
    console.log('---- 1 ===> bio is')
    setSelectBio(item);
    console.log(item, 'jbbk................................');
  };

  useFocusEffect(
    React.useCallback(() => {
      if (pt_token) {
        handleRecordData();
        handleRecordPainData();
      }
    }, [pt_token, pt_key, profile_id]),
  );

  const selectValue = value => {
    const result = record.find(item => item.bio_marker === value.bio_marker);
    let data = [result];
    setRecordData(data);
    handleRecordData();
  };

  useEffect(() => {
    setTimeout(() => {
      if (selectBio) {
        selectValue(selectBio);
        handleTrendRecordData(selectBio.bio_marker);
      }
    }, 3000)
  }, [selectBio, pt_token, pt_key, profile_id]);

  const handleFacility = value => {
    setLoading(true);
    console.log('setLoading true .......    4')

    fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/switch/bio/facility/${live}/${profile_id}/${value}`,
      {
        method: 'PUT',
        headers: {
          //Header Defination
          'Content-Type': 'application/json',
          pt_token: pt_token,
          pt_key: pt_key,
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        // handleRecordData();
        selectValue(selectBio);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......facility......');
      });
  };

  const handleDoctor = value => {
    setLoading(true);
    console.log('setLoading true .......    5')

    fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/switch/bio/doctor/${live}/${profile_id}/${firstIndex ? firstIndex.bio_marker : value
      }`,
      {
        method: 'PUT',
        headers: {
          //Header Defination
          'Content-Type': 'application/json',
          pt_token: pt_token,
          pt_key: pt_key,
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        // handleRecordData();
        selectValue(selectBio);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......share_with_doctor......');
      });
  };

  console.log(recordData, 'this recordData data');
  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      <Header />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRecordData}
          />
        }>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Select Profile</Text>
          <GetProfile getProfile_Id={getProfile_Id} />
          {record ? (
            <View>
              <Text style={[styles.desc, { marginVertical: 15 }]}
                onPress={() => (console.log("resords si ", record),
                  console.log("...", recordData))}>
                Avaliable Charts
              </Text>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={record}
                renderItem={({ item }) => (
                  <View style={{ marginBottom: 10 }}>
                    <Chart
                      item={item}
                      touch="on"
                      bio={bio}
                      firstIndex={recordData}
                      handleUpdateData={() => { }}
                    />
                  </View>
                )}
              />

              {selectBio ? (
                <>
                  {selectBio.bio_marker === 'chronic_pain' ? (
                    <>
                      <View style={{ margin: 0 }}>
                        <Text style={styles.desc}>
                          Latest record intensity of pain
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: '#4F3F59',
                          width: '100%',
                          height: 560,
                          marginTop: 20,
                        }}>
                        <View
                          style={{
                            paddingVertical: 20,
                            width: '90%',
                            alignSelf: 'center',
                          }}>
                          <Image
                            style={{
                              width: '90%',
                              height: 440,
                              resizeMode: 'contain',
                              alignSelf: 'center',
                            }}
                            source={require('../../assets/images/body.png')}
                          />
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: -435,
                              width: 35,
                              justifyContent: 'space-between',
                              alignSelf: 'center',
                              marginRight: 8,
                            }}>
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '1' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '2' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              alignSelf: 'center',
                              marginTop: 40,
                            }}>
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '3' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 5,
                              width: 66,
                              justifyContent: 'space-between',
                              alignSelf: 'center',
                              marginRight: 8,
                            }}>
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '4' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '5' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 15,
                              width: 145,
                              justifyContent: 'space-between',
                              alignSelf: 'center',
                              marginRight: 8,
                            }}>
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '6' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '12' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '13' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '7' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 27,
                              width: 196,
                              justifyContent: 'space-between',
                              alignSelf: 'center',
                              marginRight: 7,
                            }}>
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '8' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                            <View
                              style={{
                                flexDirection: 'row',
                                width: 50,
                                justifyContent: 'space-between',
                              }}>
                              <TouchableOpacity
                                disabled={true}
                                style={[
                                  styles.pain,
                                  {
                                    backgroundColor:
                                      count === '14'
                                        ? color.errorColor
                                        : 'green',
                                  },
                                ]}
                              />
                              <TouchableOpacity
                                disabled={true}
                                style={[
                                  styles.pain,
                                  {
                                    backgroundColor:
                                      count === '15'
                                        ? color.errorColor
                                        : 'green',
                                  },
                                ]}
                              />
                            </View>
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '9' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 20,
                              width: 254,
                              justifyContent: 'space-between',
                              alignSelf: 'center',
                              marginRight: 8,
                            }}>
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '10' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '16' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '11' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 17,
                              width: 60,
                              justifyContent: 'space-between',
                              alignSelf: 'center',
                              marginRight: 10,
                            }}>
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '17' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '18' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 50,
                              width: 55,
                              justifyContent: 'space-between',
                              alignSelf: 'center',
                              marginRight: 10,
                            }}>
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '19' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '20' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 24,
                              width: 53,
                              justifyContent: 'space-between',
                              alignSelf: 'center',
                              marginRight: 10,
                            }}>
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '21' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '22' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 50,
                              width: 55,
                              justifyContent: 'space-between',
                              alignSelf: 'center',
                              marginRight: 10,
                            }}>
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '23' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                            <TouchableOpacity
                              disabled={true}
                              style={[
                                styles.pain,
                                {
                                  backgroundColor:
                                    count === '24' ? color.errorColor : 'green',
                                },
                              ]}
                            />
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            backgroundColor:
                              selectBio.latest_measure == '1'
                                ? color.primary
                                : color.white,
                            borderRadius: 100,
                          }}>
                          <Text
                            style={{
                              fontSize: size.font18,
                              padding: 2,
                            }}>
                            😒
                          </Text>
                        </View>

                        <View
                          style={{
                            backgroundColor:
                              selectBio.latest_measure == '2'
                                ? color.primary
                                : color.white,
                            borderRadius: 100,
                          }}>
                          <Text
                            style={{
                              fontSize: size.font18,
                              padding: 2,
                            }}>
                            😞
                          </Text>
                        </View>

                        <View
                          style={{
                            backgroundColor:
                              selectBio.latest_measure == '3'
                                ? color.primary
                                : color.white,
                            borderRadius: 100,
                          }}>
                          <Text
                            style={{
                              fontSize: size.font18,
                              padding: 2,
                            }}>
                            😔
                          </Text>
                        </View>

                        <View
                          style={{
                            backgroundColor:
                              selectBio.latest_measure == '4'
                                ? color.primary
                                : color.white,
                            borderRadius: 100,
                          }}>
                          <Text
                            style={{
                              fontSize: size.font18,
                              padding: 2,
                            }}>
                            😟
                          </Text>
                        </View>

                        <View
                          style={{
                            backgroundColor:
                              selectBio.latest_measure == '5'
                                ? color.primary
                                : color.white,
                            borderRadius: 100,
                          }}>
                          <Text
                            style={{
                              fontSize: size.font18,
                              padding: 2,
                            }}>
                            ☹️
                          </Text>
                        </View>

                        <View
                          style={{
                            backgroundColor:
                              selectBio.latest_measure == '6'
                                ? color.primary
                                : color.white,
                            borderRadius: 100,
                          }}>
                          <Text
                            style={{
                              fontSize: size.font18,
                              padding: 2,
                            }}>
                            😣
                          </Text>
                        </View>

                        <View
                          style={{
                            backgroundColor:
                              selectBio.latest_measure == '7'
                                ? color.primary
                                : color.white,
                            borderRadius: 100,
                          }}>
                          <Text
                            style={{
                              fontSize: size.font18,
                              padding: 2,
                            }}>
                            😖
                          </Text>
                        </View>

                        <View
                          style={{
                            backgroundColor:
                              selectBio.latest_measure == '8'
                                ? color.primary
                                : color.white,
                            borderRadius: 100,
                          }}>
                          <Text
                            style={{
                              fontSize: size.font18,
                              padding: 2,
                            }}>
                            😫
                          </Text>
                        </View>

                        <View
                          style={{
                            backgroundColor:
                              selectBio.latest_measure == '9'
                                ? color.primary
                                : color.white,
                            borderRadius: 100,
                          }}>
                          <Text
                            style={{
                              fontSize: size.font18,
                              padding: 2,
                            }}>
                            😢
                          </Text>
                        </View>

                        <View
                          style={{
                            backgroundColor:
                              selectBio.latest_measure == '10'
                                ? color.primary
                                : color.white,
                            borderRadius: 100,
                          }}>
                          <Text
                            style={{
                              fontSize: size.font18,
                              padding: 2,
                            }}>
                            😭
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: size.font12,
                            color: color.black,
                          }}>
                          Low Pain
                        </Text>
                        <Text
                          style={{
                            fontSize: size.font12,
                            color: color.black,
                          }}>
                          High Pain
                        </Text>
                      </View>
                    </>
                  ) : null}
                </>
              ) : null}

              {selectBio ?
                <>
                  {selectBio.bio_marker === 'chronic_pain' ? null : (
                    <>
                      {trendRecord ? (
                        <FlatList
                          horizontal={false}
                          data={recordData}
                          renderItem={({ item }) => (
                            <View style={{ marginBottom: 20, marginTop: 10 }}>
                              {trendRecord ? (
                                <>
                                  <Text style={styles.desc}>
                                    {item.display_name}
                                  </Text>
                                  <HeartRate item={trendRecord} />
                                  <View style={styles.button}>
                                    <View style={styles.buttonInner}>
                                      <Text style={styles.buttonText}>
                                        Share with Facility
                                      </Text>
                                      <View style={styles.switchBox}>
                                        <TouchableOpacity
                                          onPress={() => {
                                            handleFacility(item.bio_marker);
                                            selectValue(item);
                                          }}
                                          style={{
                                            width: 20,
                                            height: 15,
                                            backgroundColor:
                                              item.facility_share_consent == false
                                                ? color.buttonGray
                                                : color.secondary,
                                            borderTopLeftRadius: 5,
                                            borderBottomLeftRadius: 5,
                                          }}
                                        />
                                        <TouchableOpacity
                                          onPress={() => {
                                            handleFacility(item.bio_marker);
                                            selectValue(item);
                                          }}
                                          style={{
                                            width: 20,
                                            height: 15,
                                            borderTopRightRadius: 5,
                                            borderBottomRightRadius: 5,
                                            backgroundColor:
                                              item.facility_share_consent == true
                                                ? color.primary
                                                : color.secondary,
                                          }}
                                        />
                                      </View>
                                    </View>
                                    <View style={styles.buttonInner}>
                                      <Text style={styles.buttonText}>
                                        Share with Doctor
                                      </Text>
                                      <View style={styles.switchBox}>
                                        <TouchableOpacity
                                          onPress={() => {
                                            handleDoctor(item.bio_marker);
                                            selectValue(item);
                                          }}
                                          style={{
                                            width: 20,
                                            height: 15,
                                            backgroundColor:
                                              item.doctor_share_consent === false
                                                ? color.buttonGray
                                                : color.secondary,
                                            borderTopLeftRadius: 5,
                                            borderBottomLeftRadius: 5,
                                          }}
                                        />
                                        <TouchableOpacity
                                          onPress={() => {
                                            handleDoctor(item.bio_marker);
                                            selectValue(item);
                                          }}
                                          style={{
                                            width: 20,
                                            height: 15,
                                            borderTopRightRadius: 5,
                                            borderBottomRightRadius: 5,
                                            backgroundColor:
                                              item.doctor_share_consent === true
                                                ? color.primary
                                                : color.secondary,
                                          }}
                                        />
                                      </View>
                                    </View>
                                  </View>
                                </>
                              ) : null}
                            </View>
                          )}
                        />
                      ) : null}
                    </>
                  )}</> : null}


            </View>
          ) : null}

          <TouchableOpacity
            style={{ marginTop: 0 }}
            onPress={() => {
              navigation.navigate('TrackDetail', { profile });
            }}>
            <Button text="Record Progress" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Track;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  innerContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.black,
    textAlign: 'center',
    marginVertical: 10,
  },
  desc: {
    fontSize: size.font16,
    fontWeight: weight.low,
    color: color.textPrimary,
  },
  top: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
  },
  buttonText: {
    fontSize: size.font12,
    fontWeight: weight.low,
    color: color.black,
  },
  switchBox: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  pain: {
    width: 17,
    height: 17,
    backgroundColor: color.errorColor,
    borderRadius: 100,
  },
});
