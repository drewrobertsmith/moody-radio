import { FlashList } from "@shopify/flash-list";
import PodcastEpisodeItem from "./podcastEpisodeItem";
import { View } from "react-native";

export default function PodcastEpisodesFeed({
  data,
  isFetching,
  hasNextPage,
  fetchNextPage,
}) {
  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={data}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => <PodcastEpisodeItem item={item} />}
        refreshing={isFetching}
        onEndReached={hasNextPage ? () => fetchNextPage() : null}
        onEndReachedThreshold={0.5}
        estimatedItemSize={76}
      />
    </View>
  );
}
