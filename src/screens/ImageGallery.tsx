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
        `create Table if not Exists images (id INTEGER PRIMARY KEY AUTOINCREMENT,imgpath TEXT)`,
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

  const [multipleimages, setmultipleimages] = useState([]);

  const addingimgs = () => {
    multipleimages.map(item => {
      db.transaction(txn => {
        txn.executeSql(
          'insert into images (imgpath) VALUES (?)',
          [item.path],
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
  console.log('these are multiple images', multipleimages);
  useEffect(() => {
    // createTable();
    if (multipleimages.length > 0) {
      addingimgs();
      setmultipleimages([]);
    }
  }, [multipleimages]);
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
          }).then(images => {
            setmultipleimages(images);
            addingimgs();
            navigation.navigate('Gallery');
          });
        }}>
        <Text style={{color: 'white'}}>Pick Image</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: 100,
          height: 40,
          borderRadius: 10,
          backgroundColor: 'black',
          marginTop: 20,
        }}
        onPress={() => {
          ImagePicker.openPicker({
            mediaType: 'video',
          }).then(video => {
            console.log(video);
            navigation.navigate('GalleryVideo', {
              video: video,
            });
          });
        }}>
        <Text style={{color: 'white'}}>Pick Video</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ImageGallery;
