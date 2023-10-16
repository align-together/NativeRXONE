// import {
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
//     Modal,
//     Image,
//     ScrollView,
// } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import RazorpayCheckout from 'react-native-razorpay';
// import size from '../../assets/theme/size';
// import color from '../../assets/theme/color';
// import weight from '../../assets/theme/weight';
// import BookHeader from '../../compontents/comman/BookHeader';
// import DoctorCard from '../../compontents/comman/DoctorCard';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Button from '../../compontents/comman/Button';
// import { useNavigation } from '@react-navigation/native';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Loader from '../../compontents/comman/Loader';
// // import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env';
// const CheckOutPage = props => {
//     const navigation = useNavigation();
//     const {
//         imagePlace,
//         item,
//         patProfile,
//         bookResponse,
//         type,
//         appointment_id,
//         slot_duration,
//         hos_name,
//         image,
//         mode,
//         showButton1,
//         setError,
//         walknMode
//     } = props.route.params;

//     console.log(showButton1, "......................showButton1............")
//     const [loading, setLoading] = useState(false);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [pt_token, setPt_Token] = useState('');
//     const [pt_key, setPt_Key] = useState('');
//     const [razorpay_payment_id, setRazorpay_payment_id] = useState('');
//     const [razorpay_order_id, setRazorpay_order_id] = useState('');
//     const [razorpay_signature, setRazorpay_Signature] = useState('');
//     const [razorpay_error_code, setRazorpay_error_code] = useState('');
//     const [razorpay_error_description, setRazorpay_error_description] =
//         useState('');
//     const [razorpay_error_source, setRazorpay_error_source] = useState('');
//     const [razorpay_error_step, setRazorpay_error_step] = useState('');
//     const [razorpay_error_reason, setRazorpay_error_reason] = useState('');
//     const [
//         razorpay_error_metadata_order_id,
//         setRazorpay_error_metadata_order_id,
//     ] = useState('');
//     const [
//         razorpay_error_metadata_payment_id,
//         setRazorpay_error_metadata_payment_id,
//     ] = useState('');;

//     const online = raiseResponse => {
//         var options = {
//             description: 'Credits towards consultation',
//             image: image ? image : imagePlace,
//             currency: raiseResponse.currency,
//             key: 'rzp_test_BTj030BoE9feLH', // Your api key
//             amount: raiseResponse.amount_due,
//             name: item.hospital ? item.hospital : hos_name,
//             order_id: raiseResponse.razorpay_order_id,
//             prefill: {
//                 email: patProfile.email,
//                 contact: patProfile.phone,
//                 name: patProfile.name,
//             },
//             notes: {
//                 reciept: appointment_id,
//             },
//             theme: { color: color.primary },
//         };
//         RazorpayCheckout.open(options)
//             .then(response => {
//                 setRazorpay_payment_id(response.razorpay_payment_id);
//                 setRazorpay_order_id(response.razorpay_order_id);
//                 setRazorpay_Signature(response.razorpay_signature);
//                 setModalVisible(true);
//             })
//             .catch(error => {
//                 setError(error);
//                 console.log(error.error);
//                 const err = error.error;
//                 setRazorpay_error_code(err.code);
//                 setRazorpay_error_description(err.description);
//                 setRazorpay_error_source(err.source);
//                 setRazorpay_error_step(err.step);
//                 setRazorpay_error_reason(err.reason);
//             });
//     };

//     const handleConfirmButton = () => {
//         //Show Loader
//         setLoading(true);
//         var dataToSend = JSON.stringify({
//             razorpay_payment_id: razorpay_payment_id,
//             razorpay_order_id: razorpay_order_id,
//             razorpay_signature: razorpay_signature,
//             razorpay_error_code: razorpay_error_code,
//             razorpay_error_description: razorpay_error_description,
//             razorpay_error_source: razorpay_error_source,
//             razorpay_error_step: razorpay_error_step,
//             razorpay_error_reason: razorpay_error_reason,
//             razorpay_error_metadata_order_id: '',
//             razorpay_error_metadata_payment_id: '',
//         });
//         console.log(dataToSend);
//         fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/payment/confirm/${live}/${appointment_id}`, {
//             method: 'POST',
//             body: dataToSend,
//             headers: {
//                 //Header Defination
//                 pt_token: pt_token,
//                 pt_key: pt_key,
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//             },
//         })
//             .then(response => response.json())
//             .then(responseJson => {
//                 //Hide Loader
//                 setLoading(false);
//                 console.log(responseJson);
//                 // If server response message same as Data Matched
//                 if (responseJson || type === 'walkin') {
//                     navigation.navigate('Appointment');
//                 }
//                 // } else {
//                 //   console.log(responseJson.message);
//                 // }
//             })
//             .catch(error => {
//                 //Hide Loader
//                 setLoading(false);
//                 console.error(error, 'error');
//             });
//     };


