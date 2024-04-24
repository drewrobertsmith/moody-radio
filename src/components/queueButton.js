import { MaterialIcons } from "@expo/vector-icons";
import TrackPlayer from "react-native-track-player";
import { View } from "react-native";
import { handleAudioPlayback } from "../../trackPlayerServices";
import { useQuery } from "@tanstack/react-query";

export default function QueueButton({ item }) {
  const { data } = useQuery({
    queryKey: ["queueList"],
    queryFn: async () => {
      try {
        const data = await TrackPlayer.getQueue();
        return data;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    notifyOnChangeProps: "all",
  });

  const trackIndex = data?.findIndex((track) => track.id === item.Id);

  let queueButtonState;
  if (trackIndex === -1) {
    queueButtonState = "playlist-add";
  } else if (trackIndex != -1) {
    queueButtonState = "playlist-add-check";
  }

  const handleQueueButtonPress = () => {
    handleAudioPlayback("addToQueueButton", item);
  };

  return (
    <View
      style={{
        padding: 4,
      }}
    >
      <MaterialIcons
        name={queueButtonState}
        size={32}
        color="black"
        onPress={() => {
          handleQueueButtonPress();
        }}
      />
    </View>
  );
}
