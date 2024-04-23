import { StyleSheet, View } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function MiniPlayerControls() {
  const isPlaying = useIsPlaying();

  async function handleMiniPlayerPlayButtonPress() {
    isPlaying && isPlaying.playing === true
      ? await TrackPlayer.pause()
      : await TrackPlayer.play();
  }

  let miniPlayerPlayIconState = isPlaying?.playing ? "pausecircle" : "play";
  if (isPlaying?.bufferingDuringPlay) {
    miniPlayerPlayIconState = "clockcircle";
  }

  const ReplayIcon = () => (
    <MaterialIcons
      name="replay-30"
      size={32}
      style={styles.controlIcons}
      onPress={() => {
        TrackPlayer.seekBy(-30);
      }}
    />
  );

  const PlayIcon = () => (
    <AntDesign
      name={miniPlayerPlayIconState}
      size={44}
      style={styles.controlIcons}
      onPress={handleMiniPlayerPlayButtonPress}
    />
  );

  const ForwardIcon = () => (
    <MaterialIcons
      name="forward-30"
      size={32}
      style={styles.controlIcons}
      onPress={() => {
        TrackPlayer.seekBy(30);
      }}
    />
  );

  return (
    <View style={styles.controlsContainer}>
      <ReplayIcon />
      <PlayIcon />
      <ForwardIcon />
    </View>
  );
}
const styles = StyleSheet.create({
  controlsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlIcons: {
    color: "black",
    padding: 8,
  },
});
