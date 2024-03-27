import { StyleSheet, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import TrackPlayer from "react-native-track-player";

export default function ExpandedPlayerControls({ isPlaying }) {
  let playIconState = "play"; // default state
  //Determine isPlaying Status
  if (isPlaying && isPlaying.bufferingDuringPlay === true) {
    playIconState = "clockcircle";
  } else if (isPlaying && isPlaying.playing === true) {
    playIconState = "pausecircle";
  }

  async function handlePlayButtonPress() {
    isPlaying && isPlaying.playing === true
      ? TrackPlayer.pause()
      : TrackPlayer.play();
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <MaterialIcons
        name="replay-30"
        size={48}
        style={styles.controlIcons}
        onPress={() => {
          TrackPlayer.seekBy(-30);
        }}
      />
      <AntDesign
        name={playIconState}
        size={56}
        style={styles.controlIcons}
        onPress={() => {
          handlePlayButtonPress();
        }}
      />
      <MaterialIcons
        name="forward-30"
        size={48}
        style={styles.controlIcons}
        onPress={() => {
          TrackPlayer.seekBy(30);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  controlIcons: {
    color: "black",
    padding: 8,
    margin: 8,
  },
});
