import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TodoList from './components/TodoList';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
  <Drawer.Navigator>
    <Drawer.Screen name='TodoList' component={TodoList} options={{}} />
  </Drawer.Navigator>
  )
}

export default AppNavigator