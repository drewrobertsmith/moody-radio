import {
  FlatList,
  Image,
  Pressable,
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
import { Link } from "expo-router";
import ProgressBar from "../components/expandedPlayer/progressBar";
import QueueFeed from "../components/expandedPlayer/queue/queueFeed";

export default function ExpandedPlayer() {
  const activeTrack = useActiveTrack();
  const isPlaying = useIsPlaying();

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

  return (
    <View style={styles.viewContainer}>
      <NowPlayingInfo />
      <ProgressBar />
      <ExpandedPlayerControls isPlaying={isPlaying} />
      <Link href="/queuePage" asChild>
        <Pressable>
          <Text>Queue Feed</Text>
        </Pressable>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  viewContainer: {
    padding: 8,
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
  },
});
