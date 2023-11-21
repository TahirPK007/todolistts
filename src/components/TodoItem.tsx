import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface TodoItemProps {
  item: {id: number; todo: string};
  index: number;
  deleteTodo: (index: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({item, index, deleteTodo}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.textContainer, {opacity: fadeAnim}]}>
        <Text style={styles.numberText}>{index + 1}-</Text>
        <Text style={styles.text}>{item.todo}</Text>
      </Animated.View>
      <TouchableOpacity onPress={() => deleteTodo(index)}>
        <Icon name="minus" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    width: '90%',
    marginLeft: 20,
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '80%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  numberText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    marginRight: 10,
  },
  text: {
    color: 'black',
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    height: 40,
    paddingTop: 10,
    paddingLeft: 10,
  },
});

export default TodoItem;
