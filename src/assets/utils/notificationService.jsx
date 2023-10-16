import AsyncStorage from '@react-native-async-storage/async-storage';
import { messaging, firebase } from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
// import { ""https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"," live } from '../../../.env';
import { Platform } from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getToken();
  }
}

const register = async value => {
  let pt_token = await AsyncStorage.getItem('pt_token');
  let pt_key = await AsyncStorage.getItem('pt_key');
  console.log(pt_token, pt_key, '..........pt_token/////////////////');
  fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/register/device/${live}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      pt_token: pt_token,
      pt_key: pt_key,
    },
    body: JSON.stringify({
      device_type: 'android',
      device_token: value,
    }),
  })
    .then(response => response.json())
    .then(data => {
      // handle response data
      console.log(data, '//////////////////...................');
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
};

const getToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log("------------------OLD fcm token--------------------->", fcmToken);
  register(fcmToken);

  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('------------------NEW fcm token--------------------->', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log(error, 'error raised in fcm token');
    }
  }
};


export async function topicNotification() {
  // export async function topicNotification(t, bdy, c_url, b_url, i_url, img_url) {
  const fcmTkn = await AsyncStorage.getItem('fcmToken');
  console.log('fcmToken is ', fcmTkn)

  // let title = t || "Testing FCM Push Note";
  // let body = bdy || "On click Patient List page shall open.";
  // let click_url = c_url || "PatientList";
  // let badge_url = b_url || "https://rxone-static.s3.ap-south-1.amazonaws.com/images/rx_192.png";
  // let icon_url = i_url || "https://rxone-static.s3.ap-south-1.amazonaws.com/images/rx_white.png";
  // let image_url = img_url || "https://rxone-static.s3.ap-south-1.amazonaws.com/images/time_to_meet.png";

  // let data = {
  //   "title": title.toString(),
  //   "body": body.toString(),
  //   "click_url": click_url.toString(),
  //   "badge_url": badge_url.toString(),
  //   "icon_url": icon_url.toString(),
  //   "image_url": image_url.toString()



  // let data = {
  //   "title": "Testing FCM Push Note",
  //   "body": "On click Patient List page shall open.",
  //   "click_url": "PatientList",
  //   "badge_url": "https://rxone-static.s3.ap-south-1.amazonaws.com/images/rx_192.png",
  //   "icon_url": "https://rxone-static.s3.ap-south-1.amazonaws.com/images/rx_white.png",
  //   "image_url": "https://rxone-static.s3.ap-south-1.amazonaws.com/images/time_to_meet.png"
  // }
  // fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/push/token/notification/android/` + `${fcmTkn}`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data)
  //   }).then((res) => res.json())
  //   .then((resp) => console.log("--------------------- resp--------------------- : ", resp))
  //   .catch((err) => console.log("--------------------- err:--------------------- : ", err))


}


export async function handleNotification() {

  console.log('handleNotification');
  const notification = new firebase.notifications.Notification()
    .setTitle("Hello")
    .setBody("Body")
    .setData("Data");

  // Android specific configuration (uncomment if needed)
  // if (Platform.OS === 'android') {
  //   notification.android
  //     .setChannelId("test-channel")
  //     .android.setSmallIcon("ic_launcher");
  // }

  firebase.notifications().displayNotification(notification);
}


export const notificationListener = async () => {
  // var navigation = useNavigation();
  console.log("notificationListener runs...")
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage,
    );
    // if(!!remoteMessage?.data)
    // setTimeout(() => {
    //   console.log(remoteMessage.data.type, '/////////////');
    //   // navigation.navigate(remoteMessage.data.type);
    // }, 1000);
  });
  messaging().onMessage(async remoteMessage => {
    console.log(
      'Notification caused app to open from foregound state:',
      remoteMessage,
    );
  });



  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
    });
};


