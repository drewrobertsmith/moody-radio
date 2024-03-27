import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";
import { useEffect, useState } from "react";

import ExpandedPlayerControls from "../components/expandedPlayer/expandedPlayerControls";
import ProgressBar from "../components/expandedPlayer/progressBar";

export default function ExpandedPlayer() {
  const [queue, setQueue] = useState([]);
  const activeTrack = useActiveTrack();
  const isPlaying = useIsPlaying();
  console.log(queue);

  const loadPlaylist = async () => {
    const q = await TrackPlayer.getQueue();
    setQueue(q);
  };

  useEffect(() => {
    loadPlaylist();
  }, [queue]);

  const NowPlayingInfo = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Image
          source={{ uri: activeTrack && activeTrack.artwork }}
          width={300}
          height={300}
        />
        <Text>{activeTrack && activeTrack.title}</Text>
        <Text>{activeTrack && activeTrack.artist}</Text>
      </View>
    );
  };

  const QueueFeed = () => {
    return <Text>Queue Feed</Text>;
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContainerView}
    >
      <NowPlayingInfo />
      <ProgressBar />
      <ExpandedPlayerControls isPlaying={isPlaying} />
      <QueueFeed />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    padding: 8,
  },
  scrollContainerView: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
  },
});
