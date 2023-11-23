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

  const createTable = () => {
    createDbTable().then();
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
    });
  };

  useEffect(() => {
    // createDbTable();
    // fetchTodosFromDB();
    getAllTasks().then((res: any) => {
      setTaskList(res);
    });
    // deleteTable();
  }, [taskList]);

  return (
    <View style={{flex: 1}}>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalstyle}>
          <TouchableOpacity
            style={styles.modalbtn}
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
            style={styles.txtinput}
            placeholder="Enter your task description"
            value={data}
            onChangeText={txt => setData(txt)}
            placeholderTextColor={'black'}
          />
          <TouchableOpacity
            style={styles.addtaskbtn}
            onPress={() => {
              if (data === '') {
                Alert.alert('Please enter something');
              } else {
                saveTodo();
                setmodalVisible(false);
                setData('');
              }
            }}>
            <Text style={{color: 'white', fontSize: 20}}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Text style={styles.headertxt}>Todo List</Text>
      <View style={{}}>
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
        style={styles.plusbtn}
        onPress={() => {
          setmodalVisible(true);
        }}>
        <Icon name="plus" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  modalstyle: {
    width: '90%',
    backgroundColor: 'white',
    height: '70%',
    marginTop: 100,
    marginLeft: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalbtn: {
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
  },
  txtinput: {
    width: '70%',
    height: 80,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
    paddingLeft: 10,
    color: 'black',
  },
  addtaskbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 45,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 15,
    marginTop: 20,
    backgroundColor: 'blue',
  },
  headertxt: {
    textAlign: 'center',
    fontSize: 30,
    color: 'blue',
    fontWeight: 'bold',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  plusbtn: {
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
  },
});
