import { MaterialIcons } from "@expo/vector-icons";
import TrackPlayer from "react-native-track-player";
import { View } from "react-native";
import { handleAudioPlayback } from "../../trackPlayerServices";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function QueueButton({ item }) {
  const [trackIndex, setTrackIndex] = useState(-1);

  const handleQueueButtonPress = async () => {
    const trackIndex = await handleAudioPlayback("addToQueueButton", item);
    setTrackIndex(trackIndex);
  };

  let queueButtonState;
  let queueButtonColor;
  if (trackIndex === -1) {
    queueButtonState = "playlist-add";
    queueButtonColor = "black";
  } else if (trackIndex != -1) {
    queueButtonState = "playlist-add-check";
    queueButtonColor = "green";
  }

  return (
    <View
      style={{
        padding: 4,
      }}
    >
      <MaterialIcons
        name={queueButtonState}
        size={32}
        color={queueButtonColor}
        onPress={() => {
          handleQueueButtonPress();
        }}
      />
    </View>
  );
}
