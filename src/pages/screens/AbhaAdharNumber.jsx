import {
  StyleSheet,
  Text,
  TextInput,Alert,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import color from '../../assets/theme/color';
import BackHeader from '../../compontents/headers/BackHeader';
import AbhaComman from '../../compontents/comman/AbhaComman';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const AbhaaadhaarNumber = props => {
  const navigation = useNavigation();
  const { profile_id, patName } = props.route.params;
  const [aadhaar, setAadhaar] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');

  console.log(profile_id, 'profile_id');

  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
    });
  });

  const handleSubmitPress = () => {
    setErrortext('');
    if (!aadhaar) {
      Alert.alert(' ','Please fill aadhaar Number');
      return;
    }
    if (aadhaar.length < 12) {
      Alert.alert(' ','Please fill aadhaar Number');
      return;
    }
    setLoading(true);
    let dataToSend = { aadhaar: aadhaar };
    console.log(dataToSend, 'dataToSend');
    console.log(
      "https://rx-opd-prod-4gag6.ondigitalocean.app/v2/" +
      `patient/abha/create/gen/aadhaar/otp/${live}/${profile_id}`,
    );
    fetch(
      "https://rx-opd-prod-4gag6.ondigitalocean.app/v2/" +
      `patient/abha/create/gen/aadhaar/otp/${live}/${profile_id}`,
      {
        method: 'POST',
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
        console.log(responseJson);
        Alert.alert(' ',responseJson.message);
        navigation.navigate('aadhaarOtp');
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
        console.log('Please check your aadhaar Number');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={styles.body}>
          <AbhaComman />
          <Text style={styles.text}>Creating ABHA ID for</Text>
          <View style={styles.top}>
            <Text style={styles.topText}>{patName}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 100,
                backgroundColor: color.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: size.font12,
                  fontWeight: weight.low,
                  color: color.white,
                }}>
                1
              </Text>
            </View>
            <View
              style={{ width: 70, height: 5, backgroundColor: color.secondary }}
            />
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 100,
                backgroundColor: color.white,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 3,
              }}>
              <Text
                style={{
                  fontSize: size.font12,
                  fontWeight: weight.low,
                  color: color.black,
                }}>
                2
              </Text>
            </View>
            <View
              style={{ width: 70, height: 5, backgroundColor: color.secondary }}
            />
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 100,
                backgroundColor: color.white,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 3,
              }}>
              <Text
                style={{
                  fontSize: size.font12,
                  fontWeight: weight.low,
                  color: color.black,
                }}>
                3
              </Text>
            </View>
          </View>

          <Text style={[styles.text, { marginTop: 40 }]}>Aaadhaar No.</Text>
          <OTPInputView
            style={{ marginTop: 30, height: 100 }}
            onCodeChanged={aadhaar => setAadhaar(aadhaar)}
            value={aadhaar}
            pinCount={12}
            keyboardType="number-pad"
            autoFocusOnLoad={true}
            placeholderTextColor={color.progressGrey}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
          />
          <Text style={{ textAlign: 'center', color: color.errorColor }}>
            Entered Aaadhaar is Not Valid
          </Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitPress}
          // onPress={()=>navigation.navigate('AdharOtp')}
          >
            <Text style={styles.buttonTextStyle}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AbhaaadhaarNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  body: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.black,
    marginVertical: 20,
    textAlign: 'center',
  },
  top: {
    height: 25,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    paddingHorizontal: 15,
    marginBottom: 10,
    alignSelf: 'center',
  },
  topText: {
    fontSize: size.font12,
    fontWeight: weight.low,
    color: color.white,
  },
  underlineStyleBase: {
    width: 25,
    height: 35,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: color.grey,
    color: color.black,
  },

  underlineStyleHighLighted: {
    borderColor: color.primary,
  },
  buttonStyle: {
    backgroundColor: color.primary,
    color: color.white,
    borderColor: '#7DE24E',
    height: 50,
    alignItems: 'center',
    borderRadius: 32,
    marginTop: 80,
    marginBottom: 20,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: color.white,
    fontSize: size.font16,
    fontWeight: weight.semi,
  },
});
