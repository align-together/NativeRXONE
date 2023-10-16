import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import size from '../assets/theme/size';
import weight from '../assets/theme/weight';
import color from '../assets/theme/color';
const AppointmentType = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.containerInner}>
                <View style={styles.box}>
                    <View style={styles.boxInner}>
                        <Image source={props.image} style={{width:20,height:20,resizeMode:'contain'}} />
                    </View>
                    <Text style={styles.text}>{props.name}</Text>
                </View>
                <Icon name="arrow-forward-ios" size={20} color={color.textGrey} />
            </View>
        </View>
    );
};

export default AppointmentType;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: color.backgroundColor,
        alignSelf: 'center',
    },
    containerInner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical:10
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    boxInner: {
        width: 45,
        height: 45,
        backgroundColor: color.secondary,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: size.font14,
        fontWeight: weight.semi,
        color: color.black,
        marginLeft: 20,
    },
});
