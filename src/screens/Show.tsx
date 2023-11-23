// import {View, Text, Image, Share, TouchableOpacity, Alert} from 'react-native';
// import React from 'react';
// import {useRoute} from '@react-navigation/native';
// import RNFS from 'react-native-fs';

// const Show = () => {
//   const route = useRoute();
//   console.log('this is route', route);
//   const onShare = async () => {
//     try {
//       const imagePath = route.params.img.path;

//       const shareOptions = {
//         title: 'Share via',
//         message: 'Check out this image!',
//         imageUrl: `file://${imagePath}`,
//         type: 'image/jpeg',
//       };

//       const result = await Share.share(shareOptions);

//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           console.log(`Shared via ${result.activityType}`);
//         } else {
//           console.log('Shared successfully');
//         }
//       } else if (result.action === Share.dismissedAction) {
//         console.log('Sharing dismissed by user');
//       }
//     } catch (error) {
//       Alert.alert(error.message);
//     }
//   };

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       {route.params !== undefined && (
//         <TouchableOpacity
//           style={{width: '100%', height: 500}}
//           onLongPress={() => {
//             onShare();
//           }}>
//           <Image
//             source={{uri: route.params.img.path}}
//             style={{
//               height: 500,
//               width: '100%',
//               marginTop: 20,
//               resizeMode: 'contain',
//             }}
//           />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default Show;

import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

const Show = () => {
  const route = useRoute();
  console.log('this is route', route);

  const onShare = async () => {
    try {
      const imagePath = route.params.img.path;

      const imageBase64 = await RNFS.readFile(imagePath, 'base64');

      const shareOptions = {
        type: 'image/jpeg',
        url: `data:image/jpeg;base64,${imageBase64}`,
        title: 'share via',
        // message: 'check this image!',
      };

      await Share.open(shareOptions);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {route.params !== undefined && (
        <TouchableOpacity
          style={{width: '100%', height: 500}}
          onLongPress={() => {
            onShare();
          }}>
          <Image
            source={{uri: route.params.img.path}}
            style={{
              height: 500,
              width: '100%',
              marginTop: 20,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Show;
