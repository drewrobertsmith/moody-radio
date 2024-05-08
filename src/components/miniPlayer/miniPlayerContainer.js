import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import MiniPlayerControls from "./miniplayerControls";
import { useActiveTrack } from "react-native-track-player";

export default function MiniPlayerContainer(props) {
  const activeTrack = useActiveTrack();
  function MiniPlayerImageContainer() {
    return (
      <View style={styles.miniPlayerImageContainer}>
        {activeTrack?.artwork ? (
          <Image
            source={{ uri: activeTrack?.artwork }}
            height={50}
            width={50}
          />
        ) : null}
      </View>
    );
  }

  function QueueButton() {
    return (
      <View style={styles.queueButtonContainer}>
        <MaterialIcons name="queue-music" size={32} color="black" />
      </View>
    );
  }

  return (
    <>
      <Link href="(playerStack)/expandedPlayer" asChild>
        <Pressable>
          <View style={styles.miniPlayerContainer}>
            <MiniPlayerImageContainer />
            <MiniPlayerControls />
            <QueueButton />
          </View>
          <BottomTabBar {...props} />
        </Pressable>
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  miniPlayerContainer: {
    backgroundColor: "tan",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  miniPlayerImageContainer: {
    flex: 1,
    padding: 4,
  },
  queueButtonContainer: {
    padding: 4,
    flex: 1,
    alignItems: "flex-end",
  },
});
