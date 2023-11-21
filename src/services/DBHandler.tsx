import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'todolist.db'});

export const createTable = () => {
  return new Promise((resolve, reject) => {
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
  });
};

export const addTask = (data: string) => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql(
        'INSERT INTO todos (todo) VALUES (?)',
        [data],
        (sqltxn, results) => {
          if (results.rowsAffected > 0) {
            console.log('Todo saved to database');
          } else {
            console.log('Todo not saved to database');
          }
        },
      );
    });
  });
};

export const getAllTasks = () => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      txn.executeSql('SELECT * FROM todos', [], (sqltxn, res) => {
        let len = res.rows.length;
        let resultSet = [];
        for (let i = 0; i < len; i++) {
          let record = res.rows.item(i);
          resultSet.push({id: record.id, todo: record.todo});
        }
        console.log('todos fetched:', resultSet);
        resolve(resultSet);
        //   dispatch(setTodos(resultSet));
      });
    });
  });
};

export const deleteTodoHandler = (id, fetchTodosFromDB) => {
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

export const deleteTable = () => {
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
