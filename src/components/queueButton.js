import { MaterialIcons } from "@expo/vector-icons";
import TrackPlayer from "react-native-track-player";
import { View } from "react-native";

export default function QueueButton({ item }) {
  async function handleQueueButtonPress() {
    await TrackPlayer.add({
      id: item.Id,
      url: item.AudioUrl,
      title: item.Title,
      artist: item.ProgramSlug,
      artwork: item.ImageUrl,
      date: item.PublishedUtc,
      duration: item.DurationSeconds
    });
  }

  return (
    <View
      style={{
        padding: 4,
      }}
    >
      <MaterialIcons
        name="playlist-add"
        size={32}
        color="black"
        onPress={() => {
          handleQueueButtonPress();
        }}
      />
    </View>
  );
}
