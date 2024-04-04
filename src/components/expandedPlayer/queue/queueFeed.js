import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { useEffect, useState } from "react";

import QueueItem from "./queueItem";

export default function QueueFeed() {
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  //get queue items form trackplayer
  const loadPlaylist = async () => {
    const initialQueueList = await TrackPlayer.getQueue();
    setQueue(initialQueueList);
  };

  //load trackplayer queue item
  useEffect(() => {
    loadPlaylist();
  }, [queue]);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    if (event.type === Event.PlaybackActiveTrackChanged) {
      let index = await TrackPlayer.getActiveTrackIndex();
      if (currentTrack !== index) {
        setCurrentTrack(index);
        loadPlaylist();
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
        data={queue}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <QueueItem
            item={item}
            index={index}
            isCurrent={currentTrack === index}
          />
        )}
      />
    </View>
  );
}
