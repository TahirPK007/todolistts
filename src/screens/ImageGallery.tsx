// import {
//   View,
//   Text,
//   Platform,
//   PermissionsAndroid,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import React, {useState} from 'react';
// import ImagePicker from 'react-native-image-crop-picker';
// import {useNavigation} from '@react-navigation/native';

// const ImageGallery = () => {
//   const navigation = useNavigation();
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <TouchableOpacity
//         style={{
//           borderWidth: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           width: 100,
//           height: 40,
//           borderRadius: 10,
//           backgroundColor: 'black',
//         }}
//         onPress={() => {
//           ImagePicker.openPicker({
//             multiple: true,
//           }).then(images => {
//             console.log(images);
//             navigation.navigate('Gallery', {
//               img: images,
//             });
//           });
//         }}>
//         <Text style={{color: 'white'}}>Pick Image</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={{
//           borderWidth: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           width: 100,
//           height: 40,
//           borderRadius: 10,
//           backgroundColor: 'black',
//           marginTop: 20,
//         }}
//         onPress={() => {
//           ImagePicker.openPicker({
//             mediaType: 'video',
//           }).then(video => {
//             console.log(video);
//             navigation.navigate('GalleryVideo', {
//               video: video,
//             });
//           });
//         }}>
//         <Text style={{color: 'white'}}>Pick Video</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// export default ImageGallery;

import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'todolist.db'});
const ImageGallery = () => {
  const navigation = useNavigation();
  const [data, setdata] = useState('');
  const createTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        `create Table if not Exists media (id INTEGER PRIMARY KEY AUTOINCREMENT,path TEXT,type TEXT)`,
        [],
        (sqltxn, res) => {
          console.log(' Table created Successfully..');
        },
        error => {
          console.log('Error occured during Table Creation...');
        },
      );
    });
  };

  const [multipleMedia, setMultipleMedia] = useState([]);

  const addMediaToDb = () => {
    multipleMedia.map(item => {
      db.transaction(txn => {
        txn.executeSql(
          'insert into media (path,type) VALUES (?,?)',
          [item.path, item.mime.startsWith('image') ? 'image' : 'video'],
          (sqltxn, res) => {
            console.log('Inserted successfully');
          },
          error => {
            console.log('Error occurred while inserting:', error);
          },
        );
      });
    });
  };

  const dropTable = () => {
    db.transaction((txn: object) => {
      txn.executeSql(
        'DROP TABLE IF EXISTS media',
        [],
        (txn: object, result: object) => {
          console.log('Table deleted successfully');
        },
        (error: object) => {
          console.error('Error deleting table:', error);
        },
      );
    });
  };

  useEffect(() => {
    // dropTable();
    // createTable();
    if (multipleMedia.length > 0) {
      addMediaToDb();
      setMultipleMedia([]);
    }
  }, [multipleMedia]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: 100,
          height: 40,
          borderRadius: 10,
          backgroundColor: 'black',
        }}
        onPress={() => {
          ImagePicker.openPicker({
            multiple: true,
          }).then(media => {
            setMultipleMedia(media);
            addMediaToDb();
            navigation.navigate('Gallery');
          });
        }}>
        <Text style={{color: 'white'}}>Pick Media</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ImageGallery;
