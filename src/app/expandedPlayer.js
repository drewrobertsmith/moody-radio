import { Image, Text, View } from "react-native";
import TrackPlayer, { useActiveTrack } from "react-native-track-player";

import PlayButton from "../components/playButton";

export default function ExpandedPlayer() {
  const activeTrack = useActiveTrack();

  return (
    <View style={{ padding: 8, alignItems: "center" }}>
      <Image source={{ uri: activeTrack && activeTrack.artwork }} width={300} height={300} />
      <Text>{activeTrack && activeTrack.title}</Text>
      <Text>{activeTrack && activeTrack.artist}</Text>
    </View>
  );
}
