import { Text, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

function EpisodeItem() {
    const {Title, Id} = useLocalSearchParams();

  return (
    <View>
      <Text>{Title} - {Id}</Text>
    </View>
  );
}
