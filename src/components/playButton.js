import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";

import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { playTrack } from "../../trackPlayerServices";

export default function PlayButton({ item }) {
  //recieves any playback item

  const isPlaying = useIsPlaying();
  const activeTrack = useActiveTrack();

  async function handlePlayButtonPress() {
    activeTrack && activeTrack.id === item.Id && isPlaying.playing === true
      ? TrackPlayer.pause()
      : playTrack(item);
  }

  let iconState = "play"; // Default state
  // Check if the current item is the active track
  if (activeTrack && activeTrack.id === item.Id) {
    // Determine the iconState based on isPlaying status
    if (isPlaying && isPlaying.bufferingDuringPlay === true) {
      iconState = "clockcircle";
    } else if (isPlaying.playing === true) {
      iconState = "pausecircle";
    }
    // If none of the above conditions are true, the iconState remains "play"
  }

  return (
    <AntDesign
      name={iconState}
      style={styles.playButton}
      size={32}
      color="black"
      onPress={() => {
        handlePlayButtonPress();
      }}
      onLongPress={() => {
        TrackPlayer.stop();
      }}
    />
  );
}

const styles = StyleSheet.create({});