//     const handleRaiseButton = paymode => {
//         //Show Loader
//         setLoading(true);
//         const cate = type === 'walkin' ? 'walkin' : 'book';
//         console.log(cate, "....................cate.................");
//         fetch(
//             `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/${cate}/appointment/order/${live}/${paymode}/${appointment_id}/${patProfile.profile_id}`,
//             {
//                 method: 'POST',
//                 headers: {
//                     //Header Defination
//                     pt_token: pt_token,
//                     pt_key: pt_key,
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//             },
//         )
//             .then(response => response.json())
//             .then(responseJson => {
//                 //Hide Loader
//                 setLoading(false);
//                 console.log(
//                     responseJson,
//                     '/..................handleRaiseButton pay................',
//                 );
//                 if (responseJson.razorpay_order_id) {
//                     online(responseJson);
//                     return;
//                 }

//                 if (mode === 'cash' || type === 'walkin') {
//                     console.log(responseJson.message, '................responseJsonpayment................');
//                     Alert.alert(' ',responseJson.message);
//                     navigation.navigate('Appointment');
//                     return;
//                 }
//             })
//             .catch(error => {
//                 //Hide Loader
//                 setLoading(false);
//                 console.error(error, 'handleRaiseButton error');
//             });
//     };

//     useEffect(() => {
//         AsyncStorage.getItem('pt_token').then(value => {
//             setPt_Token(value);
//         });
//         AsyncStorage.getItem('pt_key').then(value => {
//             setPt_Key(value);
//         });

//     });
//     return (
//         <SafeAreaView style={styles.container}>
//             <Loader loading={loading} />
//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => {
//                     Alert.Alert.alert(' ','Modal has been closed.');
//                     setModalVisible(!modalVisible);
//                 }}>
//                 <View style={styles.modal}>
//                     <View style={styles.modalInner}>
//                         <View style={{ alignSelf: 'flex-end' }}>
//                         </View>

//                         <View style={styles.imagebox}>
//                             <Image
//                                 source={require('../../assets/images/slide2.png')}
//                                 style={styles.modalImage}
//                             />
//                         </View>

//                         <Text style={styles.modalText}>
//                             Your appointment is booked successfully with {item.doctor_name}.
//                             Your expected waiting time is {slot_duration} Mins.
//                         </Text>
//                         <Text style={[styles.modalText, { color: color.primary }]}>
//                             We will notify you once {item.doctor_name} is ready to meet.
//                         </Text>
//                         <TouchableOpacity
//                             onPress={() => {
//                                 handleConfirmButton();
//                             }}
//                             style={styles.closeButton}>
//                             <Text style={styles.closeButtonText}>Close</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>
//             <ScrollView>
//                 <View>
//                     <BookHeader name={item.hospital} image={image} />

//                     <View style={styles.body}>
//                         <Text style={styles.bookText}>Booking Appointment for</Text>
//                         <View style={styles.top}>
//                             <Text style={styles.topText}>{patProfile.name}</Text>
//                         </View>
//                         <DoctorCard item={item} touch="off" />
//                     </View>
//                     <View>
//                         <Text style={styles.innertext}>Bill Details</Text>
//                         <View style={styles.innerHeding}>
//                             <Text style={styles.innerHedingText}>Consultation Fee</Text>
//                             <Text style={styles.innerHedingText1}>{bookResponse.online_payment_currency} {`${bookResponse.cash_payment_amount}`}</Text>
//                         </View>
//                         <View style={styles.innerHeding}>
//                             <Text style={styles.innerHedingText}>Booking Fee</Text>
//                             <Text style={styles.innerHedingText2}>INR 60 FREE</Text>
//                         </View>
//                         {
//                             mode === "online" || walknMode === 'cash' || mode === 'cash' ? <View style={styles.innerHeding}>
//                                 <Text style={styles.innerHedingText}>Online Payment {'\n'}Discount</Text>
//                                 <Text style={styles.innerHedingText3}>{item.currency}{`(${item.online_discount_amount})`}</Text>
//                             </View> : null
//                         }
//                         <Text style={styles.underLine}></Text>
//                         <View style={styles.innerHeding}>
//                             <Text style={styles.innerHedingText}>Total Payble</Text>
//                             {
//                                 mode === "online" || walknMode === 'cash' || mode === 'cash' ? <Text style={styles.innerHedingText4}>{bookResponse.online_payment_currency} {`${bookResponse.online_payment_amount}`}</Text> : <Text style={styles.innerHedingText4}>{bookResponse.online_payment_currency} {`${bookResponse.cash_payment_amount}`}</Text>
//                             }

