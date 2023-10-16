import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
// import RazorpayCheckout from 'react-native-razorpay';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import BookHeader from '../../compontents/comman/BookHeader';
import color from '../../assets/theme/color';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import DoctorCard from '../../compontents/comman/DoctorCard';
import MethodCard from '../../compontents/MethodCard';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Loader from '../../compontents/comman/Loader';
// // import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env';

const Payment = props => {
  const navigation = useNavigation();
  const {
    imagePlace,
    item,
    patProfile,
    raiseResponse,
    bookResponse,
    type,
    appointment_id,
    slot,
    newDate,
    slot_duration,
    hos_name,
    patName,
    image,
    mode
  } = props.route.params;

  console.log(bookResponse, 'bookResponse...............');
  console.log(raiseResponse, 'raiseResponse');
  const [formitTime, setFormitTime] = useState();
  const [showButton1, setShowButton1] = useState(false);
  const [error, setError] = useState();


  const tConvert = time => {
    console.log(time);
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return setFormitTime(time.join('')); // return adjusted time or original string
  };
  useEffect(() => {
    if (slot) {
      tConvert(slot);
    }
  });

  // console.log(type, '................PaymentType.....................')
  const walknMode = type === 'walkin' ? 'cash' : null
  return (
    <SafeAreaView style={styles.container}>
      {/* <Loader loading={loading} /> */}
      <BookHeader
        name={hos_name ? hos_name : item.hospital}
        image={image ? image : imagePlace}
      />
      {type === 'online' ? (
        <>
          {error ? (
            <Text
              style={{
                fontSize: size.font14,
                fontWeight: weight.semi,
                color: color.errorColor,
                textAlign: 'center',
                marginTop: 150,
              }}>
              Payment processing cancelled by user
            </Text>
          ) : null}
        </>
      ) : (
        <ScrollView>
          <View style={styles.body}>
            <Text style={styles.bookText}>Booking Appointment for</Text>

            <View style={styles.top}>
              <Text style={styles.topText}>{patProfile.name}</Text>
            </View>
            {slot ? (
              <Text style={styles.bookText}>
                {formitTime} - {newDate}
              </Text>
            ) : (
              <View style={{ marginBottom: 10 }} />
            )}

            <DoctorCard item={item} touch="off" />

            <Text style={styles.bookText}>
              How you would like to make the Payment for the Appointment?
            </Text>
            <Text
              style={[styles.bookText, { color: color.textGrey, marginTop: 0 }]}>
              Appointment will be confirmed after successful payment.
            </Text>
            <View style={styles.medthodCard}>
              <TouchableOpacity
                onPress={() => {
                  // setShowButton1(true)
                  navigation.navigate('CheckOutPage',
                    {
                      imagePlace,
                      item,
                      patProfile,
                      raiseResponse,
                      bookResponse,
                      type,
                      appointment_id,
                      slot,
                      newDate,
                      slot_duration,
                      hos_name,
                      patName,
                      image,
                      mode,
                      showButton1: false,
                      error,
                      walknMode,
                      setError
                    });
                }}  >
                <MethodCard
                  image={require('../../assets/images/online.png')}
                  rupee={bookResponse.online_payment_amount}
                  mode="Pay Online"
                  status={'orange'}
                  discount={bookResponse.online_discount}
                  buttonColor={'#C26F02'}
                  des="Small fee would be charged by payment gateway"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // setShowButton1(false)
                  navigation.navigate('CheckOutPage',
                    {
                      imagePlace,
                      item,
                      patProfile,
                      raiseResponse,
                      bookResponse,
                      type,
                      appointment_id,
                      slot,
                      newDate,
                      slot_duration,
                      hos_name,
                      patName,
                      image,
                      showButton1: true,
                      setError
                    });
                }}  >

                <MethodCard
                  image={require('../../assets/images/offline.png')}
                  rupee={bookResponse.cash_payment_amount}
                  mode="Pay Cash"
                  status={color.onlinePayment}
                  buttonColor={color.onlineColor}
                  des="" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  body: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    height: 25,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    paddingHorizontal: 15,
  },
  topText: {
    fontSize: size.font12,
    fontWeight: weight.low,
    color: color.white,
  },
  bookText: {
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.black,
    marginVertical: 20,
    textAlign: 'center',
  },
  medthodCard: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%',
    alignSelf: 'center',
  },
  modal: {
    width: '100%',
    alignSelf: 'center',
    height: '100%',
    backgroundColor: '#000000aa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInner: {
    width: '87%',
    height: '60%',
    backgroundColor: color.backgroundColor,
    alignSelf: 'center',
    position: 'absolute',
    padding: 20,
    borderRadius: 10,
  },
  imagebox: {
    alignSelf: 'center',
  },
  modalImage: {
    width: 220,
    height: 180,
    resizeMode: 'contain',
  },
  modalText: {
    fontSize: size.font14,
    textAlign: 'center',
    fontWeight: weight.semi,
    marginVertical: 10,
    color: color.black,
  },
  closeButton: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 25,
  },
  closeButtonText: {
    fontSize: size.font14,
    color: color.primary,
    fontWeight: weight.semi,
  },
});

// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import RazorpayCheckout from 'react-native-razorpay';

// import color from '../../assets/theme/color';
// import weight from '../../assets/theme/weight';
// import size from '../../assets/theme/size';
// import "https://rx-opd-prod-4gag6.ondigitalocean.app/v2/" from '../../assets/utils/base';
// import live from '../../assets/utils/mode';

