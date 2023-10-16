import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView, Alert,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating-widget';

import color from '../assets/theme/color';
import size from '../assets/theme/size';
import weight from '../assets/theme/weight';
import Loader from '../compontents/comman/Loader';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env'

const RatingCard = props => {
  const navigation = useNavigation();
  const item = props.data;
  const [text, setText] = useState('');
  const [pt_key, setPt_Key] = useState('');
  const [pt_token, setPt_Token] = useState('');
  const [feedBackData, setFeedBackData] = useState();
  const [profileData, setProfileData] = useState();
  const [appointment_id, setAppointment_id] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
      // console.log(value)
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
      // console.log(value)
    });
  });



  useFocusEffect(
    React.useCallback(() => {
      feedback(item.appointment_id);
      console.log('--->  item.appointment_id', item)
    }, [pt_token, pt_key, item]),
  );

  const [imagePlace, setImage] = useState(); // initial it to an empty string
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [loadImage, setLoadImage] = useState(''); // initial it to an empty string

  const getImage = async value => {
    setLoadImage(false);
    try {
      const res = await fetch(
        `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/doctor/pic/${live}/${value}`,
      );
      const data = res.url;
      // console.log(data);
      setImage(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadImage(true);
    }
  };

  const feedback = value => {
    console.log('appointment_ID    ', value)
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}opd/patient/review/feedback/${live}/${value}`, {
      method: 'GET',
      headers: {
        //Header Defination
        'Content-Type': 'application/json',
        pt_token: pt_token,
        pt_key: pt_key,
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        // setLoading(false);
        setFeedBackData(responseJson.star_rating);
        setRating(responseJson.star_rating);
        setText(responseJson["review_comments"]);
        console.log(responseJson["review_comments"], '   ........feedback......review_comments');
        console.log(responseJson["star_rating"], '   ........feedback......rating');
        console.log(responseJson, '   .............feedback...............');
      })
      .catch(error => {
        //Hide Loader
        // setLoading(false);
        console.error(error, '......feedback Api Error......');
      });
  };

  const handleFeedBack = appointment_id => {
    setLoading(true);
    let dataToSend = JSON.stringify({
      star_rating: rating,
      review_comments: text,
    });

    fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}opd/patient/review/feedback/${live}/${appointment_id}`,
      {
        method: 'PUT',
        body: dataToSend,
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
        Alert.alert(' ', responseJson.message);
        console.log(responseJson, '.............data...............');
        feedback(appointment_id)
        setModalVisible(false);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......Doctor List Api Error......');
        setModalVisible(false);
      });
  };

  return (
    <>
      <Loader loading={loading} />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          getImage(item.doc_id);
          setAppointment_id(item.appointment_id);
          setProfileData(item);
        }}
        style={styles.appointmentbox}>
        <View style={styles.rightbox}>
          <View style={styles.rightinner}>
            <Text numberOfLines={1} style={styles.name}>
              {item.doc_name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="more-time" style={{ fontSize: size.font14 }} />
              <Text style={styles.time}>
                Time {item.appointment_time_formatted}
              </Text>
            </View>
          </View>

          <View style={[styles.rightinner, { marginVertical: 7 }]}>
            <Text numberOfLines={1} style={styles.des}>
              {item.doc_speciality}
            </Text>
            <View style={styles.desbox}>
              <Text style={{ color: color.white, fontSize: size.font12 }}>
                {item.patient_name}
              </Text>
            </View>
          </View>

          <View style={styles.rightinner}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../assets/images/book.png')} />
              <Text style={styles.time}>{item.app_type}</Text>
            </View>
            <View style={{}}>
              <StarRating
                rating={feedBackData ? feedBackData : null}
                // onChange={setRating}
                starSize={17}
                starStyle={{ width: 5 }}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {/* <Text
                  style={{
                    fontSize: size.font12,
                    color: '#EAA235',
                    marginRight: 5,
                  }}>
                  {feedBackData ? feedBackData.star_rating : null}
                </Text>
                <Text style={{fontSize: size.font12, color: color.black}}>
                  Review
                </Text> */}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {profileData ? (
          <View style={styles.modal}>
            <View style={styles.modalInner}>
              <View style={{ alignSelf: 'flex-end' }}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Icon name="close" size={size.font20} color={color.black} />
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginVertical: 15 }}>
                  <Text style={styles.modalText} onPress={() => feedback(appointment_id)} >
                    {profileData.appointment_time_formatted}
                    {' '}on {profileData.appointment_date_formatted}
                  </Text>
                </View>
                <View>
                  <View style={styles.ratingBox}>
                    <Image
                      style={styles.ratingImage}
                      source={{ uri: imagePlace }}
                    />
                    <View style={styles.content}>
                      <Text style={styles.ratingText}>
                        {profileData.doc_name}
                      </Text>
                      <Text numberOfLines={2} style={styles.desText}>
                        {profileData.doc_speciality}
                      </Text>
                      <StarRating
                        rating={rating}
                        onChange={setRating}
                        starSize={20}
                        starStyle={{ width: 10 }}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.inputbox}>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Share details of your own experience of the consultation"
                    placeholderTextColor={color.progressGrey}
                    multiline={true}
                    focusable={true}
                    autoFocus={true}
                    onChangeText={text => setText(text)}
                    value={text}
                  // placeholderTextColor={color.grey}
                  />
                </View>
                {/* <View
                style={{
                  marginVertical: 20,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity style={styles.comment}>
                  <Text style={styles.commentText}>Thank you</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.comment}>
                  <Text style={styles.commentText}>
                    Your prescription was very helpful.
                  </Text>
                </TouchableOpacity>
              </View> */}

                <TouchableOpacity
                  onPress={() => {
                    handleFeedBack(appointment_id);
                  }}
                  style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Submit</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        ) : null}
      </Modal>
    </>
  );
};

export default RatingCard;

const styles = StyleSheet.create({
  appointmentbox: {
    width: '92%',
    alignSelf: 'center',
    backgroundColor: color.white,
    flexDirection: 'row',
    elevation: 1,
    borderRadius: 10,
    marginVertical: 15,
    padding: 5,
    borderWidth: 0.6,
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
    color: color.errorColor,
    fontWeight: weight.semi,
    marginLeft: 5,
  },
  des: {
    fontSize: size.font12,
    color: color.textGrey,
    fontWeight: weight.semi,
    width: '50%',
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
    backgroundColor: color.primary,
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
    height: 500,
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
    alignItems: 'center',
    width: '90%',
  },
  ratingImage: {
    borderRadius: 100,
    resizeMode: 'contain',
    height: 55,
    width: 55,
  },
  content: {
    padding: 10,
    width: '70%',
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
    // width: '80%',
  },
  inputbox: {
    height: 175,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: color.borderColor,
    backgroundColor: color.grey,
    padding: 10,
  },
  modalInput: {
    fontSize: size.font12,
    color: color.black,
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
  },
  closeButtonText: {
    fontSize: size.font14,
    color: color.white,
    fontWeight: weight.semi,
  },
  comment: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 3,
    borderRadius: 32,
    borderColor: color.primary,
    marginRight: 10,
  },
  commentText: {
    fontSize: size.font10,
    fontWeight: weight.low,
    color: color.black,
  },
});
