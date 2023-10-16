import { View, Text, PermissionsAndroid, Platform, Alert } from 'react-native';
import React from 'react';
import Navigation from './src/navigations/Navigation';
import { Provider } from 'react-redux';
import { store } from './src/features/store';
// import {
//   requestUserPermission,
//   notificationListener,
// } from './src/assets/utils/notificationService';
import { useEffect } from 'react';


const App = () => {

  useEffect(() => {
  
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
      )
        .then(res => {
          console.log('res++++++++', res);
          // if (!!res && res === 'granted') {
          // requestUserPermission();
          // notificationListener();
          // }

        })
        .catch(error => {
          Alert.alert(' ', 'Sometine went wrong');
        });
    }
    
  });
  
  
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
      );
};

export default App;
