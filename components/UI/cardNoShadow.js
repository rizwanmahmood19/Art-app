import React from 'react';
import { View, StyleSheet } from 'react-native';

const CardNoShadow = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    
    borderRadius: 10,
    backgroundColor: 'white'
  }
});

export default CardNoShadow;
