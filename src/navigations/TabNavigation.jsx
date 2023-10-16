import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Home from '../pages/tabs/Home';
import Appointment from '../pages/tabs/Appointment';
import Book from '../pages/tabs/Book';
import Track from '../pages/tabs/Track';
import Health from '../pages/tabs/Health';
import color from '../assets/theme/color';
import { fetchProfiles } from '../features/profile/profileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const [pt_token, setPt_Token] = useState('');
  const [pt_key, setPt_Key] = useState('');
  const [start_Date, setStart_Date] = useState();
  const [end_Date, setEnd_Date] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('pt_token').then(value => {
      setPt_Token(value);
    });
    AsyncStorage.getItem('pt_key').then(value => {
      setPt_Key(value);
    });
  }, [pt_token]);

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return setStart_Date([year, month, day].join('-'));
  }

  function formatDate1(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + (d.getDate() + 2),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return setEnd_Date([year, month, day].join('-'));
  }

  const params = { start_Date, end_Date, pt_token, pt_key };

  React.useEffect(() => {
    formatDate(new Date());
    formatDate1(new Date());
  }, []);

  useEffect(() => {
    if (pt_token) {
      dispatch(fetchProfiles(params));
    }
  });

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { paddingBottom: 5 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? require('../assets/icons/Home.png')
              : require('../assets/icons/Home.png');
          } else if (route.name === 'Appointment') {
            iconName = focused
              ? require('../assets/icons/Appointments.png')
              : require('../assets/icons/Appointments.png');
          } else if (route.name === 'Book') {
            iconName = focused
              ? require('../assets/icons/Book_Appointments.png')
              : require('../assets/icons/Book_Appointments.png');
          } else if (route.name === 'Track Health') {
            iconName = focused
              ? require('../assets/icons/TrackHealth.png')
              : require('../assets/icons/TrackHealth.png');
          } else if (route.name === 'Health Files') {
            iconName = focused
              ? require('../assets/icons/HealthFiles.png')
              : require('../assets/icons/HealthFiles.png');
          }

          // You can return any component that you like here!
          return (
            <Image
              source={iconName}
              style={{
                width: 22,
                height: 22,
                resizeMode: 'contain',
                tintColor: color,
              }}
            />
          );
          // <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: color.primary,
        tabBarInactiveTintColor: '#898A8D',
      })}>
      <Tab.Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Appointment"
        component={Appointment}
      />
      <Tab.Screen options={{ headerShown: false }} name="Book" component={Book} />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Track Health"
        component={Track}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Health Files"
        component={Health}
      />
    </Tab.Navigator>
  );
}
