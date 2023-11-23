import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

const GalleryVideo = () => {
  const route = useRoute();
  const ref = useRef();
  const [paused, setpaused] = useState(false);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{height: 500, width: '100%'}}>
        {route.params !== undefined && (
          <VideoPlayer
            scrubbing={0}
            disableBack
            ref={ref}
            source={{uri: route.params.video.path}}
            // onPlay={e => {
            //   console.log('this is onPlay', e);
            // }}
            // onLoad={e => {
            //   console.log('this is onload', e);
            // }}
            // onProgress={e => {
            //   console.log('this is onpress', e);
            // }}
            // onEnd={e => {
            //   console.log('video ending', e);
            // }}
          />
        )}
      </View>
    </View>
  );
};
export default GalleryVideo;
const styles = StyleSheet.create({});
