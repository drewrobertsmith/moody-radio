import { Stack, useGlobalSearchParams, useLocalSearchParams } from "expo-router";

import { Text } from "react-native";

export default function PodcastLayout() {
  const loc = useLocalSearchParams();
  const glob = useGlobalSearchParams();
  console.log("local", loc);
  console.log("global", glob);

  return (
    <Stack>
      <Stack.Screen name="podcasts" options={{ title: "Podcasts" }} />
      <Stack.Screen
        name="[podcastPage]"
        options={{
          title: `${glob.Name}`,
        }}
      />
    </Stack>
  );
}