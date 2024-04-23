import { MaterialIcons } from "@expo/vector-icons";
import TrackPlayer from "react-native-track-player";
import { View } from "react-native";
import { handleAudioPlayback } from "../../trackPlayerServices";
import { useState } from "react";

export default function QueueButton({ item }) {
  const [playlistIconState, setPlaylistIconState] = useState("playlist-add");

  async function handleQueueButtonPress() {
    handleAudioPlayback("addToQueueButton", item);
    const queue = await TrackPlayer.getQueue();
    const trackIndex = queue.findIndex((track) => track.id === item.Id);
    if (trackIndex === -1) {
      setPlaylistIconState("playlist-add");
    } else if (trackIndex != -1) {
      setPlaylistIconState("playlist-add-check");
    }
  }

  return (
    <View
      style={{
        padding: 4,
      }}
    >
      <MaterialIcons
        name={playlistIconState}
        size={32}
        color="black"
        onPress={() => {
          handleQueueButtonPress();
        }}
      />
    </View>
  );
}
