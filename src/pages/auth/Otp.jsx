

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,Alert,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import color from '../../assets/theme/color';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import Loader from '../../compontents/comman/Loader';
import Logo from '../../compontents/comman/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env'

const Otp = props => {
  const phone = props.route.params;
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [mobile, setMobile] = useState(phone);

  const [timeLeft, setTimeLeft] = useState(10);

  const startTimer = () => {
    timer = setTimeout(() => {
      if (timeLeft <= 0) {
        clearTimeout(timer);
        return false;
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timer);
  });

  const start = () => {
    setTimeLeft(10);
    clearTimeout(timer);
    startTimer();
  };

  useEffect(() => {
    start();
  }, []);

  const handleSubmitPress = () => {
    setErrortext('');
    if (!otp) {
      Alert.alert(' ','Please fill Mobile Number');
      return;
    }
    if (otp.length < 6) {
      Alert.alert(' ','Please fill Mobile Number');
      return;
    }
    setLoading(true);
    let dataToSend = JSON.stringify({ phone: '+91' + mobile, otp: otp });
    console.log(dataToSend, 'dataToSend');
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}auth/patient/${live}`, {
      method: 'POST',
      body: dataToSend,
      headers: {
        //Header Defination
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // Alert.alert(' ',responseJson.message);
        const pt_token = responseJson.pt_token;
        const pt_key = responseJson.pt_key;
        const params = { pt_token, pt_key };
        AsyncStorage.setItem('pt_token', pt_token);
        AsyncStorage.setItem('pt_key', pt_key);
        if (pt_token) {
          fetchProfile(params);
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
        console.log('Please check your OTPr');
      });
  };

  const handleResendPress = () => {
    setErrortext('');
    if (!mobile) {
      Alert.alert(' ','Please fill Mobile Number');
      return;
    }
    if (mobile.length < 10) {
      Alert.alert(' ','Please fill Mobile Number');
      return;
    }
    setLoading(true);
    let dataToSend = JSON.stringify({ phone: '+91' + mobile });
    console.log(dataToSend, 'dataToSend');
    console.log('live', live)

    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}generate/patient/otp/${live}`, {
      method: 'POST',
      body: dataToSend,
      headers: {
        //Header Defination
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        Alert.alert(' ',responseJson.message);
        setOtp('');
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
        console.log('Please check your Mobile Number');
      });
  };

  const fetchProfile = async params => {
    await fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}list/patient/profiles/${live}`, {
      headers: { pt_token: params.pt_token, pt_key: params.pt_key },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json, 'dfj');
        const profileData = json.profiles;
        setTimeout(() => {
          if (profileData == '') {
            console.log('first');
            navigation.replace('Signup');
            return;
          }
          if (profileData) {
            navigation.replace('Tab');
            console.log('second');
            AsyncStorage.setItem('profile', profileData[0].profile_id);
            return;
          }
        }, 200);
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };
  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
              <Logo />

              <View style={{ marginTop: 100 }}>
                <Text
                  style={{
                    fontSize: size.font14,
                    fontWeight: weight.low,
                    color: color.textGrey,
                  }}>
                  Enter phone number to continue
                </Text>
              </View>
            </View>

            <View style={styles.SectionStyle}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../assets/images/flage.png')}
                  style={{ width: 30, height: 20, resizeMode: 'contain' }}
                />
                <Text
                  style={{
                    fontSize: size.font14,
                    fontWeight: weight.semi,
                    color: color.primary,
                    paddingLeft: 10,
                  }}>
                  +91-
                </Text>
              </View>
              <TextInput
                style={styles.inputStyle}
                onChangeText={mobile => setMobile(mobile)}
                placeholderTextColor={color.progressGrey}
                autoCapitalize="none"
                keyboardType="number-pad"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                maxLength={10}
                value={mobile}
              />
              {mobile.length === 10 ? (
                <TouchableOpacity
                  onPress={handleResendPress}
                  style={{
                    width: 43,
                    height: 43,
                    backgroundColor: color.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 100,
                  }}>
                  <Image
                    source={require('../../assets/icons/rightarrow.png')}
                  />
                </TouchableOpacity>
              ) : null}
            </View>

            {/* <View style={styles.SectionStyle}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../assets/images/flage.png')}
                  style={{width: 30, height: 20, resizeMode: 'contain'}}
                />
                <Text
                  style={{
                    fontSize: size.font14,
                    fontWeight: weight.semi,
                    color: color.primary,
                    paddingLeft: 10,
                  }}>
                  +91-
                </Text>
              </View>

              <Text style={styles.inputStyle}>{mobile}</Text>
              <View
                style={{
                  width: 43,
                  height: 43,
                  backgroundColor: color.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                }}>
                <Image source={require('../../assets/icons/rightarrow.png')} />
              </View>
            </View> */}

            <View style={styles.SectionStyle}>
              <TextInput
                style={[styles.inputStyle, { color: color.textPrimary }]}
                onChangeText={otp => setOtp(otp)}
                value={otp}
                underlineColorAndroid="#f000"
                placeholder="Enter OTP"
                placeholderTextColor="#8b9cb5"
                keyboardType="number-pad"
                returnKeyType="next"
                maxLength={6}
                blurOnSubmit={false}
              />
              {timeLeft == 0 ? (
                <TouchableOpacity
                  onPress={() => {
                    setOtp(''), start();
                    handleResendPress();
                  }}>
                  <Text style={styles.resend}>Resend</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.time}>00:{timeLeft}</Text>
              )}
            </View>

            {otp.length === 6 ? (
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>VERIFY</Text>
              </TouchableOpacity>
            ) : null}
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default Otp;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.white,
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '90%',
    marginTop: 30,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 32,
    borderColor: color.primary,
    paddingHorizontal: 10,
  },
  buttonStyle: {
    backgroundColor: color.primary,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 50,
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 40,
    marginBottom: 25,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: size.font16,
    fontWeight: weight.semi,
  },
  inputStyle: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 15,
    color: color.textPrimary,
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  resend: {
    fontSize: size.font12,
    fontWeight: weight.semi,
    color: color.errorColor,
  },

  time: {
    fontSize: size.font12,
    fontWeight: weight.semi,
    color: color.errorColor,
    marginLeft: 20,
  },
});
