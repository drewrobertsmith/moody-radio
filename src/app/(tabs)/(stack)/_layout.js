import {
  Stack,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";

export default function PodcastLayout() {
  const loc = useLocalSearchParams();
  const glob = useGlobalSearchParams();

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
