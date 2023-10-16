import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import HTML from 'react-native-render-html';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import color from '../../assets/theme/color';
import BackHeader from '../../compontents/headers/BackHeader';
import size from '../../assets/theme/size';
import weight from '../../assets/theme/weight';

const Blog = props => {
  const {item, blog} = props.route.params;
  const [data, setData] = useState();
  const tagsStyles = {
    p: {color: color.textPrimary, marginTop: -10, lineHeight: 20},
    li: {color: color.textPrimary, lineHeight: 20},
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackHeader />

      <ScrollView>
        <View style={styles.body}>
          <Image
            source={{uri: data ? data.featured_image : item.featured_image}}
            style={styles.image}
          />
          <Text style={styles.title}>{data ? data.title : item.title}</Text>
          <HTML
            source={{html: data ? data.content : item.content}}
            tagsStyles={tagsStyles}
          />
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{flexDirection: 'row'}}>
            {!blog
              ? null
              : blog.map(item => {
                  return (
                    <TouchableOpacity
                    onPress={() => setData(item)}
                    style={styles.blog}>
                      <Image
                        style={styles.blogImage}
                        source={{
                          uri: item.featured_image,
                        }}
                      />
                      <View style={{padding: 10, height: 200}}>
                        <Text style={styles.blogTitle}>{item.title}</Text>
                        {/* <Text numberOfLines={5} style={styles.blogDes}>
                          {item.content}
                        </Text> */}
                        <TouchableOpacity
                          onPress={() => setData(item)}
                          style={styles.readButton}>
                          <Text style={{color: color.black}}>Read more</Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Blog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
  },
  body: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  title: {
    color: color.primary,
    fontSize: size.font18,
    fontWeight: weight.semi,
    marginTop: 10,
  },
  des: {
    color: color.textPrimary,
    fontSize: size.font14,
    fontWeight: weight.low,
  },
  blog: {
    width: 270,
    height: 200,
    marginTop: 10,
    borderRadius: 5,
    marginRight: 15,
  },
  blogImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    position: 'absolute',
    opacity: 0.7,
    backgroundColor: 'grey',
  },
  blogTitle: {
    fontSize: size.font16,
    fontWeight: weight.full,
    color: color.white,
  },
  blogDes: {
    fontSize: size.font12,
    fontWeight: weight.low,
    color: color.white,
    paddingVertical: 5,
  },
  readButton: {
    width: 100,
    height: 25,
    backgroundColor: '#01cab8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    position: 'absolute',
    bottom: 10,
    marginLeft: 10,
  },
});
