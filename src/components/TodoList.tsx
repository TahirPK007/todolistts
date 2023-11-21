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
} from 'react-native';
import TodoItem from './TodoItem';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteTodo,
  selectTodos,
  setTodos,
} from '../redux toolkit/slices/todoSlice';
import {addTask, createDbTable, deleteDbTable, deleteTodoFromDb, getAllTasks} from '../services/DBHandler';


const TodoList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<string>('');
  const [taskList, setTaskList] = useState<[]>([]);
  const todos: [] = useSelector(selectTodos);

//   const createTable = () => {
//     createDbTable().then(res=>{})
//   };
  const saveTodo = () => {
    addTask(data)
      .then(() => {
        // dispatch(addTask(data));
        setData('');
      })
      .catch(() => {});;
  };

  const fetchTodosFromDB = () => {
    getAllTasks().then(res => {
      if (res) {
        // dispatch(setTodos(res))
      }
    });
  };

  const deleteTable = () => {
    deleteDbTable().then(res=>{

    })
  };

  const deleteTodoHandler = (id:number) => {
   deleteTodoFromDb(id).then(res=>{
    console.log(res,'this is delted')
    fetchTodosFromDB()
   })
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
    })
    // deleteTable();
  }, [taskList]);

  return (
    <View style={{flex: 1}}>
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
      <View
        style={{
          width: '90%',
          borderWidth: 1,
          borderColor: 'black',
          height: 100,
          marginBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 20,
          borderRadius: 15,
        }}>
        <View
          style={{
            width: '100%',
            height: 100,
            position: 'absolute',
            bottom: 0,
            left: 10,
            right: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            style={{
              flex: 1,
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
              marginLeft: 5,
            }}
            onPress={() => {
              if (data === '') {
                Alert.alert('Please enter something');
              } else {
                saveTodo();
              }
            }}>
            <Icon name="plus" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TodoList;
