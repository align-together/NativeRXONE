import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import SelectDate from '../pages/screens/SelectDate';
import Payment from '../pages/screens/Payment';
import Detail from '../pages/screens/Detail';
import Followup from '../compontents/componentScreens/Followup';
import Splash from '../pages/auth/Splash';
import Login from '../pages/auth/Login';
import Otp from '../pages/auth/Otp';
import Agreement from '../pages/auth/Agreement';
import ViewRating from '../compontents/componentScreens/ViewRating';
import AddProfile from '../compontents/componentScreens/AddProfile';
import AddNewProfile from '../compontents/componentScreens/AddNewProfile';
import TrackDetail from '../pages/screens/TrackDetail';
import FAQs from '../pages/screens/FAQs';
import Medications from '../pages/screens/Medications';
import Orders from '../pages/screens/Orders';
import Abha from '../pages/screens/Abha';
import Signup from '../pages/auth/Signup';
import CarePath from '../pages/screens/CarePath';
import AbhaOtp from '../pages/screens/AbhaOtp';
import AbhaProfile from '../pages/screens/AbhaProfile';
import DrFee from '../pages/screens/DrFee';
import ConfirmAppointment from '../pages/screens/ConfirmAppointment';
import AbhaAdharNumber from '../pages/screens/AbhaAdharNumber';
import AdharOtp from '../pages/screens/AdharOtp';
import AbhaId from '../pages/screens/AbhaId';
import Blog from '../pages/screens/Blog';
import EnxVideo from '../compontents/Call';
import CheckOutPage from '../pages/screens/CheckOutPage';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Agreement" component={Agreement} />
        <Stack.Screen name="Tab" component={TabNavigation} />
        <Stack.Screen name="CarePath" component={CarePath} />
        <Stack.Screen name="SelectDate" component={SelectDate} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Followup" component={Followup} />
        <Stack.Screen name="ViewRating" component={ViewRating} />
        <Stack.Screen name="AddProfile" component={AddProfile} />
        <Stack.Screen name="AddNewProfile" component={AddNewProfile} />
        <Stack.Screen name="Abha" component={Abha} />
        <Stack.Screen name="TrackDetail" component={TrackDetail} />
        <Stack.Screen name="Medications" component={Medications} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="FAQs" component={FAQs} />
        <Stack.Screen name="AbhaOtp" component={AbhaOtp} />
        <Stack.Screen name="AbhaProfile" component={AbhaProfile} />
        <Stack.Screen name="DrFee" component={DrFee} />
        <Stack.Screen
          name="ConfirmAppointment"
          component={ConfirmAppointment}
        />
        <Stack.Screen name="AbhaAdharNumber" component={AbhaAdharNumber} />
        <Stack.Screen name="AdharOtp" component={AdharOtp} />
        <Stack.Screen name="AbhaId" component={AbhaId} />
        <Stack.Screen name="Blog" component={Blog} />
        <Stack.Screen name="EnxVideo" component={EnxVideo} />
        <Stack.Screen name="CheckOutPage" component={CheckOutPage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
