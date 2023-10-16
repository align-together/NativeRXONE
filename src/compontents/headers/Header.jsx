import {
  Image,
  Modal,
  StatusBar, Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Freshchat } from 'react-native-freshchat-sdk';
import color from '../../assets/theme/color';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import Type from '../Type';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Loader from '../comman/Loader';
import { Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env'

const Header = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const profileData = useSelector(state => state.profile);
  const data = profileData.profiles.profiles;
  const profile_id = data ? data[0].profile_id : null;

  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
      console.log('setPt_Token', value);
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
      console.log('setPt_Key', value);
    });
  });

  const logOut = () => {
    setLoading(true);
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}logout/patient/${live}`, {
      method: 'POST',
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
        setLoading(false);
        console.log(responseJson);
        Alert.alert(' ', responseJson.message);
        AsyncStorage.removeItem('pt_token');
        AsyncStorage.removeItem('profile');
        navigation.replace('Login');
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
        console.log('Api Error logout');
      });
  };

  const [imageData, setImageData] = useState(''); // initial it to an empty string

  const getImage = async value => {
    setLoading(true);
    try {
      const res = await fetch(
        `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/profile/pic/${live}/${value}`,
        {
          headers: {
            pt_token: pt_token,
            pt_key: pt_key,
          },
        },
      );
      const data = await res.url;
      ImageShowFunc(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const ImageShowFunc = value => {
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      fileCache: true,
      appendExt: 'png',
    })
      .fetch('GET', value, {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization: token,
        pt_token: pt_token,
        pt_key: pt_key,
      })
      .then(res => {
        // console.log('response body>>>', res);
        if (Platform.OS === 'android') {
          const data = 'file://' + res.path();
          setImageData(data);
          AsyncStorage.setItem('profileImage', data);
        } else {
          const data = '' + res.path();
          setImageData(data);
          AsyncStorage.setItem('profileImage', data);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    getImage(profile_id);
  }, [pt_token, pt_key, profile_id]);

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getImage(profile_id);
    });
    return focusHandler;
  }, [navigation, pt_token, pt_key, profile_id]);

  const email = data ? data[0].email : null;

  // React.useEffect(() => {
  //   Freshchat.init({
  //     // appId: '92e492db-a6a2-4d17-82a5-c9575a409955',
  //     // appKey: 'd0ae9f02-a301-405c-9f1e-96318d19a565',
  //     // domain: 'msdk.in.freshchat.com',

  //     // appId: '8c75de9e-4104-4a6f-89aa-1ffd2c0c61ba',
  //     // appKey: '8aad85f5-2b3d-4d00-ad52-2ba9ac99dfbc',
  //     // domain: 'msdk.in.freshchat.com',


  //     appId: "92e492db-a6a2-4d17-82a5-c9575a409955",
  //     appKey: "d0ae9f02-a301-405c-9f1e-96318d19a565",
  //     domain: "msdk.in.freshchat.com"
  //   });
  //   Freshchat.cameraCaptureEnabled = false;

  //   Freshchat.setUser({
  //     userId: profile_id,
  //     email: email,
  //   });
  // }, []);

  const handleChatButtonPress = () => {
    // Freshchat.showConversations();
  };

  const versionCode = DeviceInfo.getVersion();

  return (
    <>
      <Loader loading={loading} />
      <View style={styles.container}>
        <View style={styles.containerInner}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="menu" size={size.font25} color={color.black} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('AddProfile')}>
            <Image
              source={require('../../assets/icons/users.png')}
              style={{ width: 23, height: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType='none'

        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert(' ', 'Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <StatusBar backgroundColor={'rgba(25, 154, 142,0.8)'} />
        <View style={styles.modal}>
          <LinearGradient
            colors={['rgba(25, 154, 142,0.8)', 'rgba(25, 154, 142,.4)']}
            style={styles.linearGradient}>
            <Image
              source={require('../../assets/images/signup.png')}
              style={styles.image}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="close" style={styles.close} />
            </TouchableOpacity>

            <View
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderColor: color.white,
                  height: 60,
                  width: 60,
                  borderRadius: 100,
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {imageData ? (
                  <Image
                    resizeMode={'cover'}
                    style={{ height: 60, width: 60, borderRadius: 100 }}
                    source={{
                      uri: imageData,
                    }}
                  />
                ) : (
                  <Image
                    resizeMode={'cover'}
                    style={{ height: 60, width: 60, borderRadius: 100 }}
                    source={require('../../assets/images/profile.png')}
                  />
                )}
              </View>

              <Text style={styles.title}>{data ? data[0].name : null}</Text>
              <Text style={styles.number}>{data ? data[0].phone : null}</Text>
            </View>
            <View style={styles.bottom}>
              <View style={styles.type}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false), navigation.navigate('AddProfile');
                  }}>
                  <Type name="calendar-outline" type="My Profiles" />
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false), navigation.navigate('Abha');
                  }}>
                  <Type name="people-outline" type="Integrate/Create ABHA ID" />
                </TouchableOpacity> */}

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false), navigation.navigate('Medications');
                  }}>
                  <Type
                    name="medical-outline"
                    type="My Medications"
                    screen="Medications"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false), navigation.navigate('Orders');
                  }}>
                  <Type name="briefcase-outline" type="My Orders" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false), navigation.navigate('ViewRating');
                  }}>
                  <Type name="star-outline" type="Ratings & Reviews" />
                </TouchableOpacity>

                {/* <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false), handleChatButtonPress();
                  }}>
                  <Type name="chatbubble-ellipses-outline" type="Contact Us" />
                </TouchableOpacity> */}

                {/* <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false), navigation.navigate('FAQs');
                  }}>
                  <Type name="chatbubble-ellipses-outline" type="FAQs" />
                </TouchableOpacity> */}

                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false), logOut();
                  }}>
                  <Type name="log-out-outline" type="Sign Out" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`https://rxonecare.com/`);
                    setModalVisible(false);
                  }}>
                  <Type name="logo" type="About RxOne" />
                </TouchableOpacity>
              </View>
              <Text style={{alignSelf:'center',marginTop:150}} >Version: {versionCode}</Text>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: color.backgroundColor,
  },
  containerInner: {
    width: '90%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: size.font10,
    color: color.black,
    fontWeight: weight.low,
    width: '60%',
    lineHeight: 15,
  },
  modal: {
    flex: 1,
    backgroundColor: color.white,
  },
  linearGradient: {
    flex: 1,
  },
  close: {
    fontSize: size.font25,
    color: color.white,
    textAlign: 'right',
    margin: 20,
  },
  image: {
    width: 210,
    height: 240,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    position: 'absolute',
    tintColor: '#66DED4',
  },
  profile: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  title: {
    fontSize: size.font16,
    fontWeight: weight.semi,
    color: color.white,
    marginTop: 15,
    textTransform: 'capitalize',
  },
  number: {
    fontSize: size.font14,
    fontWeight: weight.low,
    color: color.white,
    lineHeight: 25,
  },
  bottom: {
    width: '100%',
    height: '70%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: color.backgroundColor,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  type: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
});
