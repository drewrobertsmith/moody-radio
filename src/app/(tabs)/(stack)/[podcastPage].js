import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useGetClipsByProgramId, useGetProgramById, useInfiniteGetClipsByProgram } from "../../../services/omnyApiRequests";

import PodcastEpisodesFeed from "../../../components/podcastEpisodesFeed";
import { useLocalSearchParams } from "expo-router";

export default function PodcastPage() {
  const { Id } = useLocalSearchParams();

  const programQuery = useGetProgramById(Id);

  const {
    data,
    isPending,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteGetClipsByProgram(Id);

  //page.Clips was the missing piece to deal with Omy APIs weird structure
  const clipData = data?.pages.flatMap((page) => page.Clips) ?? [];

  if (isPending) {
    return <ActivityIndicator size="large" />;
  } else if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <PodcastEpisodesFeed
        programQuery={programQuery}
        data={clipData}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </View>
  );
}