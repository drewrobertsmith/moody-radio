import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import PodcastEpisodesFeed from "../../../components/podcastEpisodesFeed";
import { useGetClipsByProgramId } from "../../../services/omnyApiRequests";
import { useLocalSearchParams } from "expo-router";

export default function PodcastPage() {
  const { Id } = useLocalSearchParams();

  const clipsQuery = useGetClipsByProgramId(Id);
  //const programQuery = useGetProgramById(Id);

  if (clipsQuery.isPending) {
    return <ActivityIndicator size="large" />;
  }

  if (clipsQuery.error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View>
        {/* <Image
          source={{ uri: programQuery.data.ArtworkUrl }}
          style={styles.programImage}
        /> */}
        {/* <Button
          title={buttonStatus}
          onPress={() => clipsQuery.fetchNextPage()}
          disabled={!clipsQuery.hasNextPage || clipsQuery.isFetchingNextPage}
        /> */}
      </View>
      <PodcastEpisodesFeed data={clipsQuery.data} />
      {/* <PodcastEpisodesFeed data={clipsQuery.data} isFetching={clipsQuery.isFetching} fetchNextPage={clipsQuery.fetchNextPage()} /> */}
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