//                         </View>

//                     </View>
//                     {
//                         mode === "online" || walknMode === 'cash' || mode === 'cash' ? <Text style={styles.aumountMethod}>*A small amount may be charged by payment gateway, as  per selected payment method</Text> : null
//                     }

//                     {showButton1 === true ?

//                         <TouchableOpacity
//                             style={{ width: '90%', alignSelf: "center" }}
//                             onPress={() => {
//                                 if (type === 'walkin') {
//                                     handleRaiseButton('cash');
//                                 }

//                                 if (type === 'in-person') {
//                                     handleRaiseButton('cash');
//                                 }
//                                 if (mode === 'online') {
//                                     handleRaiseButton('online')
//                                 }

//                                 else {
//                                     Alert.alert(' ',bookResponse.message), navigation.navigate('Home');
//                                 }
//                             }}>
//                             <Button text="Pay" />
//                         </TouchableOpacity> : <TouchableOpacity
//                             style={{ width: '90%', alignSelf: "center" }}
//                             onPress={() => {
//                                 handleRaiseButton("online")
//                             }}>
//                             <Button text="Pay" />
//                         </TouchableOpacity>


//                     }

//                 </View>
//             </ScrollView>
//         </SafeAreaView >


//     )
// }

// export default CheckOutPage

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: color.backgroundColor,
//     },
//     box: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     icon: {
//         width: 30,
//         height: 30,
//         resizeMode: 'cover',
//         marginRight: 20,
//     },
//     text: {
//         fontSize: size.font16,
//         fontWeight: weight.semi,
//         color: color.black,
//         width: '80%'
//     },
//     body: {
//         width: '90%',
//         alignSelf: 'center',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     bookText: {
//         fontSize: size.font14,
//         fontWeight: weight.semi,
//         color: color.black,
//         marginVertical: 20,
//     },
//     top: {
//         height: 25,
//         backgroundColor: color.primary,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 32,
//         paddingHorizontal: 15,
//         marginBottom: 10,
//     },
//     topText: {
//         fontSize: size.font12,
//         fontWeight: weight.low,
//         color: color.white,
//     },
//     innertext: {
//         top: 10,
//         paddingLeft: 30,
//         color: color.black,
//         fontWeight:'bold'
//     },
//     innerHeding: {
//         top: 10,
//         paddingLeft: 30,
//         flexDirection: 'row',

//     },
//     innerHedingText: {
//         paddingVertical: 15,
//         color: color.black,
//     },
//     innerHedingText1: {
//         paddingVertical: 15,
//         marginLeft: 60,
//         fontWeight: weight.low,
//         color: color.black,

//     },
//     innerHedingText2: {
//         paddingVertical: 15,
//         marginLeft: 95,
//         fontWeight: weight.low,
//         color: color.black,
//         textDecorationLine: 'line-through',

//     },
//     innerHedingText3: {
//         paddingVertical: 15,
//         marginLeft: 61,
//         fontWeight: weight.low,
//         color: color.black,
//     },
//     innerHedingText4: {
//         paddingVertical: 10,
//         marginLeft: 95,
//         justifyContent: "space-between",
//         fontWeight: weight.low,
//         color: color.black,
//     },
//     underLine: {
//         borderBottomWidth: 2,
//         borderBottomColor: 'black',
//         width: "80%",
//         alignSelf: "center"
//     },
//     aumountMethod: {
//         alignSelf: "center",
//         width: "85%"
//     },
//     topText: {
//         fontSize: size.font12,
//         fontWeight: weight.low,
//         color: color.white,
//     },
//     bookText: {
//         fontSize: size.font14,
//         fontWeight: weight.semi,
//         color: color.black,
//         marginVertical: 20,
//         textAlign: 'center',
//     },
//     medthodCard: {
//         marginVertical: 30,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '98%',
//         alignSelf: 'center',
//     },
//     modal: {
//         width: '100%',
//         alignSelf: 'center',
//         height: '100%',
//         backgroundColor: '#000000aa',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     modalInner: {
//         width: '87%',
//         height: '60%',
//         backgroundColor: color.backgroundColor,
//         alignSelf: 'center',
//         position: 'absolute',
//         padding: 20,
//         borderRadius: 10,
//     },
//     imagebox: {
//         alignSelf: 'center',
//     },
//     modalImage: {
//         width: 220,
//         height: 180,
//         resizeMode: 'contain',
//     },
//     modalText: {
//         fontSize: size.font14,
//         textAlign: 'center',
//         fontWeight: weight.semi,
//         marginVertical: 10,
//         color: color.black,
//     },
//     closeButton: {
//         width: 200,
//         height: 40,
//         borderWidth: 1,
//         borderColor: color.primary,
//         borderRadius: 32,
//         justifyContent: 'center',
//         alignItems: 'center',
//         alignSelf: 'center',
//         position: 'absolute',
//         bottom: 25,
//     },
//     closeButtonText: {
//         fontSize: size.font14,
//         color: color.primary,
//         fontWeight: weight.semi,
//     },
// })











