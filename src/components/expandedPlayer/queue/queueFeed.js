import { FlatList, Text, View } from "react-native";

QUEUE_DATA = [
  {
    artist: "becoming-well",
    artwork:
      "https://www.omnycontent.com/d/clips/a8cdbf10-d816-4c77-9e79-aa1c012547e1/b5d5644d-cbdc-4968-8525-abaa013f33ca/0465556c-937b-455f-91d6-ae3c017881a4/image.jpg?t=1641331057&size=Medium",
    id: "0465556c-937b-455f-91d6-ae3c017881a4",
    title: "What About My Relationship Status? with Dr. Valencia Wiggins",
    url: "https://chtbl.com/track/8G712/traffic.omny.fm/d/clips/a8cdbf10-d816-4c77-9e79-aa1c012547e1/b5d5644d-cbdc-4968-8525-abaa013f33ca/0465556c-937b-455f-91d6-ae3c017881a4/audio.mp3",
  },
  {
    artist: "becoming-well",
    artwork:
      "https://www.omnycontent.com/d/clips/a8cdbf10-d816-4c77-9e79-aa1c012547e1/b5d5644d-cbdc-4968-8525-abaa013f33ca/7d22bf51-29ad-464e-9067-ae9100f77e78/image.jpg?t=1641331057&size=Medium",
    id: "7d22bf51-29ad-464e-9067-ae9100f77e78",
    title: "Family Mystery with Guest Brian Dahlen",
    url: "https://chtbl.com/track/8G712/traffic.omny.fm/d/clips/a8cdbf10-d816-4c77-9e79-aa1c012547e1/b5d5644d-cbdc-4968-8525-abaa013f33ca/7d22bf51-29ad-464e-9067-ae9100f77e78/audio.mp3",
  },
];

export default function QueueFeed() {
  return (
    <View style={{flex: 1}}>
      <Text>Queue Feed</Text>
      <FlatList 
        data={QUEUE_DATA}
        keyExtractor={(item) => item.id}
    
      />
    </View>
  );
}
