import { StyleSheet, View } from "react-native";

import { FlashList } from "@shopify/flash-list";
import PodcastEpisodeItem from "./podcastEpisodeItem";
import PodcastPageHeaderInfo from "./podcastPageInfoHeader";

export default function PodcastEpisodesFeed({
  data,
  isFetching,
  hasNextPage,
  fetchNextPage,
  programQuery,
}) {
  return (
    <View style={{ flex: 1 }}>
      <FlashList
        ListHeaderComponent={
          <PodcastPageHeaderInfo programQuery={programQuery} />
        }
        ListHeaderComponentStyle={styles.header}
        data={data}
        keyExtractor={(item) => item.Id}
        renderItem={({ item }) => <PodcastEpisodeItem item={item} />}
        refreshing={isFetching}
        onEndReached={hasNextPage ? () => fetchNextPage() : null}
        onEndReachedThreshold={0.5}
        estimatedItemSize={82}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
});
