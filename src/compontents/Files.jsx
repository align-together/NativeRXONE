import {
  Image,
  Modal,
  StyleSheet,
  Text, Alert, ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import size from '../assets/theme/size';
import color from '../assets/theme/color';
import weight from '../assets/theme/weight';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env'
import { ScrollView } from 'react-native';

import Loader from '../compontents/comman/Loader';
import RNFetchBlob from 'rn-fetch-blob';
import Pdf from 'react-native-pdf';
import RNPrint from 'react-native-print';

const Files = ({ item, profile_id, handleRecordData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');
  const [share_with_hospital, setShare_with_hospital] = useState();
  const [share_with_doctor, setShare_with_doctor] = useState();
  const [load, setLoad] = useState(false);
  const [pathh, setPathh] = useState('');
  const [recordCode, setRecordCode] = useState('')
  const [fileN, setFileN] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
    });
  });

  // console.log("---------------------------")
  const handleRecordDelete = value => {
    console.log('handleRecordDele.te     1 ')
    console.log('profile_id                ', profile_id)
    console.log('value                     ', value)
    setLoading(true);
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/remove/record/${live}/${profile_id}/${value}`, {
      method: 'DELETE',
      headers: {
        //Header Defination
        pt_token: pt_token,
        pt_key: pt_key,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        handleRecordData();
        console.log('handleRecordDele.te    2', responseJson);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        // console.error(error, '......delete  Api Error......');
        console.log('handleRecordDele.te    3', error);
      });
  };

  const handleFacility = value => {
    console.log(value);
    setLoading(true);
    let dataToSend = JSON.stringify({ share_with_hospital: value.status });
    console.log(dataToSend, 'dataToSend');
    fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/facility/record/consent/${live}/${profile_id}/${value.record_code}`,
      {
        method: 'PUT',
        headers: {
          //Header Defination
          'Content-Type': 'application/json',
          pt_token: pt_token,
          pt_key: pt_key,
        },
        body: dataToSend,
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson, 'facility');
        handleRecordData();
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......facility......');
      });
  };

  const handleDoctor = value => {
    console.log(value);
    setLoading(true);
    let dataToSend = JSON.stringify({ share_with_doctor: value.status });
    console.log(dataToSend, 'dataToSend');
    fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/doctor/record/consent/${live}/${profile_id}/${value.record_code}`,
      {
        method: 'PUT',
        headers: {
          //Header Defination
          'Content-Type': 'application/json',
          pt_token: pt_token,
          pt_key: pt_key,
        },
        body: dataToSend,
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson, 'share_with_doctor');
        handleRecordData();
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......share_with_doctor......');
      });
  };

  // const downloadvFile = (url, fileName, fileType, record_code) => {
  const downloadFile = (url, record_code) => {
    setRecordCode(record_code)
    console.log('url        ', url)
    console.log('"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"   ', "https://rx-opd-prod-4gag6.ondigitalocean.app/v2/")
    console.log('live   ', live)
    console.log('profile_id ', profile_id)
    console.log('record_code', record_code)
    console.log('recordCode ', recordCode)
    console.log('pt_token   ', pt_token)
    console.log('pt_key     ', pt_key)

    fetch("https://rx-opd-prod-4gag6.ondigitalocean.app/v2/" + url + '/' + live + `/${profile_id}/${record_code}`,
      {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'image/jpeg',
          pt_token: pt_token,
          pt_key: pt_key,
        },
      },
    )
      .then(res => {
        console.log('File downloaded successfully', res);
        console.log('File is ', res.url);
        console.log('res.headers', res.headers.map['content-disposition'])
        console.log('res.headers', res.headers.map['content-disposition'].slice(17, 38))
        setFileN(res.headers.map['content-disposition'].slice(17, 38));
        // console.log('File downloaded successfully', await res.json());
        ImageShowFunc1(res.url);
      })
      .catch(error => {
        console.log('Error downloading file:', error);
      });



    const ImageShowFunc1 = (value) => {
      console.log('ImageShowFunc1 value is ', value)

      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'pdf',
      })
        .fetch('GET', value, {
          Accept: 'application/pdf',
          'Content-Type': 'application/pdf',
          pt_key: pt_key,
          pt_token: pt_token,
        })
        .then(res => {
          console.log('Image path is res', res)
          if (Platform.OS === 'android') {
            const data = 'file:/' + res.data;
            setPathh(data);
            console.log('data - 1 ', data);
          } else {
            const data = '' + res.data;
            setPathh(data);
            console.log('data - 2 ', data)
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    };

  };



  function dem() {

    console.log('recordCode ', recordCode)
    console.log('fileN ', fileN)

    let dirs = RNFetchBlob.fs.dirs;



    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: fileN,
        path: `${dirs.DownloadDir}/${fileN}`,
      },
    })
      .fetch(
        'GET',
        "https://rx-opd-prod-4gag6.ondigitalocean.app/v2/" + 'patient/get/record' + '/' + live + `/${profile_id}/${recordCode}`,
        { pt_token, pt_key },
      )
      .then(async res => {
        console.log('File downloaded successfully', res);
        alert('File downloaded successfully');
        setLoading(false);
        // const stat = await RNFetchBlob.fs.stat(rsp.path())
        // console.log(stat, "stat");
      })
      .catch(error => {
        console.log('Error downloading file:', error);
        setLoading(false);
      });

  }








  return (
    <>
      <Loader loading={loading} />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <Text style={styles.date}>{item.uploaded_on.slice(10, 30)}</Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              setCode(item.record_code);
            }}>
            <Icon name="trash" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.box}>
              <Text numberOfLines={1} style={styles.type}>
                {item.record_category}
              </Text>
            </View>

            <Text numberOfLines={2} style={styles.innerText}>
              {item.display_name}
            </Text>
          </View>

          <View style={{ width: '47%' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text style={styles.innerText}>Share with Facility</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    let record_code = item.record_code;
                    let status = false;
                    const params = { record_code, status };
                    handleFacility(params);
                  }}
                  style={{
                    width: 15,
                    height: 13,
                    backgroundColor: 'red',
                    backgroundColor:
                      item.share_with_hospital === false
                        ? color.buttonGray
                        : color.secondary,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    let record_code = item.record_code;
                    let status = true;
                    const params = { record_code, status };
                    handleFacility(params);
                  }}
                  style={{
                    width: 15,
                    height: 13,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    backgroundColor: 'green',

                    backgroundColor:
                      item.share_with_hospital === true
                        ? color.primary
                        : color.secondary,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.innerText}>Share with Doctor</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    let record_code = item.record_code;
                    let status = false;
                    const params = { record_code, status };
                    handleDoctor(params);
                  }}
                  style={{
                    width: 15,
                    height: 13,
                    backgroundColor:
                      item.share_with_doctor === false
                        ? color.buttonGray
                        : color.secondary,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    let record_code = item.record_code;
                    let status = true;
                    const params = { record_code, status };
                    handleDoctor(params);
                  }}
                  style={{
                    width: 15,
                    height: 13,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,

                    backgroundColor:
                      item.share_with_doctor === true
                        ? color.primary
                        : color.secondary,
                  }}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => {
                setLoading(true)
                setTimeout(() => setLoading(false), 2500)
                // downloadFile(
                //   'patient/get/record',
                //   item.display_name,
                //   'image',
                //   item.record_code,
                // );
                downloadFile(
                  'patient/get/record',
                  item.record_code
                )
                setLoad(true);
                setRecordCode(item.record_code)
                console.log('pt_Key', pt_key)
                console.log('pt_token', pt_token)
                console.log('profile_id', profile_id)
              }
              }
              style={styles.pdf}>
              <Image
                source={require('../assets/images/pdf.png')}
                style={styles.image}
                color={'blue'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modal}>
          <View style={styles.modalInner}>
            <Text style={styles.modalText}>
              Are you sure you would like to permanently delete the file?
            </Text>
            <View
              style={{
                height: 45,
                position: 'absolute',
                width: '100%',
                bottom: 0,
                flexDirection: 'row',
                borderTopWidth: 1,
                borderTopColor: color.borderColor,
              }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  width: '50%',
                  borderRightWidth: 1,
                  borderRightColor: color.borderColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: size.font14,
                    fontWeight: weight.semi,
                    color: color.black,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false), handleRecordDelete(code);
                }}
                style={{
                  width: '50%',
                  borderRightWidth: 1,
                  borderRightColor: color.borderColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: size.font14,
                    fontWeight: weight.semi,
                    color: color.black,
                  }}>
                  Proceed
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        animationType={'none'}
        visible={load}
        onRequestClose={() => {
          console.log('close modal');
        }}>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: '#00000040',
        }}>
          <View style={{
            backgroundColor: '#FFFFFF',
            height: "98%",
            width: '98%',
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingHorizontal: 10,
          }}>

      
            <View style={{ height: 32, width: "99%", backgroundColor: color.secondary, flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around', alignItems: 'center', borderRadius: 10 }} >

              <TouchableOpacity style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}
                onPress={() => dem()}
              >
                <Icon name="download-outline" top={0} size={25} color={color.primary} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => (setLoad(false))}
                style={{ justifyContent: 'space-evenly', flexDirection: 'row' }} >
                <Icon name="close-circle-outline" top={0} size={25} color={color.primary} />
              </TouchableOpacity>

            </View>

            {loading ? (
              <ActivityIndicator
                animating={loading}
                color={color.primary}
                size={41}
                style={{
                  alignItems: 'center',
                  height: "95%",
                }}
              />
            )
              :
              <ScrollView nestedScrollEnabled={true} 
                style={{ height: "95%", width: "99%", backgroundColor: 'white', borderWidth: 0, borderRadius: 10, borderColor: color.primary, overflow: 'hidden' }} >

                <View style={{ height: "100%", width: "100%", alignSelf: 'center', backgroundColor: 'white', overflow: 'hidden' }}>
                  <Pdf
                    source={{ uri: pathh }}
                    // source={{ uri: 'file://data/user/0/com.rxone/files/RNFetchBlobTmp_rt79aq36j9xjeq5smdu1.pdf' }}
                    style={{ height: "100%", width: "100%", alignSelf: 'center', backgroundColor: 'white' }}
                  />
                </View>

              </ScrollView>

            }

          </View>
        </View>
      </Modal>

    </>
  );
};


export default Files;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: color.white,
    padding: 10,
    borderRadius: 10,
    borderColor: 'grey',
    elevation: 3,
  },
  icon: {
    fontSize: size.font18,
    color: color.black,
    textAlign: 'right',
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '74%',
  },
  date: {
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.black,
  },
  inner: {
    flexDirection: 'row',
    width: 145,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerText: {
    fontSize: 12,
    fontWeight: weight.low,
    color: color.textPrimary,
    textAlign: 'center',
  },
  pdf: {
    backgroundColor: color.errorColor,
    borderRadius: 4,
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  box: {
    padding: 5,
    backgroundColor: color.secondary,
    width: '100%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  type: {
    fontSize: size.font10,
    color: color.primary,
    fontWeight: weight.semi,
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
    height: '20%',
    backgroundColor: color.backgroundColor,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 5,
  },
  modalText: {
    fontSize: size.font14,
    fontWeight: weight.low,
    color: color.black,
    padding: 20,
  },
});

