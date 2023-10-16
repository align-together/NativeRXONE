import {
  ActivityIndicator,
  Image, Alert,
  ScrollView, 
  StyleSheet, Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import color from '../../assets/theme/color';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import BackHeader from '../../compontents/headers/BackHeader';
import DatePicker from 'react-native-date-picker';
import Loader from '../../compontents/comman/Loader';
import { useFocusEffect } from '@react-navigation/native';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env';

import RNFetchBlob from 'rn-fetch-blob';
import Pdf from 'react-native-pdf';

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState('');
  const [date1, setDate1] = useState('');
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');
  const [start_Date, setStart_Date] = useState();
  const [end_Date, setEnd_Date] = useState();
  const [orders, setOrders] = useState();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [pathh, setPathh] = useState('');
  const [show, setShow] = useState(false);
  const [fName, setFName] = useState('')
  const [oID, setOID] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
    });
  });
  console.log("pt_Key", pt_key);
  console.log("pt_token", pt_token);

  function formatDate(date) {
    const date1 = date ? date : new Date();
    var d = new Date(date1);
    d.setDate(d.getDate() - 2);
    month = '' + (d.getMonth()), // + 1
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return setStart_Date([year, month, day].join('-'));
  }

  function formatDate1(date1) {
    const date = date1 ? date1 : new Date();
    var d = new Date(date);
    d.setDate(d.getDate() + 1);
    month = '' + (d.getMonth()),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return setEnd_Date([year, month, day].join('-'));
  }

  useEffect(() => {
    formatDate(date);
    formatDate1(date1);
  });

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setMessage('');
      fetch(
        `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/list/orders/${live}/${start_Date}/${end_Date}`,
        {
          method: 'GET',
          headers: {
            //Header Defination
            pt_token: pt_token,
            pt_key: pt_key,
            'Content-Type': 'application/json',
          },
        },
      )
        .then(response => response.json())
        .then(responseJson => {
          console.log("patient/list/orders", responseJson);
          //Hide Loader
          setOrders(responseJson.orders);
          setMessage(responseJson.message);
          setLoading(false);
        })
        .catch(error => {
          //Hide Loader
          setLoading(false);
          console.log('api error', error);
        });
    }, [pt_token, pt_key, end_Date, start_Date]),
  );

  const fetchInvoice = async value => {
    await fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/generate/order/invoice/${live}/${value}`,

      {
        method: 'POST',
        headers: { pt_token: pt_token, pt_key: pt_key },
      },
    )
      .then(response => response.json())
      .then(json => {
        console.log('......order response......', json);
      })
      .catch(error => {
        console.log('......order error......', error);
      });
  };

  const downloadFile = (url, fileName, fileType, order_id) => {
    console.log('order_id', order_id)
    console.log('fileType', fileType)
    console.log('fileName', fileName)
    console.log('url', url)
    setLoading(true);
    let dirs = RNFetchBlob.fs.dirs;
    // let fileExt = fileType === 'pdf' ? '.pdf' : '.png'; // Change the file extension depending on the file type
    console.log(fileName);
    console.log("https://rx-opd-prod-4gag6.ondigitalocean.app/v2/" + url + '/' + live + `/${order_id}`);

    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: fileName,
        path: `${dirs.DownloadDir}/${fileName}`,
      },
    })
    fetch("https://rx-opd-prod-4gag6.ondigitalocean.app/v2/" + url + '/' + live + `/${order_id}`,
      {
        method: 'POST',
        headers: {
          pt_token: pt_token,
          pt_key: pt_key,
          'Content-Type': 'application/json',
        },
      },
    )
      .then(res => {
        console.log('File downloaded successfully');
        // Alert.alert(' ','File downloaded successfully');
        setLoading(false);
      })
      .catch(error => {
        console.log("")
        console.log('Error downloading file:', error);
        console.log("")
        console.log("pt_Key", pt_key);
        console.log("pt_token", pt_token);
        console.log("order_id", order_id);
        setLoading(false);
      });
  };

  // function dem() {
  // fetch('https://rx-opd-dev-rv573.ondigitalocean.app/v2/patient/generate/order/invoice/test/92f2d591-9093-4a76-b192-18d55d23', {
  //   method: 'POST',
  //   headers: {
  //     pt_token: pt_token,
  //     pt_key: pt_key,
  //     'Content-Type': 'application/json',
  //   },
  // })
  //     .then((res) => {
  //       console.log('res', res)
  //       console.log('res', res.headers)

  //     })
  //     .then((resp) => {
  //       console.log("resp => ", resp);
  //     })
  //     .catch((err) => {
  //       console.error('Error:', err);
  //     });
  // }


  // const downloadvFile = (url, fileName, fileType, record_code) => {
  const downloadFile1 = (oID) => {

    let url = 'patient/generate/order/invoice'

    console.log('url        ', url)
    console.log('"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"   ', "https://rx-opd-prod-4gag6.ondigitalocean.app/v2/")
    console.log('live   ', live)

    console.log('pt_token   ', pt_token)
    console.log('pt_key     ', pt_key)
    console.log("--------------->  ", "https://rx-opd-prod-4gag6.ondigitalocean.app/v2/" + url + '/' + live + `/${oID}`)

    fetch("https://rx-opd-prod-4gag6.ondigitalocean.app/v2/" + url + '/' + live + `/${oID}`,
      {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'image/jpeg',
          pt_token: pt_token,
          pt_key: pt_key,
        },
      },
    )
      .then(res => {
        // console.log('--> 1 :', res.headers.map["content-disposition"]);
        console.log('--> 1 ', res.headers.map["content-disposition"].split('.')[0].split(' ')[1]);
        setFName(res.headers.map["content-disposition"].split('.')[0].split(' ')[1]);
        console.log('res.url is ', res.url);
        // console.log('res.headers', res.headers.map['content-disposition'])
        // console.log('res.headers', res.headers.map['content-disposition'].slice(17,38))
        // setFileN(res.headers.map['content-disposition'].slice(17,38));
        // console.log('File downloaded successfully', await res.json());
        ImageShowFunc1(res.url);
      })
      .catch(error => {
        console.log('Error downloading file:', error);
      });



    const ImageShowFunc1 = (value) => {
      console.log('value   is ', value)

      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'pdf',
      })
        .fetch('POST', value, {
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
            console.log('fName', fName)
          } else {
            const data = '' + res.data;
            // setPathh(data);
            console.log('data - 2 ', data)
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    };

  };



  function dem(oID) {

    console.log('oID is: ', oID)
    let url = 'patient/generate/order/invoice'
    console.log('fName', fName)
    console.log("--> ", "https://rx-opd-prod-4gag6.ondigitalocean.app/v2/" + url + '/' + live + `/${oID}`)

    let dirs = RNFetchBlob.fs.dirs;

    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: fName,
        path: `${dirs.DownloadDir}/${fName}`,
      },
    })
      .fetch("https://rx-opd-prod-4gag6.ondigitalocean.app/v2/" + url + '/' + live + `/${oID}`, {
        method: 'GET',
        headers: {
          pt_token: pt_token,
          pt_key: pt_key,
          'Content-Type': 'application/json',
        },
      }).then(async res => {
        console.log('File downloaded successfully', res);

      })
      .catch(error => {
        console.log('Error downloading file:', error);

      });

  }

  // .fetch(
  //   'POST',
  //   // 'https://rx-opd-dev-rv573.ondigitalocean.app/v2/patient/generate/order/invoice/test/92f2d591-9093-4a76-b192-18d55d23',
  //   "https://rx-opd-prod-4gag6.ondigitalocean.app/v2/" + url + '/' + live + `/${oID}`,
  //   { pt_token, pt_key },
  // )


  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      <DatePicker
        modal
        mode="date"
        open={open}
        minimumDate={new Date('1900-01-01')}
        maximumDate={new Date('2100-01-01')}
        date={new Date()}  //new Date().getTime() - 2 * 24 * 60 * 60 * 1000
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <DatePicker
        modal
        mode="date"
        open={open1}
        minimumDate={new Date('1900-01-01')}
        maximumDate={new Date('2100-01-01')}
        date={new Date()}
        onConfirm={date => {
          setOpen1(false);
          setDate1(date);
        }}
        onCancel={() => {
          setOpen1(false);
        }}
      />
      <BackHeader />

      <ScrollView>
        <View style={styles.body}>
          <View style={[styles.datebox, { marginTop: 20 }]}>
            <View
              style={{
                width: '45%',
              }}>
              <Text style={styles.datetext}>Start Date</Text>
            </View>
            <View
              style={{
                width: '45%',
              }}>
              <Text style={styles.datetext}>End Date</Text>
            </View>
          </View>
          <View style={styles.datebox}>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={styles.dateboxinner}>
              <Text style={styles.datetext}>
                {new Date(start_Date).toDateString()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOpen1(true)}
              style={styles.dateboxinner}>
              <Text style={styles.datetext}>
                {new Date(end_Date).toDateString()}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}
            onPress={() => {
              console.log("pt_Key", pt_key);
              console.log("pt_token", pt_token);
            }}
          >
            Click on the card below to view or print receipt.
          </Text>


          <>
            {orders && orders.length > 0 ? (
              orders.map((item, index) => {
                return (
                  <View key={index} style={styles.card}>
                    <Text style={styles.title}>{item.particulars} </Text>
                    <View style={styles.priceView}>
                      <Text style={styles.title}>
                        {item.currency ? item.currency : 'INR'}{' '}
                        {item.amount_paid}
                      </Text>
                      <Text style={styles.title}>{item.payment_date}</Text>
                    </View>
                    <View style={styles.priceView}>
                      <View style={styles.paidView}>
                        <Text style={styles.text}>{item.status}</Text>
                      </View>
                      {item.show_generate_invoice_button === true ? (
                        <TouchableOpacity
                          onPress={() => {
                            console.log("order-id", item.order_id);
                            setOID(item.order_id)
                            setShow(true);
                            setTimeout(() => setShow(false), 2000)
                            downloadFile1(item.order_id)

                          }}
                          style={styles.receiptView}>
                          <Text
                            style={[
                              styles.text,
                              { color: color.onlineColor, marginRight: 10 },
                            ]}>
                            Show Receipt
                          </Text>
                          <Icon
                            name="eye-outline"
                            size={size.font14}
                            color={color.onlineColor}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  // height: '65%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 100,
                }}>
                {message === 'Please login using Phone and OTP.' ? (
                  <ActivityIndicator size={25} />
                ) : (
                  <Text
                    style={{
                      fontSize: size.font14,
                      color: color.errorColor,
                      fontWeight: weight.semi,
                    }}>
                    Data Not Available
                  </Text>
                )}
              </View>
            )}
          </>

          <Modal
            transparent={true}
            animationType={'none'}
            visible={show}
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

                  {/* <TouchableOpacity onPress={() => dem(oID)} style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}
                  >
                    <Icon name="download-outline" top={0} size={25} color={color.primary} />
                  </TouchableOpacity> */}

                  <TouchableOpacity onPress={() => (setShow(false), console.log("_____________________________"))}
                    style={{ justifyContent: 'space-evenly', flexDirection: 'row' }} >
                    <Icon name="close-circle-outline" top={0} size={25} color={color.primary} />
                  </TouchableOpacity>

                </View>

                {show ?
                  (<ActivityIndicator
                    animating={loading}
                    color={color.primary}
                    size={41}
                    style={{
                      alignItems: 'center',
                      height: "95%",
                    }}
                  />)
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
          </Modal >


        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  body: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  datebox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateboxinner: {
    width: '45%',
    padding: 7,
    paddingHorizontal: 15,
    backgroundColor: color.secondary,
    borderRadius: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  datetext: {
    fontSize: size.font14,
    fontWeight: color.textPrimary,
    color: color.black,
  },
  title: {
    fontSize: size.font14,
    fontWeight: weight.low,
    color: color.black,
    marginVertical: 5,
    marginTop: 20,
  },
  card: {
    width: '100%',
    borderRadius: 10,
    marginTop: 15,
    elevation: 5,
    backgroundColor: color.white,
    padding: 10,
  },
  priceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paidView: {
    width: 70,
    height: 20,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  receiptView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: size.font10,
    fontWeight: weight.low,
    color: color.primary,
  },
});
