import { StyleSheet, Text, View } from "react-native";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";

import { AntDesign } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

export default function MiniPlayer(props) {
  const isPlaying = useIsPlaying();

  async function handleMiniPlayerPlayButtonPress() {
    isPlaying && isPlaying.playing === true
      ? TrackPlayer.pause()
      : TrackPlayer.play();
  }

  let miniPlayerPlayIconState = "play"; // default state
  //Determine isPlaying Status
  if (isPlaying && isPlaying.bufferingDuringPlay === true) {
    miniPlayerPlayIconState = "clockcircle";
  } else if (isPlaying && isPlaying.playing === true) {
    miniPlayerPlayIconState = "pausecircle";
  }

  return (
    <View style={styles.miniPlayerContainer}>
      <View style={styles.controlsContainer}>
        <MaterialIcons
          name="replay-30"
          size={32}
          style={styles.controlIcons}
          onPress={() => {
            TrackPlayer.seekBy(-30);
          }}
        />
        <AntDesign
          name={miniPlayerPlayIconState}
          size={44}
          style={styles.controlIcons}
          onPress={() => {
            handleMiniPlayerPlayButtonPress();
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
      <BottomTabBar {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  miniPlayerContainer: {
    backgroundColor: "tan",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlIcons: {
    color: "black",
    padding: 8,
  },
});
