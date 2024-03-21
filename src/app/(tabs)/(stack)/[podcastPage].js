import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, useLocalSearchParams, usePathname } from "expo-router";
import {
  useGetClipsByProgramId,
  useGetProgramById,
} from "../../../services/omnyApiRequests";

import PodcastEpisodesFeed from "../../../components/podcastEpisodesFeed";

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
      </View>
      <PodcastEpisodesFeed data={clipsQuery.data} />
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
