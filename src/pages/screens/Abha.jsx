import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import OTPInputView from '@twotalltotems/react-native-otp-input';
import Clipboard from '@react-native-community/clipboard';
import Icon from 'react-native-vector-icons/Ionicons';

import color from '../../assets/theme/color';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import BackHeader from '../../compontents/headers/BackHeader';
import Button from '../../compontents/comman/Button';
import {useNavigation} from '@react-navigation/native';
import GetProfile from '../../compontents/comman/GetProfile';
import Loader from '../../compontents/comman/Loader';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { fetchProfiles } from '../../features/profile/profileSlice';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const Abha = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [profile_id, setProfile_id] = useState('');
  const [patProfile, setPatProfile] = useState();
  const [patName, setPatName] = useState('');
  const getProfile_Id = item => {
    setPatProfile(item);
    setProfile_id(item.profile_id);
    setPatName(item.name);
  };

  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

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
    // if (!mobile) {
    //   alert('Please fill Mobile Number');
    //   return;
    // }
    // if (mobile.length < 10) {
    //   alert('Please fill Mobile Number');
    //   return;
    // }
    setLoading(true);
    let dataToSend = JSON.stringify({health_id:'45-0033-3637-4336'});
    console.log(dataToSend, 'dataToSend');

    fetch("https://rx-opd-prod-4gag6.ondigitalocean.app/v2/" +`patient/abha/integrate/${live}/${profile_id}`,
      {
        method: 'POST',
        body: dataToSend,
        headers: {
          //Header Defination
          'Content-Type': 'application/json',
          pt_token:pt_token,
          pt_key:pt_key
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        alert(responseJson.message);
        // navigation.replace('Otp', mobile);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
        console.log('Please check your Number');
      });
  };

  
  const params = {pt_token, pt_key};

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfiles(params));
  }, [params]);


  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      <BackHeader />
      <View style={styles.body}>
        <View style={styles.topContainer}>
          <Image
            source={require('../../assets/images/abha.png')}
            style={styles.image}
          />
          <Text style={styles.text}>
            Integrate your Profile with ABHA (Ayushman Bharat Health Account)
          </Text>
          <Text style={styles.title}>Got ABHA Number or ABHA Address?</Text>
          <View style={{width: '100%', marginVertical: 20}}>
            <GetProfile getProfile_Id={getProfile_Id} />
          </View>
        </View>

        <View>
          <View style={styles.otpField}>
            <OTPInputView
              style={{width: 80}}
              pinCount={14}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({code})}}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              // codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
         
          </View>
          <Text style={styles.or}>OR</Text>
          <View style={styles.inputBox}>
            <TextInput style={styles.inputText} />
            <Text>@abdm</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
        // onPress={() => setModalVisible(true)}
        onPress={handleSubmitPress}
        >
          <Button text="Integrate Now" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('AbhaAdharNumber',{profile_id,patName})}
          style={styles.button}>
          <Text style={styles.buttonText}>Create New ABHA +</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
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
                No user account can be found with the ABHA Number/Enrolment
                Number provided.
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalButton}>
                <Text style={[styles.buttonText, {fontSize: size.font12}]}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Abha;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  body: {
    width: screenWidth / 1.1,
    // backgroundColor: 'red',
    alignSelf: 'center',
  },
  topContainer: {
    // backgroundColor: 'green',
    height: screenHeight / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 44,
    resizeMode: 'contain',
  },
  text: {
    fontSize: size.font14,
    fontWeight: weight.low,
    color: color.black,
    width: '70%',
    textAlign: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: size.font16,
    fontWeight: weight.semi,
    color: color.black,
    marginTop: 10,
  },
  input: {
    borderRadius: 32,
    width: '100%',
    borderWidth: 1,
    borderColor: color.textPrimary,
    paddingHorizontal: 20,
  },
  or: {
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.textGrey,
    textAlign: 'center',
    marginVertical: 20,
  },
  inputBox: {
    borderRadius: 32,
    width: '100%',
    borderWidth: 1,
    borderColor: color.textPrimary,
    paddingHorizontal: 20,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    width: '83%',
    borderColor: color.textPrimary,
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    height: screenHeight / 5,
    // backgroundColor:'red',
    marginTop: 100,
    justifyContent: 'center',
  },
  button: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
    alignSelf: 'center',
    backgroundColor: color.errorColor,
    width: '100%',
    borderRadius: 32,
  },
  buttonText: {
    fontSize: size.font16,
    color: color.white,
    fontWeight: weight.semi,
  },
  otpField: {
    width: '100%',
    height: 50,
    marginVertical: 20,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 32,
    paddingHorizontal: 15,
    alignItems: 'center',
  },

  underlineStyleBase: {
    width: 18,
    height: 35,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: color.bor,
    marginRight: 5,
    color: color.textPrimary,
  },

  highfun: {fontSize: 20, color: color.black},
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