// const Payment = props => {
//   const data = props.route.params;
//   console.log(data, '...................route data.....................');
// const {
//   imagePlace,
//   item,
//   patProfile,
//   raiseResponse,
//   bookResponse,
//   type,
//   appointment_id,
//   slot,
//   newDate,
//   slot_duration,
//   hos_name,
//   patName,
// } = props.route.params;

//   const [razorpay_payment_id, setRazorpay_payment_id] = useState('');
//   const [razorpay_order_id, setRazorpay_order_id] = useState('');
//   const [razorpay_signature, setRazorpay_Signature] = useState('');
//   const [logo, setLogo] = useState('');
//   const [error, setError] = useState();

//   const [razorpay_error_code, setRazorpay_error_code] = useState('');
//   const [razorpay_error_description, setRazorpay_error_description] =
//     useState('');
//   const [razorpay_error_source, setRazorpay_error_source] = useState('');
//   const [razorpay_error_step, setRazorpay_error_step] = useState('');
//   const [razorpay_error_reason, setRazorpay_error_reason] = useState('');
//   const [
//     razorpay_error_metadata_order_id,
//     setRazorpay_error_metadata_order_id,
//   ] = useState('');
//   const [
//     razorpay_error_metadata_payment_id,
//     setRazorpay_error_metadata_payment_id,
//   ] = useState('');

// useEffect(() => {
//   if (type === 'online') {
//     online();
//   }
// }, [type]);

// const online = value => {
//   var options = {
//     description: 'Credits towards consultation',
//     image: imagePlace,
//     currency: raiseResponse.currency,
//     key: 'rzp_test_BTj030BoE9feLH', // Your api key
//     amount: raiseResponse.amount_due,
//     name: item.hospital,
//     order_id: raiseResponse.razorpay_order_id,
//     prefill: {
//       email: patProfile.email,
//       contact: patProfile.phone,
//       name: patProfile.name,
//     },
//     notes: {
//       reciept: appointment_id,
//     },
//     theme: {color: color.primary},
//   };
//   RazorpayCheckout.open(options)
//     .then(response => {
//       setRazorpay_payment_id(response.razorpay_payment_id);
//       setRazorpay_order_id(response.razorpay_order_id);
//       setRazorpay_Signature(response.razorpay_signature);
//       setModalVisible(true);
//     })
//     .catch(error => {
//       setError(error);
//       console.log(error.error);
//       const err = error.error;
//       setRazorpay_error_code(err.code);
//       setRazorpay_error_description(err.description);
//       setRazorpay_error_source(err.source);
//       setRazorpay_error_step(err.step);
//       setRazorpay_error_reason(err.reason);
//     });
// };

//   const handleRaiseButton = mode => {
//     //Show Loader
//     setLoading(true);

//     console.log(
//       "https://rx-opd-prod-4gag6.ondigitalocean.app/v2/" +
//         `patient/walkin/appointment/order/${live}/${mode}/${appointment_id}/${patName.profile_id}`,
//     );
//     fetch(
//       "https://rx-opd-prod-4gag6.ondigitalocean.app/v2/" +
//         `patient/walkin/appointment/order/${live}/${mode}/${appointment_id}/${patName.profile_id}`,
//       {
//         method: 'POST',
//         headers: {
//           //Header Defination
//           pt_token: pt_token,
//           pt_key: pt_key,
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//       },
//     )
//       .then(response => response.json())
//       .then(responseJson => {
//         //Hide Loader
//         setLoading(false);
//         console.log(
//           responseJson,
//           '/..................handleRaiseButton................',
//         );
//         // If server response message same as Data Matched
//         if (responseJson.razorpay_order_id) {
//           online(responseJson);
//         } else {
//           console.log(responseJson.message);
//           alert(responseJson.message);
//           navigation.replace('Appointment');
//         }
//       })
//       .catch(error => {
//         //Hide Loader
//         setLoading(false);
//         console.error(error, 'handleRaiseButton error');
//       });
//   };

//   return (
//     <View>
//       <Text>Payment</Text>

//       <TouchableOpacity onPress={() => handleRaiseButton('online')}>
//         <Text>Online</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Payment;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: color.white,
//   },
//   body: {
//     width: '90%',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   top: {
//     height: 25,
//     backgroundColor: color.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 32,
//     paddingHorizontal: 15,
//   },
//   topText: {
//     fontSize: size.font12,
//     fontWeight: weight.low,
//     color: color.white,
//   },
//   bookText: {
//     fontSize: size.font14,
//     fontWeight: weight.semi,
//     color: color.black,
//     marginVertical: 20,
//     textAlign: 'center',
//   },
//   medthodCard: {
//     marginVertical: 30,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '90%',
//     alignSelf: 'center',
//   },
//   modal: {
//     width: '100%',
//     alignSelf: 'center',
//     height: '100%',
//     backgroundColor: '#000000aa',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   modalInner: {
//     width: '87%',
//     height: '60%',
//     backgroundColor: color.backgroundColor,
//     alignSelf: 'center',
//     position: 'absolute',
//     padding: 20,
//     borderRadius: 10,
//   },
//   imagebox: {
//     alignSelf: 'center',
//   },
//   modalImage: {
//     width: 220,
//     height: 180,
//     resizeMode: 'contain',
//   },
//   modalText: {
//     fontSize: size.font14,
//     textAlign: 'center',
//     fontWeight: weight.semi,
//     marginVertical: 10,
//     color: color.black,
//   },
//   closeButton: {
//     width: 200,
//     height: 40,
//     borderWidth: 1,
//     borderColor: color.primary,
//     borderRadius: 32,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     position: 'absolute',
//     bottom: 25,
//   },
//   closeButtonText: {
//     fontSize: size.font14,
//     color: color.primary,
//     fontWeight: weight.semi,
//   },
// });
