import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {openDatabase} from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const db = openDatabase({name: 'todolist.db'});

const VisionCamera = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef();
  const back = useCameraDevice('back');
  const front = useCameraDevice('front');
  const [flashMode, setFlashMode] = useState('auto');
  const [cameraMode, setcameraMode] = useState(back);
  const [visible, setvisible] = useState(false);

  const [isRecording, setisRecording] = useState(false);
  const [timer, settimer] = useState(0);

  const handleCameraMode = () => {
    if (cameraMode == back) {
      setcameraMode(front);
    } else if (cameraMode == front) {
      setcameraMode(back);
    }
  };

  const toggleFlash = () => {
    if (flashMode == 'auto') {
      setFlashMode('on');
    } else if (flashMode == 'on') {
      setFlashMode('off');
    } else if (flashMode == 'off') {
      setFlashMode('auto');
    }
  };

  const addImageToDb = (path, type) => {
    db.transaction(txn => {
      txn.executeSql(
        'insert into media (path,type) VALUES (?,?)',
        ['file://' + path, type],
        (sqltxn, res) => {
          console.log('image inserted successfully');
        },
        error => {
          console.log(
            'Error occurred while adding image into database:',
            error,
          );
        },
      );
    });
  };

  const addVideoToDb = (path, type) => {
    db.transaction(txn => {
      txn.executeSql(
        `insert into media (path,type) VALUES (?,?)`,
        ['file://' + path, type],
        (sqltxn, res) => {
          console.log('video inserted successfully');
        },
        error => {
          console.log('error occured while adding video into database');
        },
      );
    });
  };

  const checkPermission = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    const microphonePermission = await Camera.requestMicrophonePermission();
    console.log(cameraPermission);
    console.log(microphonePermission);
  };

  const outerCircleSize = useRef(new Animated.Value(80)).current;
  const innerCircleColor = useRef(new Animated.Value(0)).current;

  const handleButtonPressIn = () => {
    Animated.parallel([
      Animated.timing(outerCircleSize, {
        toValue: 100,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(innerCircleColor, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleButtonPressOut = () => {
    Animated.parallel([
      Animated.timing(outerCircleSize, {
        toValue: 80,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(innerCircleColor, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const takePicture = async () => {
    const photo = await cameraRef.current.takePhoto({
      flash: `${flashMode}`,
      enableShutterSound: false,
    });
    addImageToDb(photo.path, 'image');
    console.log('this is photo details', photo);
    setCapturedImage(photo.path);
  };

  const captureVideo = () => {
    setisRecording(true);
    const intervalId = setInterval(() => {
      settimer(timer => timer + 1);
    }, 1000);
    cameraRef.current.startRecording({
      onRecordingFinished: video => {
        clearInterval(intervalId);
        setisRecording(false);
        settimer(0);
        console.log(video);
        addVideoToDb(video.path, 'video');
      },
      onRecordingError: error => {
        clearInterval(intervalId);
        setisRecording(false);
        settimer(0);
        console.log(error);
      },
    });

    handleButtonPressIn();
  };

  const stopRecordingVideo = async () => {
    if (isRecording) {
      await cameraRef.current.stopRecording();
      handleButtonPressOut();
    }
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
      {isRecording && (
        <Text
          style={{
            color: 'red',
            position: 'absolute',
            bottom: 180,
            left: 210,
            zIndex: 1,
          }}>
          {timer}
        </Text>
      )}
      {isRecording && (
        <Text
          style={{
            color: 'red',
            zIndex: 2,
            position: 'absolute',
            right: 20,
            top: 50,
          }}>
          Recording...
        </Text>
      )}

      <Camera
        ref={cameraRef}
        device={cameraMode}
        isActive={true}
        photo={true}
        video={true}
        audio={true}
        style={{width: '100%', height: '75%', marginTop: 20}}
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

        <TouchableWithoutFeedback
          onLongPress={() => {
            captureVideo();
          }}
          onPressOut={() => {
            stopRecordingVideo();
          }}
          onPress={() => {
            takePicture();
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 150,
              width: 150,
            }}>
            <Animated.View
              style={{
                height: outerCircleSize,
                width: outerCircleSize,
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Animated.View
                style={{
                  height: 60,
                  width: 60,
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 30,
                  backgroundColor: innerCircleColor.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['white', 'red'],
                  }),
                }}></Animated.View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
          }}
          onPress={toggleFlash}>
          {flashMode == 'auto' ? (
            <Icon name="flash-auto" size={30} color={'white'} />
          ) : flashMode == 'on' ? (
            <Icon name="flash" size={30} color={'white'} />
          ) : (
            <Icon name="flash-off" size={30} color={'white'} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VisionCamera;
