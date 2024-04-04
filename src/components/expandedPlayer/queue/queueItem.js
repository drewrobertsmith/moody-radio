import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { formatDate, formatDuration } from "../../../services/formatters";

import { ScaleDecorator } from "react-native-draggable-flatlist";

export default function QueueItem({ item, index, isCurrent, drag, isActive }) {
  async function handleItemPress() {
    await TrackPlayer.skip(index); //skips to selected track in queue,
    await TrackPlayer.move(index, 0); //moves selected track to top position
    await TrackPlayer.play(); //begins playing slected track
  }

  const { position, duration } = useProgress();
  const progressWidth = duration > 0 ? (position / duration) * 100 : 0;

  const timeLeft = item.duration - position;

  return (
    // <ScaleDecorator>
    //   <TouchableOpacity onLongPress={drag} disabled={isActive}>
    //     <View style={{ padding: 4, margin: 2, borderWidth: 1 }}>
    //       <Text>{item.date}</Text>
    //       <Text>{item.title}</Text>
    //       <Text>{item.duration}</Text>
    //     </View>
    //   </TouchableOpacity>
    // </ScaleDecorator>

    <View style={styles.container}>
      <Pressable onPress={handleItemPress}>
        <View style={styles.trackContainer}>
          <View style={styles.progressBar}>
            <Image style={styles.image} source={{ uri: item.artwork }} />
          </View>
          <View style={styles.queueItemInfo}>
            <Text style={styles.infoDate}>{formatDate(item.date)}</Text>
            <Text style={styles.infoTitle}>{item.title}</Text>
            <Text style={styles.infoDuration}>
              {formatDuration(item.duration)}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  image: {
    height: 56,
    width: 56,
    marginRight: 8,
    borderRadius: 8,
  },
  trackContainer: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 8,
    overflow: "hidden",
  },
  progressBar: {
    //height: "150%", // Set the height to fill the container
    //backgroundColor: "#0071B3",
    //position: "absolute", // Position absolutely to overlay on top of the track container
    //top: 0, // Align to the top of the container
    //left: 0, // Align to the left of the container
  },
  queueItemInfo: {
    flex: 1, // Add flex to allow it to fill the remaining space
    justifyContent: "center", // Vertically center the contents
  },
  infoDate: {
    fontSize: 11,
  },
  infoTitle: {
    fontWeight: "bold",
  },
  infoDuration: {
    fontSize: 11,
  },
});
