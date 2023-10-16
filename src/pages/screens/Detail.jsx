import {
  Image,Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
  Linking,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import weight from '../../assets/theme/weight';
import size from '../../assets/theme/size';
import color from '../../assets/theme/color';
import BackHeader from '../../compontents/headers/BackHeader';
import Loader from '../../compontents/comman/Loader';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env'

const Detail = props => {
  const navigation = useNavigation();
  const back = () => {
    navigation.goBack();
  };
  const [select, setSelect] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const data = props.route.params;
  const item = data.item;
  const appointment_id = item.appointment_id;
  const pt_key = data.pt_key;
  const pt_token = data.pt_token;
  const [records, setRecords] = useState([]);
  const [lineage, setLineage] = useState();
  const [startResponse, setStartResponse] = useState('');
  const [feedback, setFeedBack] = useState();
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);
  const [imagePlace, setImage] = useState('');
  const [loadImage, setLoadImage] = useState('');
  const [enablexToken, setEnablexToken] = useState('');
  const params = { appointment_id, pt_key, pt_token, text, count };

  const handleAppointmentDetailData = () => {
    setLoading(true);
    fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}fetch/appointment/details/${live}/${appointment_id}`,
      {
        method: 'GET',
        headers: {
          //Header Defination
          pt_token: pt_token,
          pt_key: pt_key,
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        console.log("=====> App details", responseJson);
        setLoading(false);
        setRecords(responseJson.appointment);
        console.log('||||||||||||||||||||||', responseJson.appointment)
        console.log("enable_meet_now_button", responseJson.appointment.enable_meet_now_button)
        console.log("enable_rate_now_button", responseJson.appointment.enable_rate_now_button)
        console.log("enable_book_follow_up_button", responseJson.appointment.enable_book_follow_up_button)
        console.log('')
        console.log('.........pt_token', pt_token);
        console.log('.........pt_key', pt_key);
        console.log('.........appointment_id', appointment_id);
        console.log('')

        getImage(responseJson.appointment.doc_id);
      })
      
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......Detail Api Error......');
      });
  };

  const handleToken = () => {
    setLoading(true);
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/online/token/${live}/${appointment_id}`, {
      method: 'GET',
      headers: {
        //Header Defination
        pt_token: pt_token,
        pt_key: pt_key,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        console.log(responseJson, '..........token........');
        setEnablexToken(responseJson.enablex_token);
        setLoading(false);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......Feedback Api Error......');
      });
  };

  const handleLineageData = () => {
    setLoading(true);
    fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}fetch/appointment/lineage/${live}/${appointment_id}`,
      {
        method: 'GET',
        headers: {
          //Header Defination
          pt_token: pt_token,
          pt_key: pt_key,
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        console.log(responseJson);
        setLoading(false);
        setLineage(responseJson.records);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......Lineage Api Error......');
      });
  };

  useEffect(() => {
    handleAppointmentDetailData();
    handleLineageData();
    handleFeedBackData();
    handleToken();
  }, [pt_token, pt_key, appointment_id]);

  const getImage = async value => {
    setLoadImage(false);
    try {
      const res = await fetch(
        `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/doctor/pic/${live}/${value}`,
      );
      const data = await res.url;
      // console.log(data);
      setImage(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadImage(true);
    }
  };

  const handleStartVideoCall = () => {
    setLoading(true);
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/join/call/${live}/${appointment_id}`, {
      method: 'PUT',
      headers: {
        //Header Defination
        pt_token: pt_token,
        pt_key: pt_key,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        console.log(responseJson, 'join call');
        setLoading(false);
        setStartResponse(responseJson.message);
        // if (responseJson) {
        //   setInterval(() => {
        //     handleEndVideoCall();
        //   }, 60000);
        // }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......Start Video Call Api Error......');
      });
  };

  const handleEndVideoCall = () => {
    setLoading(true);
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/end/call/${live}/${appointment_id}`, {
      method: 'PUT',
      headers: {
        //Header Defination
        pt_token: pt_token,
        pt_key: pt_key,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        console.log(responseJson, 'end call');
        setLoading(false);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......Start Video Call Api Error......');
      });
  };

  const handleCancelAppointment = () => {
    setLoading(true);
    fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/cancel/appointment/${live}/${appointment_id}`,
      {
        method: 'POST',
        headers: {
          //Header Defination
          pt_token: pt_token,
          pt_key: pt_key,
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        console.log(responseJson);
        setLoading(false);
        Alert.alert(' ',responseJson.message);
        if (responseJson.message) {
          back();
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......Cancel Api Error......');
      });
  };

  const handleFeedBackData = () => {
    setLoading(true);
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}fetch/last/appointment/${live}`, {
      method: 'GET',
      headers: {
        //Header Defination
        pt_token: pt_token,
        pt_key: pt_key,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        console.log(responseJson, '..........Feedback........');
        setLoading(false);
        setFeedBack(responseJson.latest_appointment);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......Feedback Api Error......');
      });
  };

  const handleFeedBackSubmitPress = () => {
    setLoading(true);
    let dataToSend = JSON.stringify({
      star_rating: count,
      review_comments: text,
    });
    console.log(dataToSend, 'dataToSend');
    fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}opd/patient/feedback/${live}/${feedback.appointment_id}`,
      {
        method: 'POST',
        body: dataToSend,
        headers: {
          //Header Defination
          pt_token: pt_token,
          pt_key: pt_key,
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(
          responseJson,
          '.........handleFeedBackSubmitPress............',
        );
        Alert.alert(' ',responseJson.message);
        setModalVisible(false);
        // navigation.replace('Otp', mobile);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
        console.log('..............error handleFeedBackSubmitPress..........');
      });
  };

  const datas = [
    {
      id: 1,
      name: 'Meet Now',
      red: color.primary,
      close: color.primary,
      image: require('../../assets/images/zoom.png'),
      condition: records.enable_meet_now_button,
      // condition:true
    },
    {
      id: 2,
      name: 'Rate Now',
      red: color.primary,
      close: color.primary,
      image: require('../../assets/images/rating.png'),
      modal: true,
      condition: records.enable_rate_now_button,
      // condition: true,
    },
    {
      id: 3,
      name: 'Book Follow-up',
      red: color.primary,
      close: color.primary,
      image: require('../../assets/images/followup.png'),
      screen: 'Followup',
      condition: records.enable_book_follow_up_button,
      // condition: true,
    },
  ];
  // let h3 = datas[0].condition = 'true';
  // let h2 = datas[1].condition = 'true';
  // let h = datas[2].condition = 'true';
  // console.log('h', h);
  // console.log('datas2', datas)
  // var newDatas = datas;

  return (
    <SafeAreaView style={styles.root}>
      <Loader loading={loading} />
      <BackHeader />
      {!lineage ? null : (
        <>
          <View style={styles.appointmentbox}>
            <View style={styles.leftbox}>
              {imagePlace === '' ? (
                <View style={styles.imageView}>
                  <Text style={styles.imageText}>
                    {item.doc_name.slice(3, 4)}
                  </Text>
                </View>
              ) : (
                <Image source={{ uri: imagePlace }} style={styles.image} />
              )}
            </View>
            <View style={styles.rightbox}>
              <View style={styles.rightinner}>
                <Text numberOfLines={2} style={styles.name}>
                  {records.doc_name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '34%',
                    justifyContent: 'flex-end',
                  }}>
                  {/* <Image source={require('../assets/images/rx.png')} /> */}

                  <Text numberOfLines={2} style={styles.status}>
                    {records.app_status}
                  </Text>
                </View>
              </View>

              <View style={[styles.rightinner, { marginVertical: 7 }]}>
                <Text numberOfLines={1} style={styles.des}>
                  {records.doc_speciality}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="more-time" style={{ fontSize: size.font14 }} />
                  <Text style={styles.time}>
                    Time {records.appointment_time_formatted}
                  </Text>
                </View>
              </View>

              <View style={styles.rightinner}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../assets/images/book.png')} />
                  <Text style={styles.time}>{records.app_type}</Text>
                </View>
                <View style={styles.desbox}>
                  <Text style={{ color: color.black, fontSize: size.font12 }}>
                    {records.patient_name}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>Details</Text>

            <FlatList
              data={lineage}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={{ marginTop: 10, width: 140 }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      textAlign: 'center',
                      fontSize: size.font12,
                      fontWeight: weight.semi,
                      color:
                        item.app_status === records.app_status
                          ? color.primary
                          : color.textGrey,
                      marginBottom: 10,
                    }}>
                    {item.app_status}
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      height: 8,
                      borderWidth: 0.2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: color.secondary,
                      borderColor: color.primary,
                    }}>
                    <View
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: 100,
                        backgroundColor:
                          item.app_status === records.app_status
                            ? color.primary
                            : color.textGrey,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: size.font8,
                      fontWeight: weight.low,
                      color:
                        item.app_status === records.app_status
                          ? color.primary
                          : color.textGrey,
                      marginTop: 10,
                    }}>
                    {item.app_status_on}
                  </Text>
                </View>
              )}
            />

            <Text style={styles.title} onPress={() => {
              console.log('datas1', datas)
              // let h3 = datas[0].condition = 'true';
              // let h2 = datas[1].condition = 'true';
              // let h = datas[2].condition = 'true';
              // console.log('h', h);
              // console.log('datas2', datas)
              // var newDatas = datas;
            }} >Actions</Text>


            <FlatList
              data={datas} //datas
              renderItem={({ item }) => (
                <TouchableOpacity
                  disabled={item.condition ? false : true}
                  onPress={() => {
                    setSelect(item.id);
                    if (item.modal) {
                      setModalVisible(item.modal);
                    } else if (item.name === 'Meet Now') {
                      handleStartVideoCall();
                      navigation.navigate('EnxVideo', {
                        roomUrl: `https://rxcall.yourvideo.app/${records.room_id}?landing=no&name=${records.patient_name}`,
                        room_id: records.room_id,
                        token: enablexToken,
                        pt_token: pt_token,
                        pt_key: pt_key,
                        appointment_id: appointment_id
                      });
                    }
                    else if (item.name === 'Meet Now') {
                      handleStartVideoCall();
                      navigation.navigate('EnxVideo', {
                        roomUrl: `https://rxcall.yourvideo.app/${records.room_id}?landing=no&name=${records.patient_name}`,
                        room_id: records.room_id,
                        token: enablexToken,
                        pt_token: pt_token,
                        pt_key: pt_key,
                        appointment_id: appointment_id
                      });
                    }
                    else {
                      navigation.navigate(item.screen, {
                        records: records,
                        appointment_id,
                        imagePlace: imagePlace,
                      });
                    }
                  }}
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 20,
                    backgroundColor:
                      item.condition ? color.secondary : color.white,
                    borderRadius: 32,
                    paddingHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '60%',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: color.secondary,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={item.image}
                        style={{
                          width: 25,
                          height: 25,
                          resizeMode: 'contain',
                          tintColor:
                            select == item.id ? item.close : item.close,
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: size.font16,
                        fontWeight: weight.semi,
                        color:
                          item.condition
                            ? color.primary
                            : color.textGrey,
                        // select == item.id
                        //   ? item.red
                        //   : item.red
                        //   ? item.red
                        //   : '#D9D9D9',
                        marginLeft: 20,
                      }}>
                      {item.name}
                    </Text>
                  </View>

                  <Icon
                    name="arrow-forward-ios"
                    size={25}
                    color={item.condition ? color.primary : '#D9D9D9'}
                  />
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              onPress={handleCancelAppointment}
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
                borderRadius: 32,
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '60%',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: color.secondary,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/close.png')}
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                      tintColor: color.errorColor,
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontSize: size.font16,
                    fontWeight: weight.semi,
                    color: color.errorColor,
                    marginLeft: 20,
                  }}>
                  Cancel Appointment
                </Text>
              </View>

              <Icon name="arrow-forward-ios" size={25} color={'#D9D9D9'} />
            </TouchableOpacity>
          </View>
        </>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert(' ','Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modal}>
          <View style={styles.modalInner}>
            <View style={{ alignSelf: 'flex-end' }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={size.font20} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ marginVertical: 15 }}>
                <Text style={styles.modalText}>
                  {/* {!feedback
                    ? feedback.message */}
                  {/* : ' */}
                  Before proceeding with new booking, Please share your feedback
                  about your recent consultation
                  {/* '} */}
                </Text>
                {/* {!feedback && (
                  <Text style={styles.modalText}>
                    ({feedback.appointment_time} on {feedback.appointment_date})
                  </Text>
                )} */}
                <Text style={styles.modalText}>with</Text>
              </View>
              <View style={styles.ratingBox}>
                <Image source={{ uri: imagePlace }} style={styles.image} />

                <View style={styles.content}>
                  <Text style={styles.ratingText}>
                    {records ? records.doc_name : null}
                  </Text>
                  <Text style={styles.desText}>
                    {records ? records.doc_speciality : null}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() => {
                        setStar1(true), setCount(1);
                      }}>
                      <Icon
                        name="star"
                        color={
                          star1 === true ||
                            star2 === true ||
                            star3 === true ||
                            star4 === true ||
                            star5 === true
                            ? color.gold
                            : color.textGrey
                        }
                        size={size.font16}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setStar2(true), setCount(2);
                      }}>
                      <Icon
                        name="star"
                        color={
                          star2 === true ||
                            star3 === true ||
                            star4 === true ||
                            star5 === true
                            ? color.gold
                            : color.textGrey
                        }
                        size={size.font16}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setStar3(true), setCount(3);
                      }}>
                      <Icon
                        name="star"
                        color={
                          star3 === true || star4 === true || star5 == true
                            ? color.gold
                            : color.textGrey
                        }
                        size={size.font16}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setStar4(true), setCount(4);
                      }}>
                      <Icon
                        name="star"
                        color={
                          star4 === true || star5 === true
                            ? color.gold
                            : color.textGrey
                        }
                        size={size.font16}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setStar5(true), setCount(5);
                      }}>
                      <Icon
                        name="star"
                        color={star5 === true ? color.gold : color.textGrey}
                        size={size.font16}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.inputbox}>
                <TextInput
                  style={styles.modalInput}
                  multiline={true}
                  focusable={true}
                  autoFocus={true}
                  onChangeText={text => setText(text)}
                  value={text}
                />
              </View>
              <TouchableOpacity
                onPress={handleFeedBackSubmitPress}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Submit</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  root: {
    backgroundColor: color.white,
    flex: 1,
  },
  container: {
    width: '92%',
    alignSelf: 'center',
  },
  appointmentbox: {
    width: '92%',
    alignSelf: 'center',
    backgroundColor: color.white,
    flexDirection: 'row',
    elevation: 1,
    borderRadius: 10,
    marginVertical: 15,
    padding: 5,
    borderWidth: 1,
    borderColor: color.borderColor,
  },
  leftbox: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightbox: {
    width: '80%',
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
    width: '64%',
  },
  status: {
    fontSize: size.font12,
    color: color.errorColor,
    fontWeight: weight.semi,
    // backgroundColor: 'green',
  },
  des: {
    fontSize: size.font12,
    color: color.textGrey,
    fontWeight: weight.semi,
    width: '40%',
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

  title: {
    fontSize: size.font16,
    fontWeight: weight.semi,
    color: color.black,
    marginVertical: 10,
  },
  modal: {
    width: '100%',
    alignSelf: 'center',
    height: '100%',
    backgroundColor: '#000000aa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInner: {
    width: '87%',
    backgroundColor: color.backgroundColor,
    alignSelf: 'center',
    position: 'absolute',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: size.font14,
    textAlign: 'center',
    fontWeight: weight.semi,
    color: color.black,
    lineHeight: 20,
  },

  ratingBox: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    alignItems: 'center',
    width: '80%',
  },
  ratingImage: {
    borderRadius: 100,
    resizeMode: 'contain',
  },
  content: {
    padding: 10,
  },
  ratingText: {
    fontSize: size.font14,
    color: color.black,
    fontWeight: weight.semi,
  },
  desText: {
    fontSize: size.font12,
    fontWeight: weight.low,
    color: color.textGrey,
  },
  inputbox: {
    height: 130,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: color.borderColor,
    backgroundColor: color.grey,
    padding: 10,
  },

  closeButton: {
    width: 180,
    height: 40,
    backgroundColor: color.primary,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '10%',
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: size.font14,
    color: color.white,
    fontWeight: weight.semi,
  },
});
