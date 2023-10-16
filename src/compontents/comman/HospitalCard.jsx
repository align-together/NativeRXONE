import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../../.env'


const HospitalCard = ({item}) => {
  const [imagePlace, setImage] = useState(''); // initial it to an empty string
  const [loadImage, setLoadImage] = useState(''); // initial it to an empty string

  const getImage = async () => {
    setLoadImage(false);
    try {
      const res = await fetch(
       `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/get/facility/logo/${live}/${item}`,
      );
      const data = await res.url;
      console.log(data);
      setImage(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadImage(true);
    }
  };

  useEffect(() => {
    getImage();
  }, [item]);

  return <Image source={{uri: imagePlace}} style={styles.clinicImage} />;
};

export default HospitalCard;

const styles = StyleSheet.create({
  clinicImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
});
