import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import color from '../assets/theme/color';
import size from '../assets/theme/size';
import weight from '../assets/theme/weight';
import {Image} from 'react-native';
const Type = props => {
  const name = props.name;
  const type = props.type;
  return (
    <View style={styles.container}>
      <View style={styles.containerInner}>
        <View style={styles.circle}>
          {name === 'logo' ? (
            <Image
              source={require('../assets/images/rxlogo.png')}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                borderRadius: 100,
              }}
            />
          ) : (
            <Icon
              name={name}
              size={size.font20}
              color={type === 'Sign Out' ? color.errorColor : color.primary}
            />
          )}
        </View>
        <Text
          style={[
            styles.text,
            {color: type === 'Sign Out' ? color.errorColor : color.primary},
          ]}>
          {type}
        </Text>
      </View>
      <Icon
        name="chevron-forward-outline"
        size={size.font25}
        color={color.progressGrey}
      />
    </View>
  );
};

export default Type;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 55,
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: color.secondary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.textPrimary,
    marginLeft: 20,
  },
});
