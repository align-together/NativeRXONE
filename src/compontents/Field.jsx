import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import size from '../assets/theme/size';
import color from '../assets/theme/color';
import weight from '../assets/theme/weight';

const Field = (props) => {
    const title = props.title
    const value = props.value
    const icon = props.icon
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Icon
                    name={icon}
                    size={size.font14}
                    color={color.black}
                />
                <Text style={styles.text}>{title}</Text>
            </View>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
};

export default Field;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 5,
    },
    body: {
        flexDirection: 'row',
    },
    text: {
        fontSize: size.font14,
        fontWeight: weight.low,
        color: color.textGrey,
        marginLeft: 10,
    },
    value: {
        fontSize: size.font14,
        fontWeight: weight.semi,
        color: color.black,
        marginLeft: 30,
        marginTop: 5,
    },
});
