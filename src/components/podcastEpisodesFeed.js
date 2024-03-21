import { FlatList, View } from "react-native";

import { FlashList } from "@shopify/flash-list";
import PodcastEpisodeItem from "./podcastEpisodeItem";

export default function PodcastEpisodesFeed({
  data,
  isFetching,
  fetchNextPage,
}) {
  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={data}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => <PodcastEpisodeItem item={item} />}
        estimatedItemSize={74}
        //onEndReached={() => !isFetching && fetchNextPage}
      />
    </View>
  );
}
