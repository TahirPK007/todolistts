import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text
        style={styles.txt}
        onPress={() => {
          navigation.navigate('Screen2');
        }}>
        Home
      </Text>
    </View>
  );
};

export default Home;
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
