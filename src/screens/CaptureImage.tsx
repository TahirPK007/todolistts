import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {openDatabase} from 'react-native-sqlite-storage';
import {useNavigation, useIsFocused} from '@react-navigation/native';

const db = openDatabase({name: 'todolist.db'});

const CaptureImage = () => {
  const navigation = useNavigation();
  const [filePath, setFilePath] = useState({});

  const addImageToDb = (path, type) => {
    db.transaction(txn => {
      txn.executeSql(
        'insert into media (path,type) VALUES (?,?)',
        [path, type.startsWith('image') ? 'image' : 'video'],
        (sqltxn, res) => {
          console.log('Inserted successfully');
        },
        error => {
          console.log('Error occurred while inserting:', error);
        },
      );
    });
  };

  console.log('this is image information', filePath.uri);
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const isFocused = useIsFocused();
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const captureImage = async type => {
    console.log('Capture Image ');
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30,
      saveToPhotos: true,
      includeBase64: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          //   alert('User cancelled camera');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        setFilePath(response.assets[0]);
        addImageToDb(response.assets[0].uri, response.assets[0].type);
        navigation.navigate('Gallery');
      });
    }
  };

  useEffect(() => {
    if (isFocused) {
      captureImage('photo');
    }
  }, [isFocused]);

  return (
    <View>
      <Text>CaptureImage</Text>
    </View>
  );
};

export default CaptureImage;
