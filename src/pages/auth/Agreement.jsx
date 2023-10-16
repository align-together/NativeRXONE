import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import color from '../../assets/theme/color';
const Agreement = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={'dark-content'} />

      <LinearGradient
        colors={[
          'rgba(400,230,200,.5)',
          'rgba(617,330,305,0)',
          'rgba(816,616,296,0)',
        ]}
        style={{ flex: 1 }}>
        <Image
          source={require('../../assets/images/signup.png')}
          style={{
            width: '55%',
            height: '40%',
            position: 'absolute',
            alignSelf: 'flex-end',
          }}
        />

        <View style={styles.topcontainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{ width: 198, height: 83 }}
          />
        </View>
        <View style={styles.buttomcontainer}>
          <ScrollView>
            <View>
              <View
                style={{ width: '90%', alignSelf: 'center', marginVertical: 20 }}>
                <Text style={styles.title}>USER AGREEMENT</Text>
              </View>
              
              <View style={{ width: '90%', alignSelf: 'center' }}>
               
                <Text style={styles.description}>
                  Welcome to RxOne Care application.{' '}
                </Text>
                <Text style={styles.description}>
                  Please carefully read the Terms of Use of the
                  Application(here) and Privacy Policy (here)
                </Text>
                <Text style={styles.description}>
                  By clicking on “Accept & Sign Up’ button at the end of this
                  page or accessing or using the application, you hereby accept
                  the Terms of Use (as amended from time to time) and the
                  Privacy Policy (as amended from time to time) and agree to
                  bound by their terms.
                </Text>
                <Text style={styles.description}>
                  If you do not agree to be bound by the their terms, please do
                  not access or use the application.
                </Text>
                <Text style={styles.description}>
                  Further, by clicking on the ‘Accept & Sign Up’ button, you
                  hereby consent to the collection, storage, use, processing,
                  disclosure and transfer of your personal information in
                  accordance
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Tab')}
                style={styles.button}>
                <Text style={styles.buttontext}>Accept & Sign up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Agreement;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  topcontainer: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttomcontainer: {
    backgroundColor: color.white,
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  inner: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: color.black,
    lineHeight: 25,
  },
  description: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
    marginTop: 20,
    color:color.black
  },
  button: {
    width: '90%',
    backgroundColor: color.primary,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 32,
    marginTop: 50,
    marginBottom: 30,
  },
  buttontext: {
    fontSize: 16,
    fontWeight: '600',
    color: color.white,
  },
});
