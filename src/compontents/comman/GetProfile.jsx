import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import color from '../../assets/theme/color';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const GetProfile = ({ getProfile_Id }) => {
  // console.log('getProfile_Id', getProfile_Id)
  const navigation = useNavigation();
  const profileData = useSelector(state => state.profile);
  const profile = profileData.profiles.profiles;
  const [profile_id, setProfile_id] = useState();
  console.log('---> profile', profile)

  useEffect(() => {
    getProfile_Id(profile[0]);
    setProfile_id(profile[0].profile_id);
  }, []);

 
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <TouchableOpacity style={styles.container}>
        <FlatList
          data={profile}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setProfile_id(item.profile_id);
                getProfile_Id(item);
              }}
              style={[
                styles.body,
                {
                  backgroundColor:
                    item.profile_id === profile_id
                      ? color.primary
                      : color.white,
                  borderColor:
                    item.profile_id === profile_id
                      ? color.primary
                      : color.primary,
                },
              ]}>
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      item.profile_id === profile_id
                        ? color.white
                        : color.primary,
                  },
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AddNewProfile', {
            profile_id: '',
          })
        }
        style={{
          height: 25,
          backgroundColor: color.secondary,
          borderWidth: 1,
          borderColor: color.primary,
          borderRadius: 32,
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: color.primary }}>+Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetProfile;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    height: 25,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderRadius: 32,
    borderWidth: 1,
    marginRight: 15,
  },
  text: {
    fontSize: size.font12,
    fontWeight: weight.low,
    color: color.black,
    textTransform: 'capitalize',
  },
});
