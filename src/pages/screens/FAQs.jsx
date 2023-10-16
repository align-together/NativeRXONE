import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackHeader from '../../compontents/headers/BackHeader';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';
import color from '../../assets/theme/color';
const FAQs = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader />
      <View style={styles.containerInner}>
        <Text style={styles.title}>My Appointments</Text>
        <Text style={styles.title}>
          "My Appointments" section/tab includes all the features/services
          required for booking/managing your Consultation Appointments
        </Text>
        <Text style={styles.title}>
          How can I see my scheduled appointment with doctor?
        </Text>
        <Text style={styles.title}>
          In Appointments section you can see any appointment scheduled by you
          for given date range.
        </Text>
        <Text style={styles.title}>
          How can I see latest appointment booked by me?{' '}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default FAQs;

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
  title: {
    fontSize: size.font14,
    fontWeight: weight.low,
    color: color.black,
    marginVertical: 10,
  },
});
