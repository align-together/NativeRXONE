import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import color from '../../assets/theme/color'
import size from '../../assets/theme/size'
import weight from '../../assets/theme/weight'

const Button = ({ text, flag }) => {

  let d = text.split(' ');
  console.log('d', d[0])
  console.log('d', d[1])


  return (<>
    {flag === 'true' ?
      <View style={[styles.container, { flexDirection: 'row', justifyContent: 'center' }]}>

        <Text style={styles.text}>{d[0]}</Text>

        <Image
          source={require('../../assets/images/rx_white.png')}
          style={{ height: 20, width: 20, marginHorizontal: 5 }}
        />

        <Text style={styles.text}>{d[1]}</Text>

      </View>

      :

      <View style={[styles.container, { flexDirection: 'row', justifyContent: 'center' }]}>
        <Text style={styles.text}>{text}</Text>
      </View>

    }
  </>)
}

export default Button

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: color.primary,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  text: {
    fontSize: size.font14,
    fontWeight: weight.semi,
    color: color.white
  }
})