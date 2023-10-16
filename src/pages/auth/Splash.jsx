import {
  ImageBackground,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from '@react-navigation/native';
import color from '../../assets/theme/color';
import Loader from '../../compontents/comman/Loader';

const Splash = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      //Check if profile_id is set or not
      //If not then send for Authentication
      //else send to Home Screen

      hello();
      AsyncStorage.getItem('profile').then(value =>
        navigation.replace(value === null ? 'Login' : 'Tab')
      );

    }, 3000);

  }, []);


  const hello = async () => {

    try {
      // const currentCode = 2 ;
      const currentCode = await AsyncStorage.getItem('CurrentversionCode');
      const versionCode = DeviceInfo.getVersion();
      console.log(`Version Code: ${versionCode}`);

      if (versionCode === currentCode) {
        console.log(currentCode, '---------------------->          Same Version', versionCode);
      } else {
        await AsyncStorage.setItem('CurrentversionCode', versionCode);
        console.log(currentCode, '---------------------->          Not Same Version', versionCode);
        // navigation.navigate('Login');
        AsyncStorage.removeItem('pt_token');
        AsyncStorage.removeItem('pt_key');
        AsyncStorage.removeItem('profile');
      }
    } catch (error) {
      console.log('error', error);
    }

  }


  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />

      <StatusBar
        translucent
        backgroundColor={color.white}
        barStyle={'dark-content'}
      />
      <ImageBackground
        source={require('../../assets/images/splash.png')}
        style={styles.bg}>
        <LinearGradient
          colors={[
            'rgba(30,114,126,265)',
            'rgba(40,150,300,0.8)',
            'rgba(40,170,161,255)',
          ]}
          style={styles.linearGradient}>
          <View style={styles.containerInner}>
            <Image
              source={require('../../assets/images/s2.png')}
              style={{ width: 232, height: 232, position: 'absolute' }}
            />
            <Image
              source={require('../../assets/images/s2.png')}
              style={{ width: 220, height: 220, position: 'absolute' }}
            />
            <Image
              source={require('../../assets/images/s1.png')}
              style={{ width: 204, height: 204, position: 'absolute' }}
            />
            <Image
              source={require('../../assets/images/logo.png')}
              style={{ width: 156, height: 65 }}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>Care Portal</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  bg: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  containerInner: {
    width: 250,
    height: 250,
    backgroundColor: 'grren',
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 260,
  },
  content: {
    marginTop: '30%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderColor: color.white,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: color.white,
    textTransform: 'uppercase',
  },
});
