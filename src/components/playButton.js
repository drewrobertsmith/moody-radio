import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";

import { AntDesign } from "@expo/vector-icons";
import { handleAudioPlayback } from "../../trackPlayerServices";
import { useCallback } from "react";

export default function PlayButton({ item }) {
  //recieves any playback item
  const isPlaying = useIsPlaying();
  const activeTrack = useActiveTrack();

  const handlePlayButtonPress = useCallback(async () => {
    activeTrack && activeTrack.id === item.Id && isPlaying.playing === true
      ? TrackPlayer.pause()
      : handleAudioPlayback("playButton", item);
  }, [activeTrack, isPlaying, item]);

  let iconState =
    isPlaying?.playing && activeTrack?.id === item.Id ? "pausecircle" : "play";
  if (isPlaying?.bufferingDuringPlay && activeTrack?.id === item.Id) {
    iconState = "clockcircle";
  }

  return (
    <AntDesign
      name={iconState}
      size={32}
      color="black"
      onPress={() => {
        handlePlayButtonPress();
      }}
    />
  );
}
