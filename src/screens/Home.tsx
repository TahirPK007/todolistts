// import {View, Text, Image} from 'react-native';
// import React, {useEffect} from 'react';
// import {useIsFocused} from '@react-navigation/native';
// import useGetshare from '../useGetShare';
// import {openDatabase} from 'react-native-sqlite-storage';

// const db = openDatabase({name: 'todolist.db'});

// const Home = () => {
//   const isFocused = useIsFocused();

//   const files = useGetshare();
//   const addImageToDb = (path, type) => {
//     db.transaction(txn => {
//       txn.executeSql(
//         'INSERT INTO media (path, type) VALUES (?, ?)',
//         ['file://' + path, type],
//         (sqltxn, res) => {
//           console.log('Inserted successfully');
//         },
//         error => {
//           console.log('Error occurred while inserting:', error);
//         },
//       );
//     });
//   };

//   useEffect(() => {
//     console.log('home use effect triggered');
//     if (files) {
//       files.forEach(item => {
//         addImageToDb(item.filePath, 'image');
//       });
//     }
//   }, [isFocused, files]);

//   console.log('home is focused', isFocused);

//   return (
//     <View style={{flex: 1}}>
//       <Text>Home</Text>
//       {files?.map(item => (
//         <View key={item.filePath}>
//           <Text style={{color: 'black'}}>{item.fileName}</Text>
//           <Text style={{color: 'black'}}>{item.filePath}</Text>
//           <Image
//             source={{uri: 'file://' + item.filePath}}
//             style={{height: 50, width: 50}}
//           />
//         </View>
//       ))}
//     </View>
//   );
// };

// export default Home;

// import {View, Text, AppState} from 'react-native';
// import React, {useEffect, useRef} from 'react';
// import {useIsFocused} from '@react-navigation/native';
// import {openDatabase} from 'react-native-sqlite-storage';
// import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
// import useGetshare from '../useGetShare';
// const db = openDatabase({name: 'todolist.db'});
// const Home = () => {
//   const isFocused = useIsFocused();

//   const files = useGetshare();

//   if (files) {
//     files.map(item => {
//       db.transaction(txn => {
//         txn.executeSql(
//           'insert into media (path,type) VALUES (?,?)',
//           ['file://' + item.filePath, 'image'],
//           (sqltxn, res) => {
//             console.log('Inserted successfully');
//             ReceiveSharingIntent.clearReceivedFiles();
//           },
//           error => {
//             console.log('Error occurred while inserting:', error);
//           },
//         );
//       });
//     });
//   }

//   return (
//     <View>
//       <Text>Home</Text>
//       {files?.map(item => {
//         return (
//           <View>
//             <Text style={{color: 'black'}}>{item.fileName}</Text>
//             <Text style={{color: 'black'}}>{item.filePath}</Text>
//           </View>
//         );
//       })}
//     </View>
//   );
// };

// export default Home;

import {View, Text, AppState, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import useGetshare from '../useGetShare';

const db = openDatabase({name: 'todolist.db'});
const Home = () => {
  const isFocused = useIsFocused();

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const files = useGetshare();

  if (files) {
    files.map(item => {
      db.transaction(txn => {
        txn.executeSql(
          'SELECT * FROM media WHERE path = ?',
          ['file://' + item.filePath],
          (tx, res) => {
            const isDuplicate = res.rows.length > 0;
            if (!isDuplicate) {
              txn.executeSql(
                'insert into media (path,type) VALUES (?,?)',
                ['file://' + item.filePath, 'image'],
                (sqltxn, res) => {
                  console.log('Inserted successfully');
                },
                error => {
                  console.log('Error occurred while inserting:', error);
                },
              );
            } else {
              console.log('File already exists:', item.filePath);
            }
          },
        );
      });
    });
  }

  return (
    <View>
      <Text>Home</Text>
      {files?.map(item => (
        <View key={item.fileName}>
          <Text style={{color: 'black'}}>{item.fileName}</Text>
          <Text style={{color: 'black'}}>{item.filePath}</Text>

          <Image
            source={{
              uri: 'file://' + item.filePath,
            }}
            style={{height: 500, width: '100%', resizeMode: 'contain'}}
          />
        </View>
      ))}
    </View>
  );
};

export default Home;
