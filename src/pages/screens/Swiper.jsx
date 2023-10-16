import {StyleSheet, TouchableOpacity, Image,View} from 'react-native';
import React,{useEffect,useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const Swiper = ({item}) => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  let itemLength = item.length;

  useEffect(() => {
    setTimeout(() => {
      if (activeIndex < itemLength - 1) {
        setActiveIndex(activeIndex + 1);
      } else {
        setActiveIndex(0);
      }
    }, 5000);
  });

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item[activeIndex]?.app_page);
        }}>
        <Image
          source={{uri: item[activeIndex]?.img_url}}
          style={{
            height: 200,
            width: '100%',
            resizeMode: 'stretch',
            borderRadius: 5,
          }}
        />
      </TouchableOpacity>

      {/* <View style={styles.activeindexview}>
        {item.map((dot, index) => {
          return (
            <View
              style={{
                height: 10,
                width: 10,
                alignSelf: 'center',
                margin: 5,
                borderRadius: 50,
                backgroundColor:
                  dot.sequence == activeIndex ? '#199a8e' : '#d9d9d9',
              }}
            />
          );
        })}
      </View> */}
    </>
  );
};

export default Swiper;

const styles = StyleSheet.create({
  activeindexview: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
});
