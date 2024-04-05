import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { handleAudioPlayback } from "../../trackPlayerServices";

export default function QueueButton({ item }) {
  async function handleQueueButtonPress() {
    handleAudioPlayback("addToQueueButton", item);
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
