import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import TodoItem from './TodoItem';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteTodo,
  selectTodos,
  setTodos,
} from '../redux toolkit/slices/todoSlice';
import {
  addTask,
  createDbTable,
  deleteDbTable,
  deleteTodoFromDb,
  getAllTasks,
} from '../services/DBHandler';

const TodoList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<string>('');
  const [taskList, setTaskList] = useState<[]>([]);
  const todos: [] = useSelector(selectTodos);
  const [modalVisible, setmodalVisible] = useState(false);

  //   const createTable = () => {
  //     createDbTable().then(res=>{})
  //   };
  const saveTodo = () => {
    addTask(data)
      .then(() => {
        // dispatch(addTask(data));
        setData('');
      })
      .catch(() => {});
  };

  const fetchTodosFromDB = () => {
    getAllTasks().then(res => {
      if (res) {
        // dispatch(setTodos(res))
      }
    });
  };

  const deleteTable = () => {
    deleteDbTable().then(res => {});
  };

  const deleteTodoHandler = (id: number) => {
    deleteTodoFromDb(id).then(res => {
      console.log(res, 'this is delted');
      fetchTodosFromDB();
    });
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    // createTable();
    // createDbTable();
    // fetchTodosFromDB();
    getAllTasks().then((res: any) => {
      setTaskList(res);
    });
    // deleteTable();
  }, [taskList]);

  return (
    <View style={{flex: 1}}>
      <Modal visible={modalVisible} transparent={true}>
        <View
          style={{
            width: '90%',
            backgroundColor: 'white',
            height: '70%',
            marginTop: 100,
            marginLeft: 20,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              width: '70%',
              height: 50,
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 10,
              paddingLeft: 10,
            }}
            placeholder="Enter your todo"
            value={data}
            onChangeText={txt => setData(txt)}
          />
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%',
              height: 50,
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 15,
              marginTop: 20,
            }}
            onPress={() => {
              if (data === '') {
                Alert.alert('Please enter something');
              } else {
                saveTodo();
                setmodalVisible(false);
              }
            }}>
            <Text style={{color: 'black', fontSize: 20}}>Save Todo</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 30,
          color: 'blue',
          fontWeight: 'bold',
          marginTop: 20,
          borderBottomWidth: 1,
          borderBottomColor: 'black',
        }}>
        Todo List
      </Text>
      <View style={{flex: 1}}>
        <FlatList
          data={taskList}
          renderItem={({item, index}) => (
            <TodoItem
              item={item}
              index={index}
              deleteTodo={() => {
                deleteTodoHandler(item.id);
              }}
            />
          )}
        />
      </View>

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
          bottom: 30,
          right: 30,
        }}
        onPress={() => {
          setmodalVisible(true);
        }}>
        <Icon name="plus" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TodoList;
