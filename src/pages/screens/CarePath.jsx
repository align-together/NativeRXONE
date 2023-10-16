import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import color from '../../assets/theme/color';
import BackHeader from '../../compontents/headers/BackHeader';
import GetProfile from '../../compontents/comman/GetProfile';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';

import AnimatedText from '../../compontents/AnimatedText';
import Loader from '../../compontents/comman/Loader';
import { useDispatch } from 'react-redux';
import { fetchProfiles } from '../../features/profile/profileSlice';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env'

const CarePath = () => {
  const navigation = useNavigation();
  const [profile_id, setProfile_id] = useState('');
  const [dropDown, setDropDown] = useState(false);
  const [checks, setChecks] = useState([]);
  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');
  const [text, setText] = useState('');
  const [categories, setCategories] = useState([]);
  let uniqueChars = [...new Set(categories)];
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [records, setRecords] = useState();
  const [disease, setDiseases] = useState();
  const [carePath, setCarePath] = useState();
  const [interaction_id, setInteraction_id] = useState();
  const [reported_problems, setReported_problems] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
    });
    AsyncStorage.getItem('profile').then(value => {
      setProfile_id(value);
    });
  });

  const getProfile_Id = item => {
    console.log('item')
    // setProfile_id(item.profile_id);
  };

  const handleDiseaseData = () => {
    setErrortext('');
    setLoading(true);
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/list/diseases`, {
      method: 'GET',
      headers: {
        //Header Defination
        pt_token: pt_token,
        pt_key: pt_key,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        setDiseases(responseJson.records);
        setErrortext(responseJson.message);
        getDataDB(responseJson.records);
        console.log(responseJson, '...handleDiseaseData...');
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
        console.log('...handleDiseaseData api error...');
      });
  };

  const handleDiseasesListData = () => {
    setErrortext('');
    setLoading(true);
    fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/profile/list/diseases/${live}/${profile_id}`,
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
        //Hide Loader
        setLoading(false);
        setRecords(responseJson.records);
        setErrortext(responseJson.message);
        console.log(responseJson, '...handleDiseasesListData...');
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
        console.log('...handleDiseasesListData api error...');
      });
  };

  const handleDiseasesListUpsert = disease_id => {
        console.log('...handleDiseasesListUpsert api error...   1');
        setErrortext('');
    // setLoading(true);
    fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/profile/upsert/disease/${live}/${profile_id}/${disease_id}`,
      {
        method: 'PUT',
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
        //Hide Loader
        setLoading(false);
        handleDiseasesListData();
        console.log(responseJson, '...handleDiseasesListUpsert...   2');
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
        console.log('...handleDiseasesListUpsert api error...   3');
      });
  };

  const handleCarePathListData = () => {
        console.log( '...handleCarePathListData...   1');
        setLoading(true);
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/get/care/path/${live}/${profile_id}`, {
      method: 'GET',
      headers: {
        //Header Defination
        pt_token: pt_token,
        pt_key: pt_key,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        setCarePath(responseJson.care_path);
        setInteraction_id(responseJson.interaction_id);
        setText(responseJson.reported_problems);

        console.log(responseJson, '...handleCarePathListData...   2');
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
        console.log('...handleCarePathListData api error...   3');
      });
  };

  const handleSubmitPress = () => {
    setErrortext('');
    setLoading(true);
    let dataToSend = JSON.stringify({ reported_problems: text });
    console.log(dataToSend, 'dataToSend');

    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/generate/care/path/${live}/${profile_id}`, {
      method: 'POST',
      body: dataToSend,
      headers: {
        //Header Defination
        pt_token: pt_token,
        pt_key: pt_key,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        handleCarePathListData();
        console.log(responseJson, '....handleSubmitPress.....');
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '.......handleSubmitPress Api Error.........');
      });
  };

  const handleThumbPress = value => {
    setLoading(true);
    fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/vote/care/path/${live}/${interaction_id}/${value}`,
      {
        method: 'POST',
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
        //Hide Loader
        setLoading(false);
        console.log(responseJson, '...handleThumbPress...');
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
        console.log('...handleThumbPress api error...');
      });
  };

  const getDataDB = value => {
    let categoies = [];
    for (let index = 0; index < value.length; index++) {
      const element = value[index].category;
      categoies.push(element);
    }
    setCategories(categoies);
  };

  const checkbox = selected => {
    console.log(selected, 'selecet');
    if (checks.includes(selected)) {
      setChecks(checks.filter(check => check !== selected));
      return;
    }
    setChecks(checks => checks.concat(selected));
  };

  const DropDownList = ({ data }) => {
    return (
      <>
        <View key={data} style={styles.list}>
          <Text style={styles.name}>{data.disease_name}</Text>
          <TouchableOpacity
            onPress={() => {
              checkbox(data);
              if (data.disease_id) {
                handleDiseasesListUpsert(data.disease_id);
              }
            }}
            style={styles.check}>
            <>
              {records.map(item => {
                if (data.disease_name === item.disease_name) {
                  return <Text style={{ color: color.primary }}>✔</Text>;
                }
              })}
            </>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const params = { pt_token, pt_key };
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchProfiles(params));
      handleCarePathListData();
      handleDiseaseData();
      handleDiseasesListData();
    }, [pt_token, pt_key, profile_id]),
  );

  const list = [
    ' General Physician',
    ' Cardiologist',
    'Gastroenetrologist',
    'Psychologist',
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />

      <BackHeader />
      {/* <View >
        <Text onPress={handleDiseasesListData} style={{ color: 'black' }}>handleDiseasesListData</Text>
        <Text onPress={handleCarePathListData} style={{ color: 'black' }}>handleCarePathListData</Text>
        <Text onPress={handleDiseaseData} style={{ color: 'black' }}>handleDiseaseData</Text>
        <Text onPress={handleDiseasesListUpsert} style={{ color: 'black' }}>handleDiseasesListUpsert</Text>
      </View> */}
      <ScrollView>
        <View style={styles.containerInner}>
          <View style={{ width: '100%' }}>
            <GetProfile getProfile_Id={getProfile_Id} />
          </View>

          <Text style={styles.text}  onPress={getProfile_Id} >
            (Anonymous profile details will be used to generate care path)
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (dropDown === false) {
                setDropDown(true);
              } else {
                setDropDown(false);
              }
            }}
            style={styles.dropdown}>
            <Text style={styles.dropText}>
              Select any existing Diseases or Conditions
            </Text>
            <TouchableOpacity
              onPress={() => {
                if (dropDown === false) {
                  setDropDown(true);
                } else {
                  setDropDown(false);
                }
              }}>
              <Icon
                name={
                  dropDown === false
                    ? 'chevron-up-outline'
                    : 'chevron-down-outline'
                }
                size={size.font18}
                color={color.textPrimary}
              />
            </TouchableOpacity>
          </TouchableOpacity>

          {dropDown === true ? (
            <>
              {uniqueChars.map(category => {
                return (
                  <View>
                    <Text
                      style={{
                        fontSize: size.font14,
                        fontWeight: weight.semi,
                        color: color.black,
                        marginTop: 10,
                        marginLeft: 50,
                      }}>
                      {category}
                    </Text>

                    {disease.map(item => {
                      if (category === item.category) {
                        return (
                          <View style={styles.downInner}>
                            <DropDownList data={item} />
                          </View>
                        );
                      }
                    })}
                  </View>
                );
              })}
            </>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginVertical: 15,
                }}>
                {!records
                  ? null
                  : records.map(data => {
                    return (
                      <View
                        style={{
                          backgroundColor: color.primary,
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: 5,
                          paddingHorizontal: 12,
                          borderRadius: 32,
                          height: 25,
                        }}>
                        <Text
                          style={{
                            fontSize: size.font12,
                            fontWeight: weight.normal,
                            color: color.white,
                          }}>
                          {data.disease_name}
                        </Text>
                      </View>
                    );
                  })}
              </View>

              <View>
                <View style={styles.inputbox}>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Start typing about the problem you are facing…"
                    placeholderTextColor={color.progressGrey}
                    multiline={true}
                    focusable={true}
                    autoFocus={true}
                    onChangeText={text => setText(text)}
                    value={text}
                    maxLength={200}
                  />
                </View>
                <Text
                  style={{
                    textAlign: 'right',
                    paddingVertical: 5,
                    fontSize: size.font14,
                    fontWeight: weight.low,
                    color: color.black,
                  }}>
                  {text ? text.length : 0}/200
                </Text>
                <TouchableOpacity
                  disabled={text === '' ? true : false}
                  onPress={() => {
                    handleSubmitPress();
                    setCarePath('');
                  }}
                  style={{
                    width: '80%',
                    height: 40,
                    backgroundColor:
                      text === '' ? color.secondary : color.primary,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 32,
                    marginVertical: 20,
                    borderWidth: 1,
                    borderColor: color.primary,
                  }}>
                  <Text
                    style={{
                      fontSize: size.font14,
                      fontWeight: weight.semi,
                      color: text === '' ? color.primary : color.white,
                    }}>
                    Submit
                  </Text>
                </TouchableOpacity>

                <View>
                  <Text
                    style={{
                      color: color.errorColor,
                      fontWeight: weight.low,
                      fontSize: size.font14,
                    }}>
                    Disclaimer :
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      { textAlign: 'justify', marginTop: 10 },
                    ]}>
                    The treatment plan below are automatically generated by
                    Generative Pre Trained (GPT-3) AI model and shall be used
                    only as reference. For actual treatment advice please
                    consult with the registered medical practitioner on RxOne
                  </Text>
                </View>
              </View>



              {!carePath ? null : <AnimatedText text={carePath.join(' \n ')} />}



              {/* 
                {!carePath ? null : <AnimatedText text={carePath.toString()} />} 
                {carePath ? (
                <>
                  <Text style={[styles.text, { textAlign: 'justify' }]}>
                    Consult with specilaists now:
                  </Text>
                  <FlatList
                    data={list}
                    // horizontal={true}
                    numColumns={2}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{
                          backgroundColor: color.primary,
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingHorizontal: 12,
                          borderRadius: 32,
                          height: 25,
                          width: 160,
                          marginBottom: 10,
                          marginRight: 20
                        }}
                        onPress={() => navigation.navigate('Book', { item: item })}>
                        <Text
                          style={{
                            fontSize: size.font12,
                            fontWeight: weight.low,
                            color: color.white,
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </>
              ) : null} */}
              {carePath ? (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '60%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginVertical: 20,
                  }}>

                  <TouchableOpacity
                    onPress={() => {
                      handleThumbPress('up');
                    }}>
                    <Icon
                      name="thumbs-up-sharp"
                      size={size.font25}
                      color={color.primary}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      handleThumbPress('down');
                    }}>
                    <Icon
                      name="thumbs-down-sharp"
                      size={size.font25}
                      color={color.errorColor}
                    />
                  </TouchableOpacity>

                </View>
              ) : null}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CarePath;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  containerInner: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 50,
  },
  text: {
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.black,
    textAlign: 'center',
    marginVertical: 20,
  },
  dropdown: {
    borderWidth: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: color.borderColor,
  },
  dropText: {
    fontSize: size.font14,
    fontWeight: weight.normal,
    color: color.textPrimary,
  },
  downInner: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  list: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
  },
  check: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: size.font14,
    fontWeight: weight.normal,
    color: color.textPrimary,
  },
  inputbox: {
    height: 140,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: color.borderColor,
    backgroundColor: color.grey,
    padding: 10,
  },
  modalInput: {
    fontSize: size.font14,
    color: color.black,
  },
});