import {
    StyleSheet,
    Text, Alert,
    TouchableOpacity,
    View,
    Modal,
    Image,
    ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import size from '../../assets/theme/size';
import color from '../../assets/theme/color';
import weight from '../../assets/theme/weight';
import BookHeader from '../../compontents/comman/BookHeader';
import DoctorCard from '../../compontents/comman/DoctorCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../compontents/comman/Button';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../compontents/comman/Loader';
// import { "https://rx-opd-prod-4gag6.ondigitalocean.app/v2/", live, RAZORPAY_PAY_KEY } from '../../../.env';
const CheckOutPage = props => {
    const navigation = useNavigation();
    const {
        imagePlace,
        item,
        patProfile,
        bookResponse,
        type,
        appointment_id,
        slot_duration,
        hos_name,
        image,
        mode,
        showButton1,
        walkinMode,
    } = props.route.params;
    // console.log(bookResponse, type, '...................bookResponse...........')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [pt_token, setPt_Token] = useState('');
    const [pt_key, setPt_Key] = useState('');
    const [modalContent, setModalContent] = useState('')
    const [razorpay_payment_id, setRazorpay_payment_id] = useState('');
    const [razorpay_order_id, setRazorpay_order_id] = useState('');
    const [razorpay_signature, setRazorpay_Signature] = useState('');
    const [razorpay_error_code, setRazorpay_error_code] = useState('');
    const [razorpay_error_description, setRazorpay_error_description] =
        useState('');
    const [razorpay_error_source, setRazorpay_error_source] = useState('');
    const [razorpay_error_step, setRazorpay_error_step] = useState('');
    const [razorpay_error_reason, setRazorpay_error_reason] = useState('');
    const [
        razorpay_error_metadata_order_id,
        setRazorpay_error_metadata_order_id,
    ] = useState('');
    const [
        razorpay_error_metadata_payment_id,
        setRazorpay_error_metadata_payment_id,
    ] = useState('');;

    const online = raiseResponse => {
        var options = {
            description: 'Credits towards consultation',
            image: image ? image : imagePlace,
            currency: raiseResponse.currency,
            key: RAZORPAY_PAY_KEY, // Your api key
            amount: raiseResponse.amount_due,
            name: item.hospital ? item.hospital : hos_name,
            order_id: raiseResponse.razorpay_order_id,
            prefill: {
                email: patProfile.email,
                contact: patProfile.phone,
                name: patProfile.name,
            },
            notes: {
                reciept: appointment_id,
            },
            theme: { color: color.primary },
        };
        try {
            console.log('options', options)
            RazorpayCheckout.open(options)
                .then(response => {
                    console.log('response', response)
                    setRazorpay_payment_id(response.razorpay_payment_id);
                    setRazorpay_order_id(response.razorpay_order_id);
                    setRazorpay_Signature(response.razorpay_signature);
                    if (response) {
                        handleConfirmButton(response)
                    }
                })
                .catch(error => {
                    console.log('error is ', error)
                    console.log(error.error);
                    setError(error);
                    const err = error.error;
                    setRazorpay_error_code(err.code);
                    setRazorpay_error_description(err.description);
                    setRazorpay_error_source(err.source);
                    setRazorpay_error_step(err.step);
                    setRazorpay_error_reason(err.reason);
                });
        }
        catch {
            console.log("Error si error ")
        }
    };

    const handleConfirmButton = (response) => {
        //Show Loader
        setLoading(true);
        var dataToSend = JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            razorpay_error_code: razorpay_error_code,
            razorpay_error_description: razorpay_error_description,
            razorpay_error_source: razorpay_error_source,
            razorpay_error_step: razorpay_error_step,
            razorpay_error_reason: razorpay_error_reason,
            razorpay_error_metadata_order_id: '',
            razorpay_error_metadata_payment_id: '',
        });
        console.log(dataToSend);
        fetch(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/payment/confirm/${live}/${appointment_id}`, {
            method: 'POST',
            body: dataToSend,
            headers: {
                //Header Defination
                pt_token: pt_token,
                pt_key: pt_key,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                //Hide Loader
                setLoading(false);
                console.log(responseJson.message, '..................handleConfirmButton...........');
                setModalContent(responseJson.message)
                // If server response message same as Data Matched
                if (responseJson || type === 'walkne') {
                    setModalVisible(true)
                }
                else {
                    console.log(responseJson.message);
                }
            })
            .catch(error => {
                //Hide Loader
                setLoading(false);
                console.error(error, 'error');
            });
    };

    console.log(modalContent,)

    const handleRaiseButton = paymode => {
        //Show Loader
        setLoading(true);
        const cate = type === 'walkin' ? 'walkin' : 'book';
        console.log(cate, "....................order.................");
        fetch(
            `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/${cate}/appointment/order/${live}/${paymode}/${appointment_id}/${patProfile.profile_id}`,
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
                setLoading(false);
                console.log(
                    responseJson,
                    '/..................handleRazorpayButton pay................',
                );
                if (responseJson.razorpay_order_id) {
                    console.log("    if 1     ")
                    online(responseJson);
                    return;
                }


                else if (mode === 'cash' || type === 'walkin') {
                    console.log("    if 2     ")

                    console.log(responseJson.message, '................responseJsonpayment................');
                    Alert.alert(' ', responseJson.message);
                    navigation.navigate('Appointment');
                    return;
                }

                else {
                    console.log("    if 3     ")
                    Alert.alert(' ', responseJson.message);
                    return;
                }
            })
            .catch(error => {
                //Hide Loader
                setLoading(false);
                console.error(error, 'handleRaiseButton error');
            });
    };

    useEffect(() => {
        AsyncStorage.getItem('pt_token').then(value => {
            setPt_Token(value);
        });
        AsyncStorage.getItem('pt_key').then(value => {
            setPt_Key(value);
        });
    });
    // const stringValue = bookResponse.cash_payment_amount 
    // const stringValue2 = item.online_discount_amount
    // const intValue = parseInt(stringValue,2);
    // const intValue2 = parseInt(stringValue2,2);
    return (
        <SafeAreaView style={styles.container}>
            <Loader loading={loading} />
            <BookHeader
                name={hos_name ? hos_name : item.hospital}
                image={image ? image : imagePlace}
            />

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

            ) : (<ScrollView>
                <View>



                    <View style={styles.body}>
                        <Text style={styles.bookText}>Booking Appointment for</Text>
                        <View style={styles.top}>
                            <Text style={styles.topText}>{patProfile.name}</Text>
                        </View>
                        <DoctorCard item={item} touch="off" />
                    </View>
                    <View>
                        <Text style={styles.innertext}>Bill Details</Text>
                        <View style={styles.innerHeding}>
                            <Text style={styles.innerHedingText}>Consultation Fee</Text>
                            <Text style={styles.innerHedingText1}>{bookResponse.online_payment_currency} {`${bookResponse.cash_payment_amount}`}</Text>
                        </View>
                        <View style={styles.innerHeding}>
                            <Text style={styles.innerHedingTextBooking}>Booking Fee</Text>
                            <Text style={styles.innerHedingText2}>INR 60 </Text><Text style={styles.TextEree}> FREE</Text>
                        </View>
                        {
                            mode === "online" || walkinMode === 'cash' || mode === 'cash' ? <View style={styles.innerHeding}>
                                <Text style={styles.innerHedingText}>Online Discount {'\n'} Payment</Text>
                                <Text style={styles.innerHedingText3}>{item.currency} <Text style={styles.onlineDis}>{`(-${bookResponse.online_discount_amount})`}</Text></Text>
                            </View> : null
                        }
                        <Text style={styles.underLine}></Text>
                        <View style={styles.innerHeding}>
                            <Text style={styles.innerHedingText}>Total Payble</Text>
                            {
                                mode === "online" || walkinMode === 'cash' || mode === 'cash' ? <Text style={styles.innerHedingText4}>{bookResponse.online_payment_currency} {`${bookResponse.online_payment_amount}`}</Text> : <Text style={styles.innerHedingText4}>{bookResponse.online_payment_currency} {`${bookResponse.cash_payment_amount}`}</Text>
                            }

                        </View>
                        {
                            mode === "online" || walkinMode === 'cash' || mode === 'cash' ? <Text style={styles.amountMethod}>*A small amount may be charged by {'\n'}payment gateway, as  per selected {'\n'}payment method</Text> : null
                        }


                    </View>

                    {showButton1 === true ?

                        <TouchableOpacity
                            style={{ width: '90%', alignSelf: "center" }}
                            onPress={() => {
                                if (type === 'walkin') {
                                    handleRaiseButton('cash');
                                }

                                if (type === 'in-person') {
                                    handleRaiseButton('cash');
                                }
                                if (mode === 'online') {
                                    handleRaiseButton('online')
                                }

                                else {
                                    Alert.alert(' ', bookResponse.message), navigation.navigate('Home');
                                }
                            }}>
                            <Button text="Pay" />
                        </TouchableOpacity> : <TouchableOpacity
                            style={{ width: '90%', alignSelf: "center" }}
                            onPress={() => {
                                handleRaiseButton("online")
                                console.log('RAZORPAY_PAY_KEY', RAZORPAY_PAY_KEY)
                                console.log("Clicked on the pay button")
                                console.log('patProfile.profile_id  ', patProfile.profile_id)
                                console.log('appointment_id         ', appointment_id)
                                console.log('live               ', live)
                                console.log('pt_token               ', pt_token)
                                console.log('pt_key                 ', pt_key)
                            }}>
                            <Button text="Pay" />
                        </TouchableOpacity>


                    }

                </View>
            </ScrollView>)}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert(' ', 'Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modal}>
                    <View style={styles.modalInner}>
                        <View style={{ alignSelf: 'flex-end' }}>
                        </View>

                        <View style={styles.imagebox}>
                            <Image
                                source={require('../../assets/images/slide2.png')}
                                style={styles.modalImage}
                            />
                        </View>

                        <Text style={styles.modalText}>
                            {modalContent}
                        </Text>
                        {/* <Text style={[styles.modalText, { color: color.primary }]}>
                            We will notify you once {item.doctor_name} is ready to meet.
                        </Text> */}
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Appointment');
                            }}
                            style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </SafeAreaView >


    )
}

export default CheckOutPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundColor,
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
        marginRight: 20,
    },
    text: {
        fontSize: size.font16,
        fontWeight: weight.semi,
        color: color.black,
        width: '80%'
    },
    body: {
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookText: {
        fontSize: size.font14,
        fontWeight: weight.semi,
        color: color.black,
        marginVertical: 20,
    },
    top: {
        height: 25,
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 32,
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    topText: {
        fontSize: size.font12,
        fontWeight: weight.low,
        color: color.white,
    },
    innertext: {
        top: 10,
        paddingLeft: 30,
        color: color.black,
    },
    innerHeding: {
        top: 10,
        paddingLeft: 37,
        flexDirection: 'row',

    },
    innerHedingText: {
        paddingVertical: 15,
        color: color.black,
    },
    innerHedingTextBooking: {
        paddingVertical: 15,
        color: color.black,
    },
    innerHedingText1: {
        paddingVertical: 15,
        marginLeft: 68,
        fontWeight: weight.low,
        color: color.black,

    },
    innerHedingText2: {
        paddingVertical: 15,
        marginLeft: 100,
        fontWeight: weight.low,
        color: color.black,
        textDecorationLine: 'line-through',

    },
    TextEree: {
        paddingVertical: 15,
        fontWeight: weight.low,
        color: color.primary
    },
    innerHedingText3: {
        paddingVertical: 15,
        marginLeft: 68,
        fontWeight: weight.low,
        color: color.black,
    },
    innerHedingText4: {
        paddingVertical: 10,
        marginLeft: 99,
        justifyContent: "space-between",
        fontWeight: weight.low,
        color: color.black,
    },
    underLine: {
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        width: "80%",
        alignSelf: "center"
    },
    amountMethod: {

        marginLeft: 45,
        color: color.black
    },
    onlineDis: {
        color: 'red'
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
        bottom: 35,
    },
    closeButtonText: {
        fontSize: size.font14,
        color: color.primary,
        fontWeight: weight.semi,
    },
})