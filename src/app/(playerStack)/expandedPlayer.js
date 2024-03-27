import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useActiveTrack, useIsPlaying } from "react-native-track-player";

import ExpandedPlayerControls from "../../components/expandedPlayer/expandedPlayerControls";
import { Link } from "expo-router";
import ProgressBar from "../../components/expandedPlayer/progressBar";

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
