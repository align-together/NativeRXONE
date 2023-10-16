import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../compontents/headers/Header';
import GetProfile from '../../compontents/comman/GetProfile';
import { Picker } from '@react-native-picker/picker';
import DeviceInfo from 'react-native-device-info';
import color from '../../assets/theme/color';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import Files from '../../compontents/Files';
import Button from '../../compontents/comman/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../compontents/comman/Loader';
import { fetchProfiles } from '../../features/profile/profileSlice';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env';
import { useNavigation } from '@react-navigation/native';


const Health = () => {

  var navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState();
  const [records, setRecords] = useState();
  const [profile_id, setProfile_id] = useState('');
  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');
  const [docData, setDocData] = useState();
  const [docName, setDocName] = useState();
  const [selectedCategory, setSelectedCategory] = useState('lab_report');
  const [errortext, setErrortext] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  console.log(docName, 'docData');
  const getProfile_Id = item => {
    setProfile_id(item.profile_id);
    console.log(item, 'item');
  };

  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
    });
  });

  const handleRecordData = () => {
    setLoading(true);
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/list/records/${live}/${profile_id}`, {
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
        setErrortext(responseJson.message);
        setRecords(responseJson.medical_records);
        console.log(responseJson, '/////////////////////',profile_id);
        setLoading(false);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......clinic List Api Error......',profile_id);
      });
  };

  const params = { pt_token, pt_key };
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      handleRecordData();
      dispatch(fetchProfiles(params));
    }, [pt_token, pt_key, profile_id]),
  );

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      if (doc) {
        setModalVisible(true);
      }
      console.log(doc);
      setDocData(doc[0]);
      setDocName(doc[0].name);
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log(err);
    }
  };

  const imageUpload = () => {
    const formData = new FormData();
    formData.append('medical_record', {
      uri: docData.uri,
      name: docData.name,
      type: docData.type,
    });

    fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/upload/record/${live}/${profile_id}/${docName}/${selectedCategory}`,
      {
        method: 'POST',
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
        // alert('Image Upload successfully');
        handleRecordData();
      })
      .catch(error => {
        console.error('Upload error', error);
      });
  };

  const hello = () => {
    const versionCode = DeviceInfo.getVersion();
    console.log(`Version Code: ${versionCode}`);
    let current = 2;

    if (versionCode === current) {
      console.log("Same");
    } else {
      console.log("Not same");
      logout();
    }
  }

  const logout = () => {
    navigation.navigate('Login')
    console.log("LOGOUT")
  }


  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      <Header />
      <View style={styles.body}>
        <Text style={styles.title}>Select Profile:</Text>
        <GetProfile getProfile_Id={getProfile_Id} />
        <Text style={styles.desc}
          onPress={() => hello()}
        >
          You can allow Doctor/Provider to View and Download Your Health records
          for your consultation
        </Text>


        {records && records.length > 0 ? (
          <FlatList
            style={{ height: '63.5%' }}
            data={records}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRecordData}
              />
            }
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10, margin: 1 }}>
                <Files
                  item={item}
                  profile_id={profile_id}
                  handleRecordData={handleRecordData}
                />
              </View>
            )}
          />
        ) : (
          <View
            style={{
              height: '65%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: size.font14,
                color: color.errorColor,
                fontWeight: weight.semi,
              }}>
              {errortext === 'Please login using Phone and OTP.'
                ? null
                : 'Data Not Available'}
            </Text>
          </View>
        )}

        <TouchableOpacity onPress={selectDoc}>
          <Button text="Upload New" />
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modal}>
          <View style={styles.modalInner}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.modalText}>Save File by Other Name?</Text>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={size.font25} color={color.black} />
              </TouchableOpacity>
            </View>

            <View style={{ marginVertical: 20 }}>
              <TextInput
                style={{
                  fontSize: size.font14,
                  fontWeight: weight.low,
                  color: color.textPrimary,
                  borderWidth: 1,
                  borderColor: color.borderColor,
                  paddingLeft: 13,
                }}
                onChangeText={docName => setDocName(docName)}
                value={docName}
                autoFocus={true}
              />

              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  marginVertical: 20,
                  borderWidth: 1,
                  height: 50,
                  borderRadius: 2,
                  borderColor: color.borderColor,
                }}>
                <Picker
                  style={{
                    color: color.black,
                    width: '100%',
                    position: 'absolute',
                  }}
                  selectedValue={selectedCategory}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedCategory(itemValue)
                  }>
                  <Picker.Item label="Lab Report" value="lab_report" />
                  <Picker.Item label="Prescription" value="prescription" />
                  <Picker.Item
                    label="Hospital Records"
                    value="hospital_records"
                  />
                  <Picker.Item label="Other" value="other" />
                </Picker>
                <View
                  style={{
                    marginLeft: 270,
                  }}>
                  <Icon
                    style={{ color: color.black }}
                    name="caret-down-outline"
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false), imageUpload();
              }}
              style={{
                width: '50%',
                borderWidth: 1,
                borderRightColor: color.borderColor,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                borderColor: color.primary,
                borderRadius: 32,
                height: 40,
              }}>
              <Text
                style={{
                  fontSize: size.font16,
                  fontWeight: weight.low,
                  color: color.primary,
                }}>
                save now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Health;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  body: {
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.black,
    textAlign: 'center',
    marginVertical: 10,
  },
  desc: {
    fontSize: size.font12,
    fontWeight: weight.low,
    color: color.textPrimary,
    textAlign: 'center',
    marginVertical: 10,
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
    backgroundColor: color.backgroundColor,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 5,
    padding: 20,
  },
  modalText: {
    fontSize: size.font16,
    fontWeight: weight.low,
    color: color.black,
    width: '90%',
    textAlign: 'center',
  },
});
