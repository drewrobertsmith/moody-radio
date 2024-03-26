import { Image, StyleSheet, Text, View } from "react-native";
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import PlayButton from "../components/playButton";
import ProgressBar from "../components/expandedPlayer/progressBar";

export default function ExpandedPlayer() {
  const activeTrack = useActiveTrack();
  const isPlaying = useIsPlaying();

  async function handlePlayButtonPress() {
    isPlaying && isPlaying.playing === true
      ? TrackPlayer.pause()
      : TrackPlayer.play();
  }

  let playIconState = "play"; // default state
  //Determine isPlaying Status
  if (isPlaying && isPlaying.bufferingDuringPlay === true) {
    playIconState = "clockcircle";
  } else if (isPlaying && isPlaying.playing === true) {
    playIconState = "pausecircle";
  }

  return (
    <View style={{ padding: 8, alignItems: "center" }}>
      <Image
        source={{ uri: activeTrack && activeTrack.artwork }}
        width={300}
        height={300}
      />
      <Text>{activeTrack && activeTrack.title}</Text>
      <Text>{activeTrack && activeTrack.artist}</Text>
      <ProgressBar />
      <View style={{ flexDirection: "row" }}>
        <MaterialIcons
          name="replay-30"
          size={32}
          style={styles.controlIcons}
          onPress={() => {
            TrackPlayer.seekBy(-30);
          }}
        />
        <AntDesign
          name={playIconState}
          size={44}
          style={styles.controlIcons}
          onPress={() => {
            handlePlayButtonPress();
          }}
        />
        <MaterialIcons
          name="forward-30"
          size={32}
          style={styles.controlIcons}
          onPress={() => {
            TrackPlayer.seekBy(30);
          }}
        />
      </View>
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
