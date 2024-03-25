import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import PodcastEpisodesFeed from "../../../components/podcastEpisodesFeed";
import { useInfiniteGetClipsByProgram } from "../../../services/omnyApiRequests";
import { useLocalSearchParams } from "expo-router";

export default function PodcastPage() {
  const { Id } = useLocalSearchParams();

  //const clipsQuery = useGetClipsByProgramId(Id);
  //const programQuery = useGetProgramById(Id);

  const {
    data,
    isPending,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
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
        data={clipData}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // programImage: {
  //   resizeMode: "contain",
  //   height: 200,
  //   width: "100%",
  //   shadowColor: "blue",
  //   shadowOffset: {
  //     width: 16,
  //     height: 16,
  //   },
  // },
});
