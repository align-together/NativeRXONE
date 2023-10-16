import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';
import WebView from 'react-native-webview';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env'

const EnxVideo = props => {
  const { roomId, roomUrl, token, pt_token, pt_key, appointment_id } = props.route.params;
  console.log('roomId', roomId);
  console.log('roomUrl', roomUrl);
  const webViewRef = useRef();
  // const navigation = useNavigation('');
  const [canGoBack, setcanGoBack] = useState(false);



  const handleEndVideoCall = () => {
    setLoading(true);
    fetch( `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/end/call/${live}/${appointment_id}`, {
      method: 'PUT',
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
        console.log(responseJson, 'end call');
        setLoading(false);
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error, '......Start Video Call Api Error......');
      });
  };

  const onNavigationStateChange = navState => {
    setcanGoBack(navState.canGoBack);
  };
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (canGoBack) {
          webViewRef.current.goBack();
          handleEndVideoCall()

          return true;
        }
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [canGoBack]),
  );

  return (
    <WebView
      source={{ uri: roomUrl }}
      mediaPlaybackRequiresUserAction={false}
      androidHardwareAccelerationDisabled={false}
      allowsInlineMediaPlayback={true}
      allowsFullscreenVideo={true}
      androidPermissions={{
        permissions: ['media'],
        rationale: {
          title: 'Permission to use camera and microphone',
          message: 'We need your permission to use your camera and microphone',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      }}
      onPermissionRequest={event => {
        if (
          event.permission === 'camera' ||
          event.permission === 'microphone'
        ) {
          event.request.grant(event.permission);
        }
      }}
    />
  );
};

export default EnxVideo;
