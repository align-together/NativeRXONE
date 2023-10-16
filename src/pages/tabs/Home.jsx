import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Platform, PermissionsAndroid,
  Dimensions,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../compontents/headers/Header';
import AppointmentCard from '../../compontents/comman/AppointmentCard';
import weight from '../../assets/theme/weight';
import size from '../../assets/theme/size';
import color from '../../assets/theme/color';
import Loader from '../../compontents/comman/Loader';
import Swiper from '../screens/Swiper';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env';
import Err404 from '../../compontents/comman/Err404';
import Err500 from '../../compontents/comman/Err500';
// import {
//   requestUserPermission,handleNotification,
//   notificationListener, topicNotification
// } from '../../assets/utils/notificationService';





const { width } = Dimensions.get('window');

const Home = () => {



  const navigation = useNavigation();
  const [start_Date, setStart_Date] = useState();
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState('');
  const [swiper, setSwiper] = useState();
  const [blog, setBlog] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');

  const profileData = useSelector(state => state.profile);
  const profile = profileData.profiles.profiles;

  useEffect(() => {
    if (profile) {
      AsyncStorage.setItem('profile', profile[0].profile_id);
      return;
    }
  });

  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
    });
  });

  // const handleSession = () => {
  //   setLoading(true);
  //   fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}/logout/patient/${live}`, {
  //     method: 'POST',
  //     headers: {
  //       //Header Defination
  //       'Content-Type': 'application/json',
  //       pt_token: pt_token,
  //       pt_key: pt_key,
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       //Hide Loader
  //       console.log(responseJson, '/////////////////////');
  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       //Hide Loader
  //       setLoading(false);
  //       console.error(error, '......clinic List Api Error......');
  //     });
  // };

  // useEffect(() => {
  //   handleSession();
  // }, [pt_token, pt_key]);

  const formatDate = date => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return setStart_Date([year, month, day].join('-'));
  };

  const onRefresh = async () => {
    // let pt_token = await AsyncStorage.getItem('pt_token');
    // let pt_key = await AsyncStorage.getItem('pt_key');
    console.log(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}list/appointments/${live}/${start_Date}/${start_Date}`,
    );
    const response = await fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}list/appointments/${live}/${start_Date}/${start_Date}`,
      {
        headers: {
          pt_token: pt_token,
          pt_key: pt_key,
        },
      },
    );
    if (response.status === 401) {
      // navigation.navigate('Login');
      console.log('Could not authenticate user with the provided details');
    } else {
      const data = await response.json();
      setRecords(data.records);
      console.log(data, 'this home data');
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      if (pt_token) {
        onRefresh();
      }
    }, [refreshing, pt_token, pt_key, start_Date]),
  );

  const handleASwiperData = () => {
    setLoading(true);
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/list/swiper/images`, {
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
        setSwiper(responseJson.records);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......swipe Api Error......');
      });
  };

  const CurrentDate = new Date().toUTCString();

  const handleBlogData = () => {
    setLoading(true);
    fetch(
      `https://public-api.wordpress.com/rest/v1.1/sites/rxoneblog.wordpress.com/posts`,
      {
        method: 'GET',
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
        setBlog(responseJson.posts);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......swipe Api Error......');
      });
  };

  useEffect(() => {
    formatDate(new Date());
    handleASwiperData();
    handleBlogData();
  }, []);

  function notif() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      )
        .then(res => {
          console.log('.....notif......', res);
          // requestUserPermission();
          // notificationListener();
        })
        .catch(error => {
          console.log('.....error......', error);
        });
    }
  }

  const requestNotificationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'App needs access to Notifications.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    } catch (err) {
      console.error(err, 'Error while requesting notification permission');
    }
  };


  // function test() {

  //   messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });

  //   messaging()
  //     .subscribeToTopic('weather')
  //     .then(() => console.log('Subscribed to topic!'));

  //   console.log('unsubscribe')

    
  // }


  return (
    <SafeAreaView style={styles.root}>
      <Loader loading={loading} />
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <Header />
      {/* <Text onPress={requestUserPermission} >requestUserPermission</Text>
      <Text onPress={notificationListener} >notificationListener</Text>
      <Text onPress={topicNotification} >topicNotification</Text>
      <Text onPress={handleNotification} >handleNotification</Text> */}
      {/* <Text onPress={test} >notif</Text> */}
      <Image source={{ uri: 'https://rxone-static.s3.ap-south-1.amazonaws.com/images/rx_192.png' }} style={{ height: 50, width: 50 }} />
      <Image source={{ uri: 'https://rxone-static.s3.ap-south-1.amazonaws.com/images/rx_white.png' }} style={{ height: 50, width: 50, backgroundColor: 'red' }} />
      <Image source={{ uri: 'https://rxone-static.s3.ap-south-1.amazonaws.com/images/time_to_meet.png' }} style={{ height: 50, width: 50 }} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <View style={styles.benner}>
            {swiper ? <Swiper item={swiper} /> : null}
          </View>

          <Text style={styles.title}>What’s New</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: 'row' }}>
            {!blog
              ? null
              : blog.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Blog', {
                        item: item,
                        blog: blog,
                      })
                    }
                    style={styles.blog}>
                    <Image
                      style={styles.blogImage}
                      source={{
                        uri: item.featured_image,
                      }}
                    />
                    <View style={{ padding: 10, height: 200 }}>
                      <Text style={styles.blogTitle}>{item.title}</Text>

                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Blog', {
                            item: item,
                            blog: blog,
                          })
                        }
                        style={styles.readButton}>
                        <Text style={{ color: color.black }}>Read more</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>

          <TouchableOpacity
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 100,
              backgroundColor: 'white',
              elevation: 1,
              alignItems: 'center',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: color.borderColor,
              paddingRight: 20,
            }}
            onPress={() => {
              navigation.navigate('CarePath');
            }}>
            <View
              style={{
                marginLeft: 20,
                width: '75%',
              }}>
              <Text
                style={{
                  fontSize: size.font25,
                  fontWeight: weight.full,
                  color: color.primary,
                }}>
                Discover Care Path
              </Text>
              <Text
                style={{
                  fontSize: size.font14,
                  fontWeight: weight.low,
                  color: color.textGrey,
                  width: '95%',
                }}>
                Find the step wise guidance for the health problems you are
                facing
              </Text>
            </View>
            <Image
              source={require('../../assets/images/heart.gif')}
              style={{
                width: 70,
                height: 70,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.today}>
          <View style={styles.innertoday}>
            <Text style={styles.todaytext}>
              Today
              <Text style={{ color: color.black }}>
                , {CurrentDate.slice(0, 17)}
              </Text>
            </Text>
          </View>
        </View>
        {!records ? null : (
          <View style={styles.appointtitlebox}>
            <Text style={styles.todaytext1}>
              Today’s{' '}
              <Text
                style={{
                  color: color.black,
                  fontSize: size.font14,
                  fontWeight: weight.semi,
                }}>
                Appointments
              </Text>
            </Text>
            <Text
              style={{
                fontSize: size.font12,
                fontWeight: weight.semi,
                color: color.textGrey,
                lineHeight: 25,
              }}>
              Click on the appointment card to view or action
            </Text>
          </View>
        )}
        {records && records.length > 0 ? (
          <>
            {records.map(item => {
              return <AppointmentCard data={item} />;
            })}
          </>
        ) : (
          <View style={{ marginVertical: 10, marginBottom: 30 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Book')}
              style={styles.button}>
              <Text style={styles.buttontext}>Book Now +</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.white,
  },
  header: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerheader: {
    width: '92%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  icon: {
    fontSize: size.font25,
    color: color.black,
  },
  headertext: {
    fontSize: size.font12,
    fontWeight: weight.semi,
    lineHeight: 15,
    marginLeft: 10,
    width: '65%',
  },
  container: {
    width: '92%',
    alignSelf: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: size.font16,
    color: color.black,
    fontWeight: weight.semi,
    marginTop: 5,
  },

  benner: {
    marginTop: 5,
    width: '100%',
  },
  today: {
    width: '100%',
    height: 40,
    backgroundColor: color.secondary,
  },
  innertoday: {
    width: '92%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 40,
  },
  todaytext: {
    fontSize: size.font16,
    fontWeight: weight.semi,
    color: color.primary,
  },
  appointtitlebox: {
    width: '92%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  todaytext1: {
    fontSize: size.font16,
    fontWeight: weight.bold,
    color: color.black,
  },
  noappointbox: {
    width: '100%',
    height: 160,
    backgroundColor: color.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  noappointtext: {
    color: color.errorColor,
    fontWeight: weight.semi,
    fontSize: size.font10,
    width: '25%',
  },
  button: {
    width: '92%',
    height: 50,
    backgroundColor: color.primary,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttontext: {
    fontSize: size.font16,
    color: color.white,
    fontWeight: weight.semi,
  },
  blog: {
    width: 270,
    height: 200,
    marginTop: 10,
    borderRadius: 5,
    marginRight: 15,
  },
  blogImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    position: 'absolute',
    opacity: 0.7,
    backgroundColor: 'grey',
  },
  blogTitle: {
    fontSize: size.font16,
    fontWeight: weight.full,
    color: color.white,
  },
  blogDes: {
    fontSize: size.font12,
    fontWeight: weight.low,
    color: color.white,
    paddingVertical: 5,
  },
  readButton: {
    width: 100,
    height: 25,
    backgroundColor: '#01cab8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 10,
    marginLeft: 10,
  },
});
