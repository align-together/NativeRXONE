import { StyleSheet, Image, Text, View } from 'react-native'
import React from 'react'

const Err404 = () => {
    return (
        <View>
            <Image
                source={require('../../assets/images/error_500.gif')}
                style={{ height: 250, width:"95%",alignSelf:'center' }}
            />
        </View>
    )
}

export default Err404

const styles = StyleSheet.create({})