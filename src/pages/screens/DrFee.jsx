import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import color from '../../assets/theme/color';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import DoctorCard from '../../compontents/comman/DoctorCard';
import BookHeader from '../../compontents/comman/BookHeader';
import Loader from '../../compontents/comman/Loader';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env'

const DrFee = props => {
  const data = props.route.params;
  const { patName, hospital_name, hos_id, patProfile, profile_id } = data;
  console.log('data is ', data)
  // console.log('data is ', data.patProfile.name)
  console.log('patName, hospital_name, hos_id, patProfile, profile_id', patName, hospital_name, hos_id, patProfile, profile_id)
  const [loading, setLoading] = useState(false);
  const [docList, setDocList] = useState([]);
  const [facility, setFacility] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [imagePlace, setImage] = useState(''); // initial it to an empty string
  const [loadImage, setLoadImage] = useState(''); // initial it to an empty string

  const handleDoctorData = () => {
    setLoading(true);
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/list/facility/doctors/${live}/${hos_id}`, {
      method: 'GET',
      headers: {
        //Header Defination
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('--> responseJson', responseJson)
        console.log('--> profile_id', profile_id)
        console.log('--> hos_id', hos_id)
        // console.log('--> docList', docList.params.item.doc_id);
        //Hide Loader
        setLoading(false);
        // console.log(responseJson,'responseJson............');
        setDocList(responseJson.doctors);
        setFacility(responseJson.facility);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......doc List Api Error......');
      });
  };
  useEffect(() => {
    handleDoctorData();
    getImage();
  }, [hos_id]);

  const getImage = async () => {
    setLoadImage(false);
    try {
      const res = await fetch(
        `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/get/facility/logo/${live}/${hos_id}`,
      );
      const data = await res.url;
      console.log(data)
      setImage(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadImage(true);
    }
  };

  const hos_name = hospital_name ? hospital_name : facility;

  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      <BookHeader name={hos_name} image={imagePlace} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerInner}>

          <Text style={styles.text}
            onPress={() => (
              console.log("patProfile", patProfile),
              console.log("patName", patName)
            )}
          >Booking Appointment for</Text>

          <View style={styles.boxInner}>
            <Text style={styles.textStyle}>{patName}</Text>
          </View>

          <Text style={styles.des}>
            Select the available Doctors from {hos_name}
          </Text>
        </View>
        <FlatList
          data={docList}
          keyExtractor={({ doc_id }, index) => doc_id}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <DoctorCard
                item={item}
                patName={patName}
                navigationScreen="ConfirmAppointment"
                hos_name={hos_name}
                profile_id={profile_id}
                patProfile={patProfile}
                hos_id={hos_id}
                image={imagePlace}
              />
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DrFee;

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
});
