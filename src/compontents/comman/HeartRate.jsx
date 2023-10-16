import React, { useState } from 'react';
import { useEffect } from 'react';
import { LineChart } from 'react-native-chart-kit';
import color from '../../assets/theme/color';
import { Alert } from 'react-native';
import { View, Text } from 'react-native';

const HeartRate = ({ item }) => {
  const [datas, setDatas] = useState();
  const [date, setDate] = useState();

  console.log(item, 'trend item data ++++++++++++++++++++++++++++++++++');

  const handleData = value => {
    const limit = 8;
    const limitedArr = value.slice(-limit); // extract the first `limit` elements from `arr`
    // console.log(limitedArr); // [1, 2, 3]
    setDatas(limitedArr);
  };

  const getDataDB = value => {
    let categoies = [];
    for (let index = 0; index < value.length; index++) {
      const element = value[index].latest_measure;
      categoies.push(element);
    }
    handleData(categoies);
  };

  const handleData1 = value => {
    const limit = 8;
    const limitedArr = value.slice(-limit); // extract the first `limit` elements from `arr`
    // console.log(limitedArr); // [1, 2, 3]
    setDate(limitedArr);
  };

  const getDataDB1 = value => {
    let categoies = [];
    for (let index = 0; index < value.length; index++) {
      const element = value[index].measured_date;
      categoies.push(element);
    }
    handleData1(categoies);
  };

  useEffect(() => {
    getDataDB(item);
    getDataDB1(item);
  }, [item]);


  const customDot = ({ x, y, index, value }) => {
    console.log(x, y, index, value)
    return (
      <View style={{ position: 'absolute', left: x, top: y }}>
        <Text style={{ color: color.primary }}>{x}</Text>
      </View>
    );
  };
  return (
    <LineChart
      data={{
        labels: [],

        datasets: [
          {
            data: datas ? datas : [100, 200],
          },
        ],
      }}
      width={350}
      height={180}
      chartConfig={{
        backgroundColor: color.secondary,
        backgroundGradientFrom: color.secondary,
        backgroundGradientTo: color.secondary,
        color: (opacity = 1) => '#5BD3C8',
        labelColor: (opacity = 2) => color.textGrey,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '5',
          strokeWidth: '2',
          stroke: '#5BD3C8',
        },
      }}
      bezier

      renderDotContent={customDot}
      // onDataPointClick={handleDataPointClick}
      // renderDotContent={renderDot}


      // onDataPointClick={({ index }) => {
      //   const label = date[index];
      //   const value = datas[index];
      //   console.log(`Clicked ${label}`);
      //   console.log(`Clicked ${value}`);

      //   Alert.alert(
      //     'Latest Measure Detail ',
      //     `Lastest Measure Value ${value} date of ${label}`,
      //   );
      // }}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default HeartRate
