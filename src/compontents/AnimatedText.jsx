import React, { useState, useEffect } from 'react';
import { View, Text, Animated, FlatList } from 'react-native';
import color from '../assets/theme/color';
import size from '../assets/theme/size';
import weight from '../assets/theme/weight';

const AnimatedText = ({ text }) => {
  // console.log(text, '........text...............');
  const [animationValues, setAnimationValues] = useState([]);
  useEffect(() => {
    const words = text.split(' ');
    const animationValues = words.map(word => new Animated.Value(0));
    setAnimationValues(animationValues);
  }, [text]);

  useEffect(() => {
    const animations = animationValues.map((value, index) => {
      return Animated.timing(value, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      });
    });
    Animated.sequence(animations).start();
  }, [animationValues]);

  const words = text.split(' ');
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        padding: 20,
        backgroundColor: color.secondary,
        borderRadius: 10,
        marginBottom: 8,
      }}>
      {words.map((word, index) => {
        const opacity = animationValues[index];
        return (<>
          {word === "\n" ? (<Text style={{ width: "100%" }} >{' '}</Text>) :

            (<Animated.View style={{ opacity }} key={word}>
              <Text
                style={{
                  // flexDirection: 'row',
                  marginRight: 5,
                  fontSize: size.font14,
                  fontWeight: weight.low,
                  color: color.textPrimary,
                  textAlign: 'center',
                }}>
                {word}
              </Text>
            </Animated.View>)

          }
        </>)
      })}
    </View>
  );
};

export default AnimatedText;
