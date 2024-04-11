import { FlatList, View } from "react-native";
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { useEffect, useState } from "react";

import EmptyQueue from "./emptyQueueMessage";
import QueueHeader from "./queueHeader";
import QueueItem from "./queueItem";
import { useQuery } from "@tanstack/react-query";

export default function QueueFeed() {
  const [currentTrack, setCurrentTrack] = useState(0);


  const { data, refetch } = useQuery({
    queryKey: ["queueList"],
    queryFn: async () => {
      try {
        const data = await TrackPlayer.getQueue();
        return data;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    notifyOnChangeProps: "all",
  });

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    if (event.type === Event.PlaybackActiveTrackChanged) {
      let index = await TrackPlayer.getActiveTrackIndex();
      if (currentTrack !== index) {
        setCurrentTrack(index);
      }
    }
  });

  return (
    <View style={{ flex: 1 }}>
      {/* <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => item.id}
        renderItem={QueueItem}
      /> */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <QueueItem
            item={item}
            index={index}
            isCurrent={currentTrack === index}
            refetch={refetch()}
          />
        )}
        ListEmptyComponent={EmptyQueue}
        ListHeaderComponent={QueueHeader}
      />
    </View>
  );
}
