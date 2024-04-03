import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";

import QueueItem from "./queueItem";
import TrackPlayer from "react-native-track-player";

QUEUE_DATA = [
  {
    artist: "becoming-well",
    artwork:
      "https://www.omnycontent.com/d/clips/a8cdbf10-d816-4c77-9e79-aa1c012547e1/b5d5644d-cbdc-4968-8525-abaa013f33ca/0465556c-937b-455f-91d6-ae3c017881a4/image.jpg?t=1641331057&size=Medium",
    id: "0465556c-937b-455f-91d6-ae3c017881a4",
    title: "What About My Relationship Status? with Dr. Valencia Wiggins",
    url: "https://chtbl.com/track/8G712/traffic.omny.fm/d/clips/a8cdbf10-d816-4c77-9e79-aa1c012547e1/b5d5644d-cbdc-4968-8525-abaa013f33ca/0465556c-937b-455f-91d6-ae3c017881a4/audio.mp3",
    duration: "40m",
    date: "March 26",
  },
  {
    artist: "becoming-well",
    artwork:
      "https://www.omnycontent.com/d/clips/a8cdbf10-d816-4c77-9e79-aa1c012547e1/b5d5644d-cbdc-4968-8525-abaa013f33ca/7d22bf51-29ad-464e-9067-ae9100f77e78/image.jpg?t=1641331057&size=Medium",
    id: "7d22bf51-29ad-464e-9067-ae9100f77e78",
    title: "Family Mystery with Guest Brian Dahlen",
    url: "https://chtbl.com/track/8G712/traffic.omny.fm/d/clips/a8cdbf10-d816-4c77-9e79-aa1c012547e1/b5d5644d-cbdc-4968-8525-abaa013f33ca/7d22bf51-29ad-464e-9067-ae9100f77e78/audio.mp3",
    duration: "40m",
    date: "March 26",
  },
];

export default function QueueFeed() {
  const [queue, setQueue] = useState(QUEUE_DATA);
  const [data, setData] = useState(queue);
 

  const loadPlaylist = async () => {
    const q = await TrackPlayer.getQueue();
    setQueue(q);
  };

  useEffect(() => {
    loadPlaylist();
  }, [queue]);

  return (
    <View style={{ flex: 1 }}>
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => item.id}
        renderItem={QueueItem}
      />
    </View>
  );
}
