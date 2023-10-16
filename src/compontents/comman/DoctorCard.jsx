import { Image, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import size from '../../assets/theme/size';
import color from '../../assets/theme/color';
import weight from '../../assets/theme/weight';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from '../../.env';

const DoctorCard = props => {
  const navigation = useNavigation();
  const navigationScreen = props.navigationScreen;
  const item = props.item;
  const profile_id = props.profile_id;
  const patName = props.patName;
  const hos_name = props.hos_name;
  const patProfile = props.patProfile;
  const hos_id = props.hos_id;
  const image = props.image;

  // console.log(item, 'item...................................');
  const touch = props.touch;

  const [imagePlace, setImage] = useState(''); // initial it to an empty string
  const [loadImage, setLoadImage] = useState(''); // initial it to an empty string
  const getImage = async () => {
    setLoadImage(false);
    try {
      const res = await fetch(
        `${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}patient/doctor/pic/${live}/${item.doc_id}`,
      );
      const data = await res.url;
      // console.log(data);
      setImage(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadImage(true);
    }
  };

  useEffect(() => {
    getImage();
  }, [item.doc_id]);

  return (
    <TouchableOpacity
      disabled={touch === 'off' ? true : false}
      onPress={() => {
        console.log('props si : ', props)
        // if (profile_id == '') {
        //   Alert.alert(' ','Please select Profile');
        // } else {
        //   navigation.navigate(navigationScreen, {
        //     item,
        //     profile_id,
        //     patName,
        //     imagePlace,
        //     patProfile,
        //     hos_name,
        //     hos_id,
        //     image,
        //   });
        // }
      }}
      style={styles.card}>
      <View style={{ paddingHorizontal: 10, padding: 10 }}>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '27%',
              height: 100,
            }}>
            {imagePlace === '' ? (
              <View style={styles.imageView}>
                <Text style={styles.imageText}>
                  {item.doctor_name.slice(3, 4)}
                </Text>
              </View>
            ) : (
              <Image
                source={{ uri: imagePlace }}
                style={{
                  width: '100%',
                  height: 90,
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            )}

          </View>
          <View style={styles.box}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.title}>{item.doctor_name}</Text>
              <View style={styles.price}>
                <Text style={styles.priceText}>
                  {item.currency == '' ? '₹' : item.currency}{' '}
                  {item.consult_charges
                    ? item.consult_charges
                    : item.consult_charge}
                </Text>
              </View>
            </View>

            <Text
              numberOfLines={2}
              style={[
                styles.subtitle,
                {
                  fontSize: size.font12,
                  fontWeight: weight.bold,
                },
              ]}>
              {item.speciality}
            </Text>

            <Text numberOfLines={1} style={styles.subtitle}>
              {item.qualification} {item.experience} years experience
            </Text>

            {/* <Text numberOfLines={1} style={styles.subtitle}>
              {item.qualification}
            </Text> */}

            <Text numberOfLines={2} style={styles.hospital}>
              {item.hospital}
            </Text>

            <Text numberOfLines={1} style={styles.subtitle}>
              {item.address}
            </Text>

          </View>
        </View>
      </View>

      {item?.online_discount_percentage === 0 ? null : (
        <View style={styles.block}>
          <View style={styles.leftBox}>
            <Image source={require('../../assets/images/discounticon.png')} style={{
              tintColor: 'orange',
              width: 25,
              height: 25
            }} />
          </View>
          <View style={styles.rightBox}>
            <Text style={styles.disText}>
              {item.online_discount_percentage
                && item.online_discount_percentage
              }
              %
            </Text>
            <Text style={styles.dis}>Discount on online payment.</Text>
          </View>
        </View>
      )}

    </TouchableOpacity>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: color.secondary,
    borderRadius: 10,
    marginTop: 10,
  },
  cardInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    borderRadius: 100,
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
  price: {
    backgroundColor: 'orange',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  priceText: {
    fontSize: size.font12,
    color: color.white,
    fontWeight: weight.semi,
  },
  box: {
    width: '70%',
  },
  title: {
    fontSize: size.font14,
    fontWeight: weight.bold,
    color: color.primary,
    lineHeight: 25,
  },
  subtitle: {
    fontSize: size.font10,
    color: color.primary,
    fontWeight: weight.low,
    lineHeight: 20,
  },
  hospital: {
    fontSize: size.font12,
    color: color.primary,
    fontWeight: weight.bold,
    lineHeight: 20,
  },
  block: {
    borderTopWidth: 1,
    borderColor: color.borderColor,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: color.primary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  leftBox: {
    width: 30,
    height: 30,
    // backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  rightBox: {
    marginLeft: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  disText: {
    fontSize: size.font16,
    color: 'orange',
    fontWeight: weight.bold,
    marginRight: 5,
  },
  dis: {
    fontSize: size.font14,
    // color: color.white,
    color: 'orange',
    fontWeight: weight.low,
  },
  imageView: {
    width: 55,
    height: 55,
    borderRadius: 100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.primary,
  },
  imageText: {
    fontSize: size.font25,
    fontWeight: weight.bold,
    color: color.primary,
  },
});
