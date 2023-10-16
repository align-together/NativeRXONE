import {Modal,Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import color from '../../assets/theme/color';
import BackHeader from '../../compontents/headers/BackHeader';
import AbhaComman from '../../compontents/comman/AbhaComman';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import Button from '../../compontents/comman/Button';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const AdharOtp = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader />
      <View style={styles.body}>
        <AbhaComman />
        <Text style={[styles.text, {alignSelf: 'center', marginVertical: 30}]}>
          Creating ABHA ID for
        </Text>

        <View style={styles.top}>
          <Text style={styles.topText}>Anuj Pawar</Text>
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
            style={{width: 70, height: 5, backgroundColor: color.secondary}}
          />
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

        <Text style={[styles.text, {marginTop: 40, alignSelf: 'center'}]}>
          AADHAR No.
        </Text>

        <OTPInputView
          style={{marginTop: 30, height: 100}}
          //   onCodeChanged={conform_pin => this.setState({conform_pin})}
          //   value={this.state.conform_pin}
          pinCount={6}
          keyboardType="number-pad"
          autoFocusOnLoad={true}
          secureTextEntry={true}
          textContentType={'password'}
          placeholderTextColor={color.progressGrey}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Button text="Validate Now" />
        </TouchableOpacity>
      </View>

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
            <View style={{alignSelf: 'flex-end'}}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={size.font20} />
              </TouchableOpacity>
            </View>

            <View style={{alignItems: 'center', marginTop: 10}}>
              <Text style={styles.text}>
                Congratulations, you have successfully integrated ABHA Number
                with your Profile.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false), navigation.navigate('AbhaId');
                }}
                style={styles.modalButton}>
                <Text
                  style={[
                    styles.buttonText,
                    {fontSize: size.font12, color: color.white},
                  ]}>
                  View ABHA ID
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AdharOtp;

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
  title: {
    marginVertical: 20,
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.black,
    textAlign: 'center',
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
    width: 45,
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: color.grey,
  },

  underlineStyleHighLighted: {
    borderColor: color.primary,
  },
  button: {
    marginTop: 100,
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
    height: '30%',
    backgroundColor: color.backgroundColor,
    alignSelf: 'center',
    position: 'absolute',
    padding: 20,
    borderRadius: 10,
  },
  imagebox: {
    alignSelf: 'center',
  },
  modalImage: {
    width: 220,
    height: 180,
    resizeMode: 'contain',
  },
  modalText: {
    fontSize: size.font14,
    textAlign: 'center',
    fontWeight: weight.semi,
    marginVertical: 10,
    color: color.black,
  },
  text: {
    fontSize: size.font14,
    fontWeight: weight.low,
    color: color.black,
    width: '70%',
    textAlign: 'center',
    marginTop: 10,
  },
  closeButton: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 25,
  },
  closeButtonText: {
    fontSize: size.font14,
    color: color.primary,
    fontWeight: weight.semi,
  },
  modalButton: {
    width: '40%',
    height: 30,
    backgroundColor: color.primary,
    borderRadius: 32,
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
