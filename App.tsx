import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import TodoList from './src/components/TodoList';
import {Provider} from 'react-redux';
import {store} from './src/redux toolkit/store';
import {createTable} from './src/services/DBHandler';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/AppNavigator';

const App = () => {
  // useEffect(() => {
  //   createTable();
  // }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
