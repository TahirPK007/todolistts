import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'todolist.db'});

const VisionCamera = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef();
  const back = useCameraDevice('back');
  const front = useCameraDevice('front');
  const [flashMode, setFlashMode] = useState('off');
  const [cameraMode, setcameraMode] = useState(back);
  const [visible, setvisible] = useState(false);

  const handleCameraMode = () => {
    if (cameraMode == back) {
      setcameraMode(front);
    } else if (cameraMode == front) {
      setcameraMode(back);
    }
  };

  const toggleFlash = () => {
    if (flashMode == 'off') {
      setFlashMode('on');
    } else if (flashMode == 'on') {
      setFlashMode('off');
    }
  };

  const addImageToDb = (path, type) => {
    db.transaction(txn => {
      txn.executeSql(
        'insert into media (path,type) VALUES (?,?)',
        ['file://' + path, type],
        (sqltxn, res) => {
          console.log('Inserted successfully');
        },
        error => {
          console.log('Error occurred while inserting:', error);
        },
      );
    });
  };

  const checkPermission = async () => {
    // try {
    //   const cameraPermission=await PermissionsAndroid.request()

    // } catch (error) {

    // }
    const cameraPermission = await Camera.requestCameraPermission();
    const microphonePermission = await Camera.getMicrophonePermissionStatus();
    console.log(cameraPermission);
  };

  const takePicture = async () => {
    const photo = await cameraRef.current.takePhoto({
      flashMode: 'auto',
    });
    addImageToDb(photo.path, 'image');
    console.log('this is photo details', photo.path);
    setCapturedImage(photo.path);
  };

  const FullSizeImage = () => {
    return (
      <Modal visible={visible} transparent={true} style={{zIndex: 1}}>
        <TouchableOpacity
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            borderColor: 'red',
            position: 'absolute',
            borderWidth: 1,
            right: 20,
            top: 80,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2,
          }}
          onPress={() => {
            console.log('closed clicked');
            setvisible(false);
          }}>
          <Text style={{color: 'black', fontWeight: '600', fontSize: 20}}>
            X
          </Text>
        </TouchableOpacity>
        <View style={{backgroundColor: 'white', flex: 1}}>
          <View style={{width: '100%', height: '100%'}}>
            <Image
              source={{uri: 'file://' + capturedImage}}
              style={{height: '100%', width: '100%', resizeMode: 'contain'}}
            />
          </View>
        </View>
      </Modal>
    );
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <FullSizeImage />

      <Camera
        ref={cameraRef}
        device={cameraMode}
        isActive={true}
        photo={true}
        torch={flashMode}
        flash={'auto'}
        style={{width: '100%', height: '80%', marginTop: 20}}
      />

      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          position: 'absolute',
          top: 40,
          left: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handleCameraMode}>
        <Image
          source={require('../../images/flip.png')}
          style={{width: '100%', height: '100%', tintColor: 'white'}}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 100,
          position: 'absolute',
          bottom: 50,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 50,
          paddingRight: 50,
        }}>
        {capturedImage !== null ? (
          <TouchableOpacity
            style={{height: 60, width: 60}}
            onPress={() => {
              setvisible(true);
              console.log('clicked');
            }}>
            <Image
              source={{uri: 'file://' + capturedImage}}
              style={{height: 50, width: 50}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              borderWidth: 1,
              borderColor: 'white',
            }}></TouchableOpacity>
        )}

        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
          }}
          onPress={() => {
            takePicture();
          }}>
          <Image
            source={require('../../images/capture.png')}
            style={{height: '100%', width: '100%', tintColor: 'white'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
          }}
          onPress={toggleFlash}>
          <Image
            source={require('../../images/flash.png')}
            style={{height: '100%', width: '100%', tintColor: 'white'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VisionCamera;
