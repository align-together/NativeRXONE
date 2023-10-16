import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import color from '../../assets/theme/color';
import BackHeader from '../headers/BackHeader';
import Button from '../comman/Button';
import AddCard from '../AddCard';
import Loader from '../comman/Loader';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env'

const AddProfile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');
  const [list, setList] = useState();
  const [firstEmail, setFirstEmail] = useState();

  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
    });
  });

  const handleProfileList = () => {
    console.log('live   ', live)
    console.log('"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"   ', "https://rx-opd-prod-4gag6.ondigitalocean.app/v2/")
    console.log('pt_token   ', pt_token)
    console.log('pt_key     ', pt_key)
    // show Loader
    setLoading(true);
    fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}list/patient/profiles/${live}`, {
      method: 'GET',
      headers: {
        //Header Defination
        pt_token: pt_token,
        pt_key: pt_key,
        'Content-Type': 'application/json',
      },
    })
      .then(response => { console.log("...." + response); return response.json() })
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        setList(responseJson.profiles);
        console.log("------list------ ", responseJson);
        console.log("email------", responseJson.profiles[0].email);
        setFirstEmail(responseJson.profiles[0].email);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '...... Profile Api Error......');
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      handleProfileList();
    }, [pt_token, pt_key]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />
      <StatusBar backgroundColor={color.white} />
      <BackHeader />
      <ScrollView>
        <View style={styles.containerInner}>
          {list
            ? list.map(item => {
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: color.white,
                    elevation: 1,
                    borderRadius: 10,
                    marginBottom: 20,
                  }}
                  onPress={() => {
                    console.log('item.profile_id-----------------------', item.profile_id, item.email)

                    navigation.replace('AddNewProfile', {
                      profile_id: item.profile_id,
                      status: 1,
                    });
                  }}>
                  <AddCard item={item} func={handleProfileList} />
                </TouchableOpacity>
              );
            })
            : null}

          <TouchableOpacity
            onPress={() => {
              navigation.replace('AddNewProfile', defaultEmail = { firstEmail }, {
                profile_id: ' ', //list[0]?.profile_id,
                status: 1,
              });
              console.log(" --- ", list[0].profile_id);
              navigation.replace()
              // console.log("---  ",list[0].profile_id)
            }}
            style={styles.button}>
            <Button text="ADD NEW +" />
          </TouchableOpacity>

        

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  containerInner: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
});
