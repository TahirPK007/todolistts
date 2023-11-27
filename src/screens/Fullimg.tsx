import {View, Text} from 'react-native';
import React from 'react';
import {Thumbnail} from 'react-native-thumbnail-video';

const Fullimg = () => {
  return (
    <View style={{flex: 1}}>
      <Thumbnail url="https://www.youtube.com/watch?v=lgj3D5-jJ74" />
    </View>
  );
};

export default Fullimg;
