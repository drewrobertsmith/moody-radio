import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";

import { AntDesign } from "@expo/vector-icons";
import { handlePlayButtonPress } from "../../trackPlayerServices";

export default function PlayButton({ item }) {
  //receives any playback item
  const isPlaying = useIsPlaying();
  const activeTrack = useActiveTrack();
  console.log(activeTrack);
  console.log(isPlaying);

  async function handleLocalAudioPlayback() {
    if (activeTrack?.id === item?.Id && isPlaying.playing === true) {
      await TrackPlayer.pause();
    } else if (activeTrack?.id === item?.Id && isPlaying.playing === false) {
      await TrackPlayer.play();
    } else if (activeTrack?.id !== item?.Id) {
      await TrackPlayer.add(
        {
          id: item.Id,
          url: item.AudioUrl,
          title: item.Title,
          artist: item.ProgramSlug,
          artwork: item.ImageUrl,
          date: item.PublishedUtc,
          duration: item.DurationSeconds,
        },
        0
      );
      await TrackPlayer.skip(0);
      await TrackPlayer.play();
    }
  }

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
        handleLocalAudioPlayback();
        //handlePlayButtonPress(item, isPlaying, activeTrack);
      }}
    />
  );
}
