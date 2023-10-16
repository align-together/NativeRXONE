import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import color from '../../assets/theme/color';
import BackHeader from '../../compontents/headers/BackHeader';
import AbhaComman from '../../compontents/comman/AbhaComman';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import GetProfile from '../../compontents/comman/GetProfile';

const AbhaProfile = () => {
  const navigation = useNavigation();
  const [profile_id, setProfile_id] = useState('');
  const [patProfile, setPatProfile] = useState();
  const [patName, setPatName] = useState('');

  const getProfile_Id = item => {
    setPatProfile(item);
    setProfile_id(item.profile_id);
    setPatName(item.name);
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
          <Text style={styles.text}>
            Select the profile you want to create ABHA for
          </Text>
          <GetProfile getProfile_Id={getProfile_Id} />

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
              style={{width: 70, height: 5, backgroundColor: color.secondary}}
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
              style={{width: 70, height: 5, backgroundColor: color.secondary}}
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

          <Text style={styles.text}>
            Verify your profile details and click Next
          </Text>
          <KeyboardAvoidingView enabled>
            <TextInput
              placeholder="Contact No."
              placeholderTextColor={color.textGrey}
              style={styles.inputStyle}
              autoCapitalize="none"
              keyboardType="number-pad"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              maxLength={10}
              // onChangeText={mobile => setMobile(mobile)}
            />

            <TextInput
              placeholder="Email"
              placeholderTextColor={color.textGrey}
              style={styles.inputStyle}
              autoCapitalize="none"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              // onChangeText={mobile => setMobile(mobile)}
            />

            <TextInput
              placeholder="Name"
              placeholderTextColor={color.textGrey}
              style={styles.inputStyle}
              autoCapitalize="none"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              // onChangeText={mobile => setMobile(mobile)}
            />

            <TextInput
              placeholder="Gender"
              placeholderTextColor={color.textGrey}
              style={styles.inputStyle}
              autoCapitalize="none"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              // onChangeText={mobile => setMobile(mobile)}
            />

            <TextInput
              placeholder="Date of Birth"
              placeholderTextColor={color.textGrey}
              style={styles.inputStyle}
              autoCapitalize="none"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              // onChangeText={mobile => setMobile(mobile)}
            />

            <TextInput
              placeholder="Address"
              placeholderTextColor={color.textGrey}
              style={styles.inputStyle}
              autoCapitalize="none"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              // onChangeText={mobile => setMobile(mobile)}
            />
            <TextInput
              placeholder="State"
              placeholderTextColor={color.textGrey}
              style={styles.inputStyle}
              autoCapitalize="none"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              // onChangeText={mobile => setMobile(mobile)}
            />

            <TextInput
              placeholder="City"
              placeholderTextColor={color.textGrey}
              style={styles.inputStyle}
              autoCapitalize="none"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              // onChangeText={mobile => setMobile(mobile)}
            />

            <TextInput
              placeholder="Pincode"
              placeholderTextColor={color.textGrey}
              style={styles.inputStyle}
              autoCapitalize="none"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              // onChangeText={mobile => setMobile(mobile)}
            />

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={()=>navigation.navigate('AbhaAdharNumber')}
              // onPress={handleSubmitButton}
            >
              <Text style={styles.buttonTextStyle}>NEXT</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AbhaProfile;

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
  inputStyle: {
    borderBottomWidth: 1,
    borderColor: color.borderColor,
    width: '100%',
    color: color.textGrey,
    marginBottom: 20,
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
