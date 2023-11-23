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
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';

const ImageGallery = () => {
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
            multiple: true,
          }).then(images => {
            console.log(images);
            navigation.navigate('Gallery', {
              img: images,
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
    </View>
  );
};
export default ImageGallery;
