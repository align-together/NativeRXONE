import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../compontents/headers/Header';
import GetProfile from '../../compontents/comman/GetProfile';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import color from '../../assets/theme/color';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import Button from '../../compontents/comman/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import DoctorCard from '../../compontents/comman/DoctorCard';
import Loader from '../../compontents/comman/Loader';
import { useDispatch } from 'react-redux';
import { fetchProfiles } from '../../features/profile/profileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HospitalCard from '../../compontents/comman/HospitalCard';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env'

const Book = props => {
  // console.log('+++ props', props, props.route.key, props.route.name, props.route.params);
  const navigation = useNavigation();
  const careData = props?.route?.params || '';
  const item = careData?.item || '';
  const [patName, setPatName] = useState('');
  const [patProfile, setPatProfile] = useState();
  const [profile_id, setProfile_id] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [availableClinicList, setAvailableClinicList] = useState();
  const [selectid, setSelectid] = useState('');
  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);




  const getProfile_Id = item => {

    setPatProfile(item);
    setProfile_id(item?.profile_id);
    setPatName(item?.name);



    console.log('=====      patProfile/item  ', item)
    console.log('=====      profile_id       ', profile_id, patName)
    console.log('=====      item?.name       ', item?.name)
  };

  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
    });
    // AsyncStorage.getItem('profile').then(value => {
    //   setProfile_id(value);
    // });
  });

  const handleHospitalData = () => {
    setLoading(true);
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/list/facilities/${live}`, {
      method: 'GET',
      headers: {
        //Header Defination
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        console.log('responseJson', responseJson)
        setLoading(false);
        setAvailableClinicList(responseJson?.hospitals);
        // imageData(responseJson?.hospitals);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......handleHospitalDavta Api Error......');
      });
  };

  const [scan, setScan] = useState(false);
  const [scanResult, setScanResult] = useState(false);
  const [result, setResult] = useState(null);
  const [checkData, setCheckData] = useState('');



  const onSuccess = (e) => {
    console.log('==================            .................scanned data', e);

    const check = e.data.substring(0, 28);
    const mode = e.data.substring(33, 37);
    const hos_id = e.data.substring(46, 79);
    setCheckData(check);
    setScan(false);
    setScanResult(true);
    setResult(e);

    console.log('--------------------------------------------->  ', e.data) // https://www.care.rxone.app/?
    console.log(' -----      check ', check)          // https://www.care.rxone.app/?
    console.log(' -----      mode  ', mode)
    console.log(' -----      hos_id', hos_id)

    if (check === 'https://www.care.rxone.app/?') {   // www.dev.care. ..
      // const mode = e.data.substring(37, 41);
      // const hos_id = e.data.substring(50, 82);
      setModalVisible(false);

      console.log('===   on Success')

      console.log('--->   mode   ', mode)
      console.log('hos_id        ', hos_id)
      // console.log('hospital_name ', hospital_name)   
      console.log('patProfile    ', patProfile)
      console.log('profile_id    ', profile_id)

      console.log('patName       ', patName);
      hosFunction(hos_id);
      // {live=== 'test' ? hosFunction1(hos_id) : hosFunction(hos_id) }

      // navigation.navigate('DrFee', {
      //   hos_id,
      //   patName,
      //   hospital_name: '  ',
      //   profile_id,
      //   patProfile
      // }); // mode

    } else {
      console.log('===   onFail')
      setScan(false);
      setScanResult(true);
      setResult(e);
    }
  };



  function hosFunction(hID) {
    console.log('hID', hID)

    fetch(`https://rx-opd-prod-4gag6.ondigitalocean.app/hospital/details/${hID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("resp is ", resp);
        navigation.navigate('DrFee', {
          hos_id: resp?.hos_id,
          patName,
          hospital_name: resp?.hospital_name,
          profile_id,
          patProfile
        })
      })
      .catch((err) => console.log("Error is ", err))
  }

  function hosFunction1(hID) {
    console.log('hID', hID)

    fetch(`https://rx-opd-dev-rv573.ondigitalocean.app/${live}/hospital/details/${hID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log("resp is ", resp);
        navigation.navigate('DrFee', {
          hos_id: resp?.hos_id,
          patName,
          hospital_name: resp?.hospital_name,
          profile_id,
          patProfile
        })
      })
      .catch((err) => console.log("Error is ", err))
  }




  const onRefresh = () => {
    setLoading(true);
    // console.log("https://rx-opd-prod-4gag6.ondigitalocean.app/v2/" + `patient/list/doctors/${live}`);
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/list/doctors/${live}`, {
      method: 'GET',
      headers: {
        //Header Defination
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        setFilteredDataSource(responseJson.doctors);
        console.log('onR.efresh() responseJson', responseJson)
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......Doctor List Api Error......');
      });
  };

  const params = { pt_token, pt_key };
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      if (pt_token) {
        onRefresh();
        dispatch(fetchProfiles(params));
      }
    }, [pt_token, pt_key]),
  );

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = text => {
    setSearchQuery(text);
  };

  useEffect(() => {
    handleSearch(item);
  }, [filteredDataSource]);

  const data = [{ title: 'anuj' }, { title: 'vivek' }];
  // const filteredData = filteredDataSource.filter(item => {
  //   return item?.speciality.toLowerCase().includes(searchQuery.toLowerCase());
  // });


  const filteredData = filteredDataSource.filter(item => {
    const fieldsToSearch = [item?.doctor_name, item?.speciality, item?.hospital, item?.address]; // fields to search in
    const searchTerm = searchQuery.toLowerCase(); // search query in lower case

    return fieldsToSearch.some(field =>
      field.toLowerCase().includes(searchTerm)
    );
  });

  // console.log(filteredData, 'filteredData');


  const renderEmptyListComponent = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
        <Text style={{ color: color.black }}>There is no data available</Text>
      </View>
    );
  };



  return (

    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      <Header />
      {/* <Text>{patName} id patname </Text> */}
      <View style={styles.body}>
        <Text onPress={hosFunction} style={styles.title}>Booking Appointment for</Text>

        <View style={{ width: '100%' }}>
          <GetProfile getProfile_Id={getProfile_Id} />
        </View>

        {/* <Text onPress={onRefresh} style={styles.title}> onRefresh </Text>
        <Text onPress={handleHospitalData} style={styles.title}> handleHospitalData </Text> */}

        <View style={styles.search}>
          <TextInput
            placeholderTextColor={color.progressGrey}
            placeholder="Search for Doctor, Hospital or Speciality"
            onChangeText={handleSearch}
            value={searchQuery}
            style={{ color: color.black }}
          />
          <Icon name="search" size={size.font18} color={color.black} />
        </View>

        <FlatList
          style={{ height: '58%', marginTop: 10 }}
          data={filteredData}
          ListEmptyComponent={renderEmptyListComponent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <DoctorCard
              item={item}
              profile_id={profile_id}
              patName={patName}
              patProfile={patProfile}
              navigationScreen="SelectDate"
            />
          )}
        />


        {/* <View>
          <Text onPress={() => setModalVisible(true)}>setModalVisible</Text>
        </View> */}

        <TouchableOpacity
          onPress={() => {
            console.log("Clicked the Scan QR")
            setModalVisible(true);
            handleHospitalData();
          }}>
          <Button text="Scan QR" flag="true" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modal}>

          <View
            style={{
              position: 'absolute',
              top: 20,
              margin: 20,
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                height: 100,
              }}>

              <QRCodeScanner
                onRead={onSuccess}
                reactivate={true}
                showMarker={true}
                ref={node => {
                  scanner = node;
                }}
              />
            </View>

            {checkData ? null : (
              <View
                style={{
                  marginTop: 260,
                  width: '90%',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: size.font14,
                    fontWeight: weight.semi,
                    color: color.black,
                  }}>
                  Please wait QR Scanning
                </Text>
              </View>
            )}
          </View>

          <View style={styles.modalInner}>
            <View style={styles.search}>
              <TextInput
                placeholder="Search for Doctor, Hospital or Speciality"
                style={styles.inputText}
                placeholderTextColor={color.progressGrey}
              />
              <Icon name="search" size={size.font20} color={color.textGrey} onPress={() => console.log('availableClinicList', availableClinicList)} />
            </View>

            <View style={styles.clinic}>
              <FlatList
                data={availableClinicList}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false),
                        setSelectid(item?.hos_id),
                        navigation.navigate('DrFee', {
                          hos_id: item?.hos_id,
                          patName,
                          hospital_name: item?.hospital_name, //hospital
                          profile_id,
                          patProfile: JSON.stringify(patProfile)
                        });
                    }}
                    style={[
                      styles.clinicCard,
                      {
                        backgroundColor:
                          selectid === item?.hos_id
                            ? color.primary
                            : color.white,
                        elevation: 1,
                        borderWidth: 0.5,
                        borderColor: color.borderColor,
                      },
                    ]}>
                    <View
                      style={[
                        styles.clinicInner,
                        {
                          backgroundColor: color.white,
                          // selectid == item?.hos_id
                          //   ? color.white
                          //   : color.primary,
                        },
                      ]}>
                      <HospitalCard item={item?.hos_id} />
                    </View>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.clinicText,
                        {
                          color:
                            selectid === item?.hos_id
                              ? color.white
                              : color.black,
                        },
                      ]}>
                      {item?.hospital_name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>


  );
};


export default Book;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginVertical: 20,
  },
  search: {
    width: '100%',
    backgroundColor: color.white,
    alignSelf: 'flex-start',
    borderRadius: 32,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    marginVertical: 15,
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
    width: '100%',
    height: '40%',
    backgroundColor: color.backgroundColor,
    alignSelf: 'center',
    position: 'absolute',
    padding: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    bottom: 0,
  },
  search: {
    width: '100%',
    height: 45,
    backgroundColor: color.backgroundColor,
    borderRadius: 32,
    elevation: 2,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  inputText: {
    fontSize: size.font12,
    color: color.textGrey,
    width: '80%',
  },
  clinic: {
    marginVertical: 50,
    flexDirection: 'row',
  },
  clinicCard: {
    width: 90,
    height: 90,
    backgroundColor: color.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  clinicInner: {
    width: 45,
    height: 45,
    backgroundColor: color.white,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  clinicText: {
    fontSize: size.font10,
    fontWeight: weight.low,
    color: color.white,
    lineHeight: 20,
    padding: 5,
  },
});


