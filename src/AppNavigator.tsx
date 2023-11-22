import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TodoList from './components/TodoList';
import Home from './screens/Home';
import Screen2 from './screens/Screen2';
import Icon from 'react-native-vector-icons/AntDesign';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Screen2"
        component={Screen2}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="user" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeTabs" component={HomeTabs} options={{}} />
      <Drawer.Screen name="TodoList" component={TodoList} options={{}} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
