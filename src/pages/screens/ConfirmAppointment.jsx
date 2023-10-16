import {
  StyleSheet,Alert,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import color from '../../assets/theme/color';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import DoctorCard from '../../compontents/comman/DoctorCard';
import BookHeader from '../../compontents/comman/BookHeader';
import Loader from '../../compontents/comman/Loader';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env'

const ConfirmAppointment = props => {
  console.log('--props', props.route.params)
  const navigation = useNavigation();
  const {
    imagePlace,
    image,
    item,
    patName,
    hos_name,
    hos_id,
    profile_id,
    patProfile,
  } = props.route.params;

  console.log('--item is', item.doc_id);

  const [loading, setLoading] = useState(false);
  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');
  const [next, setNext] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
    });
    nextSlot();
  });

  const nextSlot = () => { 
    // setLoading(true);
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}/patient/next/opd/slot/${live}/${hos_id}/${item.doc_id}`,
      {
        method: 'GET'
      })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        // setLoading(false);
        setNext(responseJson.message);
      })
      .catch(error => {
        // setLoading(false);
        console.log(error);
      })
  };



  const handleBookButton = () => {
    //Show Loader
    setLoading(true);
    fetch(
      `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/book/walkin/appointment/${live}/${hos_id}/${item.doc_id}/${profile_id}`,
      {
        method: 'POST',
        headers: {
          //Header Defination
          pt_token: pt_token,
          pt_key: pt_key,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        console.log(responseJson, 'walkin');
        // If server response message same as Data Matched
        if (responseJson.appointment_id) {
          navigation.replace('Payment', {
            walkin: 'walkin',
            imagePlace,
            item,
            patProfile,
            raiseResponse: '',
            bookResponse: responseJson,
            type: 'walkin',
            appointment_id: responseJson.appointment_id,
            hos_name,
            patName,
            image,
          });
        } else {
          console.log(responseJson.message);
          setLoading(false);
          Alert.alert(' ',responseJson.message);
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, 'error');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      <BookHeader name={hos_name} image={image} />
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.containerInner}>
          <Text style={styles.text}>Booking Appointment for</Text>
          <View style={styles.boxInner}>
            <Text style={styles.textStyle}>{patName}</Text>
          </View>

          <Text style={styles.des} onPress={nextSlot} >
            Select the available Doctors from {hos_name}
          </Text>
        </View>

        <View style={styles.card}>
          <DoctorCard
            item={item}
            patName={patName}
            hospital_name={hos_name}
            profile_id={profile_id}
            patProfile={patProfile}
            hos_id={hos_id}
            touch="off"
          />
        </View>


        <View style={styles.button}>

          {next ? <View style={[styles.buttonInner, { backgroundColor: color.secondary, paddingHorizontal: 10, height: 60 }]}>
            <Text style={[styles.buttontext, { color: color.primary }]}>{next}</Text>
          </View> : null}

          <TouchableOpacity
            onPress={handleBookButton}
            style={styles.buttonInner}>
            <Text style={styles.buttontext}>Meet Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SelectDate', {
                item,
                profile_id,
                patName,
                imagePlace,
                patProfile,
                hos_name,
                hos_id,
                image,
              })
            }
            style={[
              styles.buttonInner,
              { backgroundColor: color.onlinePayment },
            ]}>
            <Text style={styles.buttontext}>Schedule Later</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  containerInner: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: size.font16,
    fontWeight: weight.semi,
    color: color.black,
  },
  boxInner: {
    height: 25,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: color.primary,
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: color.primary,
  },
  textStyle: {
    fontSize: size.font12,
    color: color.white,
  },
  des: {
    fontSize: size.font14,
    fontWeight: weight.low,
    textAlign: 'center',
    color: color.black,
    width: '70%',
    alignSelf: 'center',
  },
  card: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 5,
  },
  block: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: size.font16,
    fontWeight: weight.semi,
    color: color.black,
  },
  type: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
  },
  typeInner: {
    height: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 15,
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: color.primary,
    flexDirection: 'row',
  },
  date: {
    fontSize: size.font14,
    color: color.black,
    fontWeight: weight.low,
  },
  button: {
    // marginVertical: 40,
    marginTop: 8,
    marginBottom: 40,
    alignSelf: 'center',
    width: '90%',
  },
  buttonInner: {
    width: '100%',
    height: 45,
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttontext: {
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.white,
  },
});
