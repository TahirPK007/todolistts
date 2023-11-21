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
import {openDatabase} from 'react-native-sqlite-storage';
import {fetchTodos} from '../services/dbService';
import {addTask, getAllTasks} from '../services/DBHandler';

const db = openDatabase({name: 'todolist.db'});

const TodoList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState('');
  const todos = useSelector(selectTodos);
  const createTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        `create table if not exists todos (id integer primary key autoincrement, todo varchar(100))`,
        [],
        (sqltxn, res) => {
          console.log('todos table created successfully');
        },
        error => {
          console.log('error occurred while creating todos table', error);
        },
      );
    });
  };

  const saveTodo = () => {
    console.log('in save todo');
    addTask(data)
      .then(() => {
        dispatch(addTask(data));
        setData('');
      })
      .catch(() => {});
    // db.transaction(txn => {
    //   txn.executeSql(
    //     'INSERT INTO todos (todo) VALUES (?)',
    //     [data],
    //     (sqltxn, results) => {
    //       if (results.rowsAffected > 0) {
    //         console.log('Todo saved to database');
    //         fetchTodosFromDB();
    //       } else {
    //         console.log('Todo not saved to database');
    //       }
    //     },
    //   );
    // });
  };

  const fetchTodosFromDB = () => {
    getAllTasks().then(res => {
      if (res) {
        console.log('response of getAllTasks ====', res);
        dispatch(setTodos(res))
        fetchTodosFromDB()
      }
    });
  };

  const deleteTodoHandler = id => {
    console.log('Deleting todo with ID:', id);
    db.transaction(txn => {
      txn.executeSql(
        'DELETE FROM todos WHERE id = ?',
        [id],
        (sqltxn, results) => {
          if (results.rowsAffected > 0) {
            console.log('Todo deleted from database');
            fetchTodosFromDB();
          } else {
            console.log('Todo not deleted from database');
          }
        },
        error => {
          console.error('Error deleting todo:', error);
        },
      );
    });
  };

  const deleteTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        'DROP TABLE IF EXISTS todos',
        [],
        (tx, result) => {
          console.log('Table deleted successfully');
        },
        error => {
          console.error('Error deleting table:', error);
        },
      );
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
    createTable();
    fetchTodosFromDB();
    // deleteTable();
  }, []);

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
          data={todos}
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
