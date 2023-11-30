import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import React, {useState, useEffect, useRef} from 'react';
import {AppState} from 'react-native';

export default function useGetshare() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [files, setfiles] = useState();
  useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(
      files => {
        console.log('intent files', files);
        setfiles(files);
      },
      error => {
        console.log('no data');
      },
      'ShareMedia',
    );
    // ReceiveSharingIntent.clearReceivedFiles();
  }, []);
  return files;
}
