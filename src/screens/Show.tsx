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

// import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
// import React from 'react';
// import {useRoute} from '@react-navigation/native';
// import Share from 'react-native-share';
// import RNFS from 'react-native-fs';

// const Show = () => {
//   const route = useRoute();
//   console.log('this is route', route);

//   const onShare = async () => {
//     try {
//       const imagePath = route.params.img.path;

//       const imageBase64 = await RNFS.readFile(imagePath, 'base64');

//       const shareOptions = {
//         type: 'image/jpeg',
//         url: `data:image/jpeg;base64,${imageBase64}`,
//         title: 'share via',
//         // message: 'check this image!',
//       };

//       await Share.open(shareOptions);
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

// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Alert,
//   FlatList,
// } from 'react-native';
// import React, {useState} from 'react';
// import {useRoute} from '@react-navigation/native';
// import Share from 'react-native-share';
// import RNFS from 'react-native-fs';

// const Show = () => {
//   const route = useRoute();
//   const [paths, setpaths] = useState(route.params.img);
//   console.log('this is data inside paths', paths);

//   return (
//     <View style={{flex: 1}}>
//       <Text
//         style={{
//           alignSelf: 'center',
//           fontSize: 30,
//           color: 'green',
//           marginBottom: 40,
//           fontWeight: '600',
//         }}>
//         Multiple Images
//       </Text>
//       <FlatList
//         data={paths}
//         numColumns={3}
//         renderItem={({item, index}) => {
//           return (
//             <View
//               style={{
//                 margin: 5,
//                 padding: 5,
//                 borderWidth: 1,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 borderRadius: 10,
//                 width: '30%',
//                 height: 100,
//               }}>
//               <Image
//                 source={{uri: item.path}}
//                 style={{height: '100%', width: '100%', resizeMode: 'cover'}}
//               />
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// };
// export default Show;

// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Alert,
//   FlatList,
// } from 'react-native';
// import React, {useState} from 'react';
// import {useRoute} from '@react-navigation/native';
// import Share from 'react-native-share';
// import RNFS from 'react-native-fs';

// const Show = () => {
//   const route = useRoute();
//   const [paths, setpaths] = useState(route.params.img);
//   console.log('this is data inside paths', paths);

//   return (
//     <View style={{flex: 1}}>
//       <Text
//         style={{
//           alignSelf: 'center',
//           fontSize: 30,
//           color: 'green',
//           marginBottom: 40,
//           fontWeight: '600',
//         }}>
//         Multiple Images
//       </Text>
//       <FlatList
//         data={paths}
//         numColumns={3}
//         renderItem={({item, index}) => {
//           return (
//             <View
//               style={{
//                 margin: 5,
//                 padding: 5,
//                 borderWidth: 1,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 borderRadius: 10,
//                 width: '30%',
//                 height: 100,
//               }}>
//               <Image
//                 source={{uri: item.path}}
//                 style={{height: '100%', width: '100%', resizeMode: 'cover'}}
//               />
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// };
// export default Show;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {
  useNavigation,
  useIsFocused,
  useFocusEffect,
} from '@react-navigation/native';
import ImageResizer from 'react-native-image-resizer';
import {openDatabase} from 'react-native-sqlite-storage';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

const db = openDatabase({name: 'todolist.db'});

const Show = () => {
  const [imgPaths, setImgPaths] = useState([]);
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setselectedVideo] = useState(null);
  const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();
  const imageLimit = 27;
  const [offset, setoffset] = useState(0);
  const [media, setmedia] = useState([]);
  const [isVideoPlaying, setisVideoPlaying] = useState(false);

  const FullSizeImg = () => {
    return (
      <Modal visible={visible} transparent={true}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          {selectedImage && selectedImage.type === 'image' ? (
            <Image
              source={{uri: selectedImage.path}}
              style={{height: '100%', width: '100%', resizeMode: 'cover'}}
            />
          ) : selectedImage && selectedImage.type === 'video' ? (
            <TouchableOpacity
              style={{height: '100%', width: '100%'}}
              onPress={() => {
                setisVideoPlaying(!isVideoPlaying);
              }}>
              <VideoPlayer
                scrubbing={0}
                disableBack
                source={{uri: selectedImage.path}}
                style={{height: '100%', width: '100%', resizeMode: 'cover'}}
              />
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderWidth: 1,
              borderColor: 'red',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 50,
              right: 20,
              backgroundColor: 'black',
            }}
            onPress={() => {
              setVisible(false);
              setSelectedImage(null);
              setisVideoPlaying(false);
            }}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: '700'}}>
              X
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const getAllMedia = async () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT id,path,type FROM media ORDER BY id DESC LIMIT ${imageLimit} OFFSET ${offset}`,
        [],
        async (sqltxn, res) => {
          let len = res.rows.length;
          let resultSet = [];
          for (let i = 0; i < len; i++) {
            let record = res.rows.item(i);
            let thumbnailPath;
            if (record.type === 'image') {
              thumbnailPath = await resizeImage(record.path, 200, 200);
            }
            resultSet.push({
              id: record.id,
              path: record.path,
              type: record.type,
              thumbnailPath: thumbnailPath,
            });
          }
          if (offset === 0) {
            setmedia([...resultSet]);
          } else {
            setmedia(prevMedia => [...prevMedia, ...resultSet]);
          }
        },
        error => {
          console.log('Error occurred during Fetching data:', error);
        },
      );
    });
  };

  const resizeImage = async (sourceUri, targetWidth, targetHeight) => {
    try {
      const resizedImage = await ImageResizer.createResizedImage(
        sourceUri,
        targetWidth,
        targetHeight,
        'JPEG',
        80,
      );

      return resizedImage.uri;
    } catch (error) {
      console.error('Error resizing image:', error);
      return null;
    }
  };

  const loadMore = () => {
    setoffset(prevOffset => prevOffset + imageLimit);
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllMedia();

      return () => {};
    }, [offset]),
  );

  useEffect(() => {
    getAllMedia();
  }, [offset]);

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingLeft: 10}}>
      <FlatList
        data={media}
        numColumns={3}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        keyExtractor={(item, index) => item.id.toString() + index.toString()}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                margin: 5,
                padding: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '30%',
                height: 200,
              }}
              onPress={() => {
                setSelectedImage(item);
                setVisible(true);
              }}>
              {item.type === 'image' ? (
                <Image
                  source={{uri: item.thumbnailPath}}
                  style={{height: '100%', width: '100%', resizeMode: 'cover'}}
                />
              ) : (
                <View style={{height: '100%', width: '100%'}}>
                  <VideoPlayer
                    source={{uri: item.path}}
                    paused={!isVideoPlaying}
                    showOnStart={false}
                    style={{height: '100%', width: '100%'}}
                  />
                  <View style={{position: 'absolute', top: 70, left: 35}}>
                    <Image
                      source={require('../../images/play.png')}
                      style={{height: 50, width: 50, tintColor: 'white'}}
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
      <FullSizeImg />
    </View>
  );
};
export default Show;
