import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createRef } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import color from '../../assets/theme/color';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import DatePicker from 'react-native-date-picker';
import Button from '../comman/Button';
import Loader from '../comman/Loader';
import RNFetchBlob from 'rn-fetch-blob';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env'

const group = [
  {
    name: 'A+',
    type: 'A+',
  },
  {
    name: 'A-',
    type: 'A-',
  },
  {
    name: 'B+',
    type: 'B+',
  },
  {
    name: 'B-',
    type: 'B-',
  },
  {
    name: 'AB+',
    type: 'AB+',
  },
  {
    name: 'AB-',
    type: 'AB-',
  },
  {
    name: 'O+',
    type: 'O+',
  },
  {
    name: 'O-',
    type: 'O-',
  },
];

const AddNewProfile = props => {
  const [email, setEmail] = useState(props.route.params.firstEmail);
  const navigation = useNavigation();
  const { profile_id, status, defaultEmail } = props.route.params;
  useEffect(() => {
    setTimeout(() => {
      console.log('props : ', props);
      console.log('props.route.params : ', props.route.params);
    }, 2000)
  }, [])

  // console.log(profile_id, 'profile_id');

  const [type, setType] = useState('family');
  const [groupType, setGrouptype] = useState('');
  const [checkBox, setCheckBox] = useState(false);
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userBlood, setUserBlood] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userState, setUserState] = useState('');
  const [userPincode, setUserPincode] = useState('');
  const [userNumber, setUserNumber] = useState('');
  const [userCity, setUserCity] = useState('');

  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');
  const [newDate, setNewDate] = useState('');
  const [imgData, setimgData] = useState();
  const [imgUri, setimgUri] = useState();

  const nameInputRef = createRef();
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();

  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [blood, setBlood] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [defEmail, setDefEmail] = useState();
  const [imageData, setImageData] = useState(''); // initial it to an empty string
  const [valid, setValid] = useState(false);
  // const [profile_id, setProfile_id] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
      // console.log(value, 'pttoken..........');
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
      // console.log(value, 'ptkey...........');
    });
    // AsyncStorage.getItem('profile').then(value => {
    //   console.log('value', value);
    //   // setProfile_id(value);
    // });
  });

  const handleProfileDetailData = value => {
    setLoading(true);
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/profile/detail/${live}/${value}`, {
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
        setName(responseJson.name);
        setEmail(responseJson.email);
        setDob(responseJson.birth_date);
        setGender(responseJson.gender);
        setType(responseJson.profile_type);
        setGrouptype(responseJson.blood_group);
        setNumber(responseJson.phone);
        setAddress(responseJson.address);
        setState(responseJson.state);
        setPincode(responseJson.pincode);
        setCity(responseJson.city);

        //Hide Loader
        if (responseJson.name) {
          setLoading(false);
        }
        console.log(responseJson, 'responseJson');
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......Profile Details Api Error......');
      });
  };

  useEffect(() => {
    if (profile_id) {
      console.log('profile_id', profile_id)

      handleProfileDetailData(profile_id);
    }
  }, [pt_token, pt_key, profile_id]);

  useEffect(() => {
    if (profile_id) {
      getImage(profile_id);
    }
  }, [pt_token, pt_key, profile_id]);

  const formatDate = date => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return dateenc([year, month, day].join('-'));
  };

  const validateEmail = email => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const nameenc = async value => {
    try {
      const rawResponse = await fetch(
        `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/payload/enc/${live}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            pt_token: pt_token,
            pt_key: pt_key,
          },
          body: JSON.stringify({
            payload: value,
          }),
        },
      );
      const content = await rawResponse.json();
      console.log(content.enc_payload, 'name enc data');
      setUserName(content.enc_payload);
    } catch (error) {
      console.log(error, 'name enc error');
    }
  };

  const emailenc = async value => {
    if (validateEmail(value)) {
      console.warn('Email is valid.'); setValid(false);
    } else {
      console.warn('Email is invalid.'); setValid(true);
    }
    try {
      const rawResponse = await fetch(
        `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/payload/enc/${live}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            pt_token: pt_token,
            pt_key: pt_key,
          },
          body: JSON.stringify({
            payload: value,
          }),
        },
      );
      const content = await rawResponse.json();
      console.log('email data api', content.enc_payload);
      setUserEmail(content?.enc_payload);
    } catch (error) {
      console.log(error, 'email enc error');
    }
  };

  const genderenc = async value => {
    try {
      const rawResponse = await fetch(
        `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/payload/enc/${live}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            pt_token: pt_token,
            pt_key: pt_key,
          },
          body: JSON.stringify({
            payload: value,
          }),
        },
      );
      const content = await rawResponse.json();
      console.log(content.enc_payload, 'gender data api');
      setUserGender(content.enc_payload);
    } catch (error) {
      console.log(error, 'gender enc error');
    }
  };

  const dateenc = async value => {
    try {
      const rawResponse = await fetch(
        `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/payload/enc/${live}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            pt_token: pt_token,
            pt_key: pt_key,
          },
          body: JSON.stringify({
            payload: value,
          }),
        },
      );
      const content = await rawResponse.json();
      console.log(content.enc_payload, 'date data api');
      setUserAge(content.enc_payload);
    } catch (error) {
      console.log(error, 'date enc error');
    }
  };

  const bloodenc = async value => {
    try {
      const rawResponse = await fetch(
        `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/payload/enc/${live}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            pt_token: pt_token,
            pt_key: pt_key,
          },
          body: JSON.stringify({
            payload: value,
          }),
        },
      );
      const content = await rawResponse.json();
      console.log(content.enc_payload, 'date data api');
      setUserBlood(content.enc_payload);
    } catch (error) {
      console.log(error, 'date enc error');
    }
  };

  // const addressenc = async value => {
  //   try {
  //     const rawResponse = await fetch(
  //       `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/payload/enc/${live}`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           pt_token: pt_token,
  //           pt_key: pt_key,
  //         },
  //         body: JSON.stringify({
  //           payload: value,
  //         }),
  //       },
  //     );
  //     const content = await rawResponse.json();
  //     console.log(content.enc_payload, 'date data api');
  //     setUserAddress(content.enc_payload);
  //   } catch (error) {
  //     console.log(error, 'date enc error');
  //   }
  // };

  // const stateenc = async value => {
  //   try {
  //     const rawResponse = await fetch(
  //       `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/payload/enc/${live}`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           pt_token: pt_token,
  //           pt_key: pt_key,
  //         },
  //         body: JSON.stringify({
  //           payload: value,
  //         }),
  //       },
  //     );
  //     const content = await rawResponse.json();
  //     console.log(content.enc_payload, 'date data api');
  //     setUserState(content.enc_payload);
  //   } catch (error) {
  //     console.log(error, 'date enc error');
  //   }
  // };

  // const pincodeenc = async value => {
  //   try {
  //     const rawResponse = await fetch(
  //       `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/payload/enc/${live}`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           pt_token: pt_token,
  //           pt_key: pt_key,
  //         },
  //         body: JSON.stringify({
  //           payload: value,
  //         }),
  //       },
  //     );
  //     const content = await rawResponse.json();
  //     console.log(content.enc_payload, 'date data api');
  //     setUserPincode(content.enc_payload);
  //   } catch (error) {
  //     console.log(error, 'date enc error');
  //   }
  // };

  // const cityenc = async value => {
  //   try {
  //     const rawResponse = await fetch(
  //       `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/payload/enc/${live}`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           pt_token: pt_token,
  //           pt_key: pt_key,
  //         },
  //         body: JSON.stringify({
  //           payload: value,
  //         }),
  //       },
  //     );
  //     const content = await rawResponse.json();
  //     console.log(content.enc_payload, 'date data api');
  //     setUserCity(content.enc_payload);
  //   } catch (error) {
  //     console.log(error, 'date enc error');
  //   }
  // };

  // const numberenc = async value => {
  //   try {
  //     const rawResponse = await fetch(
  //       `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/payload/enc/${live}`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           pt_token: pt_token,
  //           pt_key: pt_key,
  //         },
  //         body: JSON.stringify({
  //           payload: value,
  //         }),
  //       },
  //     );
  //     const content = await rawResponse.json();
  //     console.log(content.enc_payload, 'date data api');
  //     setUserNumber(content.enc_payload);
  //   } catch (error) {
  //     console.log(error, 'date enc error');
  //   }
  // };

  const handleSubmitButton = () => {

    setErrortext('');

    if (!email.includes('.')) {
      Alert.alert(' ', 'Please enter valid Email');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert(' ', 'Please enter valid Email@');
      return;
    }
    if (!userName) {
      Alert.alert(' ', 'Please fill Name');
      return;
    }
    if (!userEmail) {
      Alert.alert(' ', 'Please fill Email');
      return;
    }
    if (!userGender) {
      Alert.alert(' ', 'Please select Gander');
      return;
    }
    if (!userAge) {
      Alert.alert(' ', 'Please select Date of Birth');
      return;
    }
    if (!userBlood) {
      Alert.alert(' ', 'Please select Your Blood Group');
      return;
    }
    if (!checkBox) {
      Alert.alert(' ', 'Please fill Checkbox');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = JSON.stringify({
      name: userName,
      email: userEmail,
      birth_date: userAge,
      gender: userGender,
      blood_group: userBlood,
    });


    console.log('----> Profile filled successfully');
    console.log(dataToSend, 'New Profile');

    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/add/${type}/profile/${live}`, {
      method: 'POST',
      body: dataToSend,
      headers: {
        //Header Defination
        pt_token: pt_token,
        pt_key: pt_key,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        if (responseJson.message) {
          if (status === 1) {
            navigation.replace('AddProfile');
          } else {
            navigation.goBack();
          }
        }
        // If server response message same as Data Matched
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......Profile Details Api Error......2');
      });
  };

  const handleUpdateSubmitButton = () => {
    //Show Loader
    setLoading(true);
    if (!email.includes('.')) {
      Alert.alert(' ', 'Please enter valid Email');
      console.log('Please enter valid Email');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert(' ', 'Please enter valid Email@');
      console.log('Please enter valid Email@');
      return;
    }

    var dataToSend = JSON.stringify({
      name: userName,
      email: userEmail,
      birth_date: userAge,
      gender: userGender,
      blood_group: userBlood,
      address: userAddress,
      state: userState,
      city: userCity,
      pincode: userPincode,
    });
    console.log(dataToSend, 'handleUpdateSubmitButton');
    console.log('"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"       ', "https://rx-opd-prod-4gag6.ondigitalocean.app/v2/")
    console.log('---->   profile_id     ', profile_id)
    console.log('pt_key         ', pt_key)
    console.log('pt_token       ', pt_token)
    console.log(' ')

    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/profile/detail/${live}/${profile_id}`, {
      method: 'PUT',
      body: dataToSend,
      headers: {
        //Header Defination
        pt_token: pt_token,
        pt_key: pt_key,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log("........ responseJson handleUpdateSubmitButton ........ ", responseJson);
        navigation.replace('AddProfile');
        // handleProfileDetailData(profile_id);
        // If server response message same as Data Matched
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......Profile Details Api Error......3');
      });
  };

  const imageHandler = async () => {
    var options = {};
    const result = await launchImageLibrary(options);
    // const result = null;
    console.log('result  ', result);

    setimgData(result);
    setimgUri(result.assets[0].uri);
    imageUpload(result.assets[0].uri);
  };

  const imageUpload = value => {
    const formData = new FormData();
    formData.append('image', {
      uri: value,
      name: 'image.jpg',
      type: 'image/jpg',
    });
    console.log(formData);
    console.log(pt_key, 'kdfnvkfngk', pt_token);
    fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/update/pic/${live}/${profile_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
          pt_token: pt_token,
          pt_key: pt_key,
        },
        body: formData,
      },
    )
      .then(response => {
        console.log('Upload success', response);
        // Alert.alert(' ','Image Upload successfully');
        getImage(profile_id);
      })
      .catch(error => {
        console.error('Upload error', error);
      });
  };

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
          // AsyncStorage.setItem('profileImage', data);
        } else {
          const data = '' + res.path();
          setImageData(data);
          // AsyncStorage.setItem('profileImage', data);
        }
      })
      .catch(function (err) {
        console.log(err, '......Profile Details Api Error......4');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerInner}>
          <Icon
            name="close"
            style={styles.closeIcon}
            onPress={() => {
              if (status === 1) {
                navigation.replace('AddProfile');
              } else {
                navigation.goBack();
              }
            }}
          />

          {profile_id ? (
            <View style={styles.card}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  borderWidth: imgUri ? 0 : 1,
                  borderColor: imageData ? color.white : color.primary,
                }}>

                {imageData ? (
                  <Image
                    source={{
                      uri: imageData ? imageData : imgUri,

                    }}
                    style={{ height: 50, width: 50, borderRadius: 100 }}
                  />
                ) : (<>
                  <TouchableOpacity
                    onPress={imageHandler}
                    style={{
                      alignSelf: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 50,
                      width: 50,
                      borderRadius: 100,
                      backgroundColor: color.grey,
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: color.borderColor,
                    }}>
                    <Icon
                      name="person-outline"
                      size={size.font25}
                      color={color.primary}
                    />
                  </TouchableOpacity>
                </>)}

                {imageData ? (
                  <TouchableOpacity
                    onPress={imageHandler}
                    style={{
                      alignSelf: 'center',
                      marginVertical: 5,
                      marginRight: 3,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="create-outline"
                      size={size.font14}
                      color={color.textGrey}
                    />
                    <Text style={{ marginLeft: 5, color: color.textGrey }}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                ) : null}

              </View>

              <View style={styles.body}>
                <Text style={styles.title}>Add/Update Profile Picture</Text>
                <Text style={styles.des} onPress={() => (
                  console.log('imgUri', imgUri),
                  console.log('imageData', imageData),
                  console.log('imgData', imgData)
                )}>

                  Only JPG or PNG images under 5 MB are supported
                </Text>
              </View>
            </View>
          ) : null}

          {profile_id ? null : <View style={{ height: 50 }} />}

          <View style={styles.bodyContainer}>
            {profile_id ? null : (
              <View style={styles.mainType}>
                {/* <TouchableOpacity
                  onPress={() => setType('self')}
                  style={[
                    styles.type,
                    {
                      backgroundColor:
                        type === 'self' ? color.primary : color.secondary,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.typeName,
                      {
                        color: type === 'self' ? color.white : color.black,
                      },
                    ]}>
                    Self
                  </Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => setType('family')}
                  style={[
                    styles.type,
                    {
                      backgroundColor:
                        type === 'family' ? color.primary : color.secondary,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.typeName,
                      {
                        color: type === 'family' ? color.white : color.black,
                      },
                    ]}>
                    Family
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View>
              <View style={styles.inputbox}>
                <View style={styles.iconbox}>
                  <Image source={require('../../assets/images/user.png')} />
                </View>

                <TextInput
                  onChangeText={UserName => {
                    nameenc(UserName), setName(UserName);
                  }}
                  value={name}
                  maxLength={40}
                  underlineColorAndroid="#f000"
                  placeholder="Enter Name"
                  placeholderTextColor="#8b9cb5"
                  style={{ color: color.black, width: "80%" }}
                  autoCapitalize="sentences"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    emailInputRef.current && emailInputRef.current.focus()
                  }
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.inputbox}>
                <View style={styles.iconbox}>
                  <Image source={require('../../assets/images/messege.png')} />
                </View>
                <TextInput
                  onChangeText={UserEmail => {
                    emailenc(UserEmail), setEmail(UserEmail); setUserEmail(UserEmail);
                  }}
                  value={email}
                  underlineColorAndroid="#f000"
                  placeholder="Enter Email"
                  placeholderTextColor="#8b9cb5"
                  style={{ color: 'black', width: "82%" }}
                  keyboardType="email-address"
                  ref={emailInputRef}
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    ageInputRef.current && ageInputRef.current.focus()
                  }
                />
              </View>
              {valid ? <Text style={{ color: 'red', alignSelf: 'center', marginTop: -10, marginBottom: -10 }} >Please enter the valid Email</Text>
                : null}
              {profile_id ? (
                <View style={[styles.inputbox, { backgroundColor: color.grey }]}>
                  <View style={styles.iconbox}>
                    <Image
                      source={require('../../assets/images/phone.png')}
                      style={{
                        width: 30,
                        height: 22,
                        resizeMode: 'contain',
                        tintColor: color.primary,
                      }}
                    />
                  </View>

                  <Text style={{ color: color.black }}>{number}</Text>
                </View>
              ) : null}
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',  
                  marginVertical: 20,
                }}>
                <Text style={styles.gender} onPress={() => (
                  console.log('ProfileID is', profile_id),
                  console.log(props)
                )}>Gender</Text>
                <View style={styles.genderbox}>
                  <TouchableOpacity
                    style={styles.geninnerbox}
                    onPress={() => {
                      setGender('male');
                      genderenc('male');
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setGender('male');
                        genderenc('male');
                      }}
                      style={[
                        styles.geniconbox,
                        {
                          backgroundColor:
                            gender == 'male' ? color.primary : color.white,
                        },
                      ]}>
                      <Image
                        source={require('../../assets/images/male.png')}
                        style={{
                          resizeMode: 'contain',
                          width: 20,
                          height: 20,
                          tintColor: color.primary,
                          tintColor:
                            gender == 'male' ? color.white : color.primary,
                        }}
                      />
                    </TouchableOpacity>

                    <Text style={styles.gentext}>Male</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setGender('female');
                      genderenc('female');
                    }}
                    style={styles.geninnerbox}>
                    <TouchableOpacity
                      onPress={() => {
                        setGender('female');
                        genderenc('female');
                      }}
                      style={[
                        styles.geniconbox,
                        {
                          backgroundColor:
                            gender == 'female' ? color.primary : color.white,
                        },
                      ]}>
                      <Image
                        source={require('../../assets/images/woman.png')}
                        style={{
                          resizeMode: 'contain',
                          width: 20,
                          height: 20,
                          tintColor:
                            gender == 'female' ? color.white : '#FC33A5',
                        }}
                      />
                    </TouchableOpacity>

                    <Text style={styles.gentext}>Female</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setGender('other');
                      genderenc('other');
                    }}
                    style={styles.geninnerbox}>
                    <TouchableOpacity
                      onPress={() => {
                        setGender('other');
                        genderenc('other');
                      }}
                      style={[
                        styles.geniconbox,
                        {
                          backgroundColor:
                            gender == 'other' ? color.primary : color.white,
                        },
                      ]}>
                      <Image
                        source={require('../../assets/images/other.png')}
                        style={{
                          resizeMode: 'contain',
                          width: 20,
                          height: 20,
                          tintColor:
                            gender == 'other' ? color.white : '#FC33A5',
                        }}
                      />
                    </TouchableOpacity>

                    <Text style={styles.gentext}>Other</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <DatePicker
                modal
                mode="date"
                // locale='fr'
                open={open}
                minimumDate={new Date('1900-01-01')}
                maximumDate={new Date()}
                date={new Date()}
                onConfirm={date => {
                  setOpen(false);
                  setDob(date);
                  formatDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />

              <View style={styles.inputbox}>
                <TouchableOpacity
                  onPress={() => {
                    setOpen(true);
                  }}
                  style={{
                    width: 48,
                    height: 48,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: color.secondary,
                    borderRadius: 100,
                  }}>
                  <Image source={require('../../assets/images/date.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setOpen(true);
                  }}>
                  <Text
                    style={{
                      alignItems: 'center',
                      marginLeft: 15,
                      color: dob ? color.black : '#8b9cb5',
                    }}>
                    {dob ? new Date(dob).toDateString() : 'Date Of Birth'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.blood}>Blood Group</Text>
            <FlatList
              data={group}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setGrouptype(item.type), bloodenc(item.type);
                  }}
                  style={[
                    styles.group,
                    {
                      backgroundColor:
                        groupType === item.type
                          ? color.errorColor
                          : color.white,
                      borderWidth: 1,
                      borderColor: color.errorColor,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.groupName,
                      {
                        color:
                          groupType === item.type ? color.white : color.black,
                      },
                    ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
            {/* {profile_id ? (
              <>
                <Text style={styles.addressStyle}>Address</Text>
                <View style={styles.inputbox}>
                  <View style={styles.iconbox}>
                    <Image
                      source={require('../../assets/images/location.png')}
                      style={{width: 50, height: 50, tintColor: color.primary}}
                    />
                  </View>
                  <TextInput
                    onChangeText={UserAddress => {
                      addressenc(UserAddress), setAddress(UserAddress);
                    }}
                    value={address}
                    underlineColorAndroid="#f000"
                    placeholder="Enter Address"
                    placeholderTextColor="#8b9cb5"
                    keyboardType="email-address"
                    // ref={emailInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      ageInputRef.current && ageInputRef.current.focus()
                    }
                  />
                </View>
                <Text style={styles.addressStyle}>City</Text>
                <View style={styles.inputbox}>
                  <View style={styles.iconbox}>
                    <Image
                      source={require('../../assets/images/location.png')}
                      style={{width: 50, height: 50, tintColor: color.primary}}
                    />
                  </View>
                  <TextInput
                    onChangeText={UserCity => {
                      cityenc(UserCity), setCity(UserCity);
                    }}
                    value={city}
                    underlineColorAndroid="#f000"
                    placeholder="Enter City"
                    placeholderTextColor="#8b9cb5"
                    keyboardType="email-address"
                    // ref={emailInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      ageInputRef.current && ageInputRef.current.focus()
                    }
                  />
                </View>
                <Text style={styles.addressStyle}>State</Text>
                <View style={styles.inputbox}>
                  <View style={styles.iconbox}>
                    <Image
                      source={require('../../assets/images/location.png')}
                      style={{width: 50, height: 50, tintColor: color.primary}}
                    />
                  </View>
                  <TextInput
                    onChangeText={UserState => {
                      stateenc(UserState), setState(UserState);
                    }}
                    value={state}
                    underlineColorAndroid="#f000"
                    placeholder="Enter State"
                    placeholderTextColor="#8b9cb5"
                    keyboardType="email-address"
                    // ref={emailInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      ageInputRef.current && ageInputRef.current.focus()
                    }
                  />
                </View>
                <Text style={styles.addressStyle}>Pincode</Text>
                <View style={styles.inputbox}>
                  <View style={styles.iconbox}>
                    <Image
                      source={require('../../assets/images/location.png')}
                      style={{width: 50, height: 50, tintColor: color.primary}}
                    />
                  </View>
                  <TextInput
                    onChangeText={UserPincode => {
                      pincodeenc(UserPincode), setPincode(UserPincode);
                    }}
                    value={pincode}
                    underlineColorAndroid="#f000"
                    placeholder="Enter Pincode"
                    placeholderTextColor="#8b9cb5"
                    keyboardType="number-pad"
                    // ref={emailInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() =>
                      ageInputRef.current && ageInputRef.current.focus()
                    }
                  />
                </View>
              </>
            ) : null} */}

            {!profile_id ? (
              <View style={styles.bDes}>
                {checkBox == true ? (
                  <TouchableOpacity
                    onPress={() => setCheckBox(false)}
                    style={styles.checkbox}>
                    <Icon
                      name="checkmark-done-outline"
                      size={size.font16}
                      color={color.primary}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setCheckBox(true)}
                    style={styles.checkbox}
                  />
                )}

                <Text style={styles.bloodDes}>
                  I hereby declare that I am lawfully authorized to provide the
                  above information on behalf of owner of the information
                </Text>
              </View>
            ) : null}
            <TouchableOpacity
              onPress={() => {
                // if (userEmail?.includes('@')) {
                //   setValid(false);
                //   console.log("Email includes @")
                // if (profile_id) {
                //   handleUpdateSubmitButton();
                // } else {
                //   handleSubmitButton();
                // }
                // } else {
                //   console.log("Email not includes @" , userEmail)
                // }

                if (validateEmail(email)) {
                  console.log('Email is valid.');
                  setValid(false);
                  console.log('profile_iFFFd', profile_id)
                  if (profile_id) {

                    console.log('--------------  mkc -----------------   handleUpdateSubmitButton')
                    handleUpdateSubmitButton();
                  } else {
                    console.log('--------------  mkb -----------------   handleSubmitButton')
                    handleSubmitButton();
                  }

                } else {
                  console.log('Email is invalid.'); setValid(true);
                }

              }}
              style={{ marginVertical: 35 }}>
              <Button text="Save" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

export default AddNewProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  containerInner: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  closeIcon: {
    fontSize: size.font20,
    color: color.black,
    textAlign: 'right',
  },
  card: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginVertical: 10,
    marginBottom: 20,
  },
  imageView: {
    width: 65,
    height: 65,
    backgroundColor: color.secondary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    marginLeft: 20,
    width: '75%',
  },
  title: {
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.primary,
  },
  des: {
    fontSize: size.font12,
    fontWeight: weight.low,
    color: color.textGrey,
  },
  bodyContainer: {
    marginTop: 5,
  },
  mainType: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: -55,
  },
  type: {
    width: 70,
    height: 25,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  typeName: {
    fontSize: size.font10,
    fontWeight: weight.low,
    color: color.textPrimary,
  },
  inputbox: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 32,
    borderColor: '#D9D9D9',
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  iconbox: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: '#E8F3F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 16,
    color: color.black,
    width: '80%',
    paddingLeft: 10,
  },
  gender: {
    fontSize: 16,
    fontWeight: '600',
    color: color.black,
  },
  genderbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
  },
  geninnerbox: {
    flexDirection: 'row',
    width: '27%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  geniconbox: {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: '#E8F3F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gentext: {
    fontSize: 14,
    color: '#898A8D',
    fontWeight: '500',
  },
  blood: {
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.black,
    marginVertical: 10,
  },
  group: {
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  groupName: {
    fontSize: size.font10,
    fontWeight: weight.low,
    color: color.textPrimary,
  },
  bDes: {
    marginTop: 20,
    flexDirection: 'row',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderColor: color.textGrey,
  },
  bloodDes: {
    fontSize: size.font10,
    fontWeight: weight.low,
    color: color.textGrey,
    width: '95%',
  },
  button: {
    marginVertical: 20,
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  addressStyle: {
    marginTop: 20,
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.black,
  },
});
