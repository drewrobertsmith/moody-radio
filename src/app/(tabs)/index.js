import { ActivityIndicator, Text, View } from "react-native";
import {
  addTracks,
  playbackService,
  setupPlayer,
} from "../../../trackPlayerServices";
import { useEffect, useState } from "react";

import TrackPlayer from "react-native-track-player";

TrackPlayer.registerPlaybackService(() => playbackService);

const App = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  //this intantiates the player using the setupPlayer() function from the trackservice
  useEffect(() => {
    async function setup() {
      const isSetup = await setupPlayer(); // The player is ready to be used
      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks();
      }
      setIsPlayerReady(isSetup);
      console.log("player is ready");
    }
    setup();
  }, []);

  if (!isPlayerReady) {
    return <ActivityIndicator size="large" />;
  } else {
    return (
      <View>
        <Text>Hello World</Text>
      </View>
    );
  }
};

export default App;
