import { Stack, useLocalSearchParams } from "expo-router";

import { Text } from "react-native";

export default function PodcastLayout() {
  return (
    <Stack>
      <Stack.Screen name="podcasts" options={{ title: "Podcasts" }} />
      <Stack.Screen
        name="[podcastPage]"
        options={{
          title: "Example",
        }}
      />
    </Stack>
  );
}
