import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import color from '../../assets/theme/color';

const SwitchButton = ({ share }) => {
    const [switchButton, setSwitchButton] = useState(false);

    return (
        <View style={styles.switchBox}>
            <TouchableOpacity
                onPress={() => {
                    setSwitchButton(false);
                    share();
                }}
                style={{
                    width: 20,
                    height: 15,
                    backgroundColor:
                        switchButton === false ? color.primary : color.secondary,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                }}
            />
            <TouchableOpacity
                onPress={() => {
                    setSwitchButton(true);
                    share();
                }}
                style={{
                    width: 20,
                    height: 15,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    backgroundColor:
                        switchButton === true ? color.primary : color.secondary,
                }}
            />
        </View>
    );
};

export default SwitchButton;

const styles = StyleSheet.create({
    switchBox: {
        flexDirection: 'row',
        marginLeft: 10,
    },
});
