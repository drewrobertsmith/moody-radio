import { Pressable, StyleSheet, Text, View } from "react-native";
import { formatDate, formatDuration } from "../services/formatters";
import { useActiveTrack, useProgress } from "react-native-track-player";

import { Link } from "expo-router";
import PlayButton from "./playButton";
import QueueButton from "./queueButton";

export default function PodcastEpisodeItem({ item }) {
  const { position, duration } = useProgress();
  const activeTrack = useActiveTrack();

  return (
    <View style={styles.container}>
      <View style={styles.episodeInfo}>
        <Link
          href={{
            pathname: "/episode/[episodeid]",
            params: { clipId: item.Id },
          }}
          asChild
        >
          <Pressable>
            <Text style={styles.info}>
              {item.Season && item.Episode
                ? `S${item.Season} E${item.Episode} - `
                : ""}
              {formatDate(item.PublishedUtc)}
            </Text>
            <Text style={styles.title}>{item.Title}</Text>
            <Text style={styles.duration}>
              {activeTrack && activeTrack.id === item.Id
                ? `${formatDuration(duration - position)} left`
                : formatDuration(item.DurationSeconds)}
            </Text>
          </Pressable>
        </Link>
      </View>
      <View style={styles.playButtonContainer}>
        <QueueButton item={item}/>
        <PlayButton item={item} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  episodeInfo: {
    flex: 3,
  },
  title: {
    fontWeight: "bold",
  },
  info: {
    fontSize: 11,
  },
  duration: {
    fontSize: 11,
  },
  playButtonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
});
