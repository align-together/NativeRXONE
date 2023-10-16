// Import React and Component
import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,Alert,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import color from '../../assets/theme/color';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import Loader from '../../compontents/comman/Loader';
import Logo from '../../compontents/comman/Logo';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env'

const RegisterScreen = props => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userGender, setUserGender] = useState('');
  const [gender, setGender] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');
  const [newDate, setNewDate] = useState('');

  const nameInputRef = createRef();
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();

  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
    });
  }, []);

  const formatDate = date => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return dateenc([year, month, day].join('-'));
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
      console.log(content.enc_payload, 'email data api');
      setUserEmail(content.enc_payload);
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

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) {
    Alert.alert(' ','Please fill Name');
      return;
    }
    if (!userEmail) {
    Alert.alert(' ','Please fill Email');
      return;
    }

    if (!userGender) {
    Alert.alert(' ','Please select Gander');
      return;
    }
    if (!userAge) {
    Alert.alert(' ','Please select Date of Birth');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = JSON.stringify({
      name: userName,
      email: userEmail,
      birth_date: userAge,
      gender: userGender,
    });

    console.log(dataToSend, 'signupData');

    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/self/profile/${live}`, {
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
          navigation.replace('Agreement');
        }
        // If server response message same as Data Matched
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'rgba(172, 191, 190,0.4)'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            height: 250,
            justifyContent: 'center',
          }}>
          <Logo />
        </View>

        <KeyboardAvoidingView enabled>
          <View
            style={{
              backgroundColor: color.backgroundColor,
              height: 550,
              borderRadius: 30,
            }}>
            <Text
              style={{
                marginVertical: 20,
                textAlign: 'center',
                fontSize: size.font18,
                fontWeight: weight.semi,
                color: color.black,
              }}>
              CREATE YOUR ACCOUNT
            </Text>
            <View style={styles.SectionStyle}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: color.secondary,
                  borderRadius: 100,
                }}>
                <Image source={require('../../assets/images/user.png')} />
              </View>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserName => nameenc(UserName)}
                maxLength={25}
                underlineColorAndroid="#f000"
                placeholder="Enter Name"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() =>
                  emailInputRef.current && emailInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: color.secondary,
                  borderRadius: 100,
                }}>
                <Image source={require('../../assets/images/messege.png')} />
              </View>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => emailenc(UserEmail)}
                underlineColorAndroid="#f000"
                placeholder="Enter Email"
                placeholderTextColor="#8b9cb5"
                keyboardType="email-address"
                ref={emailInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  ageInputRef.current && ageInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>

            <View
              style={{width: '90%', alignSelf: 'center', marginVertical: 20}}>
              <Text style={styles.gender}>Gender</Text>
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
                        borderWidth: gender == 'male' ? 1 : 0,
                        borderColor: gender == 'male' ? color.primary : '',
                      },
                    ]}>
                    <Image
                      source={require('../../assets/images/male.png')}
                      style={{
                        resizeMode: 'contain',
                        width: 20,
                        height: 20,
                        tintColor: color.primary,
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
                        borderWidth: gender == 'female' ? 1 : 0,
                        borderColor: gender == 'female' ? color.primary : '',
                      },
                    ]}>
                    <Image
                      source={require('../../assets/images/woman.png')}
                      style={{
                        resizeMode: 'contain',
                        width: 20,
                        height: 20,
                        tintColor: '#FC33A5',
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
                        borderWidth: gender == 'other' ? 1 : 0,
                        borderColor: gender == 'other' ? color.primary : '',
                      },
                    ]}>
                    <Image
                      source={require('../../assets/images/other.png')}
                      style={{
                        resizeMode: 'contain',
                        width: 20,
                        height: 20,
                        tintColor: '#FC33A5',
                      }}
                    />
                  </TouchableOpacity>

                  <Text style={styles.gentext}>Other</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.SectionStyle}>
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
                    marginTop: 15,
                    marginLeft: 15,
                    color: '#8b9cb5',
                  }}>
                  {newDate ? new Date(newDate).toDateString() : 'Date Of Birth'}
                </Text>
              </TouchableOpacity>
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitButton}>
              <Text style={styles.buttonTextStyle}>SIGNUP</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <DatePicker
        modal
        mode="date"
        open={open}
        minimumDate={new Date('1900-01-01')}
        maximumDate={new Date()}
        date={new Date()}
        onConfirm={date => {
          setOpen(false);
          setUserAge(date);
          setNewDate(date);
          formatDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 32,
    borderColor: color.primary,
    width: '90%',
    alignSelf: 'center',
  },
  buttonStyle: {
    backgroundColor: color.primary,
    color: color.white,
    borderColor: '#7DE24E',
    height: 50,
    alignItems: 'center',
    borderRadius: 32,
    marginTop: 20,
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: color.white,
    fontSize: size.font16,
    fontWeight: weight.semi,
  },
  inputStyle: {
    flex: 1,
    color: color.textPrimary,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
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
  button: {
    width: '90%',
    backgroundColor: color.primary,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 32,
    marginTop: 50,
  },
  buttontext: {
    fontSize: 16,
    fontWeight: '600',
    color: color.white,
  },
});
