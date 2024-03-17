import { FlatList, View } from "react-native";

import PodcastEpisodeItem from "./podcastEpisodeItem";

export default function PodcastEpisodesFeed({data}) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => <PodcastEpisodeItem item={item} />}
      />
    </View>
  );
}
