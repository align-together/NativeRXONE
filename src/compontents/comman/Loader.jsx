// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator, Text } from 'react-native';
import color from '../../assets/theme/color';
import size from '../../assets/theme/size';

const Loader = props => {
  const { loading, ...attributes } = props;

  return (

    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={true}
            color={color.primary}
            size={size.font20}
            style={styles.activityIndicator}
          />
          <Text style={{ color: color.primary, fontSize: size.font14 }}>Loading</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 50,
    width: '35%',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});



/* <Modal
transparent={true}
animationType={'none'}
visible={loading}
onRequestClose={() => {
  console.log('close modal');
}}>
<View style={{
  flex: 1,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'space-around',
  backgroundColor: '#00000040',
}}>
  <View style={{
    backgroundColor: '#FFFFFF',
    height: 50,
    width: '35%',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingHorizontal: 10,
  }}>
    <ActivityIndicator
      animating={true}
      color={color.primary}
      size={size.font20}
      style={{
        alignItems: 'center',
        height: 80,
      }}
    />
    <Text style={{ color: color.primary, fontSize: size.font14 }}>Loading</Text>
  </View>
</View>
</Modal> */