import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'todolist.db'});

export const updateTodoInDb = (data: string, id: number) => {
  return new Promise((resolve, reject) => {
    db.transaction((txn: object) => {
      txn.executeSql(
        `update todos set todo=? where id=?`,
        [data, id],
        (sqltxn: object, res: {}) => {
          console.log('todos updated successfully');
        },
        (error: object) => {
          console.log(
            'error occurred while creating todos table',
            typeof error,
          );
        },
      );
    });
  });
};

export const createDbTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((txn: object) => {
      txn.executeSql(
        `create table if not exists todos (id integer primary key autoincrement, todo varchar(100))`,
        [],
        (sqltxn: object, res: {}) => {
          console.log('todos table created successfully');
        },
        (error: object) => {
          console.log('error occurred while creating todos table');
        },
      );
    });
  });
};

export const addTask = (data: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((txn: object) => {
      txn.executeSql(
        'INSERT INTO todos (todo) VALUES (?)',
        [data],
        (sqltxn: object, results: Array<[]>) => {
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

export const deleteTodoFromDb = (id: number) => {
  return new Promise((ress, reject) => {
    console.log('Deleting todo with ID:', id);
    db.transaction((txn: object) => {
      txn.executeSql(
        'DELETE FROM todos WHERE id = ?',
        [id],
        (sqltxn: object, results: []) => {
          if (results.rowsAffected > 0) {
            console.log('Todo deleted from database');
          } else {
            console.log('Todo not deleted from database');
          }
        },
        (error: object) => {
          console.error('Error deleting todo:', error);
        },
      );
    });
  });
};

export const getAllTasks = () => {
  return new Promise((resolve, reject) => {
    db.transaction((txn: object) => {
      txn.executeSql('SELECT * FROM todos', [], (sqltxn: object, res: []) => {
        let len = res.rows.length;
        let resultSet = [];
        for (let i = 0; i < len; i++) {
          let record = res.rows.item(i);
          resultSet.push({id: record.id, todo: record.todo});
        }
        resolve(resultSet);
      });
    });
  });
};

export const deleteDbTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction((txn: object) => {
      txn.executeSql(
        'DROP TABLE IF EXISTS todos',
        [],
        (txn: object, result: object) => {
          console.log('Table deleted successfully');
        },
        (error: object) => {
          console.error('Error deleting table:', error);
        },
      );
    });
  });
};
