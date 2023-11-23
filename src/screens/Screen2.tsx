import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Screen2 = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text
        style={styles.txt}
        onPress={() => {
          navigation.goBack();
        }}>
        Screen 2
      </Text>
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
    fontSize: 70,
  },
});
