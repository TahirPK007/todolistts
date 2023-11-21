import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import TodoList from './src/components/TodoList';
import {Provider} from 'react-redux';
import {store} from './src/redux toolkit/store';
import {createTable} from './src/services/DBHandler';

const App = () => {
  // useEffect(() => {
  //   createTable();
  // }, []);

  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};

export default App;
