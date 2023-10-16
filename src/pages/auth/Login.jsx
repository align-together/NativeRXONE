import React, { useState, useEffect } from 'react';
import {
  StyleSheet,Alert,
  TextInput,
  View,
  Text,
  ScrollView,PermissionsAndroid,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import color from '../../assets/theme/color';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import Slider from '../../compontents/Slider';
import Loader from '../../compontents/comman/Loader';
import Logo from '../../compontents/comman/Logo';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env'

const LoginScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const handleSubmitPress = () => {
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
    fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}generate/patient/otp/${live}`,
      {
        method: 'POST',
        body: dataToSend,
        headers: {
          //Header Defination
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        Alert.alert(' ',responseJson.message);
        navigation.replace('Otp', mobile);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error("--->",error);
        console.log('Please check your Mobile Number');
      });
  };

  
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'App needs access to your camera ' +
            'to take pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');requestLocationPermission();
      } else {
        console.log('Camera permission denied');requestLocationPermission();
      }
    } catch (err) {
      console.warn("err is", err);requestLocationPermission();
    }
  };



  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location for better accuracy.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');requestStoragePermission();
      } else {
        console.log('Location permission denied');requestStoragePermission();
      }
    } catch (err) {
      console.warn(err);requestStoragePermission();
    }
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to save files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');requestMicrophonePermission();
      } else {
        console.log('Storage permission denied');requestMicrophonePermission();
      }
    } catch (err) {
      console.warn(err);requestMicrophonePermission();
    }
  };




  const requestMicrophonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone for calling.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Microphone permission granted');
      } else {
        console.log('Microphone permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };



  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);
  // useEffect(() => {
  //   requestStoragePermission();
  // }, []);
  // useEffect(() => {
  //   requestMicrophonePermission();
  // }, []);
  useEffect(() => {
    requestCameraPermission();
  }, []);


  
  

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
              <Slider />

              <Text
                style={{
                  fontSize: size.font14,
                  fontWeight: weight.low,
                  color: color.textGrey,
                }}>
                Enter phone number to continue
              </Text>
            </View>
            <View style={styles.SectionStyle}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../assets/images/flage.png')}
                  style={{ width: 30, height: 20, resizeMode: 'contain', transform: [{ rotate: '180deg' }] }}
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
              />
              {mobile.length === 10 ? (
                <TouchableOpacity
                  onPress={handleSubmitPress}
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
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

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
    marginTop: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 32,
    borderColor: color.primary,
    paddingHorizontal: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 45,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: color.textPrimary,
    paddingLeft: 5,
    paddingRight: 15,
    borderRadius: 30,
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
});
