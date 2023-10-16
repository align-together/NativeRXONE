import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import color from '../assets/theme/color';
import size from '../assets/theme/size';
import weight from '../assets/theme/weight';

const FollowStatus = props => {
    console.log(props.status, 'status');
    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    marginVertical: 10,
                    width: '94%',
                    alignSelf: 'center',
                }}>
                <View style={styles.containerInner}>
                    <View style={styles.boxStyle}>
                        <View
                            style={[
                                styles.box,
                                { backgroundColor: props.status == 1 || props.status == 2 || props.status == 3 || props.status == 4 ? color.primary : color.white },
                            ]}>
                            <Text
                                style={[
                                    styles.boxText,
                                    { color: props.status == 1 || props.status == 2 || props.status == 3 || props.status == 4 ? color.white : color.black },
                                ]}>
                                1
                            </Text>
                        </View>
                    </View>
                    <View style={styles.border} />
                </View>

                <View style={styles.containerInner}>
                    <View style={styles.boxStyle}>
                        <View
                            style={[
                                styles.box,
                                { backgroundColor: props.status == 2 || props.status == 3 || props.status == 4 ? color.primary : color.white },
                            ]}>
                            <Text
                                style={[
                                    styles.boxText,
                                    { color: props.status == 2 || props.status == 3 || props.status == 4 ? color.white : color.black },
                                ]}>
                                2
                            </Text>
                        </View>
                    </View>
                    <View style={styles.border} />
                </View>

                <View style={styles.containerInner}>
                    <View style={styles.boxStyle}>
                        <View
                            style={[
                                styles.box,
                                { backgroundColor: props.status == 3 || props.status == 4 ? color.primary : color.white },
                            ]}>
                            <Text
                                style={[
                                    styles.boxText,
                                    { color: props.status == 3 || props.status == 4 ? color.white : color.black },
                                ]}>
                                3
                            </Text>
                        </View>
                    </View>
                    <View style={styles.border} />
                </View>
                <View
                    style={[
                        styles.box,
                        { backgroundColor: props.status == 4 ? color.primary : color.white },
                    ]}>
                    <Text
                        style={[
                            styles.boxText,
                            { color: props.status == 4 ? color.white : color.black },
                        ]}>
                        4
                    </Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.contentText}>Chose Type</Text>
                <Text style={styles.contentText}>Select Date</Text>
                <Text style={styles.contentText}>
                    Select Doctor’s{'\n'}
                    Time Slot
                </Text>
                <Text style={[styles.contentText, { paddingRight: 12 }]}>Book</Text>
            </View>
        </View>
    );
};

export default FollowStatus;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'center',
    },
    containerInner: {
        width: '30.5%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    boxStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: 32,
        height: 32,
        borderRadius: 100,
        backgroundColor: color.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    boxText: {
        fontSize: size.font10,
        color: color.white,
        fontWeight: weight.low,
    },
    text: {
        fontSize: size.font10,
        color: color.black,
        fontWeight: weight.low,
    },
    border: {
        borderWidth: 0.5,
        width: 90,
        height: 4,
        backgroundColor: color.secondary,
        borderColor: color.secondary,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 5,
        alignItems: 'center',
    },
    contentText: {
        fontSize: size.font10,
        color: color.black,
        textAlign: 'center',
    },
});
