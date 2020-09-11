import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

import Card from '../UI/Card';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.details}>
              <Text style={styles.title1}>{props.title}</Text>
              <View style={styles.detailInner}>
              <Text style={styles.title}>{props.seats}</Text>
              <Text style={styles.title}>{props.color}</Text>
              <Text style={styles.title}>{props.model}</Text>
              </View>
              <Text style={styles.price}>Rs{props.price}</Text>
            </View>
            <View style={styles.actions}>
              {props.children}
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10
  },
  detailInner: {
    flexDirection: 'row',
    justifyContent:'space-around',
    width:'120%'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 12,
    marginVertical: 2,
    justifyContent:'space-around',
  },
  title1: {
    fontFamily: 'open-sans-bold',
    fontSize: 12,
    marginVertical: 2,
    justifyContent:'space-around',
    paddingLeft:15,
    marginBottom:10
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888',
    paddingLeft:10,
    marginTop:10
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20
  }
});

export default ProductItem;
