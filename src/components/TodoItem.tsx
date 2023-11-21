import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {updateTodoInDb} from '../services/DBHandler';

interface TodoItemProps {
  item: {id: number; todo: string};
  index: number;
  deleteTodo: (index: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({item, index, deleteTodo}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [modalVisible, setmodalVisible] = useState(false);
  const [data, setdata] = useState('');
  const [id, setid] = useState();

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const upTodo = (data, id) => {
    updateTodoInDb(data, id).then(res => {
      console.log('updated');
    });
  };

  useEffect(() => {
    fadeIn();
  }, []);

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} transparent={true}>
        <View
          style={{
            width: '90%',
            backgroundColor: 'rgb(255 255 255)',
            height: '70%',
            marginTop: 100,
            marginLeft: 20,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'green',
              width: 50,
              height: 50,
              borderRadius: 25,
              position: 'absolute',
              top: 30,
              right: 30,
            }}
            onPress={() => {
              setmodalVisible(false);
            }}>
            <Text style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
              X
            </Text>
          </TouchableOpacity>
          <Text style={{color: 'black', marginRight: 190, fontSize: 20}}>
            Description:
          </Text>
          <TextInput
            style={{
              width: '70%',
              height: 80,
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 10,
              paddingLeft: 10,
            }}
            placeholder="Enter your task description"
            value={data}
            onChangeText={txt => setdata(txt)}
            placeholderTextColor={'black'}
          />
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%',
              height: 45,
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 15,
              marginTop: 20,
              backgroundColor: 'blue',
            }}
            onPress={() => {
              if (data == '') {
                Alert.alert('Please enter something');
              } else {
                upTodo(data, item.id);
                setmodalVisible(false);
              }
            }}>
            <Text style={{color: 'white', fontSize: 20}}>Save Task</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Animated.View style={[styles.textContainer, {opacity: fadeAnim}]}>
        <Text style={styles.numberText}>{index + 1}-</Text>
        <Text style={styles.text}>{item.todo}</Text>
      </Animated.View>
      <TouchableOpacity onPress={() => deleteTodo(index)}>
        <Icon name="minus" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setdata(item.todo);
          setid(item.id);
          setmodalVisible(true);
        }}>
        <Text style={{color: 'black', fontSize: 20}}>U</Text>
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
    paddingRight: 10,
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
