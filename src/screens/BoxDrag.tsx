//the box will move everywhere on the screen
// import {View, Text, Animated, PanResponder} from 'react-native';
// import React, {useRef} from 'react';

// const BoxDrag = () => {
//   const pan = useRef(new Animated.ValueXY()).current;

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
//       onPanResponderRelease: () => {
//         pan.extractOffset();
//       },
//     }),
//   ).current;
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Animated.View
//         style={{transform: [{translateX: pan.x}, {translateY: pan.y}]}}
//         {...panResponder.panHandlers}>
//         <View
//           style={{
//             height: 100,
//             width: 100,
//             borderRadius: 5,
//             backgroundColor: 'blue',
//           }}></View>
//       </Animated.View>
//     </View>
//   );
// };
// export default BoxDrag;

//box will come back to its original position
// import {View, Text, Animated, PanResponder} from 'react-native';
// import React, {useRef} from 'react';
// const BoxDrag = () => {
//   const pan = useRef(new Animated.ValueXY()).current;
//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
//       onPanResponderRelease: (e, gesture) => {
//         Animated.spring(pan, {
//           toValue: {x: 0, y: 0},
//           useNativeDriver: false,
//         }).start();
//       },
//     }),
//   ).current;
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Animated.View
//         style={{transform: [{translateX: pan.x}, {translateY: pan.y}]}}
//         {...panResponder.panHandlers}>
//         <View
//           style={{
//             height: 100,
//             width: 100,
//             borderRadius: 5,
//             backgroundColor: 'blue',
//           }}></View>
//       </Animated.View>
//     </View>
//   );
// };
// export default BoxDrag;

//box will only move vertically and horizotally
import {View, Text, Animated, PanResponder} from 'react-native';
import React, {useRef, useState} from 'react';
const BoxDrag = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        console.log('this is gesture', gesture);
        const {dx, dy} = gesture;
        if (Math.abs(dx) > Math.abs(dy)) {
          pan.setValue({x: dx, y: 0});
        } else {
          pan.setValue({x: 0, y: dy});
        }
      },
      onPanResponderRelease: (e, gesture) => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        style={{transform: [{translateX: pan.x}, {translateY: pan.y}]}}
        {...panResponder.panHandlers}>
        <View
          style={{
            height: 100,
            width: 100,
            borderRadius: 5,
            backgroundColor: 'blue',
          }}></View>
      </Animated.View>
    </View>
  );
};
export default BoxDrag;
