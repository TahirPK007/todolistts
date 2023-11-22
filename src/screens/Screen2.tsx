import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Screen2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Screen 2</Text>
    </View>
  );
};

export default Screen2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: 'black',
    fontSize: 100,
  },
});
