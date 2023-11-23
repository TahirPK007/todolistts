import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';

const ImageGallery = () => {
  const [filePath, setfilePath] = useState({});
  const pickimage = () => {
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then(image => {
    //   console.log(image);
    // });
  };

  //   const chooseFile = type => {
  //     let options = {
  //       mediaType: type,
  //       maxWidth: 300,
  //       maxHeight: 550,
  //       quality: 1,
  //       includeBase64: true,
  //     };
  //     launchImageLibrary(options, response => {
  //       if (response.didCancel) {
  //         alert('User didnt pick image');
  //         return;
  //       } else if (response.errorCode == 'camera_unavailable') {
  //         alert('Camera not available on device');
  //         return;
  //       } else if (response.errorCode == 'permission') {
  //         alert('Permission not satisfied');
  //         return;
  //       } else if (response.errorCode == 'others') {
  //         alert(response.errorMessage);
  //         return;
  //       }
  //       console.log('uri -> ', response.assets[0].uri);
  //       //   console.log('width -> ', response.assets[0].width);
  //       //   console.log('height -> ', response.assets[0].height);
  //       //   console.log('fileSize -> ', response.assets[0].fileSize);
  //       console.log('type -> ', response.assets[0].type);
  //       console.log('fileName -> ', response.assets[0].fileName);
  //       setfilePath(response.assets[0]);
  //     });
  //   };

  const navigation = useNavigation();

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
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            console.log(image);
            navigation.navigate('Gallery', {
              img: image,
            });
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
      {/* <Image
        source={{uri: filePath.uri}}
        style={{
          height: 500,
          width: '100%',
          marginTop: 20,
          resizeMode: 'contain',
        }}
      /> */}
    </View>
  );
};
export default ImageGallery;
